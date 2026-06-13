import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin-auth";
import AdminPanel from "@/components/admin/AdminPanel";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/admin");
  }

  const isAdmin = await isAdminEmail(session.user.email);
  if (!isAdmin) {
    redirect("/dashboard");
  }

  return <AdminPanel adminName={session.user.name ?? "Admin"} />;
}
