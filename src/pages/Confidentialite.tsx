import PageHeader from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { FaDatabase, FaListCheck, FaClock, FaUserShield, FaEnvelope } from "react-icons/fa6";

const sections = [
  {
    Icon: FaDatabase,
    title: "Données collectées",
    body: "Nous collectons les informations que vous nous fournissez volontairement via le formulaire de contact : nom, email, entreprise, et message. Nous utilisons également des cookies techniques nécessaires au fonctionnement du site.",
  },
  {
    Icon: FaListCheck,
    title: "Utilisation des données",
    body: "Vos données sont utilisées uniquement pour répondre à vos demandes, vous fournir un devis, et améliorer nos services. Elles ne sont jamais revendues à des tiers.",
  },
  {
    Icon: FaClock,
    title: "Durée de conservation",
    body: "Vos données sont conservées pendant 3 ans après votre dernier contact avec nous.",
  },
  {
    Icon: FaUserShield,
    title: "Vos droits",
    body: "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à gracaonesim@gmail.com.",
  },
];

export default function Confidentialite() {
  usePageMeta(
    "Politique de confidentialité — Afrique NovaTech",
    "Politique de confidentialité d'Afrique NovaTech : quelles données nous collectons et comment elles sont utilisées.",
  );

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.07),transparent_60%)]" />

      <PageHeader
        tag="Votre vie privée"
        title="Politique de confidentialité"
        subtitle="Quelles données nous collectons, pourquoi, et comment elles sont protégées."
        backTo="/"
      />

      <div className="mt-10 space-y-5 text-sm leading-relaxed text-white/65">
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          La présente politique de confidentialité décrit comment Afrique NovaTech collecte,
          utilise et protège vos données personnelles.
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
            <p>
              {s.title === "Vos droits" ? (
                <>
                  {s.body}{" "}
                  <a
                    href="mailto:gracaonesim@gmail.com"
                    className="inline-flex items-center gap-1 text-cyan-300 underline decoration-cyan-300/30 hover:text-cyan-200"
                  >
                    <FaEnvelope className="h-3 w-3" /> gracaonesim@gmail.com
                  </a>
                </>
              ) : (
                s.body
              )}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
