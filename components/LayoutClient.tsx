"use client";
import { cn } from "@/lib/utils";
import useMouseFollower from "@/animations/useMouseFollower";
import Head from "next/head";
import CircleMouse from "./CircleMouse";

const LayoutClient = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  useMouseFollower();

  return (
    <html
      lang="en"
      className="h-full"
      suppressHydrationWarning
    >
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cn(className, "relative bg-background font-sans antialiased")}>
        <CircleMouse />
        {children}
      </body>
    </html>
  );
};

export default LayoutClient;
