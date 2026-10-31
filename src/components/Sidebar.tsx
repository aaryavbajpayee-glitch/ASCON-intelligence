import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Binary,
  Gauge,
  GitCompare,
  Cpu,
  FileText,
  History as HistoryIcon,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'MAIN',
      description: 'System overview & telemetry',
    },
    {
      to: '/hash-generator',
      label: 'Hash Generator',
      icon: Binary,
      badge: 'NIST',
      description: 'ASCON-Hash256 / XOF128',
    },
    {
      to: '/benchmark',
      label: 'Performance Benchmark',
      icon: Gauge,
      badge: 'LIVE',
      description: 'Throughput & cycle testing',
    },
    {
      to: '/comparison',
      label: 'Algorithm Comparison',
      icon: GitCompare,
      badge: 'EVAL',
      description: 'Hash256 vs XOF128 vs SHA-256',
    },
    {
      to: '/ai-assistant',
      label: 'Gemma AI Assistant',
      icon: Cpu,
      badge: 'GEMMA 4',
      badgeColor: 'violet',
      description: 'Neural cryptographic coprocessor',
    },
    {
      to: '/reports',
      label: 'AI Reports',
      icon: FileText,
      badge: 'DOCS',
      description: 'Executive & hardware audits',
    },
    {
      to: '/history',
      label: 'History',
      icon: HistoryIcon || Activity,
      badge: 'LOGS',
      description: 'Past operations & test vectors',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a0f1d] border-r border-[rgba(0,240,255,0.12)] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-5 border-b border-[rgba(0,240,255,0.12)] bg-[#060913]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#00f0ff]/20 to-[#8b5cf6]/30 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <ShieldCheck size={22} className="text-[#00f0ff]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base tracking-wider text-[#e0e2f1]">
                  ASCON
                </span>
                <span className="text-[#00f0ff] font-heading font-bold text-base tracking-wider">
                  INTELLIGENCE
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#849495] tracking-tight">
                NIST SP 800-232 Cryptographic Engine
              </p>
            </div>
          </div>

          {/* Engine Status Tag */}
          <div className="mt-4 flex items-center justify-between px-2.5 py-1.5 rounded-sm bg-[#111827] border border-[rgba(0,240,255,0.1)] text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse"></span>
              <span className="text-[#b9cacb]">ASCON-CORE:</span>
            </div>
            <span className="text-[#00e676] font-semibold">VERIFIED</span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold tracking-widest text-[#849495] uppercase">
            Workstations & Routing
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isViolet = item.badgeColor === 'violet';

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-sm transition-all duration-150 border ${
                    isActive
                      ? isViolet
                        ? 'bg-[#151f38] border-[rgba(139,92,246,0.6)] text-[#e0e2f1] shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                        : 'bg-[#151f38] border-[rgba(0,240,255,0.6)] text-[#e0e2f1] shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'border-transparent text-[#b9cacb] hover:text-[#e0e2f1] hover:bg-[#111827] hover:border-[rgba(0,240,255,0.12)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={`transition-colors ${
                          isActive
                            ? isViolet
                              ? 'text-[#8b5cf6]'
                              : 'text-[#00f0ff]'
                            : 'text-[#849495] group-hover:text-[#00f0ff]'
                        }`}
                      />
                      <div className="text-left">
                        <div
                          className={`text-sm font-medium ${
                            isActive ? 'text-[#e0e2f1] font-semibold' : 'text-[#b9cacb]'
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-[10px] text-[#849495] font-mono leading-none">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`label-caps px-1.5 py-0.5 rounded-xs text-[9px] border ${
                        isViolet
                          ? 'bg-[#571bc1]/20 text-[#c4abff] border-[#8b5cf6]/40'
                          : 'bg-[#00363a]/30 text-[#00f0ff] border-[#00f0ff]/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Hardware & AI Spec */}
        <div className="p-4 border-t border-[rgba(0,240,255,0.12)] bg-[#060913]">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#849495] mb-2">
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-[#00f0ff]" />
              HARDWARE TARGET
            </span>
            <span className="text-[#00f0ff]">ARM / RISC-V</span>
          </div>

          <div className="p-2.5 rounded-sm bg-[#111827] border border-[rgba(139,92,246,0.25)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></span>
              <div>
                <div className="text-xs font-semibold text-[#e0e2f1]">Gemma 4 Coprocessor</div>
                <div className="text-[10px] font-mono text-[#8b5cf6]">Real-time Cryptanalysis</div>
              </div>
            </div>
            <Terminal size={14} className="text-[#8b5cf6]" />
          </div>
        </div>
      </aside>
    </>
  );
};
