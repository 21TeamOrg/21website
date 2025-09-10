"use client";
import { JoinTheSquad } from "../components/JoinTheSquad";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import About from "../components/About";
import Roster from "../components/Roster";
import Media from "../components/Media";
import Partners from "../components/Partners";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
// import { RosterPreview } from "../components/RosterPreview";
import { MediaPreview } from "../components/MediaPreview";

export default function Home() {
  return (
    <div className="font-sans bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col gap-0">
        <Hero />
        <About />
        {/* <RosterPreview /> */}
        <MediaPreview />
        <JoinTheSquad />
        <Roster />
        <Media />
        <Partners />
        <Contact />
      </main>
      <div className="flex justify-center my-8">
        <a
          href="https://discord.gg/CNPSjuhw"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-600 transition text-lg flex items-center gap-2"
        >
          <i className="fab fa-discord text-2xl"></i>
          Join our Discord
        </a>
      </div>
      <Footer />
    </div>
  );
}
