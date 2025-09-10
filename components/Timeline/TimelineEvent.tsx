import { motion } from "framer-motion";
export default function TimelineEvent({
  year,
  event,
}: {
  year: string;
  event: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-background/80 border-2 border-cyan-500 rounded-xl p-4 shadow-glow flex gap-4 items-center"
    >
      <span className="text-lg font-bold text-cyan-500">{year}</span>
      <span className="text-foreground/80">{event}</span>
    </motion.div>
  );
}
