import { motion } from "framer-motion";

export default function PartnersStore() {
  return (
    <section id="partners" className="py-20 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-xl bg-background/80 border border-foreground/10 p-10 shadow-glow"
      >
        <h2 className="text-3xl font-bold mb-4 text-cyan-500">
          Partners & Store
        </h2>
        <p className="text-lg text-foreground/80">Coming Soon</p>
      </motion.div>
    </section>
  );
}
