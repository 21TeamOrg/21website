import { motion } from "framer-motion";

export default function Partners() {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border-4 border-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-black/80 p-12 text-center shadow-glow animate-pulse"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Merch Store & Partnerships
        </h2>
        <p className="text-lg text-foreground/80">Coming Soon</p>
      </motion.div>
    </section>
  );
}
