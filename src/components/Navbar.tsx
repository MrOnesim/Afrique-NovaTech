import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import { FaBolt, FaArrowRight } from "react-icons/fa6";

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
          "relative flex w-full max-w-6xl items-center justify-between overflow-hidden rounded-2xl px-5 py-3 transition-all duration-500",
          scrolled
            ? "border border-white/[0.14] bg-white/[0.07] shadow-[0_10px_60px_-20px_rgba(0,0,0,0.8),0_0_60px_-15px_rgba(255,255,255,0.2)] backdrop-blur-2xl"
            : "border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl"
        )}
      >
        {/* animated top edge */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />

        <a href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 p-1.5 shadow-[0_0_25px_rgba(255,100,0,0.15)] transition-all duration-500 group-hover:scale-110">
            <img src="/images/logo_novatech.webp" alt="Logo Afrique NovaTech" className="h-full w-full object-contain" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-300/70 blur-[1px] animate-pulse" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-black tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-all">
              Afrique
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-cyan-100/45 transition-colors group-hover:text-cyan-100/80">
              NovaTech
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isRoute = l.href === "/devis";
            const isActive = isRoute
              ? location.pathname === l.href
              : active === l.href.replace("/#", "");
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-0 rounded-lg border border-white/10 bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <a
            href="/devis"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_35px_-8px_rgba(125,227,255,0.6)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <FaBolt className="h-3.5 w-3.5" />
            Devis en ligne
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
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 z-50 w-[92%] max-w-6xl overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0b0b0b]/90 p-4 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span>{l.label}</span>
                    <FaArrowRight className="h-3 w-3 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/devis"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-center font-bold text-black"
                >
                  <FaBolt className="h-3.5 w-3.5" /> Devis en ligne
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
