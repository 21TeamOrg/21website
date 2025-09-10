import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([
    { title: "Major Champions", desc: "Won the 2025 Spring Major." },
  ]);
}
