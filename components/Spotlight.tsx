import React from "react";

export const Spotlight: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`absolute pointer-events-none -z-10 w-full h-full bg-gradient-radial from-neon-cyan/40 via-transparent to-transparent blur-2xl ${
      className || ""
    }`}
  />
);
