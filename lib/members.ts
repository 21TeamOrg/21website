// Fetches all users from the API
export async function getAllMembers() {
  const res = await fetch("/api/auth/all-users", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.users || [];
}
