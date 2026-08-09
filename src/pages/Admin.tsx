import { useState } from "react";
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

const AUTH_KEY = "adi_admin_auth";

const STATUS_STYLES: Record<Lead["status"], string> = {
  "nouveau": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  "contacté": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  "converti": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
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
    <div className="relative z-10 mx-auto max-w-md px-6 pt-32 pb-28">
      <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.06] p-8 backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-black">
          🔐
        </div>
        <h1 className="text-center text-xl font-black text-white">Espace administrateur</h1>
        <p className="mt-1 text-center text-sm text-white/50">
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
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/40"
          />
          {error && (
            <p className="text-xs text-red-400">Mot de passe incorrect.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-[10px] text-white/30">
          Modifiable via la variable VITE_ADMIN_PASSWORD.
        </p>
      </div>
    </div>
  );
}

export default function Admin() {
  usePageMeta("Back-office — Afrique NovaTech");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [leads, setLeads] = useState<Lead[]>(() => getLeads());
  const [filter, setFilter] = useState<"tous" | Lead["status"]>("tous");

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  const refresh = () => setLeads(getLeads());

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const filtered = filter === "tous" ? leads : leads.filter((l) => l.status === filter);

  const downloadCsv = () => {
    const blob = new Blob(["\uFEFF" + exportLeadsCsv()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-afrique-digital.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const count = (s?: Lead["status"]) =>
    s ? leads.filter((l) => l.status === s).length : leads.length;

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="text-xs text-white/40 transition-colors hover:text-white">
            ← Retour au site
          </Link>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Back-office — Devis</h1>
          <p className="mt-1 text-sm text-white/50">
            {count()} demande{count() > 1 ? "s" : ""} enregistrée{count() > 1 ? "s" : ""} sur cet appareil.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadCsv}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            ⬇ Export CSV
          </button>
          <button
            onClick={logout}
            className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["tous", "nouveau", "contacté", "converti"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm transition-all",
              filter === f
                ? "border-white/40 bg-white/10 text-white"
                : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
            )}
          >
            {f === "tous" ? `Tous (${count()})` : `${f} (${count(f)})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <div className="mb-3 text-3xl">📭</div>
          <p className="text-sm text-white/50">
            Aucune demande pour le moment. Les devis générés sur ce navigateur apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l) => (
            <div
              key={l.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white">{l.name}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/45">
                      {l.quoteNumber || "—"}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
                        STATUS_STYLES[l.status],
                      )}
                    >
                      {l.status}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {l.email} · {l.phone} {l.city && `· ${l.city}`}
                  </div>
                  <div className="mt-1 text-xs text-white/35">
                    {new Date(l.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-white">
                    {formatFCFA(l.totalMin)}
                  </div>
                  <div className="text-xs text-white/40">estimation</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["nouveau", "contacté", "converti"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateLeadStatus(l.id, s);
                      refresh();
                    }}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs transition-all",
                      l.status === s
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white"
                    )}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => {
                    deleteLead(l.id);
                    refresh();
                  }}
                  className="ml-auto rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/20"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-[11px] text-white/30">
        Données stockées localement dans le navigateur (localStorage). Pour une solution
        multi-appareils, connectez un backend (Supabase, webhook…).
      </p>
    </div>
  );
}
