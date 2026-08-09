import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Confidentialite() {
  usePageMeta(
    "Politique de confidentialité — Afrique NovaTech",
    "Politique de confidentialité d'Afrique NovaTech : quelles données nous collectons et comment elles sont utilisées.",
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

      <h1 className="text-4xl font-black tracking-tight text-white">Politique de confidentialité</h1>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/65">
        <p>
          La présente politique de confidentialité décrit comment Afrique NovaTech collecte,
          utilise et protège vos données personnelles.
        </p>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Données collectées</h2>
          <p>
            Nous collectons les informations que vous nous fournissez volontairement via le formulaire
            de contact : nom, email, entreprise, et message. Nous utilisons également des cookies
            techniques nécessaires au fonctionnement du site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Utilisation des données</h2>
          <p>
            Vos données sont utilisées uniquement pour répondre à vos demandes, vous fournir un devis,
            et améliorer nos services. Elles ne sont jamais revendues à des tiers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant 3 ans après votre dernier contact avec nous.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-white">Vos droits</h2>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit
            d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous
            à{' '}
            <a href="mailto:gracaonesim@gmail.com" className="text-white underline decoration-white/30 hover:decoration-white">
              gracaonesim@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
