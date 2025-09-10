import { motion } from "framer-motion";
export default function BlogCard({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-background/80 border-2 border-pink-500 rounded-xl p-4 shadow-glow"
    >
      <h4 className="text-lg font-bold text-pink-500 mb-1">{title}</h4>
      <p className="text-foreground/80 text-sm">{summary}</p>
    </motion.div>
  );
}
