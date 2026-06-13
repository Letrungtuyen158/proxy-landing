"use client";

import { Share2, Globe, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const { t } = useLanguage();

  const sections = [
    { title: t.footer.sections.products, links: t.footer.links.products },
    { title: t.footer.sections.resources, links: t.footer.links.resources },
    { title: t.footer.sections.company, links: t.footer.links.company },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <BrandLogo size="sm" href="/" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-4">
              {[Share2, Globe, Mail, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">{t.footer.copyright}</p>
          <p className="text-xs text-zinc-600">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
