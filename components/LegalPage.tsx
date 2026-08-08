"use client";

import { legalsPagesData } from "@/data/work";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, useState } from "react";
import HeroVideo from "./HeroVideo";
import Menu from "./Menu";

interface LegalPageProps {
  handle: string;
}

const LegalPage: FC<LegalPageProps> = ({ handle }) => {
  const page = legalsPagesData(handle);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <HeroVideo className="size-full" overlayClassName="bg-black/25" />
        <div
          className={cn(
            "absolute inset-0",
            "border-0 bg-white/[0.08]",
            "backdrop-blur-2xl backdrop-saturate-150"
          )}
          aria-hidden
        />
      </div>

      <header className="relative z-20 flex items-center px-6 pt-6 md:px-10 md:pt-8 xl:px-14 xl:pt-10">
        <Link
          href="/"
          className={cn(
            "font-[family-name:var(--font-neue)] text-[15px] font-medium uppercase tracking-[0.08em] text-white mix-blend-exclusion md:text-base",
            "transition-opacity duration-200",
            menuOpen ? "pointer-events-none opacity-0 md:opacity-100" : "opacity-100"
          )}
          aria-label="SB home"
        >
          SB
        </Link>
      </header>

      <Menu onOpenChange={setMenuOpen} />

      <main
        className={cn(
          "relative z-10 px-6 pb-24 pt-16 text-left",
          "md:px-10 md:pt-20",
          "xl:px-14",
          "lg:mx-auto lg:max-w-3xl"
        )}
      >
        <h1
          className={cn(
            "pb-12 font-[family-name:var(--font-neue)] font-medium tracking-[0.04em] text-white mix-blend-exclusion",
            "text-[11vw] leading-[0.95]",
            "md:text-5xl",
            "xl:text-6xl"
          )}
        >
          {page.title}
        </h1>

        <div className="space-y-12 md:space-y-16">
          {page.data.map((data, index) => (
            <div key={index} className="space-y-4">
              <h2
                className={cn(
                  "font-[family-name:var(--font-instrument)] italic text-white/90",
                  "text-2xl leading-tight tracking-[0.02em]",
                  "md:text-3xl"
                )}
              >
                {data.title.replace(/^\d+\.\s*/, "")}
              </h2>
              <p
                className={cn(
                  "font-[family-name:var(--font-neue)] text-sm font-normal leading-relaxed text-white/55",
                  "md:text-base md:leading-relaxed",
                  "whitespace-pre-line"
                )}
              >
                {data.content.trim()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
