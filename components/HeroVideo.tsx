"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO = "/videos/sb_hero_desktop.mp4";
const MOBILE_VIDEO = "/videos/sb_hero_mobile.mp4";

type HeroVideoProps = {
  className?: string;
  overlayClassName?: string;
};

const HeroVideo = ({ className, overlayClassName }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(MOBILE_VIDEO);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setVideoSrc(mq.matches ? DESKTOP_VIDEO : MOBILE_VIDEO);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    void videoRef.current?.play().catch(() => {});
  }, [videoSrc]);

  return (
    <div className={cn("absolute inset-0 size-full overflow-hidden", className)}>
      <video
        key={videoSrc}
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/images/hero-bg.jpg"
        aria-hidden
        onLoadedData={() => {
          void videoRef.current?.play().catch(() => {});
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className={cn("absolute inset-0 bg-black/45", overlayClassName)}
        aria-hidden
      />
    </div>
  );
};

export default HeroVideo;
