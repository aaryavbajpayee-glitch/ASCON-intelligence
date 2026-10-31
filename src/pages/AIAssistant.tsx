import React, { useState, useRef, useEffect } from 'react';
import {
  Cpu,
  Send,
  Sparkles,
  Database,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const { benchmarks, history, systemMetrics, incrementAiInsights } = useCrypto();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: `### Welcome to Gemma 4 Cryptographic Intelligence Engine

I am your neural coprocessor for **ASCON (NIST SP 800-232)** lightweight cryptography. I am connected directly to your active hardware benchmark telemetry and operation logs.

**Active Telemetry Context:**
- Total Operations Logged: \`${systemMetrics.totalHashes}\`
- Benchmark Records Available: \`${benchmarks.length}\`
- Average Measured Latency: \`${systemMetrics.avgExecutionTimeUs} µs\`
- Average Throughput: \`${systemMetrics.avgThroughputMBs} MB/s\`

Ask me to evaluate your real benchmark throughput, dissect the 5-bit Chi S-box, assess side-channel resistance, or provide assembly optimization strategies for ARM Cortex-M or RISC-V targets.`,
      timestamp: '08:10:00',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showContextDrawer, setShowContextDrawer] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestedQuestions = [
    'Analyze active throughput difference between ASCON-Hash256 and ASCON-XOF128',
    'Explain the S-box substitution layer and side-channel resistance in ASCON',
    'Why did NIST select ASCON for constrained IoT microcontrollers over SHA-256?',
    'Provide embedded C optimization suggestions for 32-bit ARM Cortex-M4 registers',
  ];

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Build actual benchmark context data to send to server
      const contextData = {
        systemMetrics,
        latestBenchmarks: benchmarks.slice(0, 5),
        recentHashes: history.slice(0, 3).map((h) => ({
          algorithm: h.algorithm,
          inputSize: h.inputSizeBytes,
          executionTimeUs: h.executionTimeUs,
          status: h.status,
        })),
      };

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          contextData,
        }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from neural engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      incrementAiInsights();
    } catch (error) {
      console.error(error);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: `### Telemetry Analysis Alert\n\nFailed to establish connection to the Gemma 4 neural coprocessor service. Please check your network or server configuration.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Top Gemma 4 Branding & Context Drawer Bar */}
      <div className="glass-panel-neural p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-[rgba(139,92,246,0.4)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#8b5cf6]/30 to-[#571bc1]/50 border border-[#8b5cf6]/60 flex items-center justify-center text-[#d0bcff] shadow-[0_0_15px_rgba(139,92,246,0.35)]">
            <Cpu size={22} className="text-[#8b5cf6] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-base text-[#e0e2f1]">
                Gemma 4 Neural Cryptographic Coprocessor
              </h2>
              <span className="label-caps px-1.5 py-0.5 rounded-xs bg-[#8b5cf6]/20 text-[#c4abff] border border-[#8b5cf6]/40 text-[9px]">
                ACTIVE AI WORKSPACE
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#849495]">
              Real-time cryptanalysis grounded strictly in active NIST benchmark measurements
            </p>
          </div>
        </div>

        {/* Context Button */}
        <button
          onClick={() => setShowContextDrawer(!showContextDrawer)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0a0f1d] hover:bg-[#151f38] border border-[rgba(139,92,246,0.3)] text-xs font-mono text-[#d0bcff] transition cursor-pointer self-start sm:self-auto"
        >
          <Database size={13} className="text-[#8b5cf6]" />
          <span>Active Telemetry Context ({benchmarks.length} runs)</span>
          {showContextDrawer ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Collapsible Telemetry Context Drawer */}
      {showContextDrawer && (
        <div className="glass-panel p-4 rounded-lg border-[rgba(139,92,246,0.3)] bg-[#0a0f1d] text-xs font-mono space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
            <span className="text-[#8b5cf6] font-semibold">GROUNDED BENCHMARK CONTEXT PAYLOAD</span>
            <span className="text-[10px] text-[#849495]">Transmitted with every query</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
            <div className="p-2 rounded-xs bg-[#111827]">
              <span className="text-[#849495] block text-[10px]">Total Operations:</span>
              <span className="text-[#00f0ff] font-bold">{systemMetrics.totalHashes}</span>
            </div>
            <div className="p-2 rounded-xs bg-[#111827]">
              <span className="text-[#849495] block text-[10px]">Avg Latency:</span>
              <span className="text-[#00f0ff] font-bold">{systemMetrics.avgExecutionTimeUs} µs</span>
            </div>
            <div className="p-2 rounded-xs bg-[#111827]">
              <span className="text-[#849495] block text-[10px]">Avg Throughput:</span>
              <span className="text-[#00e676] font-bold">{systemMetrics.avgThroughputMBs} MB/s</span>
            </div>
            <div className="p-2 rounded-xs bg-[#111827]">
              <span className="text-[#849495] block text-[10px]">Hardware Target:</span>
              <span className="text-[#d0bcff] font-bold">ARM / RISC-V / V8</span>
            </div>
          </div>

          <p className="text-[10px] text-[#849495] pt-1">
            Gemma 4 strictly evaluates these live numbers. It will not fabricate benchmark samples or claim false measurements.
          </p>
        </div>
      )}

      {/* Main Chat Workspace */}
      <div className="flex-1 glass-panel rounded-lg flex flex-col overflow-hidden border-[rgba(0,240,255,0.12)]">
        {/* Messages Stream Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-sm shrink-0 flex items-center justify-center border text-xs font-mono ${
                    isUser
                      ? 'bg-[#00f0ff]/20 border-[#00f0ff]/40 text-[#00f0ff]'
                      : 'bg-[#8b5cf6]/20 border-[#8b5cf6]/40 text-[#d0bcff]'
                  }`}
                >
                  {isUser ? 'OP' : <Cpu size={16} />}
                </div>

                {/* Bubble */}
                <div
                  className={`relative rounded-md p-4 text-xs leading-relaxed transition ${
                    isUser
                      ? 'bg-[#151f38] text-[#e0e2f1] border border-[rgba(0,240,255,0.3)] shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                      : 'bg-[#0a0f1d] text-[#b9cacb] border border-[rgba(139,92,246,0.3)] shadow-[0_0_12px_rgba(139,92,246,0.1)]'
                  }`}
                >
                  {/* Top Bar for assistant */}
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">
                    <span className={isUser ? 'text-[#00f0ff]' : 'text-[#8b5cf6] font-semibold'}>
                      {isUser ? 'OPERATOR' : 'GEMMA 4 COPROCESSOR'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#849495]">{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-[#849495] hover:text-[#00f0ff] transition"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check size={12} className="text-[#00e676]" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Content with pre-line format */}
                  <div className="whitespace-pre-line font-sans space-y-2 text-[13px] text-[#e0e2f1]">
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-xs font-mono text-[#8b5cf6] bg-[#0a0f1d] p-3 rounded-md border border-[#8b5cf6]/30 max-w-md">
              <RefreshCw size={16} className="animate-spin" />
              <span>Gemma 4 is processing cryptographic telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Ribbon */}
        <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.08)] bg-[#0a0f1d] overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="label-caps text-[#849495] text-[9px] flex items-center gap-1">
              <Sparkles size={11} className="text-[#8b5cf6]" /> PROMPT TEMPLATES:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[11px] font-mono rounded-xs bg-[#111827] hover:bg-[#151f38] text-[#b9cacb] hover:text-[#00f0ff] border border-[rgba(255,255,255,0.08)] hover:border-[#00f0ff]/40 transition cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#060913] border-t border-[rgba(0,240,255,0.12)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Gemma 4 to analyze permutation cycles, side-channel safety, or embedded optimization..."
              disabled={isLoading}
              className="flex-1 bg-[#0a0f1d] border border-[rgba(255,255,255,0.12)] focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] rounded-sm px-4 py-2.5 text-xs font-mono text-[#e0e2f1] outline-none transition"
            />

            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-2.5 bg-[#8b5cf6] hover:bg-[#a78bfa] text-[#060913] font-heading font-semibold text-xs rounded-sm transition cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.3)] disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send size={14} />
              <span className="hidden sm:inline">Send Query</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
