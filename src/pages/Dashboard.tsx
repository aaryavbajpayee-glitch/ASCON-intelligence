import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Binary,
  Gauge,
  GitCompare,
  Cpu,
  FileText,
  History as HistoryIcon,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  ArrowRight,
  ChevronRight,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

export const Dashboard: React.FC = () => {
  const { systemMetrics, history, benchmarks } = useCrypto();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chartMode, setChartMode] = useState<'throughput' | 'latency'>('throughput');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mock benchmark throughput scaling data across payload sizes
  const payloadPoints = [
    { size: '64 B', hash256TP: 3.2, xof128TP: 3.4, sha256TP: 1.8, hash256Lat: 20, xof128Lat: 18.8, sha256Lat: 35 },
    { size: '256 B', hash256TP: 4.5, xof128TP: 4.8, sha256TP: 3.1, hash256Lat: 56, xof128Lat: 53.3, sha256Lat: 82 },
    { size: '1 KB', hash256TP: 5.4, xof128TP: 5.6, sha256TP: 4.8, hash256Lat: 188, xof128Lat: 182.1, sha256Lat: 212 },
    { size: '4 KB', hash256TP: 5.7, xof128TP: 5.9, sha256TP: 5.5, hash256Lat: 720, xof128Lat: 694.9, sha256Lat: 745 },
    { size: '16 KB', hash256TP: 5.9, xof128TP: 6.1, sha256TP: 5.8, hash256Lat: 2710, xof128Lat: 2622.9, sha256Lat: 2758 },
    { size: '64 KB', hash256TP: 6.0, xof128TP: 6.2, sha256TP: 6.0, hash256Lat: 10660, xof128Lat: 10322.5, sha256Lat: 10666 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & System Telemetry Hero */}
      <div className="relative overflow-hidden rounded-lg bg-[#0a0f1d] border border-[rgba(0,240,255,0.18)] p-6 lg:p-8 telemetry-grid shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00f0ff]/10 via-[#8b5cf6]/5 to-transparent pointer-events-none rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-caps px-2 py-0.5 rounded-xs bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                NIST SP 800-232 CERTIFIED
              </span>
              <span className="label-caps px-2 py-0.5 rounded-xs bg-[#8b5cf6]/10 text-[#d0bcff] border border-[#8b5cf6]/30">
                GEMMA 4 NEURAL COPROCESSOR
              </span>
              <span className="label-caps px-2 py-0.5 rounded-xs bg-[#10b981]/10 text-[#00e676] border border-[#10b981]/30">
                128-BIT SECURITY
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-[#dbfcff] tracking-tight">
              ASCON INTELLIGENCE WORKBENCH
            </h2>
            <p className="text-sm text-[#b9cacb] leading-relaxed">
              Real-time hardware-in-the-loop performance evaluation and neural cryptanalysis for the NIST Lightweight Cryptography Standard. Operating on a 320-bit sponge state across 12-round substitution-permutation network (SPN) cycles.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-3">
            <Link
              to="/hash-generator"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00f0ff] text-[#060913] font-heading font-semibold text-sm rounded-sm hover:shadow-[0_0_16px_rgba(0,240,255,0.4)] transition cursor-pointer"
            >
              <Binary size={16} />
              <span>Launch Hash Generator</span>
            </Link>
            <Link
              to="/benchmark"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111827] text-[#00f0ff] border border-[rgba(0,240,255,0.3)] hover:bg-[rgba(0,240,255,0.08)] font-heading font-semibold text-sm rounded-sm transition cursor-pointer"
            >
              <Gauge size={16} />
              <span>Run Live Benchmark</span>
            </Link>
          </div>
        </div>

        {/* System Specs Ribbon */}
        <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-[#849495] text-[10px] uppercase">State Geometry</div>
            <div className="text-[#e0e2f1] font-semibold mt-0.5">320-Bit (5 x 64-bit)</div>
          </div>
          <div>
            <div className="text-[#849495] text-[10px] uppercase">Rate / Capacity</div>
            <div className="text-[#00f0ff] font-semibold mt-0.5">64b / 256b</div>
          </div>
          <div>
            <div className="text-[#849495] text-[10px] uppercase">Rounds (a / b)</div>
            <div className="text-[#e0e2f1] font-semibold mt-0.5">12 / 12 Permutations</div>
          </div>
          <div>
            <div className="text-[#849495] text-[10px] uppercase">S-Box Non-Linearity</div>
            <div className="text-[#d0bcff] font-semibold mt-0.5">5-bit Chi (Degree 2)</div>
          </div>
        </div>
      </div>

      {/* 4 KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Hash Operations */}
        <div className="glass-panel p-5 rounded-lg relative overflow-hidden group hover:border-[rgba(0,240,255,0.4)] transition">
          <div className="flex items-center justify-between text-[#849495] mb-2">
            <span className="label-caps">TOTAL HASH OPERATIONS</span>
            <Binary size={16} className="text-[#00f0ff]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#e0e2f1]">
              {systemMetrics.totalHashes}
            </span>
            <span className="text-xs text-[#00e676] flex items-center font-mono">
              <TrendingUp size={12} className="mr-0.5" /> +100% active
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#849495] font-mono">
            NIST SP 800-232 pipeline passes
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent" />
        </div>

        {/* Average Execution Time */}
        <div className="glass-panel p-5 rounded-lg relative overflow-hidden group hover:border-[rgba(0,240,255,0.4)] transition">
          <div className="flex items-center justify-between text-[#849495] mb-2">
            <span className="label-caps">AVG EXECUTION TIME</span>
            <Activity size={16} className="text-[#00f0ff]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#00f0ff]">
              {systemMetrics.avgExecutionTimeUs}
            </span>
            <span className="text-sm font-mono text-[#849495]">µs</span>
          </div>
          <div className="mt-2 text-[11px] text-[#849495] font-mono">
            {(systemMetrics.avgExecutionTimeUs / 1000).toFixed(3)} ms per invocation
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6]" />
        </div>

        {/* Average Throughput */}
        <div className="glass-panel p-5 rounded-lg relative overflow-hidden group hover:border-[rgba(0,240,255,0.4)] transition">
          <div className="flex items-center justify-between text-[#849495] mb-2">
            <span className="label-caps">AVERAGE THROUGHPUT</span>
            <Gauge size={16} className="text-[#00e676]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#00e676]">
              {systemMetrics.avgThroughputMBs}
            </span>
            <span className="text-sm font-mono text-[#849495]">MB/s</span>
          </div>
          <div className="mt-2 text-[11px] text-[#849495] font-mono">
            ~17.8 cycles / byte estimated
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00e676] to-transparent" />
        </div>

        {/* AI Insights Generated */}
        <div className="glass-panel-neural p-5 rounded-lg relative overflow-hidden group hover:border-[rgba(139,92,246,0.6)] transition">
          <div className="flex items-center justify-between text-[#d0bcff] mb-2">
            <span className="label-caps">AI INSIGHTS GENERATED</span>
            <Cpu size={16} className="text-[#8b5cf6]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-3xl text-[#d0bcff]">
              {systemMetrics.aiInsights}
            </span>
            <span className="text-xs text-[#8b5cf6] font-mono font-semibold">GEMMA 4</span>
          </div>
          <div className="mt-2 text-[11px] text-[#849495] font-mono">
            Hardware & security audits logged
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8b5cf6] to-transparent" />
        </div>
      </div>

      {/* Performance Overview Chart & Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                <h3 className="font-heading font-bold text-base text-[#e0e2f1]">
                  Performance Overview Telemetry
                </h3>
              </div>
              <p className="text-xs font-mono text-[#849495]">
                {chartMode === 'throughput'
                  ? 'Throughput (MB/s) vs Payload Size (Higher is better)'
                  : 'Latency (Microseconds) vs Payload Size (Lower is better)'}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-1 bg-[#0a0f1d] p-1 rounded-sm border border-[rgba(0,240,255,0.15)] text-xs font-mono">
              <button
                onClick={() => setChartMode('throughput')}
                className={`px-3 py-1 rounded-xs transition ${
                  chartMode === 'throughput'
                    ? 'bg-[#00f0ff] text-[#060913] font-semibold'
                    : 'text-[#849495] hover:text-[#e0e2f1]'
                }`}
              >
                Throughput
              </button>
              <button
                onClick={() => setChartMode('latency')}
                className={`px-3 py-1 rounded-xs transition ${
                  chartMode === 'latency'
                    ? 'bg-[#00f0ff] text-[#060913] font-semibold'
                    : 'text-[#849495] hover:text-[#e0e2f1]'
                }`}
              >
                Latency
              </button>
            </div>
          </div>

          {/* SVG Visual Graph */}
          <div className="pt-2">
            <div className="h-64 w-full flex items-end gap-3 sm:gap-6 justify-between px-2 pt-6 pb-2 relative border-b border-[rgba(255,255,255,0.08)]">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-[#00f0ff] w-full" />
                <div className="border-b border-dashed border-[#00f0ff] w-full" />
                <div className="border-b border-dashed border-[#00f0ff] w-full" />
                <div className="border-b border-dashed border-[#00f0ff] w-full" />
              </div>

              {payloadPoints.map((pt, idx) => {
                const maxVal = chartMode === 'throughput' ? 7.0 : 12000;
                const h256Val = chartMode === 'throughput' ? pt.hash256TP : pt.hash256Lat;
                const xofVal = chartMode === 'throughput' ? pt.xof128TP : pt.xof128Lat;
                const shaVal = chartMode === 'throughput' ? pt.sha256TP : pt.sha256Lat;

                const h256Height = Math.max(8, (h256Val / maxVal) * 100);
                const xofHeight = Math.max(8, (xofVal / maxVal) * 100);
                const shaHeight = Math.max(8, (shaVal / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 z-10 group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-48">
                      {/* ASCON-Hash256 Bar */}
                      <div
                        style={{ height: `${h256Height}%` }}
                        className="w-2.5 sm:w-4 bg-[#00f0ff] rounded-t-xs transition-all group-hover:brightness-125 relative"
                        title={`ASCON-Hash256: ${h256Val} ${chartMode === 'throughput' ? 'MB/s' : 'µs'}`}
                      />

                      {/* ASCON-XOF128 Bar */}
                      <div
                        style={{ height: `${xofHeight}%` }}
                        className="w-2.5 sm:w-4 bg-[#8b5cf6] rounded-t-xs transition-all group-hover:brightness-125 relative"
                        title={`ASCON-XOF128: ${xofVal} ${chartMode === 'throughput' ? 'MB/s' : 'µs'}`}
                      />

                      {/* SHA-256 Bar */}
                      <div
                        style={{ height: `${shaHeight}%` }}
                        className="w-2.5 sm:w-4 bg-[#313440] hover:bg-[#849495] rounded-t-xs transition-all"
                        title={`SHA-256 Baseline: ${shaVal} ${chartMode === 'throughput' ? 'MB/s' : 'µs'}`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#849495] group-hover:text-[#00f0ff]">
                      {pt.size}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#00f0ff] rounded-xs" />
                <span className="text-[#e0e2f1]">ASCON-Hash256</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#8b5cf6] rounded-xs" />
                <span className="text-[#e0e2f1]">ASCON-XOF128</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#313440] rounded-xs" />
                <span className="text-[#849495]">SHA-256 (Baseline)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cryptographic Architecture Card */}
        <div className="glass-panel p-6 rounded-lg flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
              <span className="label-caps text-[#00f0ff]">NIST EVALUATION SUMMARY</span>
              <ShieldCheck size={16} className="text-[#00e676]" />
            </div>

            <p className="text-xs text-[#b9cacb] leading-relaxed">
              ASCON was chosen by NIST as the standard for lightweight cryptography due to its superior trade-off between performance, gate count on hardware (FPGA/ASIC), and resistance against side-channel attacks (SCA).
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-sm bg-[#0a0f1d] border border-[rgba(0,240,255,0.1)] flex items-center justify-between">
                <span className="text-[#849495]">S-Box Algebraic Degree:</span>
                <span className="text-[#00f0ff] font-semibold">2 (Masking friendly)</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#0a0f1d] border border-[rgba(0,240,255,0.1)] flex items-center justify-between">
                <span className="text-[#849495]">Constant Time Ops:</span>
                <span className="text-[#00e676] font-semibold">Yes (No S-Box Lookups)</span>
              </div>
              <div className="p-2.5 rounded-sm bg-[#0a0f1d] border border-[rgba(0,240,255,0.1)] flex items-center justify-between">
                <span className="text-[#849495]">RAM Footprint:</span>
                <span className="text-[#e0e2f1] font-semibold">40 Bytes state total</span>
              </div>
            </div>
          </div>

          <Link
            to="/ai-assistant"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-sm bg-[#151f38] hover:bg-[#1c1f2a] border border-[rgba(139,92,246,0.4)] text-xs font-mono text-[#d0bcff] transition"
          >
            <Cpu size={14} className="text-[#8b5cf6]" />
            <span>Consult Gemma 4 on Hardware Arch</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick Access to Other Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#00f0ff]" />
            <h3 className="font-heading font-bold text-base text-[#e0e2f1]">
              Quick Access Modules
            </h3>
          </div>
          <span className="text-xs font-mono text-[#849495]">6 Dedicated Workspaces</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/hash-generator"
            className="glass-panel p-5 rounded-lg group hover:border-[#00f0ff]/50 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <Binary size={20} className="text-[#00f0ff] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#00f0ff] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#e0e2f1] group-hover:text-[#00f0ff] transition">
              Hash Generator
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Compute ASCON-Hash256 and ASCON-XOF128 with live permutation register state traces.
            </p>
          </Link>

          <Link
            to="/benchmark"
            className="glass-panel p-5 rounded-lg group hover:border-[#00f0ff]/50 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <Gauge size={20} className="text-[#00f0ff] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#00f0ff] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#e0e2f1] group-hover:text-[#00f0ff] transition">
              Performance Benchmark
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Test execution time, min/max latency, and throughput across customizable iterations.
            </p>
          </Link>

          <Link
            to="/comparison"
            className="glass-panel p-5 rounded-lg group hover:border-[#00f0ff]/50 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <GitCompare size={20} className="text-[#00f0ff] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#00f0ff] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#e0e2f1] group-hover:text-[#00f0ff] transition">
              Algorithm Comparison
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Side-by-side matrices of Hash256, XOF128, and SHA-256 with Gemma 4 neural analysis.
            </p>
          </Link>

          <Link
            to="/ai-assistant"
            className="glass-panel-neural p-5 rounded-lg group hover:border-[#8b5cf6]/60 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <Cpu size={20} className="text-[#8b5cf6] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#8b5cf6] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#d0bcff] group-hover:text-[#8b5cf6] transition">
              Gemma AI Assistant
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Interactive AI cryptanalyst grounded in your live measurements and NIST standards.
            </p>
          </Link>

          <Link
            to="/reports"
            className="glass-panel p-5 rounded-lg group hover:border-[#00f0ff]/50 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText size={20} className="text-[#00f0ff] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#00f0ff] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#e0e2f1] group-hover:text-[#00f0ff] transition">
              AI Reports
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Generate formal cryptographic certification audits, PDF exports, and CSV benchmarks.
            </p>
          </Link>

          <Link
            to="/history"
            className="glass-panel p-5 rounded-lg group hover:border-[#00f0ff]/50 transition block"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity size={20} className="text-[#00f0ff] group-hover:scale-110 transition" />
              <ArrowRight size={16} className="text-[#849495] group-hover:text-[#00f0ff] group-hover:translate-x-1 transition" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-[#e0e2f1] group-hover:text-[#00f0ff] transition">
              Audit History & Vectors
            </h4>
            <p className="text-xs text-[#849495] mt-1">
              Inspect historical hash records, filter operations, and audit NIST test vector conformance.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#00f0ff]" />
            <h3 className="font-heading font-bold text-base text-[#e0e2f1]">
              Recent Cryptographic Activity
            </h3>
          </div>
          <Link
            to="/history"
            className="text-xs font-mono text-[#00f0ff] hover:underline flex items-center gap-1"
          >
            <span>View All Records</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0a0f1d] text-[#849495] border-b border-[rgba(255,255,255,0.06)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Input Snippet</th>
                <th className="py-3 px-4">Input Size</th>
                <th className="py-3 px-4">Digest (Hex)</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#b9cacb]">
              {history.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-[#151f38]/50 transition">
                  <td className="py-3 px-4 text-[#849495]">{item.timestamp}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] border ${
                        item.algorithm === 'ASCON-Hash256'
                          ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30'
                          : 'bg-[#8b5cf6]/10 text-[#d0bcff] border-[#8b5cf6]/30'
                      }`}
                    >
                      {item.algorithm}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#e0e2f1] max-w-xs truncate">
                    {item.inputSnippet}
                  </td>
                  <td className="py-3 px-4 text-[#849495]">{item.inputSizeBytes} B</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#00f0ff] max-w-[140px] truncate">
                        {item.digestHex}
                      </span>
                      <button
                        onClick={() => handleCopy(item.id, item.digestHex)}
                        className="text-[#849495] hover:text-[#00f0ff] transition"
                        title="Copy digest"
                      >
                        {copiedId === item.id ? (
                          <Check size={13} className="text-[#00e676]" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#e0e2f1]">{item.executionTimeUs} µs</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-[#00e676]">
                      <CheckCircle2 size={12} />
                      <span className="text-[10px] font-semibold">{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
