// Central Framer Motion variants for Team 21
import { Variants } from "framer-motion";

export const entrance: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

export const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

export const magnetic: Variants = {
  rest: { scale: 1, boxShadow: "0 0 16px 4px #00fff7" },
  hover: {
    scale: 1.06,
    boxShadow: "0 0 32px 8px #00fff7",
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
  tap: { scale: 0.97, boxShadow: "0 0 24px 6px #00baff" },
};

export const tilt: Variants = {
  rest: { rotateX: 0, rotateY: 0, boxShadow: "0 0 16px 4px #00fff7" },
  hover: (custom: { x: number; y: number }) => ({
    rotateX: custom.y,
    rotateY: custom.x,
    boxShadow: "0 0 32px 8px #00fff7",
    transition: { type: "spring", stiffness: 120, damping: 12 },
  }),
};

export const reveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

export const countUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const feedback: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
};

export const loader: Variants = {
  initial: { width: 0 },
  animate: { width: "100%", transition: { duration: 1.2, ease: "easeInOut" } },
};
