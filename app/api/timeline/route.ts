import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([
    { year: "2025", event: "Team 21 founded and won first tournament." },
  ]);
}
