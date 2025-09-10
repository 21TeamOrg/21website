import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

export function YouTubeStats({ channelUrl }: { channelUrl: string }) {
  const [subs, setSubs] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch(
          `/api/youtube-stats?url=${encodeURIComponent(channelUrl)}`
        );
        const data = await res.json();
        if (res.ok) {
          setSubs(Number(data.subs));
        } else {
          setSubs(null);
        }
      } catch {
        setSubs(null);
      }
    }
    fetchSubs();
  }, [channelUrl]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <FaYoutube className="text-white text-2xl" title="YouTube" />
      <span className="text-white font-semibold text-lg">
        {subs !== null ? `${subs.toLocaleString()} subscribers` : "..."}
      </span>
    </div>
  );
}
