import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import { parse } from "node-html-parser";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { zip } from "@/utils/hidash";
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit 
} from "firebase/firestore";
import { db } from '../../../../lib/firebaseauth';

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

export type MarketPriceRaw = {
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

export type FirebaseMarketPriceDocument = {
  date: string;
  createdAt: any; // serverTimestamp
  updatedAt: any; // serverTimestamp
  data: MarketPriceRaw;
};

// Save market price data to Firebase
async function saveMarketPriceToFirebase(date: string, marketData: MarketPriceRaw) {
  const docId = date; // Use date as document ID (e.g., "2024-01-15")
  const docRef = doc(db, "market-prices", docId);
  
  const firebaseDoc: FirebaseMarketPriceDocument = {
    date,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    data: marketData,
  };

  await setDoc(docRef, firebaseDoc, { merge: true });
  return docId;
}

// Get market price data from Firebase
async function getMarketPriceFromFirebase(date: string): Promise<MarketPriceRaw | null> {
  try {
    const docRef = doc(db, "market-prices", date);
    const docSnapshot = await getDocs(
      query(collection(db, "market-prices"), where("date", "==", date))
    );
    
    if (!docSnapshot.empty) {
      const docData = docSnapshot.docs[0].data() as FirebaseMarketPriceDocument;
      return docData.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching from Firebase:", error);
    return null;
  }
}

// Check if data exists for a specific date
async function dataExistsForDate(date: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, "market-prices"), 
      where("date", "==", date),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking data existence:", error);
    return false;
  }
}

