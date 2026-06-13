import "server-only";

import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";

export type UserRole = "user" | "admin";
export type PlanStatus = "none" | "pending" | "active";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  image?: string | null;
  role?: UserRole;
  planLabel?: string | null;
  planTab?: string | null;
  planStatus?: PlanStatus;
  planAmount?: string | null;
  planActivatedAt?: string | null;
}

const FILE = "users.json";

async function readUsers(): Promise<StoredUser[]> {
  const data = await readJsonFile<StoredUser[]>(FILE, []);
  return Array.isArray(data) ? data : [];
}

async function writeUsers(users: StoredUser[]): Promise<void> {
  await writeJsonFile(FILE, users);
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const users = await readUsers();
  return users.find((u) => u.email === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function getAllUsers(): Promise<Omit<StoredUser, "password">[]> {
  const users = await readUsers();
  return users.map(({ password: _, ...user }) => user);
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<Omit<StoredUser, "password">> {
  const users = await readUsers();
  const email = data.email.toLowerCase();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  const user: StoredUser = {
    id: randomUUID(),
    name: data.name,
    email,
    password: data.password,
    createdAt: new Date().toISOString(),
    role: adminEmail && email === adminEmail ? "admin" : "user",
    planStatus: "none",
  };

  users.push(user);
  await writeUsers(users);

  const { password: _, ...safe } = user;
  return safe;
}

export async function updateUser(
  id: string,
  patch: Partial<Omit<StoredUser, "id" | "password">>
): Promise<Omit<StoredUser, "password"> | null> {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...patch };
  await writeUsers(users);

  const { password: _, ...safe } = users[index];
  return safe;
}

export function sanitizeUser(user: StoredUser): Omit<StoredUser, "password"> {
  const { password: _, ...safe } = user;
  return safe;
}
