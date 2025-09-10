import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([
    {
      title: "New Roster Announced",
      summary: "Team 21 welcomes new players for the fall season.",
    },
  ]);
}
