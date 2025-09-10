import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabaseClient";
import { UserRole } from "@/lib/users";

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
  const { username, passwordHash, role, profile } = await req.json();
  if (!username || !passwordHash || !role || !profile) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Check if user exists
  const { data: existing, error: findError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const { error: insertError } = await supabase.from("users").insert([
    {
      username,
      password_hash: passwordHash,
      role,
      display_name: profile.displayName,
      bio: profile.bio,
      image: profile.image,
      twitter: profile.socials?.twitter,
      discord: profile.socials?.discord,
      twitch: profile.socials?.twitch,
    },
  ]);
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
