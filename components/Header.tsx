"use client";
import { cn } from "@/lib/utils";
import { useIsHydrated } from "@/hook/useIsHydrated";
import Link from "next/link";
import HoverIcon from "./HoverIcon";
import { useEffect, useRef, useState } from "react";
import BrandionaryMark from "./BrandionaryMark";
import Menu from "./Menu";

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
      {/* Full-bleed video */}
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

      {/* Hero UI — exclusion */}
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

      <Menu visible={loaderDone} onOpenChange={setMenuOpen} />
    </header>
  );
};

export default HeaderPage;
