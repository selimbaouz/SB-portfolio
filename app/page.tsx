"use client";
import { Suspense } from "react";
import { JsonLd } from "react-schemaorg";
import Header from "@/components/Header";

export default function Home() {
  return (
    <Suspense>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "selimbaouz",
          url: "https://selimbaouz.com",
          logo: "https://selimbaouz.com/images/Logo.webp",
          description:
            "Multidisciplinary developer: I create custom Shopify stores, SaaS solutions, and Canva applications, where code, design, and user experience come together.",
          sameAs: [
            "https://twitter.com/selimbaouz",
            "https://github.com/selimbaouz",
            "https://linkedin.com/selimbaouz",
            "https://medium.com/@selimbaouz",
            "https://pinterest.com/selimbaouz",
            "https://facebook.com/selimbaouz",
          ],
        }}
      />
      <div className="bg-[#111118] flex flex-col">
        <Header />
      </div>
    </Suspense>
  );
}
