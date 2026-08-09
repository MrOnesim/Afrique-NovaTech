import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Field from "./Field";
import Reveal from "./Reveal";
import { isEmailJsConfigured } from "../utils/leads";

const FIELD_CLASS =
  "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-white/30 focus:ring-white/30";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

interface ContactForm {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

const VALIDATORS: Partial<Record<keyof ContactForm, (v: string) => string | undefined>> = {
  name: (v) => !v.trim() ? "Veuillez entrer votre nom" : undefined,
  email: (v) => !v.trim() ? "Veuillez entrer votre email" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Email invalide" : undefined,
  message: (v) => !v.trim() ? "Veuillez décrire votre projet" : v.trim().length < 10 ? "Minimum 10 caractères" : undefined,
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sentVia, setSentVia] = useState<"emailjs" | "mailto" | "">("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    projectType: "Site web",
    message: "",
  });

  const update = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    for (const key of Object.keys(VALIDATORS) as (keyof ContactForm)[]) {
      const err = VALIDATORS[key]?.(form[key]);
      if (err) next[key as keyof Errors] = err;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isEmailJsConfigured()) {
      const subject = encodeURIComponent(`Demande de projet — ${form.name}`);
      const body = encodeURIComponent(
        `Nom : ${form.name}\nEmail : ${form.email}\nEntreprise : ${form.company || "-"}\nType de projet : ${form.projectType}\n\n${form.message}`,
      );
      window.location.href = `mailto:gracaonesim@gmail.com?subject=${subject}&body=${body}`;
      setSentVia("mailto");
      setSent(true);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          project_type: form.projectType,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSentVia("emailjs");
      setSent(true);
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer ou nous écrire directement à gracaonesim@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-white/[0.06] p-8 backdrop-blur-2xl sm:p-14"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-[100px]" />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Contact
            </span>
            <h2 className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              Donnons vie à<br />votre projet
            </h2>
            <p className="mt-5 max-w-md text-white/55">
              Parlez-nous de votre idée. Notre équipe vous répond sous 24h avec une première
              proposition et un devis personnalisé.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: "✉️", label: "Email", value: "gracaonesim@gmail.com" },
                { icon: "📞", label: "Téléphone", value: "+229 01 41 96 92 08" },
                { icon: "📍", label: "Bureaux", value: "Cotonou, Bénin" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-lg ring-1 ring-white/10">
                    {c.icon}
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/40">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {sent ? (
            <Reveal className="flex flex-col items-center justify-center rounded-3xl bg-white/5 p-10 text-center ring-1 ring-white/10" role="status" aria-live="polite">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black">✓</div>
              <h3 className="text-xl font-bold">Message envoyé !</h3>
              <p className="mt-2 text-sm text-white/55">
                {sentVia === "mailto"
                  ? "Votre messagerie s'est ouverte. Merci d'envoyer le message — notre équipe vous recontacte très vite."
                  : "Merci, notre équipe vous recontacte très vite."}
              </p>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {submitError && (
                <div role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">
                  {submitError}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom complet" placeholder="Votre nom" value={form.name} onChange={(v) => update("name", v)} error={errors.name} />
                <Field label="Email" type="email" placeholder="vous@email.com" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
              </div>
              <Field label="Entreprise" placeholder="Nom de votre société" required={false} value={form.company} onChange={(v) => update("company", v)} />
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Type de projet</label>
                <select
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  className={FIELD_CLASS}
                >
                  <option>Site web</option>
                  <option>E-commerce</option>
                  <option>Application mobile</option>
                  <option>Plateforme SaaS</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Votre message</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Décrivez votre projet..."
                  aria-invalid={!!errors.message}
                  className={`${FIELD_CLASS} ${errors.message ? "ring-2 ring-red-500/50" : ""}`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
