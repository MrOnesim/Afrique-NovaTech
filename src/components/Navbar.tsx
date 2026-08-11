import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Méthode", href: "/#process" },
  { label: "Réalisations", href: "/#projects" },
  { label: "Équipe", href: "/#team" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "Devis", href: "/devis" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("/#", ""));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Navigation principale"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
          scrolled
            ? "border border-white/[0.12] bg-white/[0.06] shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)] backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <a href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 p-1.5 shadow-[0_0_25px_rgba(255,100,0,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:border-white/25 group-hover:bg-white/5">
            <img src="/images/logo_novatech.webp" alt="Logo Afrique NovaTech" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:text-white transition-colors">Afrique</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/40 group-hover:text-white/60 transition-colors">NovaTech</span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isRoute = l.href === "/devis";
            const isActive = isRoute
              ? location.pathname === l.href
              : active === l.href.replace("/#", "");
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <a
            href="/devis"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            Devis en ligne
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-xl md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-5 bg-white transition-all", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-white transition-all", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-white transition-all", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 z-50 w-[92%] max-w-6xl rounded-2xl border border-white/[0.12] bg-white/[0.06] p-4 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/devis"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-lg bg-white px-4 py-3 text-center font-semibold text-black"
                >
                  Devis en ligne
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
