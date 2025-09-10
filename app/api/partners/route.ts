import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB/API call
  return NextResponse.json([{ name: "HyperX", logo: "/images/hyperx.png" }]);
}
