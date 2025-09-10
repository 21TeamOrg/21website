import { motion } from "framer-motion";
export default function PlayerStats({
  stats,
}: {
  stats: { kda: string; matches: number; winrate: string };
}) {
  return (
    <motion.div className="bg-background/80 rounded-xl border-2 border-cyan-500 p-4 shadow-glow text-center">
      <h3 className="text-xl font-bold mb-2 text-cyan-500">Stats</h3>
      <div className="flex justify-center gap-6">
        <div>
          <span className="font-bold">KDA:</span> {stats.kda}
        </div>
        <div>
          <span className="font-bold">Matches:</span> {stats.matches}
        </div>
        <div>
          <span className="font-bold">Winrate:</span> {stats.winrate}
        </div>
      </div>
    </motion.div>
  );
}