// Enhanced external API fetch with better error handling and multiple endpoints
async function fetchFromExternalAPI(targetDate: string): Promise<MarketPriceRaw> {
  const endpoints = [
    `https://krishibajar.koshi.gov.np/api/market-price/market_price_summary/market_data/?date=${targetDate}`,
    `https://krishibajar.p1.gov.np/api/market-price/market_price_summary/market_data/?date=${targetDate}`,
    // Add more potential endpoints as fallbacks
  ];

  const requestConfig = {
    credentials: "omit" as RequestCredentials,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Camel-Case": "true",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "Sec-GPC": "1",
    },
    referrer: "https://krishibajar.koshi.gov.np/market-prices",
    method: "GET" as const,
    mode: "cors" as RequestMode,
  };

  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      const resp = await fetch(endpoint, requestConfig);
      
      console.log(`Response status: ${resp.status}`);
      console.log(`Response headers:`, Object.fromEntries(resp.headers.entries()));
      
      if (!resp.ok) {
        const errorText = await resp.text().catch(() => 'Unable to read error response');
        console.error(`Endpoint ${endpoint} failed: ${resp.status} - ${errorText}`);
        lastError = new Error(`HTTP ${resp.status}: ${errorText}`);
        continue;
      }

      // Check if response is actually JSON
      const contentType = resp.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await resp.text();
        console.error(`Non-JSON response from ${endpoint}:`, responseText.substring(0, 200));
        lastError = new Error(`Endpoint returned non-JSON content: ${contentType}`);
        continue;
      }

      const data: MarketPriceRaw = await resp.json();
      console.log(`Successfully fetched data from: ${endpoint}`);
      console.log(`Data keys: ${Object.keys(data)}`);
      return data;

    } catch (error) {
      console.error(`Error with endpoint ${endpoint}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  // If all endpoints failed, throw the last error
  throw lastError || new Error('All API endpoints failed');
}

// Create fallback data structure when external API fails
function createFallbackMarketData(targetDate: string): MarketPriceRaw {
  console.log('Creating fallback market data structure');
  const nepaliDate = convertToNepaliDate(targetDate);
  
  return {
    headers: [
      {
        id: 5,
        name: "Kalimati",
        nameNe: "कालीमाटी",
        latestDate: targetDate,
        latestDateNe: nepaliDate,
      }
    ],
    rows: [],
    data: {
      "5": [] // Will be populated by Kalimati data
    }
  };
}

async function parseComparativePriceInfo(fromDate: string, toDate: string) {
  await jar.removeAllCookies();
  await client.get("https://kalimatimarket.gov.np/lang/" + "en", {
    headers,
    maxRedirects: 0,
    validateStatus: (status) => status === 302 || status === 200,
  });

  const comparativePricePage = await client.get(
    "https://kalimatimarket.gov.np/comparative-prices"
  );

  const comparativePriceRoot = parse(comparativePricePage.data);
  const tokenInput = comparativePriceRoot.querySelector('input[name="_token"]');
  const token = tokenInput?.getAttribute("value");

  if (!token) {
    throw new Error("Token not found");
  }

  const formData = new URLSearchParams();
  formData.append("_token", token.toString());
  formData.append("from", fromDate);
  formData.append("to", toDate);

  const data = await client.post(
    "https://kalimatimarket.gov.np/comparative-prices",
    formData.toString()
  );

  const html = data.data;
  const root = parse(html);
  const table = root.querySelector("#commodityPriceParticular");
  const tableRows: string[][] = [];
  if (table) {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      tbody
        .querySelectorAll("tr")
        .forEach((row: import("node-html-parser").HTMLElement) => {
          const rowData: string[] = [];
          row
            .querySelectorAll("td")
            .forEach((cell: import("node-html-parser").HTMLElement) => {
              rowData.push(cell.text.trim());
            });
          if (rowData.length > 0) {
            tableRows.push(rowData);
          }
        });
    }
  }

  return tableRows.map((row) => {
    const d = {
      name: row[0],
      avgPriceFrom: parseFloat(
        (row[1]?.toLowerCase() ?? "").replace("rs", "").trim()
      ),
      avgPriceTo: parseFloat(
        (row[2]?.toLowerCase() ?? "").replace("rs", "").trim()
      ),
      difference: parseFloat((row[3]?.toLowerCase() ?? "").replace("%", "")),
      averageDiff: 0,
    };
    d.averageDiff = d.avgPriceTo - d.avgPriceFrom;
    return d;
  });
}

async function parseKalimatiMarketPriceData(
  date: string,
  lang: "en" | "np" = "np"
) {
  await client.get("https://kalimatimarket.gov.np/lang/" + lang, {
    headers,
    maxRedirects: 0,
    validateStatus: (status) => status === 302 || status === 200,
  });

  const pricePageRes = await client.get("https://kalimatimarket.gov.np/price", {
    headers,
  });

  const priceDataRoot = parse(pricePageRes.data);
  const tokenInput = priceDataRoot.querySelector('input[name="_token"]');
  const token = tokenInput?.getAttribute("value");

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
  const root = parse(html);
  const table = root.querySelector("#commodityPriceParticular");
  const tableRows: string[][] = [];
  if (table) {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      tbody
        .querySelectorAll("tr")
        .forEach((row: import("node-html-parser").HTMLElement) => {
          const rowData: string[] = [];
          row
            .querySelectorAll("td")
            .forEach((cell: import("node-html-parser").HTMLElement) => {
              rowData.push(cell.text.trim());
            });
          if (rowData.length > 0) {
            tableRows.push(rowData);
          }
        });
    }
  }
  return tableRows.map((row) => ({
    name: row[0],
    unit: row[1]?.toLowerCase() ?? "",
    minPrice: row[2]?.toLowerCase() ?? "",
    maxPrice: row[3]?.toLowerCase() ?? "",
    avgPrice: row[4]?.toLowerCase() ?? "",
  }));
}

async function getKalimatiPriceData(
  date: string
): Promise<Array<MarketPriceRaw["data"][string][number]>> {
  const prevDate = DateTime.fromISO(date)
    .minus({ days: 1 })
    .toFormat("yyyy-MM-dd");
  
  try {
    const [englishData, nepaliData, comparativePrices] = await Promise.all([
      parseKalimatiMarketPriceData(date, "en"),
      parseKalimatiMarketPriceData(date, "np"),
      parseComparativePriceInfo(prevDate, date),
    ]);

    const nepaliDate = convertToNepaliDate(date);
    
    let idCounter = 1;
    const merged = zip(englishData, nepaliData, comparativePrices, (a, b, c) => ({
      averageDiff: c.averageDiff,
      avgPrice: parseFloat(a.avgPrice.replace("rs", "")),
      maxPrice: parseFloat(a.maxPrice.replace("rs", "")),
      minPrice: parseFloat(a.minPrice.replace("rs", "")),
      date: date,
      id: idCounter++,
      market: 5,
      marketName: "Kalimati",
      marketNameNe: "कालिमाटी",
      productSubType: 0,
      productSubTypeName: a.name,
      productSubTypeNameNe: b.name,
      percentChange: c.difference,
      unit: b.unit,
      dateNepali: nepaliDate,
    }));
    return merged;
  } catch (error) {
    console.error('Error fetching Kalimati data:', error);
    return []; // Return empty array if Kalimati data fails
  }
}

// Nepali date conversion utility
function convertToNepaliDate(englishDate: string): string {
  try {
    // This is a basic conversion - you might want to use a proper library like 'nepali-date-converter'
    const date = new Date(englishDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Basic conversion (approximate) - install 'nepali-date-converter' for accurate conversion
    // For now, returning a placeholder format
    const nepaliYear = year + 57; // Rough conversion
    return `${nepaliYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error converting to Nepali date:', error);
    return "";
  }
}

type MarketPriceErrorResponse = {
  error: string;
  fromCache?: boolean;
  details?: string;
  targetDate?: string;
  timestamp?: string;
  kalimatiOnly?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarketPriceRaw | MarketPriceErrorResponse>
) {
  // Get parameters from query
  const { date, force = "false", cache = "true" } = req.query;
  const useCache = cache === "true";
  const forceRefresh = force === "true";

  // default current date
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
    // Check if data exists in Firebase (unless force refresh is requested)
    if (useCache && !forceRefresh) {
      const existingData = await getMarketPriceFromFirebase(targetDate);
      if (existingData) {
        console.log(`Returning cached data for ${targetDate}`);
        return res.status(200).json(existingData);
      }
    }

    let data: MarketPriceRaw;
    let externalApiSucceeded = false;

    // Try to fetch from external API
    try {
      console.log(`Attempting to fetch fresh data for ${targetDate}`);
      data = await fetchFromExternalAPI(targetDate);
      externalApiSucceeded = true;
      console.log(`External API succeeded for ${targetDate}`);
    } catch (externalError) {
      console.error("External API failed:", externalError);
      console.log("Creating fallback data structure and proceeding with Kalimati only");
      data = createFallbackMarketData(targetDate);
    }

    // Always try to get Kalimati data regardless of external API status
    console.log('Fetching Kalimati data...');
    try {
      const kalimatiData = await getKalimatiPriceData(targetDate);
      console.log(`Kalimati data count: ${kalimatiData.length}`);
      
      // Add Kalimati data
      data.data["5"] = kalimatiData;
      
      // Ensure Kalimati market info is in headers if not already present
      const kalimatiHeaderExists = data.headers.some(header => header.id === 5);
      if (!kalimatiHeaderExists) {
        console.log('Adding Kalimati to headers');
        data.headers.push({
          id: 5,
          name: "Kalimati",
          nameNe: "कालीमाटी",
          latestDate: targetDate,
          latestDateNe: convertToNepaliDate(targetDate),
        });
      } else {
        console.log('Updating Kalimati header');
        const kalimatiHeader = data.headers.find(header => header.id === 5);
        if (kalimatiHeader) {
          kalimatiHeader.latestDateNe = convertToNepaliDate(targetDate);
        }
      }
    } catch (kalimatiError) {
      console.error("Kalimati data fetch failed:", kalimatiError);
      // Continue without Kalimati data
    }

    // If we have some data (either external API or just structure), try to save it
    if (externalApiSucceeded || Object.keys(data.data).length > 0) {
      try {
        await saveMarketPriceToFirebase(targetDate, data);
        console.log(`Data saved to Firebase for ${targetDate}`);
      } catch (firebaseError) {
        console.error("Error saving to Firebase:", firebaseError);
        // Continue even if Firebase save fails
      }

      return res.status(200).json(data);
    } else {
      throw new Error("No data sources available");
    }

  } catch (error) {
    console.error("Detailed error information:");
    console.error("Error message:", error instanceof Error ? error.message : error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    console.error("Target date:", targetDate);

    // Try to return cached data if available (fallback)
    if (useCache) {
      console.log(`Attempting to return cached data as fallback for ${targetDate}`);
      const cachedData = await getMarketPriceFromFirebase(targetDate);
      if (cachedData) {
        console.log(`Returning cached data as fallback for ${targetDate}`);
        return res.status(200).json(cachedData);
      } else {
        console.log(`No cached data available for ${targetDate}`);
      }
    }

    return res.status(502).json({
      error: "Failed to fetch market price data from all sources.",
      details: error instanceof Error ? error.message : "Unknown error",
      targetDate,
      timestamp: new Date().toISOString(),
    });
  }
}
