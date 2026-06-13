export const navHrefs = [
  { key: "proxies" as const, href: "#products" },
  { key: "scraping" as const, href: "#features" },
  { key: "pricing" as const, href: "#pricing" },
  { key: "dataForAi" as const, href: "#use-cases" },
  { key: "resources" as const, href: "#testimonials" },
];

export const heroStatValues = [
  { value: "<0.2s", key: "speed" as const },
  { value: "125M+", key: "ips" as const },
  { value: "99.99%", key: "uptime" as const },
  { value: "195+", key: "locations" as const },
  { value: "LLM-ready", key: "compatible" as const },
];

export const featureIds = ["scraping-api", "residential", "ai", "starter"] as const;
export const featureIcons = ["code", "home", "brain", "shopping-cart"] as const;

export const productColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
];

export const PROXY_PLAN_TAB = "ip-proxy" as const;
export type PricingTab = typeof PROXY_PLAN_TAB;

export interface ProxyPlanItem {
  days: number;
  price: string;
  amount: string;
  popular?: boolean;
  save?: "save10" | "bestValue";
}

export const proxyPlans: ProxyPlanItem[] = [
  { days: 1, price: "$3", amount: "$3" },
  { days: 3, price: "$9", amount: "$9" },
  { days: 7, price: "$20", amount: "$20", popular: true },
  { days: 30, price: "$85", amount: "$85" },
];

export function formatPlanLabel(days: number): string {
  return days === 1 ? "1 Day IP Proxy" : `${days} Days IP Proxy`;
}

export const pricingPlans: Record<
  PricingTab,
  Array<{
    label: string;
    price: string;
    unit: string;
    amount: string;
    days: number;
    popular?: boolean;
    save?: "save10" | "bestValue";
  }>
> = {
  "ip-proxy": proxyPlans.map((plan) => ({
    label: formatPlanLabel(plan.days),
    price: plan.price,
    unit: "",
    amount: plan.amount,
    days: plan.days,
    popular: plan.popular,
    save: plan.save,
  })),
};

export const useCaseIcons = ["brain", "users", "trending", "search", "globe", "megaphone"] as const;

export const testimonialInitials = ["N", "R", "C"];

export const trustBadges = [
  { name: "Trustpilot", rating: "4.8" },
  { name: "G2", rating: "4.9" },
  { name: "Proxyway", rating: "5.0" },
];
