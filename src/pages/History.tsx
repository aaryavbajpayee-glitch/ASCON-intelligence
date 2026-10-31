import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Trash2,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Binary,
  ArrowRight,
  ShieldCheck,
  Eye,
  X,
} from 'lucide-react';
import { useCrypto, HashHistoryItem } from '../context/CryptoContext';
import { HexViewer } from '../components/HexViewer';

export const History: React.FC = () => {
  const { history, clearHistory } = useCrypto();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [algoFilter, setAlgoFilter] = useState<'ALL' | 'ASCON-Hash256' | 'ASCON-XOF128'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HashHistoryItem | null>(null);

  const filteredHistory = history.filter((item) => {
    const matchesAlgo = algoFilter === 'ALL' || item.algorithm === algoFilter;
    const matchesSearch =
      item.inputSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.digestHex.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timestamp.includes(searchQuery);
    return matchesAlgo && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ascon_audit_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(0,240,255,0.12)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#dbfcff]">
              Operational History & Test Vector Audit Log
            </h2>
          </div>
          <p className="text-xs font-mono text-[#849495] mt-1">
            Complete cryptographic audit trail of all ASCON-Hash256 and ASCON-XOF128 executions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111827] hover:border-[#00f0ff] border border-[rgba(0,240,255,0.2)] text-xs font-mono text-[#00f0ff] transition cursor-pointer"
          >
            <Download size={13} />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={clearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111827] hover:border-[#ef4444] border border-[rgba(239,68,68,0.2)] text-xs font-mono text-[#ffb4ab] transition cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#849495]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by input snippet, digest hex, or date..."
            className="w-full pl-9 pr-4 py-2 bg-[#0a0f1d] border border-[rgba(255,255,255,0.12)] focus:border-[#00f0ff] rounded-sm text-xs font-mono text-[#e0e2f1] outline-none transition"
          />
        </div>

        {/* Algorithm Filter Buttons */}
        <div className="flex items-center gap-1 bg-[#0a0f1d] p-1 rounded-sm border border-[rgba(0,240,255,0.15)] text-xs font-mono self-start sm:self-auto">
          {(['ALL', 'ASCON-Hash256', 'ASCON-XOF128'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setAlgoFilter(filter)}
              className={`px-3 py-1 rounded-xs transition cursor-pointer ${
                algoFilter === filter
                  ? 'bg-[#00f0ff] text-[#060913] font-semibold'
                  : 'text-[#849495] hover:text-[#e0e2f1]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* History Records Table */}
      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <span className="label-caps text-[#00f0ff]">AUDITED SESSIONS</span>
          <span className="text-xs font-mono text-[#849495]">
            Showing {filteredHistory.length} of {history.length} records
          </span>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Activity size={32} className="mx-auto text-[#849495]/40" />
            <div className="text-xs font-mono text-[#849495]">
              No cryptographic history records match the filter query.
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0a0f1d] text-[#849495] uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Algorithm</th>
                  <th className="py-3 px-4">Input Snippet</th>
                  <th className="py-3 px-4">Payload Size</th>
                  <th className="py-3 px-4">Digest Hex</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#b9cacb]">
                {filteredHistory.map((item) => (
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
                          className="text-[#849495] hover:text-[#00f0ff] transition cursor-pointer"
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
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-2 py-1 rounded-xs bg-[#111827] hover:bg-[#151f38] text-[11px] text-[#00f0ff] border border-[rgba(0,240,255,0.2)] transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Inspection Modal / Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0a0f1d] border border-[rgba(0,240,255,0.4)] rounded-lg p-6 max-w-2xl w-full shadow-[0_0_24px_rgba(0,240,255,0.2)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#00f0ff]" />
                <h3 className="font-heading font-bold text-base text-[#dbfcff]">
                  Cryptographic Operation Inspection
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-[#849495] hover:text-[#e0e2f1] transition p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xs bg-[#111827]">
                  <span className="text-[#849495] block text-[10px]">Algorithm:</span>
                  <span className="text-[#00f0ff] font-bold text-sm">{selectedItem.algorithm}</span>
                </div>
                <div className="p-2.5 rounded-xs bg-[#111827]">
                  <span className="text-[#849495] block text-[10px]">Execution Latency:</span>
                  <span className="text-[#00e676] font-bold text-sm">
                    {selectedItem.executionTimeUs} µs ({selectedItem.executionTimeMs} ms)
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#849495] block text-[10px] mb-1">Input Snippet:</span>
                <div className="p-2.5 rounded-xs bg-[#111827] text-[#e0e2f1] break-all">
                  {selectedItem.inputSnippet}
                </div>
              </div>

              <div>
                <span className="text-[#849495] block text-[10px] mb-1">Output Squeeze Register:</span>
                <HexViewer hex={selectedItem.digestHex} bytesPerRow={8} label="DIGEST HEX STREAM" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-[#111827] hover:bg-[#151f38] text-xs font-mono text-[#00f0ff] border border-[rgba(0,240,255,0.3)] rounded-sm transition cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
