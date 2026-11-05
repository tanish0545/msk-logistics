import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Production-grade React Error Boundary.
 * 
 * Prevents blank-screen crashes by catching unhandled exceptions,
 * providing one-click recovery, and automatically recovering from
 * stale deployment ChunkLoadErrors.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MSK ErrorBoundary caught an exception:', error, errorInfo);
    this.setState({ errorInfo });

    // Handle stale dynamic chunk imports from Vercel deployments
    const msg = error?.message || '';
    if (
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('error loading dynamically imported module') ||
      msg.includes('Loading chunk') ||
      msg.includes('ChunkLoadError')
    ) {
      const now = Date.now();
      const lastReload = Number(sessionStorage.getItem('msk_chunk_recovery_time') || '0');
      if (now - lastReload > 30000) {
        sessionStorage.setItem('msk_chunk_recovery_time', String(now));
        window.location.reload();
      }
    }
  }

  private handleRecover = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-6 bg-[#0E1117] text-white">
          <div className="max-w-md w-full bg-[#161B24] border border-[#2A3142] rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            
            {/* Warning Icon Badge */}
            <div className="w-14 h-14 mx-auto rounded-xl bg-[#B62825]/15 border border-[#B62825]/35 flex items-center justify-center text-[#B62825] shadow-lg">
              <AlertTriangle className="w-7 h-7" />
            </div>

            {/* Title & Brand */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono font-bold tracking-widest text-[#B62825] uppercase">
                MSK LOGISTICS SOLUTION
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {this.props.fallbackTitle || 'Temporary View Interruption'}
              </h2>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              We encountered a temporary rendering issue loading this section. Your session data remains safe.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                type="button"
                onClick={this.handleRecover}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recover Page</span>
              </button>
              
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all border border-white/10 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Diagnostic Message (Truncated) */}
            {this.state.error?.message && (
              <div className="pt-2">
                <p className="font-mono text-[10px] text-[#64748B] truncate max-w-xs mx-auto">
                  {this.state.error.message}
                </p>
              </div>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
