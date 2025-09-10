import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([
    { opponent: "FaZe", result: "Win", date: "2025-08-01" },
    { opponent: "XenGaming", result: "Loss", date: "2025-07-28" },
  ]);
}
