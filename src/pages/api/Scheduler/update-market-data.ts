// pages/api/scheduler/update-market-data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify this is a scheduled request (you can add authentication here)
  const authHeader = req.headers.authorization;
  const schedulerSecret = process.env.SCHEDULER_SECRET;
  
  if (schedulerSecret && authHeader !== `Bearer ${schedulerSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { daysBack = 1 } = req.body;
    const results = [];

    // Update data for the last few days
    for (let i = 0; i < daysBack; i++) {
      const targetDate = DateTime.now()
        .setZone("Asia/Kathmandu")
        .minus({ days: i + 2 }) // +2 to account for data availability delay
        .toFormat("yyyy-MM-dd");

      try {
        // Call your market data API with force refresh
        const response = await fetch(
          `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/market-data?date=${targetDate}&force=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          results.push({
            date: targetDate,
            status: "success",
            message: "Data updated successfully",
          });
        } else {
          results.push({
            date: targetDate,
            status: "error",
            message: `HTTP ${response.status}`,
          });
        }
      } catch (error) {
        results.push({
          date: targetDate,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log("Scheduled update results:", results);

    return res.status(200).json({
      message: "Scheduled update completed",
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Scheduler error:", error);
    return res.status(500).json({
      error: "Scheduler failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
