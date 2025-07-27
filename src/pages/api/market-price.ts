import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import * as cheerio from "cheerio";
import * as cookie from "cookie";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { zip } from "@/utils/hidash";

const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));
const headers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.5",
  "accept-encoding": "gzip, deflate, br, zstd",
  referer: "https://kalimatimarket.gov.np/",
  "upgrade-insecure-requests": "1",
  dnt: "1",
  "sec-gpc": "1",
};

type MarketPriceRaw = {
  headers: {
    id: number;
    name: string;
    nameNe: string;
    latestDate: string;
    latestDateNe: string;
  }[];
  rows: { sid: number; name: string; nameNe: string; category: number }[];
  data: {
    [key: string]: {
      id: number;
      date: string;
      maxPrice: number;
      minPrice: number;
      avgPrice: number;
      market: number;
      marketName: string;
      marketNameNe: string;
      productSubType: number;
      productSubTypeName: string;
      productSubTypeNameNe: string;
      dateNepali: string;
      averageDiff: number;
      percentChange: number;
      unit: string;
    }[];
  };
};

async function parseKalimatiMarketPriceData(
  date: string,
  lang: "en" | "np" = "np"
) {
  const langRes = await client.get(
    "https://kalimatimarket.gov.np/lang/" + lang,
    {
      headers,
      maxRedirects: 0,
      validateStatus: (status) => status === 302 || status === 200,
    }
  );

  const pricePageRes = await client.get("https://kalimatimarket.gov.np/price", {
    headers,
  });

  const priceDataHtml = cheerio.load(pricePageRes.data);
  const token = priceDataHtml('input[name="_token"]').val();

  if (!token) {
    throw new Error("Token not found");
  }

  const formData = new URLSearchParams();
  formData.append("_token", token.toString());
  formData.append("datePricing", date);

  const pricePageRes2 = await client.post(
    "https://kalimatimarket.gov.np/price",
    formData.toString()
  );

  const html = pricePageRes2.data;
  const $ = cheerio.load(html);
  const tableRows: string[][] = [];
  const table = $("#commodityPriceParticular");

  table.find("tbody tr").each((_: number, row: any) => {
    const rowData: string[] = [];
    $(row)
      .find("td")
      .each((_: number, cell: any) => {
        rowData.push($(cell).text().trim());
      });
    if (rowData.length > 0) {
      tableRows.push(rowData);
    }
  });

  return tableRows.map((row) => ({
    name: row[0],
    unit: row[1].toLowerCase(),
    minPrice: row[2].toLowerCase(),
    maxPrice: row[3].toLowerCase(),
    avgPrice: row[4].toLowerCase(),
  }));
}

async function getKalimatiPriceData(
  date: string
): Promise<Array<MarketPriceRaw["data"][string][number]>> {
  const englishData = await parseKalimatiMarketPriceData(date, "en");
  const nepaliData = await parseKalimatiMarketPriceData(date, "np");

  let idCounter = 1;
  const merged = zip(
    englishData,
    nepaliData,
    (a, b) =>
      ({
        averageDiff: 0,
        avgPrice: parseFloat(a.avgPrice.replace("rs", "")),
        maxPrice: parseFloat(a.maxPrice.replace("rs", "")),
        minPrice: parseFloat(a.minPrice.replace("rs", "")),
        date: date,
        id: idCounter++,
        market: 5,
        marketName: "Kalimati",
        marketNameNe: "कालिमाटी",
        productSubType: idCounter,
        productSubTypeName: a.name,
        productSubTypeNameNe: b.name,
        percentChange: 0,
        unit: b.unit,
      } as MarketPriceRaw["data"][string][number])
  );
  return merged;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarketPriceRaw>
) {
  // Get date from query parameter or use default
  const { date } = req.query;

  let targetDate: string;

  if (date && typeof date === "string") {
    // Use the provided date
    targetDate = date;
  } else {
    // Default behavior - get yesterday's date
    const DAYS_TO_SUBTRACT_FOR_YESTERDAY = 2;
    targetDate = DateTime.now()
      .setZone("Asia/Kathmandu")
      .minus({ days: DAYS_TO_SUBTRACT_FOR_YESTERDAY })
      .toFormat("yyyy-MM-dd");
  }

  try {
    const resp = await fetch(
      `https://krishibajar.koshi.gov.np/api/market/market_price_summary/market_data/?&date=${targetDate}`,
      {
        credentials: "omit",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Camel-Case": "true",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "Sec-GPC": "1",
        },
        referrer: "https://krishibajar.koshi.gov.np/market-prices",
        method: "GET",
        mode: "cors",
      }
    );

    let data: MarketPriceRaw | null = null;
    if (!resp.ok) {
      throw new Error(`External service returned status ${resp.status}`);
    }

    data = (await resp.json()) as MarketPriceRaw;
    const kalimatiData = await getKalimatiPriceData(targetDate);

    data.data["5"] = kalimatiData;

    // Add the requested date info to the response for debugging
    console.log(`Fetching market data for date: ${targetDate}`);

    return res.status(resp.status).json(data);
  } catch (error) {
    console.error("Error fetching or parsing market price data:", error);
    return res.status(502).json({
      headers: [],
      rows: [],
      data: {},
      error:
        "Failed to fetch or parse market price data from external service.",
    } as any);
  }
}
