"use client";
import { cn } from "@/lib/utils";
import { useIsHydrated } from "@/hook/useIsHydrated";
import Link from "next/link";
import { useState } from "react";
import BrandionaryMark from "./BrandionaryMark";
import Menu from "./Menu";
import HeroVideo from "./HeroVideo";

const HeaderPage = () => {
  const isHydrated = useIsHydrated();
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isHydrated) {
    return null;
  }

  return (
    <header
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroVideo
          className="size-full"
          overlayClassName="bg-black/35"
          loaderMode="full"
          onLoaderDone={setLoaderDone}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 z-20 mix-blend-exclusion text-white",
          "transition-opacity duration-700 delay-150",
          loaderDone ? "opacity-100" : "opacity-0"
        )}
      >
        <Link
          href="/"
          className={cn(
            "absolute left-5 top-6 z-10 md:left-10 md:top-8 xl:left-14 xl:top-10",
            "font-[family-name:var(--font-neue)] text-[15px] font-medium uppercase tracking-[0.08em] md:text-base",
            "transition-opacity duration-200 md:opacity-100",
            menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          )}
          aria-label="SB home"
        >
          SB
        </Link>

        <h1
          className={cn(
            "absolute bottom-32 left-5 right-5",
            "md:bottom-14 md:left-10 md:right-auto",
            "xl:bottom-16 xl:left-14",
            loaderDone && "hero-rise"
          )}
        >
          <span
            className={cn(
              "block font-[family-name:var(--font-neue)] font-medium tracking-[0.04em]",
              "text-[11.5vw] leading-[0.92]",
              "md:text-[7.5vw]",
              "xl:text-[6.2vw]"
            )}
          >
            Multidisciplinary
          </span>
          <span
            className={cn(
              "mt-1 block font-[family-name:var(--font-instrument)] italic font-normal tracking-[0.06em]",
              "text-[12.5vw] leading-[0.88]",
              "md:text-[8.5vw]",
              "xl:text-[6.8vw]"
            )}
          >
            Developer
          </span>
        </h1>

        <div
          className={cn(
            "absolute bottom-8 right-5 flex flex-col items-end gap-1.5 text-right",
            "md:bottom-14 md:right-10",
            "xl:bottom-16 xl:right-14",
            "font-[family-name:var(--font-neue)]",
            loaderDone && "hero-rise hero-rise-delay"
          )}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] md:text-[11px]">
            Based in France
          </p>
          <p className="flex flex-wrap items-center justify-end gap-1 text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
            Founder & CEO of
            <Link
              href="https://brandionary.com"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
            >
              <BrandionaryMark className="size-4" />
              Brandionary
            </Link>
          </p>
          {/* 
          <p className="flex flex-wrap items-center justify-end gap-1 text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
            Shopify Developer at
            <Link
              href="https://uxhover.co"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
            >
              <HoverIcon width={14} height={14} />
              Hover
            </Link>
          </p>
          */}
        </div>
      </div>

      <Menu visible={loaderDone} onOpenChange={setMenuOpen} />
    </header>
  );
};

export default HeaderPage;
