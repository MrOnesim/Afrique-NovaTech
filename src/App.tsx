import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";

const Devis = lazy(() => import("./pages/Devis"));
const Admin = lazy(() => import("./pages/Admin"));

function PageFallback() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin-slow rounded-2xl border-2 border-cyan-200/20 border-t-cyan-200/80" />
          <div className="absolute inset-2 flex items-center justify-center text-xl text-cyan-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Afrique NovaTech</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
