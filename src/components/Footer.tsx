import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaEnvelope, FaPhone, FaLocationDot, FaFacebookF, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 p-1.5 shadow-[0_0_25px_rgba(255,100,0,0.1)]">
                <img src="/images/logo_novatech.webp" alt="Logo Afrique NovaTech" className="h-full w-full object-contain" />
                <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-cyan-300/70 blur-[1px]" />
              </div>
              <div className="leading-tight">
                <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-base font-black text-transparent">Afrique NovaTech</span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-cyan-100/40">Studio digital</span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Nous concevons des sites web, applications et plateformes digitales modernes pour
              propulser les entreprises africaines et internationales.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { icon: FaEnvelope, href: "mailto:gracaonesim@gmail.com", label: "Email" },
                { icon: FaPhone, href: "tel:+2290141969208", label: "Téléphone" },
                { icon: FaLocationDot, href: "#", label: "Cotonou" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                { icon: FaGithub, href: "#", label: "GitHub" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaFacebookF, href: "#", label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/60 backdrop-blur-xl transition-all duration-300 hover:translate-y-1 hover:border-cyan-200/40 hover:text-white hover:shadow-[0_0_25px_rgba(125,227,255,0.25)]"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Sites web", "E-commerce", "Applications", "Design & Branding", "Solutions SaaS"].map((l) => (
                <li key={l}>
                  <a href="/#services" className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                    <FaArrowUpRightFromSquare className="h-2.5 w-2.5 text-cyan-200/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-200" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Entreprise</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { l: "Réalisations", h: "/#projects" },
                { l: "Notre équipe", h: "/#team" },
                { l: "Tarifs", h: "/#pricing" },
                { l: "Contact", h: "/#contact" },
              ].map((l) => (
                <li key={l.l}>
                  <a href={l.h} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                    <FaArrowUpRightFromSquare className="h-2.5 w-2.5 text-cyan-200/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-200" />
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Afrique NovaTech. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="transition-colors hover:text-white">Mentions légales</Link>
            <Link to="/confidentialite" className="transition-colors hover:text-white">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
