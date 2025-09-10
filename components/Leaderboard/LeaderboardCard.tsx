import { motion } from "framer-motion";
export default function LeaderboardCard({
  rank,
  name,
  points,
}: {
  rank: number;
  name: string;
  points: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-background/80 border-2 border-purple-500 rounded-xl p-4 shadow-glow flex items-center gap-4"
    >
      <span className="text-2xl font-bold text-purple-500">#{rank}</span>
      <span className="text-lg font-bold text-foreground">{name}</span>
      <span className="ml-auto text-lg text-purple-400">{points} pts</span>
    </motion.div>
  );
}
