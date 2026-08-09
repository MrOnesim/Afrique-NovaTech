import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function MentionsLegales() {
  usePageMeta(
    "Mentions légales — Afrique NovaTech",
    "Mentions légales d'Afrique NovaTech : informations sur l'éditeur du site, l'hébergement et la propriété intellectuelle.",
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Retour à l'accueil
      </Link>

      <h1 className="text-4xl font-black tracking-tight text-white">Mentions légales</h1>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/65">
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004
          pour la Confiance dans l'Économie Numérique, nous informons les utilisateurs du présent site
          des informations suivantes :
        </p>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Éditeur du site</h2>
          <p>Afrique NovaTech — SARL au capital de 1 000 000 FCFA</p>
          <p>Siège social : Cotonou, Bénin</p>
          <p>Email : <a href="mailto:gracaonesim@gmail.com" className="text-white underline decoration-white/30 hover:decoration-white">gracaonesim@gmail.com</a></p>
          <p>Téléphone : +229 01 41 96 92 08</p>
          <p>Directeur de la publication : Amadou Diallo</p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est la propriété
            exclusive d'Afrique NovaTech, sauf mention contraire. Toute reproduction ou
            représentation totale ou partielle sans autorisation est interdite.
          </p>
        </section>
      </div>
    </div>
  );
}
