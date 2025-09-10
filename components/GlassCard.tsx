import React from "react";

export const GlassCard: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  <div
    className={`backdrop-blur-md bg-glass-gradient border border-white/10 rounded-2xl shadow-glass p-6 ${
      className || ""
    }`}
    style={{ boxShadow: "0 0 16px 4px #00fff7, 0 0 32px 8px #00baff33" }}
  >
    {children}
  </div>
);
