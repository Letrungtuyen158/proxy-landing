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

export type PricingTab = "daily" | "monthly";

export const MONTHLY_BASE_USD = 200;
export const DAILY_BASE_USD = 7;

export interface DailyPlanItem {
  days: number;
  discount?: number;
  popular?: boolean;
}

export interface MonthlyPlanItem {
  months: number;
  discount: number;
  popular?: boolean;
}

export const dailyPlans: DailyPlanItem[] = [
  { days: 1 },
  { days: 7, popular: true },
  { days: 15, discount: 5 },
  { days: 30, discount: 10 },
];

export const monthlyPlans: MonthlyPlanItem[] = [
  { months: 3, discount: 15, popular: true },
  { months: 6, discount: 25 },
  { months: 12, discount: 30 },
];

export function getDailyPrice(days: number, discount = 0) {
  const original = days * DAILY_BASE_USD;
  const final = original * (1 - discount / 100);
  return {
    original,
    final,
    originalLabel: `$${original}`,
    finalLabel: `$${Math.round(final)}`,
    amountLabel: `$${Math.round(final)}`,
  };
}

export function getMonthlyPrice(months: number, discount: number) {
  const original = months * MONTHLY_BASE_USD;
  const final = original * (1 - discount / 100);
  return {
    original,
    final,
    originalLabel: `$${original}`,
    finalLabel: `$${Math.round(final)}`,
    amountLabel: `$${Math.round(final)}`,
  };
}

export function formatPlanLabel(plan: { days?: number; months?: number }): string {
  if (plan.months) {
    return plan.months === 1 ? "1 Month IP Proxy" : `${plan.months} Months IP Proxy`;
  }
  const days = plan.days ?? 1;
  return days === 1 ? "1 Day IP Proxy" : `${days} Days IP Proxy`;
}

export const pricingPlans: Record<
  PricingTab,
  Array<{
    label: string;
    price: string;
    unit: string;
    amount: string;
    days?: number;
    months?: number;
    discount?: number;
    originalAmount?: string;
    popular?: boolean;
  }>
> = {
  daily: dailyPlans.map((plan) => {
    const pricing = getDailyPrice(plan.days, plan.discount ?? 0);
    return {
      label: formatPlanLabel({ days: plan.days }),
      price: pricing.finalLabel,
      unit: "",
      amount: pricing.amountLabel,
      days: plan.days,
      discount: plan.discount,
      originalAmount: plan.discount ? pricing.originalLabel : undefined,
      popular: plan.popular,
    };
  }),
  monthly: monthlyPlans.map((plan) => {
    const pricing = getMonthlyPrice(plan.months, plan.discount);
    return {
      label: formatPlanLabel({ months: plan.months }),
      price: pricing.finalLabel,
      unit: "",
      amount: pricing.amountLabel,
      months: plan.months,
      discount: plan.discount,
      originalAmount: pricing.originalLabel,
      popular: plan.popular,
    };
  }),
};

export const useCaseIcons = ["brain", "users", "trending", "search", "globe", "megaphone"] as const;

export const testimonialInitials = ["N", "R", "C"];

export const trustBadges = [
  { name: "Trustpilot", rating: "4.8" },
  { name: "G2", rating: "4.9" },
  { name: "Proxyway", rating: "5.0" },
];
