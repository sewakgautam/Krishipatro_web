import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import * as cheerio from "cheerio";

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

async function parseKalimatiMarketPriceData(): Promise<
  Array<MarketPriceRaw["data"][string][number]>
> {
  const url = "https://kalimatimarket.gov.np/lang/en";
  const resp = await fetch(url);
  const html = await resp.text();
  const $ = cheerio.load(html);
  const tableRows: string[][] = [];
  const table = $("#commodityDailyPrice");

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
  return tableRows.map((row) => {
    return {
      id: 0x0,
      date: "",
      maxPrice: row[2] as unknown as number, // TODO: fix this type - This is just to test the API. Need to be fix with actual number parsing
      minPrice: row[1] as unknown as number, // TODO: fix this type
      avgPrice: row[3] as unknown as number, // TODO: fix this type
      market: 5,
      marketName: "Kalimati",
      marketNameNe: "Kalimati",
      productSubType: Number(row[0]),
      productSubTypeName: row[0],
      productSubTypeNameNe: row[0],
      dateNepali: "",
      averageDiff: 0,
      percentChange: 0,
      unit: "kg",
    };
  });
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
    const kalimatiData = await parseKalimatiMarketPriceData();

    data.data["5"] = kalimatiData;

    return res.status(resp.status).json(data);

    // Add the requested date info to the response for debugging
    console.log(`Fetching market data for date: ${targetDate}`);
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
