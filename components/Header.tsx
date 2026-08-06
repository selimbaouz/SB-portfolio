"use client";
import { cn } from "@/lib/utils";
import { useIsHydrated } from "@/hook/useIsHydrated";
import Link from "next/link";
import HoverIcon from "./HoverIcon";
import { navLinks } from "@/data/work";
import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO = "/videos/sb_hero_desktop.mp4";
const MOBILE_VIDEO = "/videos/sb_hero_mobile.mp4";

const HeaderPage = () => {
  const isHydrated = useIsHydrated();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(MOBILE_VIDEO);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setVideoReady(false);
      setProgress(0);
      setLoaderDone(false);
      setVideoSrc(mq.matches ? DESKTOP_VIDEO : MOBILE_VIDEO);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (loaderDone) return;

    const id = window.setInterval(() => {
      setProgress((prev) => {
        const video = videoRef.current;
        let target = prev;

        if (video && video.buffered.length > 0 && video.duration > 0) {
          const buffered = video.buffered.end(video.buffered.length - 1);
          target = Math.min(100, Math.round((buffered / video.duration) * 100));
        }

        if (videoReady) target = 100;

        if (!videoReady && target < 92) {
          target = Math.max(target, prev + 1);
        }

        return prev >= target ? prev : Math.min(prev + 2, target);
      });
    }, 40);

    return () => window.clearInterval(id);
  }, [videoReady, loaderDone, videoSrc]);

  useEffect(() => {
    if (progress < 100 || !videoReady || loaderDone) return;

    const t = window.setTimeout(() => setLoaderDone(true), 280);
    return () => window.clearTimeout(t);
  }, [progress, videoReady, loaderDone]);

  useEffect(() => {
    if (!loaderDone) return;
    void videoRef.current?.play().catch(() => {});
  }, [loaderDone]);

  if (!isHydrated) {
    return null;
  }

  return (
    <header
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Full-bleed video — no heavy overlay so exclusion can invert colors */}
      <div className="absolute inset-0">
        <video
          key={videoSrc}
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            loaderDone ? "opacity-100" : "opacity-0"
          )}
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-bg.jpg"
          aria-hidden
          onLoadedData={() => setVideoReady(true)}
          onCanPlayThrough={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            loaderDone ? "opacity-100" : "opacity-0",
            "bg-black/35"
          )}
        />
      </div>

      {/* Loader */}
      <div
        className={cn(
          "fixed inset-0 z-[200] flex items-end justify-end bg-[#0a0a10] px-5 pb-8 md:px-10 md:pb-12 xl:px-14 xl:pb-16",
          "transition-opacity duration-700 ease-out",
          loaderDone ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-hidden={loaderDone}
      >
        <p
          className={cn(
            "font-[family-name:var(--font-neue)] font-medium tabular-nums tracking-tight text-white mix-blend-exclusion",
            "text-[22vw] leading-none md:text-[16vw] xl:text-[12vw]"
          )}
        >
          {progress}
          <span className="pl-1 align-top text-[0.35em]">%</span>
        </p>
      </div>

      {/* All hero UI — exclusion everywhere */}
      <div
        className={cn(
          "absolute inset-0 z-20 mix-blend-exclusion text-white",
          "transition-opacity duration-700 delay-150",
          loaderDone ? "opacity-100" : "opacity-0"
        )}
      >
        {/* SB top left */}
        <Link
          href="/"
          className={cn(
            "absolute left-5 top-6 z-10 md:left-10 md:top-8 xl:left-14 xl:top-10",
            "font-[family-name:var(--font-neue)] text-[15px] font-medium uppercase tracking-[0.08em] md:text-base"
          )}
          aria-label="SB home"
        >
          SB
        </Link>

        {/* Desktop menu */}
        <nav
          className={cn(
            "absolute right-5 top-6 z-10 hidden md:block md:right-10 md:top-8 xl:right-14 xl:top-10",
            "font-[family-name:var(--font-neue)]"
          )}
        >
          <ul className="flex flex-wrap items-center justify-end gap-x-6">
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[12px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile MENU trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={cn(
            "absolute right-5 top-6 z-10 md:hidden",
            "font-[family-name:var(--font-neue)] text-[12px] font-medium uppercase tracking-[0.22em]"
          )}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        {/* Headline — near end, above meta */}
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

        {/* Meta — bottom right, stacked caps like the ref */}
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
              Brandionary
            </Link>
          </p>
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
        </div>
      </div>

      {/* Mobile glass menu — outside exclusion so backdrop-blur works */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[180] md:hidden",
          "transition-opacity duration-300 ease-out",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/25"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-4 top-4 bottom-4 flex flex-col overflow-hidden rounded-3xl",
            "border border-white/20 bg-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
            "backdrop-blur-2xl backdrop-saturate-150",
            "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-y-0" : "translate-y-4"
          )}
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-[family-name:var(--font-neue)] text-[13px] font-medium uppercase tracking-[0.08em] text-white">
              SB
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-neue)] text-[12px] font-medium uppercase tracking-[0.22em] text-white/80"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-10 text-center">
            {navLinks.slice(1).map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block w-full text-center font-[family-name:var(--font-neue)] text-[11vw] font-medium uppercase tracking-[0.12em] text-white",
                  "pl-[0.12em] transition-opacity hover:opacity-70",
                  menuOpen && "hero-rise"
                )}
                style={{ animationDelay: `${80 + i * 60}ms` }}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
