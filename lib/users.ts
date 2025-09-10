// Simple in-memory user store for demo (replace with DB in production)
export type UserRole = "owner" | "dev" | "member";
export interface User {
  username: string;
  passwordHash: string; // store hashed passwords only
  role: UserRole;
  profile: {
    displayName: string;
    bio: string;
    socials: {
      twitter?: string;
      discord?: string;
      twitch?: string;
    };
  };
}

// Example users (passwords are hashes of 'password')
export const users: User[] = [
  {
    username: "owner",
    passwordHash:
      "$2b$10$wDvrqraBAtF/9UypIJl5Gu6C30yObbnWWoKRAvUXpzVF4SjOM2z9O", // placeholder
    role: "owner",
    profile: {
      displayName: "Team Owner",
      bio: "The boss.",
      socials: {},
    },
  },
  {
    username: "dev",
    passwordHash: "$2b$10$wH6Qw1Qw1Qw1Qw1Qw1Qw1uQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Q", // placeholder
    role: "dev",
    profile: {
      displayName: "Developer",
      bio: "Site developer.",
      socials: {},
    },
  },
  // Add more members here
];
