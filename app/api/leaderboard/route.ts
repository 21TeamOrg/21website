import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([{ rank: 1, name: "Ace", points: 1500 }]);
}
