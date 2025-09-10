import { motion } from "framer-motion";
export default function AchievementCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-background/80 border-2 border-yellow-400 rounded-xl p-4 shadow-glow"
    >
      <h4 className="text-lg font-bold text-yellow-400 mb-1">{title}</h4>
      <p className="text-foreground/80 text-sm">{desc}</p>
    </motion.div>
  );
}
