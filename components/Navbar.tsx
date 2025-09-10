"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Media", href: "/#media" },
  { name: "Members", href: "/members" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur border-b-2 border-cyan-500 shadow-glow">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <Link
          href="/#home"
          className="font-bold text-xl tracking-wide text-cyan-400"
        >
          <img
            src="/images/logo.png"
            alt="Team 21 Logo"
            className="inline w-8 h-8 mr-2 align-middle"
          />
          TEAM 21
        </Link>
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded hover:shadow-glow"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block w-6 h-0.5 bg-cyan-400 mb-1"></span>
            <span className="block w-6 h-0.5 bg-cyan-400 mb-1"></span>
            <span className="block w-6 h-0.5 bg-cyan-400"></span>
          </button>
        </div>
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative px-2 py-1 text-cyan-200 transition hover:text-cyan-400"
              >
                <motion.span
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 8px #00fff7",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.name}
                </motion.span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-black/90 border-b-2 border-cyan-500"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block py-2 text-cyan-200 text-lg font-bold hover:text-cyan-400"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
