import "server-only";

import { auth } from "@/auth";
import { findUserByEmail } from "@/lib/users-store";

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session.user;
}

export async function isAdminEmail(email: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (adminEmail && email.toLowerCase() === adminEmail) return true;

  const user = await findUserByEmail(email);
  return user?.role === "admin";
}

export async function requireAuth() {
  const session = await getSessionUser();
  if (!session?.id || !session.email) {
    return null;
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (!session?.email) return null;

  const isAdmin = await isAdminEmail(session.email);
  if (!isAdmin) return null;

  return session;
}
