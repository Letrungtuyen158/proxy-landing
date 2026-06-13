import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { findUserById } from "@/lib/users-store";
import DashboardClient from "@/components/auth/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await findUserById(session.user.id);
  if (!user) {
    redirect("/login");
  }

  const isAdmin = session.user.email ? await isAdminEmail(session.user.email) : false;

  return (
    <DashboardClient
      isAdmin={isAdmin}
      user={{
        name: user.name ?? "User",
        email: user.email,
        createdAt: user.createdAt,
        image: user.image ?? null,
        planStatus: user.planStatus ?? "none",
        planLabel: user.planLabel ?? null,
        planAmount: user.planAmount ?? null,
      }}
    />
  );
}
