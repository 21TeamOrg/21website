require("dotenv").config({ path: ".env.local" });
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const username = process.argv[2];
const newPassword = process.argv[3];

if (!username || !newPassword) {
  console.error("Usage: node reset-password.js <username> <newpassword>");
  process.exit(1);
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const password_hash = await bcrypt.hash(newPassword, 10);

  const { error } = await supabase
    .from("users")
    .update({ password_hash })
    .eq("username", username);

  if (error) {
    console.error("Error updating password:", error.message);
  } else {
    console.log("Password updated successfully for", username);
  }
}

main();
