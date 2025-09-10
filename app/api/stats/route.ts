import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json({
    kda: "2.1",
    matches: 120,
    winrate: "65%",
  });
}
