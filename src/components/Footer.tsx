import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 p-1.5 shadow-[0_0_25px_rgba(255,100,0,0.1)]">
                <img src="/images/logo_novatech.webp" alt="Logo Afrique NovaTech" className="h-full w-full object-contain" />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-bold">Afrique NovaTech</span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-white/40">Studio digital</span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Nous concevons des sites web, applications et plateformes digitales modernes pour
              propulser les entreprises africaines et internationales.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-sm transition-colors hover:bg-white/10">
                f
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Sites web", "E-commerce", "Applications", "Design & Branding", "Solutions SaaS"].map((l) => (
                <li key={l}><a href="/#services" className="transition-colors hover:text-white">{l}</a></li>
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
                <li key={l.l}><a href={l.h} className="transition-colors hover:text-white">{l.l}</a></li>
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
