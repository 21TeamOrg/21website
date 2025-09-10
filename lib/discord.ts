// lib/discord.ts

export async function getDiscordOnlineCount(
  serverId: string
): Promise<number | null> {
  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${serverId}/widget.json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.presence_count || null;
  } catch {
    return null;
  }
}
