import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "@/lib/users";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      username: string;
      role: string;
    };
    const user = users.find((u) => u.username === payload.username);
    if (!user) return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({
      user: { username: user.username, role: user.role, profile: user.profile },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
