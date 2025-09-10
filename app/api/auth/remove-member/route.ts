import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users, UserRole } from "@/lib/users";

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
  if (payload.role !== "owner" && payload.role !== "dev") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { username } = await req.json();
  const idx = users.findIndex((u) => u.username === username);
  if (idx === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  users.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
