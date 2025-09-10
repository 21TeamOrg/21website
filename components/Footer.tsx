import React, { useState, useEffect } from "react";
import { getDiscordOnlineCount } from "../lib/discord";

const socials = [
  {
    name: "Discord",
    icon: "fab fa-discord",
    href: "https://discord.gg/CNPSjuhw",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { name: "YouTube", icon: "fab fa-youtube", href: "https://www.youtube.com/@21TheTeam " },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [discordOnline, setDiscordOnline] = useState<number | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    getDiscordOnlineCount("1122339820736380978").then(setDiscordOnline);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Enter a valid email.");
      return;
    }
    setSuccess(true);
    setError("");
    setEmail("");
    // TODO: send to newsletter API
  };

  return (
    <footer className="relative bg-slate-950 py-12 px-4 border-t border-neon-cyan/20 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              className="text-neon-cyan text-2xl hover:text-neon-pink transition drop-shadow-neon"
            >
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-neon-cyan/30 text-white focus:ring-2 focus:ring-neon-cyan"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-neon-gradient text-blue-100 font-bold shadow-neon"
            >
              Subscribe
            </button>
          </form>
          {error && <div className="text-pink-400 text-sm mt-1">{error}</div>}
          {success && (
            <div className="text-neon-cyan text-sm mt-1">
              Subscribed! Check your inbox.
            </div>
          )}
        </div>
        <div className="text-slate-400 text-xs text-center md:text-right">
          <div>
            Live Discord:{" "}
            <span className="text-neon-cyan">
              ●{" "}
              {discordOnline !== null
                ? `${discordOnline} online`
                : "Trust, we got a lot"}
            </span>
          </div>
          <div className="mt-1">
            &copy; {year} Team 21. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
