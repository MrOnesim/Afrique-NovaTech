import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erreur applicative:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_60%)]" />
          <div className="pointer-events-none absolute -left-24 top-14 h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]" />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-orange-500/10 blur-[80px]" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-4xl backdrop-blur-xl">
              ⚠️
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Oups — <span className="shine-text">une erreur</span> est survenue
            </h1>
            <p className="mx-auto mt-3 max-w-md text-white/55">
              Désolé, quelque chose s'est mal passé. Rechargez la page ou contactez-nous à{" "}
              <a href="mailto:gracaonesim@gmail.com" className="text-cyan-300 underline decoration-cyan-300/30">
                gracaonesim@gmail.com
              </a>.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_80px_-12px_rgba(125,227,255,0.5)]"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
