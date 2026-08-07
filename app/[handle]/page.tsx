import LegalPage from "@/components/LegalPage";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function Legals(props: Props) {
  const params = await props.params;

  return (
    <Suspense>
      <div className="min-h-[100dvh] bg-[#0a0a10] text-white">
        <header className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8 xl:px-14 xl:pt-10">
          <Link
            href="/"
            className="font-[family-name:var(--font-neue)] text-[15px] font-medium uppercase tracking-[0.08em] text-white md:text-base"
            aria-label="SB home"
          >
            SB
          </Link>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 font-[family-name:var(--font-neue)]",
              "text-[11px] font-medium uppercase tracking-[0.18em] text-white/70",
              "transition-colors hover:text-white"
            )}
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            Back
          </Link>
        </header>

        <main className="py-16 md:py-24 xl:py-28">
          <LegalPage handle={params.handle} />
        </main>
      </div>
    </Suspense>
  );
}
