import React from "react";
import { motion } from "framer-motion";
import { countUp } from "@/lib/motion";

interface StatPillProps {
  value: number;
  label: string;
  className?: string;
}

export const StatPill: React.FC<StatPillProps> = ({
  value,
  label,
  className,
}) => (
  <motion.div
    variants={countUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.7 }}
    className={`inline-flex items-center px-4 py-2 rounded-full bg-glass-gradient text-neon-cyan font-bold shadow-glass text-lg ${
      className || ""
    }`}
  >
    <span className="mr-2 text-2xl">{value}</span>
    <span className="uppercase tracking-wider text-xs">{label}</span>
  </motion.div>
);
