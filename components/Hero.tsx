import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { entrance, stagger } from "@/lib/motion";
import { NeonButton } from "./NeonButton";
import { ParticleCanvas } from "./ParticleCanvas";
import { Typewriter } from "react-simple-typewriter";
import { useAnimatedGradientBackground } from "@/lib/useAnimatedGradientBackground";

const Team21Logo3D = dynamic(() => import("./ThreeDBg/Team21Logo3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-slate-900/80 rounded-2xl animate-pulse" />
  ),
});

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const gradientRef = useAnimatedGradientBackground(
    ["#00fff7", "#00baff", "#ff00e0", "#00fff7", "#171717"],
    8000
  );
  return (
    <section
      id="home"
      ref={gradientRef}
      className="relative flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden text-center transition-all duration-1000"
      style={{ background: "linear-gradient(120deg, #00fff7, #00baff)" }}
    >
      {/* 3D Logo + FX */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Team21Logo3D />
        <ParticleCanvas className="absolute inset-0 w-full h-full" />
      </div>
      {/* UI Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 pt-32 pb-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-neon text-center select-none"
          variants={entrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          TEAM 21
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-body text-neon-cyan text-center max-w-2xl drop-shadow-neon"
          variants={entrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-pink bg-clip-text text-transparent animate-gradient-x">
            <Typewriter
              words={[
                "Unleash Your Game. Join the Elite.",
                "Level Up With Team 21.",
                "Compete. Connect. Conquer.",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </motion.p>
        <motion.div
          className="flex gap-4 mt-4"
          variants={entrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <NeonButton as="button">Join the Squad</NeonButton>
          <NeonButton
            as="button"
            className="bg-slate-900/80 border border-neon-cyan/40"
            onClick={() => setShowModal(true)}
          >
            Watch the Hype Reel
          </NeonButton>
        </motion.div>
      </motion.div>
      {/* Scroll Indicator Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00fff7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-neon"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
      {/* Modal video (placeholder) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="relative bg-slate-900 rounded-2xl p-4 max-w-2xl w-full shadow-neon">
            <button
              className="absolute top-2 right-2 text-neon-cyan text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
              {/* Actual project video */}
              <video
                src="/media/media1.MP4"
                autoPlay
                loop
                muted
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
