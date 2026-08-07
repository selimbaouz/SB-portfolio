import { legalsPagesData } from "@/data/work";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface LegalPageProps {
  handle: string;
}

const LegalPage: FC<LegalPageProps> = ({ handle }) => {
  const page = legalsPagesData(handle);

  return (
    <div className={cn("px-6 text-left", "md:px-10", "xl:px-14", "lg:max-w-3xl lg:mx-auto")}>
      <h1
        className={cn(
          "pb-12 font-[family-name:var(--font-neue)] font-medium tracking-[0.04em] text-white",
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
    </div>
  );
};

export default LegalPage;
