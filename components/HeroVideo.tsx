"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import VideoLoader from "./VideoLoader";

const DESKTOP_VIDEO = "/videos/sb_hero_desktop.mp4";
const MOBILE_VIDEO = "/videos/sb_hero_mobile.mp4";

type HeroVideoProps = {
  className?: string;
  overlayClassName?: string;
  /** full = always 0→100% (home). needed = only if video still loading (work/privacy). */
  loaderMode?: "full" | "needed";
  onLoaderDone?: (done: boolean) => void;
};

const HeroVideo = ({
  className,
  overlayClassName,
  loaderMode = "full",
  onLoaderDone,
}: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onLoaderDoneRef = useRef(onLoaderDone);
  onLoaderDoneRef.current = onLoaderDone;
  const [videoSrc, setVideoSrc] = useState(MOBILE_VIDEO);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [showLoader, setShowLoader] = useState(loaderMode === "full");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setVideoReady(false);
      setProgress(0);
      setLoaderDone(false);
      setShowLoader(loaderMode === "full");
      setVideoSrc(mq.matches ? DESKTOP_VIDEO : MOBILE_VIDEO);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [loaderMode]);

  useEffect(() => {
    if (loaderMode !== "needed" || loaderDone || videoReady) return;

    const t = window.setTimeout(() => {
      const video = videoRef.current;
      if (video && video.readyState >= 3) {
        setVideoReady(true);
        setProgress(100);
        setLoaderDone(true);
        setShowLoader(false);
        return;
      }
      setShowLoader(true);
    }, 60);

    return () => window.clearTimeout(t);
  }, [videoSrc, loaderMode, loaderDone, videoReady]);

  useEffect(() => {
    if (loaderDone) return;
    if (loaderMode === "needed" && !showLoader) return;

    const id = window.setInterval(() => {
      setProgress((prev) => {
        const video = videoRef.current;
        let target = prev;

        if (video && video.buffered.length > 0 && video.duration > 0) {
          const buffered = video.buffered.end(video.buffered.length - 1);
          target = Math.min(100, Math.round((buffered / video.duration) * 100));
        }

        if (videoReady) target = 100;

        if (loaderMode === "full" && !videoReady && target < 92) {
          target = Math.max(target, prev + 1);
        }

        if (prev >= target) return prev;
        const step = loaderMode === "full" ? 2 : 6;
        return Math.min(prev + step, target);
      });
    }, 40);

    return () => window.clearInterval(id);
  }, [videoReady, loaderDone, videoSrc, loaderMode, showLoader]);

  useEffect(() => {
    if (!videoReady || loaderDone) return;

    if (loaderMode === "needed") {
      setProgress(100);
      setLoaderDone(true);
      setShowLoader(false);
      return;
    }

    if (progress < 100) return;
    const t = window.setTimeout(() => setLoaderDone(true), 280);
    return () => window.clearTimeout(t);
  }, [progress, videoReady, loaderDone, loaderMode]);

  useEffect(() => {
    onLoaderDoneRef.current?.(loaderDone);
  }, [loaderDone]);

  useEffect(() => {
    if (!loaderDone) return;
    void videoRef.current?.play().catch(() => {});
  }, [loaderDone, videoSrc]);

  const markReady = () => setVideoReady(true);

  return (
    <>
      <div className={cn("absolute inset-0 size-full overflow-hidden", className)}>
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
          aria-hidden
          onLoadedData={markReady}
          onCanPlay={markReady}
          onCanPlayThrough={markReady}
          onError={markReady}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            loaderDone ? "opacity-100" : "opacity-0",
            "bg-black/45",
            overlayClassName
          )}
          aria-hidden
        />
      </div>
      {showLoader ? <VideoLoader progress={progress} done={loaderDone} /> : null}
    </>
  );
};

export default HeroVideo;
