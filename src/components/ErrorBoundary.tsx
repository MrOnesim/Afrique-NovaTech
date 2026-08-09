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
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
          <span className="text-6xl">⚠️</span>
          <h1 className="mt-4 text-2xl font-bold">Une erreur est survenue</h1>
          <p className="mt-2 max-w-md text-white/55">
            Désolé, quelque chose s'est mal passé. Rechargez la page ou
            contactez-nous à gracaonesim@gmail.com.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
          >
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
