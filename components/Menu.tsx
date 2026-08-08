"use client";

import { cn } from "@/lib/utils";
import { navLinks } from "@/data/work";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type MenuProps = {
  visible?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const links = navLinks.slice(1);
const CONTACT_EMAIL = "mailto:hello@Brandionary.com";

const Menu = ({ visible = true, onOpenChange }: MenuProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    onOpenChange?.(menuOpen);
  }, [menuOpen, onOpenChange]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return hash === href;
    if (href.startsWith("http")) return false;
    return pathname === href;
  };

  const selectLink = (href: string) => {
    if (href.startsWith("#")) setHash(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <nav
        className={cn(
          "absolute right-5 top-6 z-30 hidden md:block md:right-10 md:top-8 xl:right-14 xl:top-10",
          "font-[family-name:var(--font-neue)] text-white mix-blend-exclusion",
          "transition-opacity duration-200",
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-wrap items-center justify-end gap-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => {
                  if (link.href.startsWith("#")) setHash(link.href);
                }}
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.18em] underline-offset-[6px] transition-opacity hover:underline",
                  isActive(link.href) && "underline"
                )}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={CONTACT_EMAIL}
              className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.18em] underline-offset-[6px] transition-opacity hover:underline"
            >
              Contact
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile toggle — Menu aligned with SB; X keeps its own spot */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className={cn(
          "fixed z-[190] md:hidden",
          "font-[family-name:var(--font-neue)] text-[12px] font-medium uppercase tracking-[0.22em] text-white mix-blend-exclusion",
          "transition-opacity duration-200",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
          menuOpen
            ? "right-8 top-8 flex h-10 min-w-10 items-center justify-end"
            : "right-5 top-6 flex items-center"
        )}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X className="size-6" strokeWidth={1.5} /> : "Menu"}
      </button>

      {/* Mobile glass panel */}
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
            "absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-3xl",
            "border border-white/25 bg-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.28)]",
            "backdrop-blur-2xl backdrop-saturate-150",
            "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          <nav className="flex h-full flex-col items-start justify-center gap-8 px-6 pb-10 pt-16 text-left">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => selectLink(link.href)}
                className={cn(
                  "inline-block text-left font-[family-name:var(--font-neue)] text-[11vw] font-medium uppercase tracking-[0.12em] text-white mix-blend-exclusion",
                  "pl-[0.12em] underline-offset-[10px] transition-opacity hover:underline",
                  isActive(link.href) && "underline",
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
            <Link
              href={CONTACT_EMAIL}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "inline-flex items-center gap-2 text-left font-[family-name:var(--font-neue)] text-[11vw] font-medium uppercase tracking-[0.12em] text-white mix-blend-exclusion",
                "pl-[0.12em] underline-offset-[10px] transition-opacity hover:underline",
                menuOpen && "hero-rise"
              )}
              style={{ animationDelay: `${80 + links.length * 60}ms` }}
            >
              Contact
              <ArrowUpRight className="size-[0.55em]" strokeWidth={1.5} />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
