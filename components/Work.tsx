"use client";

import { cn } from "@/lib/utils";
import { templates } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import HeroVideo from "./HeroVideo";
import Menu from "./Menu";

const filters = ["All", "Shopify", "App Canva", "SaaS"] as const;

type Project = (typeof templates)[number];

const WorkCard = ({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let start = 0;
    let revealed = false;
    const duration = 700;

    el.style.opacity = "0";
    el.style.transform = "translate3d(0, 28px, 0)";
    el.style.willChange = "opacity, transform";

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const tick = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / duration);
      const eased = easeOutCubic(progress);
      el.style.opacity = String(eased);
      el.style.transform = `translate3d(0, ${28 * (1 - eased)}px, 0)`;

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        el.style.willChange = "auto";
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || revealed) return;
        revealed = true;
        observer.disconnect();
        window.setTimeout(() => {
          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [delay, project.index, project.name]);

  const cardClass = cn(
    "group block overflow-hidden p-3",
    project.url && "cursor-pointer"
  );

  const card = (
    <div className="border-b border-white/70 pb-2 lg:pb-3">
      <Image
        src={project.imageUrl}
        alt={project.name}
        width={1400}
        height={900}
        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="mt-4 flex items-start justify-between gap-4 px-1 pb-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-[family-name:var(--font-neue)] text-xs lg:text-sm text-white/55">
            {project.category} · {project.agency}
          </p>
          <h2 className="font-[family-name:var(--font-neue)] text-lg font-medium tracking-[0.01em] text-white md:text-xl">
            {project.name}
          </h2>
        </div>
        {project.url ? (
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-white/50 transition-colors group-hover:text-white"
            strokeWidth={1.5}
          />
        ) : null}
      </div>
    </div>
  );

  return (
    <li ref={ref}>
      {project.url ? (
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          {card}
        </Link>
      ) : (
        <div className={cardClass}>{card}</div>
      )}
    </li>
  );
};

const Work = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const uniqueProjects = useMemo(() => {
    const seen = new Set<string>();
    return templates.filter((project) => {
      if (seen.has(project.name)) return false;
      seen.add(project.name);
      return true;
    });
  }, []);

  const counts = useMemo(() => {
    return {
      All: uniqueProjects.length,
      Shopify: uniqueProjects.filter((p) => p.category === "Shopify").length,
      "App Canva": uniqueProjects.filter((p) => p.category === "App Canva").length,
      SaaS: uniqueProjects.filter((p) => p.category === "SaaS").length,
    };
  }, [uniqueProjects]);

  const projects = useMemo(() => {
    if (filter === "All") return uniqueProjects;
    return uniqueProjects.filter((project) => project.category === filter);
  }, [filter, uniqueProjects]);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <HeroVideo
          className="size-full"
          overlayClassName="bg-black/25"
          loaderMode="needed"
          onLoaderDone={setLoaderDone}
        />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            loaderDone ? "opacity-100" : "opacity-0",
            "border-0 bg-white/[0.08]",
            "backdrop-blur-2xl backdrop-saturate-150"
          )}
          aria-hidden
        />
      </div>

      <header
        className={cn(
          "relative z-20 flex items-center px-6 pt-6 md:px-10 md:pt-8 xl:px-14 xl:pt-10",
          "transition-opacity duration-700 delay-150",
          loaderDone ? "opacity-100" : "opacity-0"
        )}
      >
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

      <Menu visible={loaderDone} onOpenChange={setMenuOpen} />

      <main
        className={cn(
          "relative z-10 px-6 pb-24 pt-16 md:px-10 md:pt-20 xl:px-14",
          "transition-opacity duration-700 delay-150",
          loaderDone ? "opacity-100" : "opacity-0"
        )}
      >
        <h1
          className={cn(
            "text-center font-[family-name:var(--font-neue)] font-medium tracking-[-0.02em] text-white mix-blend-exclusion",
            "text-[11vw] leading-none",
            "md:text-6xl xl:text-7xl"
          )}
        >
          Selected Projects
        </h1>

        <div
          className={cn(
            "mt-8 -mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "md:mx-0 md:mt-10 md:overflow-visible md:px-0"
          )}
          data-lenis-prevent
        >
          <ul className="flex w-max min-w-full items-center justify-center gap-1.5 md:gap-3">
            {filters.map((item) => {
              const active = filter === item;
              return (
                <li key={item} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setFilter(item)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1.5",
                      "font-[family-name:var(--font-neue)] text-[11px] font-medium tracking-[0.02em]",
                      "md:gap-1.5 md:px-4 md:py-2 md:text-[12px]",
                      "transition-colors",
                      active
                        ? "border-white bg-white text-[#0a0a10] hover:bg-white/90"
                        : "border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/20"
                    )}
                  >
                    {item}
                    <sup className="text-[9px] opacity-70 md:text-[10px]">{counts[item]}</sup>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <ul
          key={filter}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-x-6 gap-y-6 md:mt-20 md:grid-cols-2 md:gap-8"
        >
          {projects.map((project, index) => (
            <WorkCard
              key={`${filter}-${project.name}-${project.index}`}
              project={project}
              delay={(index % 2) * 70}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Work;
