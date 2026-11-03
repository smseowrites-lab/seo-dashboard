import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught app error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F0FA] flex items-center justify-center p-6 text-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-purple-200 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-[#531199] flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="font-extrabold text-[#2D0C57] text-base">mFilterIt Action Center Recovered</h2>
            <p className="text-gray-600">
              An unexpected runtime state occurred. Click below to reload the application workspace.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#531199] text-white font-bold hover:bg-[#6F1FB3] transition-all shadow-xs"
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
