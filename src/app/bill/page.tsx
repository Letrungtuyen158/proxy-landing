import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BillsClient from "@/components/bill/BillsClient";

export default async function BillPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/bill");
  }

  return <BillsClient />;
}
