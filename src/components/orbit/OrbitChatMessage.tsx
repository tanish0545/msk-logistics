import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, User, AlertTriangle, RotateCw, ExternalLink, ArrowRight } from 'lucide-react';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isError?: boolean;
  canRetry?: boolean;
}

export interface OrbitChatMessageProps {
  message: ChatMessageItem;
  onRetry?: (messageId: string) => void;
  onNavigate?: () => void;
}

export const OrbitChatMessage: React.FC<OrbitChatMessageProps> = ({
  message,
  onRetry,
  onNavigate,
}) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  // Parser helper to render simple bold markdown, bullet lists, and interactive links
  const renderFormattedContent = (text: string) => {
    // Split into paragraphs/lines
    const lines = text.split('\n');

    return (
      <div className="space-y-2 text-[13px] sm:text-[13.5px] leading-relaxed text-[#F4F5F7]">
        {lines.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} className="h-1" />;
          }

          // Bullet points
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
          const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, '') : line;

          // Parse markdown bold and inline markdown links [Title](url)
          const tokens = parseInlineElements(cleanLine);

          if (isBullet) {
            return (
              <div key={lineIdx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] mt-2 shrink-0" />
                <span className="flex-1">{tokens}</span>
              </div>
            );
          }

          return <p key={lineIdx}>{tokens}</p>;
        })}
      </div>
    );
  };

  // Helper to parse **bold** and [text](link)
  const parseInlineElements = (text: string) => {
    // Pattern matching [text](url) or **bold**
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="text-white font-semibold">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith('[') && matchText.includes('](') && matchText.endsWith(')')) {
        const linkText = matchText.substring(1, matchText.indexOf(']('));
        const linkUrl = matchText.substring(matchText.indexOf('](') + 2, matchText.length - 1);

        if (linkUrl.startsWith('http')) {
          parts.push(
            <a
              key={match.index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#B62825] hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          );
        } else if (linkUrl.startsWith('tel:') || linkUrl.startsWith('mailto:')) {
          parts.push(
            <a
              key={match.index}
              href={linkUrl}
              className="font-bold font-mono text-[#B62825] hover:text-red-400 underline transition-colors"
            >
              {linkText}
            </a>
          );
        } else {
          // Internal router link
          parts.push(
            <Link
              key={match.index}
              to={linkUrl}
              onClick={onNavigate}
              className="inline-flex items-center gap-1 font-semibold text-[#B62825] hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              <span>{linkText}</span>
              <ArrowRight className="w-3 h-3 inline" />
            </Link>
          );
        }
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div
      className={`flex gap-3 w-full animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Assistant Avatar Badge — Rounded square matching Concept 09 */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-[#000000] border border-[#B62825] flex items-center justify-center text-white shrink-0 shadow-md mt-0.5">
          <Bot className="w-4 h-4 text-[#B62825]" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 space-y-2 relative transition-all ${
          isUser
            ? 'bg-[#000000] text-white border border-[#B62825]/60 rounded-tr-xs shadow-[0_4px_16px_rgba(182,40,37,0.15)]'
            : isSystem
            ? 'bg-[#18181B] text-[#D9DEE5] border border-amber-500/30 rounded-tl-xs'
            : message.isError
            ? 'bg-[#1C1012] text-white border border-red-500/50 rounded-tl-xs'
            : 'bg-[#0B0B0D] text-white border border-white/10 rounded-tl-xs shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Header with Role and Timestamp */}
        <div className="flex items-center justify-between gap-3 text-[10px] font-mono border-b border-white/[0.08] pb-1.5">
          <span
            className={`font-bold tracking-wider uppercase ${
              isUser
                ? 'text-[#B62825]'
                : isSystem
                ? 'text-amber-400'
                : 'text-[#D9DEE5]'
            }`}
          >
            {isUser ? 'You' : isSystem ? 'System Notice' : 'MSK ORBIT AI'}
          </span>
          <span className="text-[#94A3B8]">{message.timestamp}</span>
        </div>

        {/* Content Body */}
        {renderFormattedContent(message.content)}

        {/* Error and Retry Action */}
        {message.isError && onRetry && (
          <div className="pt-2 border-t border-red-500/20 flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Failed to receive response</span>
            </span>
            <button
              type="button"
              onClick={() => onRetry(message.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#B62825] hover:bg-[#9E2220] text-white font-mono text-[11px] font-bold transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>

      {/* User Avatar Badge */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#18181B] border border-white/15 flex items-center justify-center text-[#D9DEE5] shrink-0 shadow-sm mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

