"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FaYoutube } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MemberCard } from "@/components/MemberCard";
import { GlassCard } from "@/components/GlassCard";
import { HoloDivider } from "@/components/HoloDivider";
import useConfetti from "@/lib/useConfetti";

// ...existing code...

// Define a Member type for better type safety
interface Member {
  username: string;
  display_name?: string;
  role?: string;
  stats?: {
    memberSince?: string;
    videosEdited?: number;
  };
  // Add more fields as needed, but avoid using 'any'.
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [sortRole, setSortRole] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);
  const confetti = useConfetti(!!expanded);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/auth/all-users");
        if (res.ok) {
          const data = await res.json();
          setMembers(data.users || []);
        }
      } catch (err) {
        setMembers([]);
      }
    }
    fetchMembers();
  }, []);

  // Roles for filtering
  const roles = useMemo(
    () =>
      Array.from(
        new Set(
          members.flatMap((m) =>
            typeof m.role === "string"
              ? m.role.split(",").map((r: string) => r.trim())
              : []
          )
        )
      ).filter(Boolean),
    [members]
  );

  // Featured members (admins, owners, etc.)
  const featuredMembers = useMemo(
    () => members.filter((m) => m.role && m.role.match(/owner|admin|founder/i)),
    [members]
  );

  // Filter, search, and sort
  const processedMembers = useMemo(() => {
    let arr = [...members];
    if (sortRole) {
      arr = arr.filter((m) =>
        (typeof m.role === "string"
          ? m.role.split(",").map((r: string) => r.trim())
          : []
        ).includes(sortRole)
      );
    }
    if (search) {
      arr = arr.filter((m) =>
        (m.display_name || m.username || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
    arr = arr.sort((a: Member, b: Member) => {
      let vA: string | number, vB: string | number;
      if (sortBy === "name") {
        vA = (a.display_name || a.username || "").toLowerCase();
        vB = (b.display_name || b.username || "").toLowerCase();
      } else if (sortBy === "date") {
        vA = a.stats?.memberSince || "";
        vB = b.stats?.memberSince || "";
      } else if (sortBy === "activity") {
        vA = a.stats?.videosEdited || 0;
        vB = b.stats?.videosEdited || 0;
      } else {
        vA = vB = 0;
      }
      if (vA < vB) return sortDir === "asc" ? -1 : 1;
      if (vA > vB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [members, sortRole, search, sortBy, sortDir]);

  // Pagination
  const totalPages = Math.ceil(processedMembers.length / pageSize);
  const pagedMembers = useMemo(
    () => processedMembers.slice((page - 1) * pageSize, page * pageSize),
    [processedMembers, page, pageSize]
  );

  return (
    <>
      <Navbar />
      <Hero />
      {confetti}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <GlassCard className="mb-8 shadow-2xl bg-gradient-to-br from-slate-900/80 to-black/80">
          <h1 className="text-5xl font-extrabold mb-4 text-center text-cyan-300 drop-shadow-neon tracking-wide font-display">
            Meet the Team
          </h1>
          <p className="text-center text-lg text-cyan-100/80 mb-6 max-w-2xl mx-auto">
            The best creators, editors, and gamers. Connect, compete, and level
            up with Team 21.
          </p>
          <HoloDivider className="my-6" />
          {/* Search, filter, sort, view toggle */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search members..."
                className="bg-slate-800 border border-cyan-700 text-cyan-200 rounded px-3 py-1 focus:ring-2 focus:ring-cyan-400"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <label className="text-cyan-200 font-semibold ml-2">Role:</label>
              <select
                className="bg-slate-800 border border-cyan-700 text-cyan-200 rounded px-3 py-1 focus:ring-2 focus:ring-cyan-400"
                value={sortRole}
                onChange={(e) => {
                  setSortRole(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-cyan-200 font-semibold">Sort by:</label>
              <select
                className="bg-slate-800 border border-cyan-700 text-cyan-200 rounded px-3 py-1 focus:ring-2 focus:ring-cyan-400"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="date">Join Date</option>
                <option value="activity">Activity</option>
              </select>
              <button
                className="ml-1 px-2 py-1 rounded bg-cyan-800 text-cyan-100 hover:bg-cyan-600"
                onClick={() =>
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                }
                title={sortDir === "asc" ? "Ascending" : "Descending"}
              >
                {sortDir === "asc" ? "↑" : "↓"}
              </button>
              <button
                className={`ml-4 px-3 py-1 rounded ${
                  view === "grid"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-cyan-200"
                }`}
                onClick={() => setView("grid")}
                title="Grid view"
              >
                Grid
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  view === "list"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-cyan-200"
                }`}
                onClick={() => setView("list")}
                title="List view"
              >
                List
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Featured Members */}
        {featuredMembers.length > 0 && (
          <GlassCard className="mb-10 bg-gradient-to-br from-yellow-900/60 to-yellow-700/40 border-yellow-400/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center drop-shadow-neon">
              Featured Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredMembers.map((member) => (
                <MemberCard
                  key={member.username}
                  member={member}
                  expanded={expanded === member.username}
                  onExpand={() =>
                    setExpanded(
                      expanded === member.username ? null : member.username
                    )
                  }
                  onClose={() => setExpanded(null)}
                />
              ))}
            </div>
          </GlassCard>
        )}

        <HoloDivider className="my-8" />

        {/* Members List/Grid */}
        {processedMembers.length === 0 ? (
          <GlassCard className="text-center text-slate-400">
            No members found.
          </GlassCard>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
                : "flex flex-col gap-6"
            }
          >
            {pagedMembers.map((member) => (
              <MemberCard
                key={member.username}
                member={member}
                expanded={expanded === member.username}
                onExpand={() =>
                  setExpanded(
                    expanded === member.username ? null : member.username
                  )
                }
                onClose={() => setExpanded(null)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-slate-800 text-cyan-200 border border-cyan-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-cyan-300 font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-slate-800 text-cyan-200 border border-cyan-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
