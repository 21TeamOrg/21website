import React from "react";
import { motion } from "framer-motion";
import { magnetic } from "@/lib/motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  href?: never;
};
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};
type NeonButtonProps = (ButtonProps | AnchorProps) & {
  children: React.ReactNode;
};

export const NeonButton: React.FC<NeonButtonProps> = (props) => {
  const { as = "button", children, ...rest } = props;
  if (as === "a") {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <motion.div
        variants={magnetic}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className="inline-block"
      >
        <a
          href={href}
          {...anchorProps}
          className={`relative px-6 py-3 font-display text-lg tracking-wider rounded-xl bg-neon-gradient text-white shadow-neon transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 overflow-hidden group ${
            anchorProps.className || ""
          }`}
        >
          <span className="relative z-10 drop-shadow-neon">{children}</span>
          <span className="absolute inset-0 pointer-events-none bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </a>
      </motion.div>
    );
  }
  const { ...buttonProps } = rest as ButtonProps;
  return (
    <motion.div
      variants={magnetic}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="inline-block"
    >
      <button
        {...buttonProps}
        className={`relative px-6 py-3 font-display text-lg tracking-wider rounded-xl bg-neon-gradient text-white shadow-neon transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 overflow-hidden group ${
          buttonProps.className || ""
        }`}
      >
        <span className="relative z-10 drop-shadow-neon">{children}</span>
        <span className="absolute inset-0 pointer-events-none bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      </button>
    </motion.div>
  );
};
