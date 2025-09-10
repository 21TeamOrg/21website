import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  // Query Supabase users table for username
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .limit(1);
  if (error || !users || users.length === 0) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const user = users[0];
  // Debug logging
  console.log("LOGIN DEBUG:", {
    username,
    password,
    password_hash: user.password_hash,
  });
  const valid = await bcrypt.compare(password, user.password_hash);
  console.log("Password comparison result:", valid);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  // Issue JWT
  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });
  return res;
}
