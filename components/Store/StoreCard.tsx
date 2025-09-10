import { motion } from "framer-motion";
export default function StoreCard({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-background/80 border-2 border-green-400 rounded-xl p-4 shadow-glow"
    >
      <h4 className="text-lg font-bold text-green-400 mb-1">{name}</h4>
      <p className="text-foreground/80 text-sm">{price}</p>
    </motion.div>
  );
}
