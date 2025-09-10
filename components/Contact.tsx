import { motion } from "framer-motion";

const socials = [
  {
    icon: "fab fa-discord",
    href: "https://discord.gg/CNPSjuhw",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { icon: "fab fa-twitter", href: "#" },
  { icon: "fab fa-instagram", href: "#" },
  { icon: "fab fa-tiktok", href: "#" },
  { icon: "fab fa-twitch", href: "#" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-cyan-500 mb-10 text-center"
      >
        Contact
      </motion.h2>
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-background/80 rounded-xl border-2 border-cyan-500 p-8 shadow-glow flex flex-col gap-6"
      >
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-3 rounded bg-black border-2 border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-3 rounded bg-black border-2 border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="px-4 py-3 rounded bg-black border-2 border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        />
        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-cyan-500 text-white font-bold shadow-glow hover:bg-cyan-400 transition"
        >
          Send
        </button>
      </motion.form>
      <div className="flex justify-center gap-6 mt-8">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="text-3xl text-cyan-400 hover:text-pink-400 transition drop-shadow-glow"
            aria-label={s.icon}
          >
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
    </section>
  );
}
