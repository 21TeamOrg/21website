import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stagger, entrance } from "@/lib/motion";
import { Parallax } from "react-scroll-parallax";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-white drop-shadow-lg"
  >
    <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.4)" />
    <polygon points="10,8 17,12 10,16" fill="white" />
  </svg>
);

const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={false}
    className={`absolute top-1/2 z-10 -translate-y-1/2 ${
      direction === "left" ? "left-2" : "right-2"
    } bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg transition`}
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);

export const MediaPreview: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<
    { src: string; thumb?: string }[]
  >([]);
  const [lightbox, setLightbox] = useState<null | {
    src: string;
    type: string;
  }>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery && data.gallery.length > 0) {
          setMediaItems(data.gallery);
        } else {
          setMediaItems([
            { src: "/media/media1.MP4", thumb: "/media/media1.png" },
            { src: "/media/media2.MP4", thumb: "/media/media2.png" },
            { src: "/media/media3.MP4", thumb: "/media/media3.png" },
            { src: "/media/media4.MP4", thumb: "/media/media4.png" },
            { src: "/media/media5.MP4", thumb: "/media/media5.png" },
            { src: "/media/media6.MP4", thumb: "/media/media6.png" },
            { src: "/media/media7.MP4", thumb: "/media/media7.png" },
          ]);
        }
      });
  }, []);

  // Carousel logic
  const showCount = mediaItems.length > 4 ? 3 : 1;
  const maxIndex = Math.max(0, mediaItems.length - showCount);

  // Looping carousel
  const handlePrev = () => {
    setCurrent((c) => (c === 0 ? maxIndex : c - 1));
  };
  const handleNext = () => {
    setCurrent((c) => (c === maxIndex ? 0 : c + 1));
  };

  useEffect(() => {
    setCurrent(0);
  }, [mediaItems.length]);

  // For looping, slice visible items with wrap-around
  const visibleItems: { src: string; thumb?: string }[] = [];
  if (mediaItems.length > 0) {
    for (let i = 0; i < showCount; i++) {
      visibleItems.push(mediaItems[(current + i) % mediaItems.length]);
    }
  }

  return (
    <section
      id="media"
      className="relative py-24 bg-gradient-to-b from-slate-950 via-black to-slate-900 overflow-hidden"
    >
      <Parallax speed={-10}>
        <motion.div
          className="max-w-6xl mx-auto flex flex-col items-center gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-center text-neon-cyan mb-8 drop-shadow-neon"
            variants={entrance}
          >
            Hype Reel & Clips
          </motion.h2>
          <div className="relative w-full flex items-center justify-center">
            <ArrowButton
              direction="left"
              onClick={handlePrev}
              disabled={false}
            />
            <div className="flex gap-6 w-full justify-center overflow-hidden">
              {visibleItems.map((item, i) => {
                const isVideo = item.src.toLowerCase().endsWith(".mp4");
                return (
                  <div
                    key={current + i}
                    className="relative flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden cursor-pointer group transition-transform duration-300"
                    onClick={() =>
                      setLightbox({
                        src: item.src,
                        type: isVideo ? "video" : "image",
                      })
                    }
                    style={{ minWidth: 320, minHeight: 180 }}
                  >
                    {isVideo ? (
                      <img
                        src={item.thumb || "/media/media1.png"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-hover:shadow-neon"
                      />
                    ) : null}
                    {/* Overlay with play icon only */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      {isVideo && <PlayIcon />}
                    </div>
                  </div>
                );
              })}
            </div>
            <ArrowButton
              direction="right"
              onClick={handleNext}
              disabled={false}
            />
          </div>
        </motion.div>
      </Parallax>
      {/* Lightbox modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="relative bg-slate-900 rounded-2xl p-4 max-w-3xl w-full shadow-neon">
            <button
              className="absolute top-2 right-2 text-neon-cyan text-2xl"
              onClick={() => setLightbox(null)}
            >
              &times;
            </button>
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
              {lightbox.type === "image" ? (
                <img
                  src={lightbox.src}
                  alt="Media"
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={lightbox.src}
                  autoPlay
                  loop
                  muted
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
