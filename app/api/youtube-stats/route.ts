import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channelUrl = searchParams.get("url");

  if (!channelUrl) {
    return NextResponse.json({ error: "Missing channel URL" }, { status: 400 });
  }

  try {
    let channelId = null;
    let apiUrl = "";
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (channelUrl.includes("channel/")) {
      // Standard channel URL
      channelId = channelUrl.split("channel/")[1].split(/[/?]/)[0];
      apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    } else if (channelUrl.includes("/user/")) {
      // Legacy user URL
      const username = channelUrl.split("/user/")[1].split(/[/?]/)[0];
      apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${username}&key=${apiKey}`;
    } else if (channelUrl.includes("/@")) {
      // Handle URLs like /@username
      const handle = channelUrl.split("/@")[1].split(/[/?]/)[0];
      // Try to resolve handle to channelId using search
      const handleApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`;
      const handleRes = await fetch(handleApiUrl);
      const handleData = await handleRes.json();
      let found = false;
      if (handleData.items && handleData.items.length > 0) {
        for (const item of handleData.items) {
          // Try to match the handle exactly (case-insensitive)
          if (
            item.snippet &&
            item.snippet.channelTitle &&
            (item.snippet.channelTitle.toLowerCase() === handle.toLowerCase() ||
              (item.snippet.customUrl &&
                item.snippet.customUrl.toLowerCase() === handle.toLowerCase()))
          ) {
            channelId = item.id.channelId;
            found = true;
            break;
          }
        }
        // If not found by exact match, fallback to first result
        if (!found) {
          channelId = handleData.items[0].id.channelId;
        }
        apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
      } else {
        // Fallback: try forUsername endpoint
        const usernameApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${handle}&key=${apiKey}`;
        const usernameRes = await fetch(usernameApiUrl);
        const usernameData = await usernameRes.json();
        if (usernameData.items && usernameData.items.length > 0) {
          channelId = usernameData.items[0].id;
          apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        } else {
          return NextResponse.json(
            { error: "Channel not found for handle" },
            { status: 404 }
          );
        }
      }
    } else {
      return NextResponse.json(
        { error: "Invalid channel URL" },
        { status: 400 }
      );
    }

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const subs = data.items[0].statistics.subscriberCount;
    return NextResponse.json({ subs });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch YouTube stats" },
      { status: 500 }
    );
  }
}
