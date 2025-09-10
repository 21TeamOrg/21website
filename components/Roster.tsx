import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Roster() {
  // Media assets to display
  const mediaAssets = [
    {
      src: "/favicon.ico",
      alt: "Favicon",
      width: 64,
      height: 64,
      label: "Favicon",
    },
    {
      src: "/images/logo.png",
      alt: "Team 21 Logo",
      width: 200,
      height: 200,
      label: "Logo",
    },
    {
      src: "/images/banner.png",
      alt: "Team 21 Banner",
      width: 600,
      height: 120,
      label: "Banner",
    },
  ];

  return (
    <section id="media" className="pt-8 pb-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-cyan-500">
        Media
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {mediaAssets.map((asset) => (
          <div key={asset.alt} className="flex flex-col items-center">
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="rounded-xl object-contain bg-black/80 border-2 border-cyan-400 mb-2"
            />
            <span className="text-cyan-300 font-semibold text-lg text-center">
              {asset.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
