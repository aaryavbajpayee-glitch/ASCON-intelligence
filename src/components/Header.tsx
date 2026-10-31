import React from 'react';
import { Menu, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const location = useLocation();

  const getPageInfo = (path: string) => {
    switch (path) {
      case '/dashboard':
        return { title: 'Dashboard', sub: 'System Telemetry & Performance Matrix' };
      case '/hash-generator':
        return { title: 'Hash Generator', sub: 'ASCON-Hash256 & ASCON-XOF128 Permutation Engine' };
      case '/benchmark':
        return { title: 'Performance Benchmark', sub: 'Throughput & Micro-benchmarking Suite' };
      case '/comparison':
        return { title: 'Algorithm Comparison', sub: 'ASCON-Hash256 vs ASCON-XOF128 vs SHA-256' };
      case '/ai-assistant':
        return { title: 'Gemma AI Assistant', sub: 'Gemma 4 Cryptographic Reasoning Workspace' };
      case '/reports':
        return { title: 'AI Reports', sub: 'Automated Cryptographic Certification & Performance Audits' };
      case '/history':
        return { title: 'History & Test Vectors', sub: 'Operational Digest & Benchmark Audit Log' };
      default:
        return { title: 'ASCON Intelligence', sub: 'Lightweight Cryptography Workbench' };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[rgba(0,240,255,0.12)] px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-sm text-[#849495] hover:text-[#00f0ff] hover:bg-[#111827] transition border border-[rgba(0,240,255,0.15)]"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-bold text-lg text-[#e0e2f1] tracking-wide">
              {pageInfo.title}
            </h1>
            <span className="hidden sm:inline-block label-caps px-1.5 py-0.5 rounded-xs text-[9px] bg-[#00363a]/30 text-[#00f0ff] border border-[#00f0ff]/30">
              ROUTE: {location.pathname}
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-[#849495] font-mono leading-tight">
            {pageInfo.sub}
          </p>
        </div>
      </div>

      {/* Right: Telemetry chips and quick link */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* NIST Verified Chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#10b981]/10 border border-[#10b981]/30 text-[11px] font-mono text-[#00e676]">
          <ShieldCheck size={14} className="text-[#00e676]" />
          <span>NIST SP 800-232</span>
        </div>

        {/* State Size */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#111827] border border-[rgba(0,240,255,0.15)] text-[11px] font-mono text-[#b9cacb]">
          <Activity size={13} className="text-[#00f0ff]" />
          <span>320-BIT PERMUTATION</span>
        </div>

        {/* AI coprocessor link */}
        <Link
          to="/ai-assistant"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-gradient-to-r from-[#151f38] to-[#262a35] hover:border-[rgba(139,92,246,0.6)] border border-[rgba(139,92,246,0.3)] text-xs font-mono text-[#d0bcff] transition shadow-[0_0_10px_rgba(139,92,246,0.15)]"
        >
          <Cpu size={14} className="text-[#8b5cf6] animate-pulse" />
          <span className="hidden sm:inline font-semibold">GEMMA 4 COPROCESSOR</span>
          <span className="sm:hidden font-semibold">GEMMA 4</span>
        </Link>
      </div>
    </header>
  );
};
