import React from "react";

export const HoloDivider: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={`w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-pink rounded-full shadow-neon ${
      className || ""
    }`}
  />
);
