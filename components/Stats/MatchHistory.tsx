import { motion } from "framer-motion";
export default function MatchHistory({
  matches,
}: {
  matches: Array<{ opponent: string; result: string; date: string }>;
}) {
  return (
    <motion.div className="bg-background/80 rounded-xl border-2 border-cyan-500 p-4 shadow-glow text-center mt-4">
      <h3 className="text-xl font-bold mb-2 text-cyan-500">Match History</h3>
      <ul className="space-y-2">
        {matches.map((m, i) => (
          <li key={i} className="flex justify-between">
            <span>{m.date}</span>
            <span>{m.opponent}</span>
            <span
              className={m.result === "Win" ? "text-green-500" : "text-red-500"}
            >
              {m.result}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
