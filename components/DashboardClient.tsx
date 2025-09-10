"use client";
import React, { useState, useEffect } from "react";
import { User, UserRole } from "@/lib/users";

export default function DashboardClient({ user }: { user: User }) {
  // Remove a role and update users with that role to 'member'
  function handleRemoveRole(roleName: string) {
    setRoles(roles.filter((r) => r.name !== roleName));
    setUsers((users) =>
      users.map((u) => (u.role === roleName ? { ...u, role: "member" } : u))
    );
  }
  // Role management state
  const [roles, setRoles] = useState([
    { name: "owner", perms: ["all"] },
    { name: "dev", perms: ["add", "remove", "edit", "media"] },
    { name: "member", perms: [] },
  ]);
  const [newRole, setNewRole] = useState({ name: "", perms: [] as string[] });
  const permissions = [
    { key: "add", label: "Can Add Member" },
    { key: "remove", label: "Can Remove Member" },
    { key: "edit", label: "Can Edit Member" },
    { key: "all", label: "All Permissions" },
  ];
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/auth/all-users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchUsers();
  }, []);
  // Handler stubs to fix reference errors
  function handleAssignRole(username: string, role: string) {
    // TODO: Implement role assignment logic
  }

  function handleRemoveMember(username: string) {
    // TODO: Implement member removal logic
  }

  async function handleAddMember() {
    setError("");
    if (!newMember.username || !newMember.password) {
      setError("Username and password are required.");
      return;
    }
    try {
      // You may need to import hashPassword from your lib if used
      const passwordHash = newMember.password; // Replace with hashPassword(newMember.password) if needed
      const profile = {
        displayName: newMember.displayName,
        bio: newMember.bio,
        // image: newMember.image, // removed, not part of User profile type
        socials: {
          twitter: newMember.twitter,
          discord: newMember.discord,
          twitch: newMember.twitch,
        },
      };
      const res = await fetch("/api/auth/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newMember.username,
          passwordHash,
          role: newMember.role,
          profile,
        }),
      });
      if (res.ok) {
        setNewMember({
          username: "",
          password: "",
          role: "member",
          displayName: "",
          bio: "",
          // image: "", // removed, not part of User profile type
          twitter: "",
          discord: "",
          twitch: "",
        });
        // Refresh users list
        const usersRes = await fetch("/api/auth/all-users");
        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsers(data.users || []);
        }
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add member.");
      }
    } catch (err) {
      setError("Error adding member.");
    }
  }

  function handleProfileChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setProfile((prev: User["profile"]) => {
      if (["twitter", "discord", "twitch"].includes(name)) {
        return {
          ...prev,
          socials: {
            ...prev.socials,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSave() {
    // TODO: Implement save logic
  }
  // Example placeholder state (replace with your actual logic)
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<User["profile"]>({
    displayName: "",
    bio: "",
    socials: {},
  });
  const [newMember, setNewMember] = useState<{
    username: string;
    password: string;
    role: UserRole;
    displayName: string;
    bio: string;
    twitter?: string;
    discord?: string;
    twitch?: string;
  }>({
    username: "",
    password: "",
    role: "member",
    displayName: "",
    bio: "",
    twitter: "",
    discord: "",
    twitch: "",
  });
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState(false);

  // Owner/dev view
  if (["owner", "dev"].includes(user?.role as string)) {
    // Add new role UI
    const handleAddRole = () => {
      if (!newRole.name.trim()) return;
      if (roles.some((r) => r.name === newRole.name.trim())) return;
      setRoles([...roles, { name: newRole.name.trim(), perms: newRole.perms }]);
      setNewRole({ name: "", perms: [] });
    };
    const handlePermChange = (perm: string) => {
      setNewRole((prev) => {
        if (prev.perms.includes(perm)) {
          return { ...prev, perms: prev.perms.filter((p) => p !== perm) };
        } else {
          return { ...prev, perms: [...prev.perms, perm] };
        }
      });
    };
    // Render the clean admin dashboard UI
    return (
      <div className="max-w-5xl mx-auto py-12 space-y-8">
        {/* Discord Section */}
        <div className="flex items-center bg-slate-900 rounded-xl p-4 mb-8 border border-cyan-700">
          <h2 className="text-xl font-bold text-cyan-200 mr-4">
            Join our Discord
          </h2>
          <a
            href="https://discord.gg/CNPSjuhw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 text-lg"
          >
            https://discord.gg/CNPSjuhw
          </a>
        </div>
        <h1 className="text-4xl font-extrabold mb-2 text-cyan-300 tracking-tight">
          Admin Dashboard
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Role Card */}
          <div className="bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-800 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-cyan-200 mb-2">
              Create New Role
            </h2>
            <div className="flex flex-wrap gap-2 items-center">
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
              />
              <div className="flex flex-wrap gap-2">
                {permissions.map((perm) => (
                  <label
                    key={perm.key}
                    className="flex items-center gap-1 text-xs text-white bg-slate-800 px-2 py-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={newRole.perms.includes(perm.key)}
                      onChange={() => handlePermChange(perm.key)}
                      className="accent-cyan-500"
                    />
                    {perm.label}
                  </label>
                ))}
              </div>
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:from-cyan-600 hover:to-blue-600 transition"
                onClick={handleAddRole}
              >
                Add Role
              </button>
            </div>
            <div className="flex flex-wrap gap-2 items-center mt-2">
              <span className="text-xs text-slate-400">Roles:</span>
              {roles.map((r) => (
                <span
                  key={r.name}
                  className="inline-flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs text-white"
                >
                  {r.name}
                  {!["owner", "dev", "member"].includes(r.name) && (
                    <button
                      className="text-red-400 hover:text-red-600 ml-1"
                      title="Remove role"
                      onClick={() => handleRemoveRole(r.name)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
          {/* Add Member Card */}
          <div className="bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-800 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-cyan-200 mb-2">Add Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Username"
                value={newMember.username}
                onChange={(e) =>
                  setNewMember({ ...newMember, username: e.target.value })
                }
              />
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Password"
                type="password"
                value={newMember.password}
                onChange={(e) =>
                  setNewMember({ ...newMember, password: e.target.value })
                }
              />
              <select
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    role: e.target.value as UserRole,
                  })
                }
              >
                {roles.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Display Name"
                value={newMember.displayName}
                onChange={(e) =>
                  setNewMember({ ...newMember, displayName: e.target.value })
                }
              />
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Bio"
                value={newMember.bio}
                onChange={(e) =>
                  setNewMember({ ...newMember, bio: e.target.value })
                }
              />
              {/* Image field removed: not part of User profile type */}
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Twitter"
                value={newMember.twitter}
                onChange={(e) =>
                  setNewMember({ ...newMember, twitter: e.target.value })
                }
              />
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Discord"
                value={newMember.discord}
                onChange={(e) =>
                  setNewMember({ ...newMember, discord: e.target.value })
                }
              />
              <input
                className="border border-cyan-700 bg-slate-800 text-white rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                placeholder="Twitch"
                value={newMember.twitch}
                onChange={(e) =>
                  setNewMember({ ...newMember, twitch: e.target.value })
                }
              />
            </div>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded shadow hover:from-cyan-600 hover:to-blue-600 transition w-fit"
              onClick={handleAddMember}
              type="button"
            >
              Add
            </button>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>
        </div>
        {/* Members Table Card */}
        <div className="bg-slate-900 rounded-2xl shadow-lg p-6 border border-slate-800 mt-8">
          <h2 className="text-xl font-bold text-cyan-200 mb-4">All Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 rounded-xl shadow bg-slate-900">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white rounded-t-xl">
                  <th className="p-3 rounded-tl-xl">Username</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Display Name</th>
                  <th className="p-3">Bio</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Twitter</th>
                  <th className="p-3">Discord</th>
                  <th className="p-3">Twitch</th>
                  <th className="p-3 rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.username}
                    className={
                      "bg-slate-800 hover:bg-slate-700 transition rounded-xl " +
                      (idx % 2 === 0 ? "" : "bg-slate-900")
                    }
                  >
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-28 focus:ring-2 focus:ring-cyan-500"
                        value={u.username}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = { ...u, username: e.target.value };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 focus:ring-2 focus:ring-cyan-500"
                        value={u.role}
                        onChange={(e) =>
                          handleAssignRole(u.username, e.target.value)
                        }
                      >
                        {roles.map((r) => (
                          <option key={r.name} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-28 focus:ring-2 focus:ring-cyan-500"
                        value={u.profile.displayName || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = {
                            ...u,
                            profile: {
                              ...u.profile,
                              displayName: e.target.value,
                            },
                          };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-32 focus:ring-2 focus:ring-cyan-500"
                        value={u.profile.bio || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = {
                            ...u,
                            profile: { ...u.profile, bio: e.target.value },
                          };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2">
                      {/* Image field removed: not part of User profile type */}
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-24 focus:ring-2 focus:ring-cyan-500"
                        value={u.profile.socials?.twitter || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = {
                            ...u,
                            profile: {
                              ...u.profile,
                              socials: {
                                ...u.profile.socials,
                                twitter: e.target.value,
                              },
                            },
                          };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-24 focus:ring-2 focus:ring-cyan-500"
                        value={u.profile.socials?.discord || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = {
                            ...u,
                            profile: {
                              ...u.profile,
                              socials: {
                                ...u.profile.socials,
                                discord: e.target.value,
                              },
                            },
                          };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border border-cyan-700 bg-slate-900 text-white rounded px-2 py-1 w-24 focus:ring-2 focus:ring-cyan-500"
                        value={u.profile.socials?.twitch || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[idx] = {
                            ...u,
                            profile: {
                              ...u.profile,
                              socials: {
                                ...u.profile.socials,
                                twitch: e.target.value,
                              },
                            },
                          };
                          setUsers(updated);
                        }}
                      />
                    </td>
                    <td className="p-2 flex flex-col gap-2 min-w-[80px]">
                      <button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded shadow hover:from-cyan-600 hover:to-blue-600 transition mb-1"
                        onClick={async () => {
                          const res = await fetch("/api/auth/update-profile", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              username: u.username,
                              profile: u.profile,
                            }),
                          });
                          if (res.ok) {
                            /* Optionally show a success message */
                          }
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-400 hover:text-red-600 underline"
                        onClick={() => handleRemoveMember(u.username)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  // Optionally, render a fallback for non-owner/dev users
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-cyan-300 mb-4">Dashboard</h1>
      <p className="text-slate-400">
        You do not have permission to view the admin dashboard.
      </p>
    </div>
  );
}
