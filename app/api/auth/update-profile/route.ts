import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users, User, UserRole } from "@/lib/users";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  interface JwtPayload {
    username: string;
    role: UserRole;
  }
  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { username, profile } = await req.json();
  // Only owner/dev can update anyone, others only themselves
  if (
    payload.role !== "owner" &&
    payload.role !== "dev" &&
    payload.username !== username
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const user = users.find((u) => u.username === username);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  user.profile = { ...user.profile, ...profile };
  return NextResponse.json({ ok: true, profile: user.profile });
}
