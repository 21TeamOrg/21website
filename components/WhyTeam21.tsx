import React from "react";
import { TiltCard } from "./TiltCard";
import { GlassCard } from "./GlassCard";
import { motion } from "framer-motion";
import { stagger, entrance } from "@/lib/motion";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import communityAnimation from "../public/icons/community.json";
import competitiveAnimation from "../public/icons/competitive.json";
import futureAnimation from "../public/icons/future.json";

const pillars = [
  {
    title: "Community First",
    desc: "A welcoming, supportive squad. 500+ members strong.",
    animation: communityAnimation,
    stat: 500,
    statLabel: "Members",
  },
  {
    title: "Competitive Spirit",
    desc: "Top 1% finishes, relentless drive, always leveling up.",
    animation: competitiveAnimation,
    stat: 1,
    statLabel: "Top %",
  },
  {
    title: "Future Ready",
    desc: "Cutting-edge tech, events, and a vision for tomorrow.",
    animation: futureAnimation,
    stat: 2025,
    statLabel: "Next Gen",
  },
];

export const WhyTeam21: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Parallax R3F background plane (placeholder) */}
      <div className="absolute inset-0 -z-10">
        {/* TODO: Replace with R3F shader gridlines */}
        <div className="w-full h-full bg-gradient-to-br from-neon-cyan/10 to-neon-blue/5" />
      </div>
      <motion.div
        className="max-w-5xl mx-auto flex flex-col items-center gap-12"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center text-neon-cyan mb-8 drop-shadow-neon"
          variants={entrance}
        >
          Why Team 21?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {pillars.map((pillar, i) => (
            <TiltCard key={pillar.title} className="transition-transform">
              <GlassCard className="flex flex-col items-center gap-4 p-8 group hover:shadow-neon">
                {/* Lottie icon */}
                <div className="w-20 h-20 mb-2 flex items-center justify-center">
                  <Lottie
                    animationData={pillar.animation}
                    loop
                    className="w-full h-full object-contain"
                    aria-label={pillar.title}
                  />
                </div>
                <h3 className="text-2xl font-bold text-neon-cyan mb-1 text-center">
                  {pillar.title}
                </h3>
                <p className="text-slate-200 text-center mb-2">{pillar.desc}</p>
                <div className="flex justify-center mt-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-glass-gradient text-neon-cyan font-bold shadow-glass text-lg">
                    <CountUp
                      end={pillar.stat}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className="ml-2 text-xs uppercase">
                      {pillar.statLabel}
                    </span>
                  </span>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
