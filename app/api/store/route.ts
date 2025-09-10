import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([{ name: "Team 21 Jersey", price: "$49.99" }]);
}
