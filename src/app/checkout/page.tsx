import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; index?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab ?? "ip-proxy";
  const index = params.index ?? "0";

  const session = await auth();
  if (!session?.user?.id) {
    const qs = new URLSearchParams({ tab, index });
    redirect(`/login?callbackUrl=${encodeURIComponent(`/checkout?${qs}`)}`);
  }

  return (
    <CheckoutClient
      planTab={tab}
      planIndex={index}
      userName={session.user.name ?? "User"}
      userEmail={session.user.email ?? ""}
    />
  );
}
