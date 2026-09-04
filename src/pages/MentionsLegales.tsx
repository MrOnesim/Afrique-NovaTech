import PageHeader from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { FaBuilding, FaServer, FaLightbulb, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

const sections = [
  {
    Icon: FaBuilding,
    title: "Éditeur du site",
    body: (
      <>
        <p>Afrique NovaTech — SARL au capital de 1 000 000 FCFA</p>
        <p className="mt-1 flex items-center gap-2"><FaLocationDot className="h-3 w-3 text-cyan-200/70" /> Siège social : Cotonou, Bénin</p>
        <p className="mt-1 flex items-center gap-2"><FaEnvelope className="h-3 w-3 text-cyan-200/70" /> <a href="mailto:gracaonesim@gmail.com" className="text-white underline decoration-white/30 hover:decoration-white">gracaonesim@gmail.com</a></p>
        <p className="mt-1 flex items-center gap-2"><FaPhone className="h-3 w-3 text-cyan-200/70" /> +229 01 41 96 92 08</p>
        <p className="mt-1">Directeur de la publication : Amadou Diallo</p>
      </>
    ),
  },
  {
    Icon: FaServer,
    title: "Hébergement",
    body: (
      <>
        <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
      </>
    ),
  },
  {
    Icon: FaLightbulb,
    title: "Propriété intellectuelle",
    body: (
      <>
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est la propriété
          exclusive d'Afrique NovaTech, sauf mention contraire. Toute reproduction ou
          représentation totale ou partielle sans autorisation est interdite.
        </p>
      </>
    ),
  },
];

export default function MentionsLegales() {
  usePageMeta(
    "Mentions légales — Afrique NovaTech",
    "Mentions légales d'Afrique NovaTech : informations sur l'éditeur du site, l'hébergement et la propriété intellectuelle.",
  );

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.07),transparent_60%)]" />

      <PageHeader
        tag="Informations légales"
        title="Mentions légales"
        subtitle="Informations sur l'éditeur du site, l'hébergement et la propriété intellectuelle."
        backTo="/"
      />

      <div className="mt-10 space-y-5 text-sm leading-relaxed text-white/65">
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004
          pour la Confiance dans l'Économie Numérique, nous informons les utilisateurs du présent site
          des informations suivantes :
        </p>

        {sections.map((s) => (
          <section
            key={s.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <h2 className="mb-3 flex items-center gap-3 text-base font-bold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cyan-100 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-cyan-400/10 group-hover:ring-cyan-200/30 group-hover:scale-110">
                <s.Icon className="h-4 w-4" />
              </span>
              {s.title}
            </h2>
            {s.body}
          </section>
        ))}
      </div>
    </div>
  );
}
