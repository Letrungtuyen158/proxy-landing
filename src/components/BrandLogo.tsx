import Link from "next/link";
import { brand } from "@/lib/brand";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  href?: string;
  className?: string;
};

const sizes = {
  sm: { icon: 32, name: "text-base", gap: "gap-2" },
  md: { icon: 36, name: "text-lg", gap: "gap-2.5" },
  lg: { icon: 40, name: "text-xl", gap: "gap-3" },
};

function LogoMark({ size }: { size: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 shadow-lg shadow-violet-500/20 ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[58%] w-[58%] text-white"
        aria-hidden
      >
        <path
          d="M12 3L4 7v6c0 4.2 3.4 7.4 8 9 4.6-1.6 8-4.8 8-9V7l-8-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.2" fill="currentColor" />
        <path
          d="M8.5 14.5 12 12l3.5 2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function BrandLogo({
  size = "md",
  showName = true,
  href = "/",
  className = "",
}: BrandLogoProps) {
  const s = sizes[size];

  const content = (
    <>
      <LogoMark size={s.icon} />
      {showName && (
        <span className={`font-semibold tracking-tight text-white ${s.name}`}>
          Velo
          <span className="font-bold text-violet-300">Proxy</span>
        </span>
      )}
    </>
  );

  const classes = `flex items-center ${s.gap} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={brand.name}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
