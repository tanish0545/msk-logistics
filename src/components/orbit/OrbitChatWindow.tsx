import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Minus,
  RotateCcw,
  Send,
  Bot,
  PhoneCall,
  FileText,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrbitChatMessage } from './OrbitChatMessage';
import type { ChatMessageItem } from './OrbitChatMessage';
import { ORBIT_QUICK_ACTIONS } from '../../data/orbitKnowledge';
import type { QuickAction } from '../../data/orbitKnowledge';
import { COMPANY_DETAILS } from '../../data/company';

export type OrbitEngineStatus = 'gemini-active' | 'local-mode' | 'unavailable';

export interface OrbitChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  messages: ChatMessageItem[];
  onSendMessage: (text: string) => void;
  onClearConversation: () => void;
  onRetryMessage: (id: string) => void;
  isLoading: boolean;
  engineStatus: OrbitEngineStatus;
  engineLabel: string;
}

export const OrbitChatWindow: React.FC<OrbitChatWindowProps> = ({
  isOpen,
  onClose,
  onMinimize,
  messages,
  onSendMessage,
  onClearConversation,
  onRetryMessage,
  isLoading,
  engineStatus,
  engineLabel,
}) => {
  const [inputText, setInputText] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    onSendMessage(text);
  };

  const handleQuickAction = (qa: QuickAction) => {
    onSendMessage(qa.prompt);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="MSK ORBIT AI Chatbot"
      className="fixed inset-x-2 bottom-2 top-14 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[640px] z-50 flex flex-col bg-[#000000] text-white rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      {/* ========================================================================= */}
      {/* 1. CHAT HEADER                                                            */}
      {/* ========================================================================= */}
      <div className="relative bg-[#070709] border-b border-white/10 p-3.5 sm:p-4 flex items-center justify-between gap-3 shrink-0">

        {/* Subtle illuminated red top border */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B62825] to-transparent pointer-events-none" />

        {/* Left: Identity & Status */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar with Orbit Pulse */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#000000] border-2 border-[#B62825] flex items-center justify-center text-white shrink-0 shadow-md">
            <Bot className="w-5 h-5 text-[#B62825]" />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${engineStatus === 'gemini-active'
                ? 'bg-emerald-500'
                : engineStatus === 'local-mode'
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
                }`}
            />
          </div>

          {/* Name & Tagline */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-sm sm:text-[15px] tracking-wide text-white truncate">
                MSK ORBIT
              </h3>
              <span className="px-1.5 py-0.2 rounded bg-[#B62825] text-[9px] font-mono font-bold text-white uppercase shrink-0">
                AI
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {engineStatus === 'gemini-active' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9.5px] font-mono font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{engineLabel || 'Gemini AI Active'}</span>
                </span>
              )}
              {engineStatus === 'local-mode' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9.5px] font-mono font-semibold text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{engineLabel || 'MSK Logistics Solution Artificial Intelligence'}</span>
                </span>
              )}
              {engineStatus === 'unavailable' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-rose-500/15 border border-rose-500/30 text-[9.5px] font-mono font-semibold text-rose-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{engineLabel || 'AI Temporarily Unavailable'}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-1 text-[#D9DEE5]">
          {/* Clear conversation */}
          <button
            type="button"
            onClick={onClearConversation}
            title="Clear Conversation"
            aria-label="Clear Conversation"
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Minimize */}
          <button
            type="button"
            onClick={onMinimize}
            title="Minimize Chat"
            aria-label="Minimize Chat"
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            title="Close Chat"
            aria-label="Close Chat"
            className="p-1.5 rounded-lg hover:bg-[#B62825] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CHAT BODY / MESSAGES LIST                                              */}
      {/* ========================================================================= */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050507] scrollbar-thin scrollbar-thumb-white/10">

        {/* Welcome Banner Card */}
        <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/10 text-xs text-[#AEB6C2] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Sparkles className="w-4 h-4 text-[#B62825]" />
            <span>Welcome to MSK Logistics Intelligent Portal</span>
          </div>
          <p className="leading-relaxed">
            I am grounded directly in verified MSK port operations, export packing protocols, container stuffing at Punjab &amp; Polaris CFS, marine lashing standards, and staging warehouse facilities.
          </p>
          {engineStatus === 'gemini-active' && (
            <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono flex items-start gap-1.5">
              <span>●</span>
              <span>
                Gemini AI Active — High-speed multimodal intelligence grounded in verified MSK port operations. English &amp; natural Hinglish supported.
              </span>
            </div>
          )}
          {engineStatus === 'local-mode' && (
            <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300 font-mono flex items-start gap-1.5">
            </div>
          )}
          {engineStatus === 'unavailable' && (
            <div className="pt-2 border-t border-white/10 text-[11px] text-rose-300 font-mono flex items-start gap-1.5">
              <span>●</span>
              <span>
                AI Temporarily Unavailable — Seamlessly running in verified MSK Logistics Solution Artificial Intelligence.
              </span>
            </div>
          )}
        </div>

        {/* Message Thread */}
        {messages.map((msg) => (
          <OrbitChatMessage
            key={msg.id}
            message={msg}
            onRetry={onRetryMessage}
            onNavigate={onClose}
          />
        ))}

        {/* Concept 09: 4 Quick Actions in 2x2 Grid under Initial Welcome Greeting */}
        {messages.length === 1 && (
          <div className="mt-2 pl-11 space-y-2 animate-in fade-in duration-300">
            <p className="text-[11px] font-mono text-[#AEB6C2]">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {ORBIT_QUICK_ACTIONS.slice(0, 4).map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium bg-[#141416] hover:bg-[#B62825] hover:text-white text-[#D9DEE5] border border-white/10 hover:border-[#B62825] transition-all text-center cursor-pointer shadow-sm active:scale-95"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typing / Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 items-center animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-[#000000] border border-[#B62825] flex items-center justify-center text-white shrink-0 shadow-md">
              <Bot className="w-4 h-4 text-[#B62825]" />
            </div>
            <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs text-[#AEB6C2]">
              <span className="font-mono text-[11px] text-[#D9DEE5]">ORBIT is thinking</span>
              <div className="flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ========================================================================= */}
      {/* 3. QUICK ACTION PILLS (Collapsible Carousel)                              */}
      {/* ========================================================================= */}
      <div className="bg-[#070709] border-t border-white/10 px-3 py-2 shrink-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
            <span>Quick Inquiries</span>
          </span>
          <button
            type="button"
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="text-[10px] text-[#94A3B8] hover:text-white font-mono inline-flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showQuickActions ? 'Hide' : 'Show (9)'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showQuickActions && (
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-none py-0.5">
            {ORBIT_QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleQuickAction(action)}
                className="py-1 px-2.5 rounded-lg text-[11px] font-medium bg-[#141416] hover:bg-[#B62825] hover:text-white text-[#D9DEE5] border border-white/10 hover:border-[#B62825] transition-all whitespace-nowrap cursor-pointer shrink-0"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. CHAT INPUT BAR                                                         */}
      {/* ========================================================================= */}
      <div className="p-3 bg-[#000000] border-t border-white/15 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about export packing, stuffing, lashing..."
            disabled={isLoading}
            className="flex-1 bg-[#0F0F12] text-white text-xs sm:text-[13px] rounded-xl px-3.5 py-2.5 border border-white/15 focus:outline-none focus:border-[#B62825] focus:ring-1 focus:ring-[#B62825] transition-all placeholder:text-[#64748B] disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            aria-label="Send message"
            className="w-10 h-10 rounded-xl bg-[#B62825] hover:bg-[#9E2220] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#B62825] text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Footer Links: Direct Quote & Operations Call */}
        <div className="pt-2 mt-1 flex items-center justify-between text-[10px] text-[#94A3B8] font-mono border-t border-white/[0.06]">
          <Link
            to="/request-quote"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[#D9DEE5] hover:text-[#B62825] transition-colors"
          >
            <FileText className="w-3 h-3 text-[#B62825]" />
            <span>Request a Quote</span>
          </Link>

          <span className="text-white/20">•</span>

          <a
            href={COMPANY_DETAILS.phoneHref}
            className="inline-flex items-center gap-1 text-[#D9DEE5] hover:text-[#B62825] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#B62825]" />
            <span>Ops: +91 81045 92823</span>
          </a>

          <span className="text-white/20">•</span>

          <a
            href={COMPANY_DETAILS.emergencyPhoneHref}
            className="text-[#B62825] font-bold hover:underline"
          >
            24×7: 8108672929
          </a>
        </div>
      </div>
    </div>
  );
};
