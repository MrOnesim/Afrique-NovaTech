import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteLead,
  exportLeadsCsv,
  getLeads,
  updateLeadStatus,
  type Lead,
} from "../utils/leads";
import { formatFCFA } from "../utils/quote";
import { cn } from "../utils/cn";
import { ADMIN_PASSWORD } from "../config/pricing";
import { usePageMeta } from "../hooks/usePageMeta";
import { motion } from "framer-motion";
import {
  FaLock,
  FaArrowRightFromBracket,
  FaArrowLeft,
  FaDownload,
  FaMagnifyingGlass,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaInbox,
  FaPhoneVolume,
  FaCircleCheck,
  FaChartLine,
  FaBolt,
  FaShieldHalved,
} from "react-icons/fa6";

const AUTH_KEY = "adi_admin_auth";

const STATUS_STYLES: Record<Lead["status"], string> = {
  "nouveau": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "contacté": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "converti": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
};

const STATUS_ICONS: Record<Lead["status"], typeof FaInbox> = {
  "nouveau": FaInbox,
  "contacté": FaPhoneVolume,
  "converti": FaCircleCheck,
};

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-6 pb-28 pt-32">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
        <div className="relative text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-white to-neutral-300 text-2xl text-black shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]">
            <FaLock />
          </div>
          <h1 className="text-2xl font-black text-white">Espace administrateur</h1>
          <p className="mt-1 text-sm text-white/50">
            Entrez le mot de passe pour accéder aux demandes de devis.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Mot de passe"
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-cyan-200/40 focus:ring-2 focus:ring-cyan-200/25"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-red-400"
              >
                Mot de passe incorrect.
              </motion.p>
            )}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black shadow-[0_0_35px_-10px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_45px_-8px_rgba(125,227,255,0.55)]"
            >
              <FaBolt className="h-3.5 w-3.5" /> Se connecter
            </button>
          </form>
          <p className="mt-4 text-center text-[10px] text-white/30">
            Modifiable via la variable VITE_ADMIN_PASSWORD.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  usePageMeta("Back-office — Afrique NovaTech");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [leads, setLeads] = useState<Lead[]>(() => getLeads());
  const [filter, setFilter] = useState<"tous" | Lead["status"]>("tous");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      const matchFilter = filter === "tous" || l.status === filter;
      const matchQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone || "").includes(q) ||
        (l.quoteNumber || "").toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [leads, filter, query]);

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  const refresh = () => setLeads(getLeads());

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const count = (s?: Lead["status"]) =>
    s ? leads.filter((l) => l.status === s).length : leads.length;

  const downloadCsv = () => {
    const blob = new Blob(["\uFEFF" + exportLeadsCsv()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-afrique-digital.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      label: "Demandes",
      value: count(),
      Icon: FaInbox,
      color: "text-cyan-200 bg-cyan-400/10 ring-cyan-200/20",
    },
    {
      label: "Nouveaux",
      value: count("nouveau"),
      Icon: FaInbox,
      color: "text-amber-200 bg-amber-400/10 ring-amber-200/20",
    },
    {
      label: "Contactés",
      value: count("contacté"),
      Icon: FaPhoneVolume,
      color: "text-sky-200 bg-sky-400/10 ring-sky-200/20",
    },
    {
      label: "Convertis",
      value: count("converti"),
      Icon: FaCircleCheck,
      color: "text-emerald-200 bg-emerald-400/10 ring-emerald-200/20",
    },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)]" />

      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-white/40 transition-colors hover:text-white"
          >
            <FaArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Retour au site
          </Link>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-neutral-300 text-black">
              <FaChartLine className="h-5 w-5" />
            </span>
            Back-office — Devis
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {count()} demande{count() > 1 ? "s" : ""} enregistrée{count() > 1 ? "s" : ""} sur cet appareil.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_30px_-10px_rgba(255,255,255,0.4)] transition-all hover:scale-105"
          >
            <FaDownload className="h-3.5 w-3.5" /> Export CSV
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FaArrowRightFromBracket className="h-3.5 w-3.5" /> Déconnexion
          </button>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-500 group-hover:scale-110", s.color)}>
              <s.Icon className="h-4 w-4" />
            </span>
            <div className="mt-3 text-3xl font-black text-white">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-white/40">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Filtres + recherche */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["tous", "nouveau", "contacté", "converti"] as const).map((f) => {
            const StatusIcon = f === "tous" ? FaChartLine : STATUS_ICONS[f];
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all",
                  filter === f
                    ? "border-white/40 bg-white/10 text-white shadow-[0_0_25px_-10px_rgba(255,255,255,0.5)]"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white",
                )}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {f === "tous" ? `Tous (${count()})` : `${f} (${count(f)})`}
              </button>
            );
          })}
        </div>
        <div className="relative sm:w-72">
          <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher nom, email, n° devis…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-cyan-200/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-200/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-3xl ring-1 ring-white/10">
            📭
          </div>
          <p className="text-sm text-white/50">
            {query
              ? "Aucun résultat pour cette recherche."
              : "Aucune demande pour le moment. Les devis générés sur ce navigateur apparaîtront ici."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/8 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white">{l.name}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/45">
                      {l.quoteNumber || "—"}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
                        STATUS_STYLES[l.status],
                      )}
                    >
                      {(() => {
                        const BadgeIcon = STATUS_ICONS[l.status];
                        return <BadgeIcon className="h-2.5 w-2.5" />;
                      })()}
                      {l.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                    <span className="inline-flex items-center gap-1"><FaEnvelope className="h-3 w-3" /> {l.email}</span>
                    <span className="inline-flex items-center gap-1"><FaPhone className="h-3 w-3" /> {l.phone}</span>
                    {l.city && <span className="inline-flex items-center gap-1"><FaLocationDot className="h-3 w-3" /> {l.city}</span>}
                  </div>
                  <div className="mt-1 text-xs text-white/35">
                    {new Date(l.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-white">{formatFCFA(l.totalMin)}</div>
                  <div className="text-xs text-white/40">estimation</div>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {(["nouveau", "contacté", "converti"] as const).map((s) => {
                  const StatusIcon = STATUS_ICONS[s];
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        updateLeadStatus(l.id, s);
                        refresh();
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all",
                        l.status === s
                          ? "border-white/40 bg-white/10 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white",
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {s}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    deleteLead(l.id);
                    refresh();
                  }}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/20"
                >
                  <FaTrash className="h-3 w-3" /> Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] text-white/30">
        <FaShieldHalved className="h-3 w-3" />
        Données stockées localement dans le navigateur (localStorage). Pour une solution
        multi-appareils, connectez un backend (Supabase, webhook…).
      </p>
    </div>
  );
}

