import { motion } from "framer-motion";
export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <div className="mb-4 animate-spin text-cyan-500 text-6xl">🎮</div>
        <h2 className="text-white text-2xl font-bold">
          Connecting to Team 21...
        </h2>
      </div>
    </motion.div>
  );
}
