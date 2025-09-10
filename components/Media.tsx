import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const twitchEmbed =
  "https://player.twitch.tv/?channel=aj7matrixlive&parent=localhost";
const youtubeEmbed = "https://www.youtube.com/embed/vNTvYQ0sfOg";

export default function Media() {
  const [gallery, setGallery] = useState<{ src: string; alt: string }[]>([]);
  // Edit functionality removed

  useEffect(() => {
    fetch("/api/media").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setGallery(data.gallery);
      }
    });
    // Edit functionality removed
  }, []);

  // Edit functionality removed

  // Edit/remove functionality removed

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden shadow-glow flex items-center justify-center bg-black/70 border-2 border-pink-500 min-h-[300px]">
          <iframe
            src={youtubeEmbed}
            width="100%"
            height="320"
            allowFullScreen
            className="w-full aspect-video rounded-xl border-2 border-pink-500"
            title="Featured Video"
          ></iframe>
        </div>
        <div className="rounded-xl overflow-hidden shadow-glow flex items-center justify-center bg-black/70 border-2 border-violet-500 min-h-[300px]">
          <iframe
            src={twitchEmbed}
            width="100%"
            height="320"
            allowFullScreen
            className="w-full aspect-video rounded-xl border-2 border-violet-500"
            title="Featured Stream"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
