import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";


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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarketPriceRaw>
) {
  const DAYS_TO_SUBTRACT_FOR_YESTERDAY = 2;
  const yesterdayInNepal = DateTime.now()
    .setZone("Asia/Kathmandu")
    .minus({ days: DAYS_TO_SUBTRACT_FOR_YESTERDAY })
    .toFormat("yyyy-MM-dd");


  const resp = await fetch(
    `https://krishibajar.koshi.gov.np/api/market/market_price_summary/market_data/?&date=${yesterdayInNepal}`,
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

  try {
    if (!resp.ok) {
      throw new Error(`External service returned status ${resp.status}`);
    }
    data = (await resp.json()) as MarketPriceRaw;
  } catch (error) {
    console.error("Error fetching or parsing market price data:", error);
    return res.status(502).json({
      headers: [],
      rows: [],
      data: {},
      error: "Failed to fetch or parse market price data from external service.",
    } as any);
  }

  return res.status(resp.status).json(data);
}
