import { motion } from "framer-motion";
export default function PartnerCard({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, boxShadow: "0 0 32px 8px #00fff7" }}
      className="bg-background/80 border-2 border-blue-400 rounded-xl p-4 shadow-glow flex flex-col items-center transition-transform duration-300"
    >
      <img
        src={logo}
        alt={name}
        className="w-16 h-16 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-neon"
      />
      <h4 className="text-lg font-bold text-blue-400">{name}</h4>
    </motion.div>
  );
}
