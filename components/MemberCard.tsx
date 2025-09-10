import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaDiscord, FaYoutube, FaLink } from "react-icons/fa";
import { YouTubeStats } from "./YouTubeStats";

interface Member {
  username: string;
  display_name?: string;
  image?: string;
  role?: string;
  tagline?: string;
  twitter?: string;
  discord?: string;
  youtube?: string;
  linktree?: string;
  bio?: string;
  stats?: {
    videosEdited?: number;
    memberSince?: string;
    favoriteGame?: string;
    tourneysWon?: number;
  };
  achievements?: string[];
}

interface MemberCardProps {
  member: Member;
  expanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const roleIcons: Record<string, string> = {
  dev: "🖥️",
  editor: "🎬",
  owner: "👑",
  // Add more as needed
};

const badgeGradients: Record<string, string> = {
  dev: "from-cyan-500 to-blue-500",
  editor: "from-pink-500 to-purple-500",
  owner: "from-yellow-400 to-orange-500",
};

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  expanded,
  onExpand,
  onClose,
}) => {
  const roles = (
    typeof member.role === "string"
      ? member.role.split(",").map((r) => r.trim())
      : []
  ).filter(Boolean);
  return (
    <motion.div
      className="relative rounded-3xl border-2 border-cyan-700 shadow-2xl flex flex-col items-center p-6 min-h-[420px] bg-gradient-to-br from-slate-900/80 to-black/80 backdrop-blur-md transition-transform hover:scale-105 cursor-pointer group overflow-visible"
      whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px #00fff7" }}
      onClick={onExpand}
      style={{
        background: "rgba(20,30,40,0.7)",
        boxShadow: expanded ? "0 0 32px 8px #00fff7" : undefined,
      }}
    >
      <motion.div
        className="w-28 h-28 rounded-full mb-4 border-4 border-cyan-400 object-cover shadow-lg relative overflow-hidden"
        whileHover={{ rotate: 6, boxShadow: "0 0 32px 8px #00fff7" }}
        style={{
          boxShadow: "0 0 16px 4px #00fff7, 0 0 0 8px rgba(0,255,247,0.1)",
        }}
      >
        <img
          src={member.image || "/avatars/default.png"}
          alt={member.display_name || member.username}
          className="w-full h-full object-cover rounded-full animate-glow"
          onError={(e) => (e.currentTarget.src = "/avatars/default.png")}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-pulse pointer-events-none"
          animate={{ opacity: [0.7, 0.2, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
      <h2 className="text-2xl font-extrabold text-cyan-200 mb-1 text-center tracking-wide drop-shadow-lg">
        {member.display_name || member.username}
      </h2>
      {member.tagline && (
        <div className="text-cyan-300 text-sm mb-2 text-center opacity-80">
          {member.tagline}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        {roles.map((role, idx) => (
          <motion.span
            key={role + idx}
            className={`px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow bg-gradient-to-r ${
              badgeGradients[role] || "from-cyan-800 to-cyan-600"
            } text-white flex items-center gap-1`}
            whileHover={{ scale: 1.1, boxShadow: "0 0 8px 2px #00fff7" }}
          >
            <span>{roleIcons[role] || ""}</span>
            {role}
          </motion.span>
        ))}
      </div>
      {/* Social Links - always visible */}
      <div className="flex gap-4 justify-center mb-3">
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="text-cyan-300 hover:text-cyan-100 text-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTwitter />
          </a>
        )}
        {member.discord && (
          <a
            href={member.discord}
            target="_blank"
            rel="noopener noreferrer"
            title="Discord"
            className="text-cyan-300 hover:text-cyan-100 text-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaDiscord />
          </a>
        )}
        {member.linktree && (
          <a
            href={member.linktree}
            target="_blank"
            rel="noopener noreferrer"
            title="Linktree"
            className="text-cyan-300 hover:text-cyan-100 text-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaLink />
          </a>
        )}
        {member.youtube && (
          <a
            href={member.youtube}
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="text-red-500 hover:text-red-300 text-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaYoutube />
          </a>
        )}
      </div>
      {/* Quick Stats - always visible */}
      <div className="flex flex-wrap gap-3 mb-3 justify-center min-h-[28px]">
        {member.stats?.videosEdited && (
          <span className="bg-cyan-900/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow flex items-center gap-1">
            🎬 {member.stats.videosEdited}+ Videos Edited
          </span>
        )}
        {member.stats?.favoriteGame && (
          <span className="bg-cyan-900/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow flex items-center gap-1">
            🎮 {member.stats.favoriteGame}
          </span>
        )}
        {member.stats?.tourneysWon && (
          <span className="bg-yellow-900/70 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-400 shadow flex items-center gap-1">
            🏆 {member.stats.tourneysWon} Tourney
            {member.stats.tourneysWon > 1 ? "s" : ""} Won
          </span>
        )}
        {/* If no other stats, always show member since */}
        {!member.stats?.videosEdited &&
          !member.stats?.favoriteGame &&
          !member.stats?.tourneysWon && (
            <span className="bg-slate-800/80 text-slate-400 px-3 py-1 rounded-full text-xs font-semibold border border-slate-600 shadow flex items-center gap-1">
              📅 Since {member.stats?.memberSince || "Unknown"}
            </span>
          )}
      </div>
      {/* Expanded details */}
      {expanded && (
        <motion.div
          className="absolute left-0 top-0 w-full h-full bg-black/90 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 z-10 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className="absolute top-3 right-3 text-cyan-400 text-xl font-bold bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-3xl font-extrabold text-cyan-200 mb-1 text-center tracking-wide drop-shadow-lg">
            {member.display_name || member.username}
          </h2>
          {member.tagline && (
            <div className="text-cyan-300 text-base mb-2 text-center opacity-80">
              {member.tagline}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {roles.map((role, idx) => (
              <motion.span
                key={role + idx}
                className={`px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow bg-gradient-to-r ${
                  badgeGradients[role] || "from-cyan-800 to-cyan-600"
                } text-white flex items-center gap-1`}
                whileHover={{ scale: 1.1, boxShadow: "0 0 8px 2px #00fff7" }}
              >
                <span>{roleIcons[role] || ""}</span>
                {role}
              </motion.span>
            ))}
          </div>
          {/* Show all quick stats, always, in expanded view */}
          <div className="flex flex-wrap gap-3 mb-4 justify-center">
            <span className="bg-cyan-900/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow flex items-center gap-1">
              📅 Since {member.stats?.memberSince || "Unknown"}
            </span>
            {member.stats?.favoriteGame && (
              <span className="bg-cyan-900/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow flex items-center gap-1">
                🎮 {member.stats.favoriteGame}
              </span>
            )}
            {member.stats?.videosEdited && (
              <span className="bg-cyan-900/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow flex items-center gap-1">
                🎬 {member.stats.videosEdited}+ Videos Edited
              </span>
            )}
            {member.stats?.tourneysWon && (
              <span className="bg-yellow-900/70 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-400 shadow flex items-center gap-1">
                🏆 {member.stats.tourneysWon} Tourney
                {member.stats.tourneysWon > 1 ? "s" : ""} Won
              </span>
            )}
          </div>
          {member.bio && (
            <p className="text-slate-300 text-base mt-2 text-center max-w-xs mb-2">
              {member.bio}
            </p>
          )}
          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {member.achievements.map((ach, idx) => (
                <span
                  key={ach + idx}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                >
                  {ach}
                </span>
              ))}
            </div>
          )}
          {/* YouTube Subs Stat Card */}
          {member.youtube && (
            <div className="w-full max-w-xs mx-auto mt-2 mb-4">
              <div className="bg-gradient-to-br from-red-600/80 to-red-900/80 rounded-2xl p-4 flex flex-col items-center glassmorphism shadow-lg border border-red-400">
                <FaYoutube className="text-3xl text-white mb-1" />
                <span className="text-white text-2xl font-extrabold mb-1">
                  Subscribers
                </span>
                {/* Live YouTube subscriber count */}
                {member.youtube && <YouTubeStats channelUrl={member.youtube} />}
              </div>
            </div>
          )}
          {/* CTA Button */}
          <a
            href={member.youtube || member.twitter || member.linktree || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-lg hover:scale-105 hover:from-blue-400 hover:to-cyan-600 transition-all text-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {member.youtube
              ? "Watch Latest Video"
              : member.twitter
              ? "Follow on Twitter"
              : "Learn More"}
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};
