"use client";

import { cn } from "@/lib/utils";

type VideoLoaderProps = {
  progress: number;
  done: boolean;
};

const VideoLoader = ({ progress, done }: VideoLoaderProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-end justify-end bg-[#0a0a10] px-5 pb-8 md:px-10 md:pb-12 xl:px-14 xl:pb-16",
        "transition-opacity duration-700 ease-out",
        done ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      aria-hidden={done}
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
  );
};

export default VideoLoader;
