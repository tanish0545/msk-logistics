import React, { useState, useEffect, useCallback } from 'react';
import { OrbitLauncher } from './OrbitLauncher';
import { OrbitChatWindow } from './OrbitChatWindow';
import type { OrbitEngineStatus } from './OrbitChatWindow';
import type { ChatMessageItem } from './OrbitChatMessage';
import { getLocalGroundedResponse } from '../../data/orbitKnowledge';

const STORAGE_KEY = 'msk_orbit_conversation_v1';

const INITIAL_WELCOME_MESSAGE: ChatMessageItem = {
  id: 'welcome-msg-001',
  role: 'assistant',
  content: "Hello! I'm ORBIT, your AI assistant at MSK Logistics. How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const MskOrbitChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return [INITIAL_WELCOME_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState<OrbitEngineStatus>('local-mode');
  const [engineLabel, setEngineLabel] = useState('MSK Logistics Solution Artificial Intelligence');
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) { }
  }, [messages]);

  // Check verified backend configuration on mount
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/orbit-chat/status');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'gemini-active' && data.verified) {
          setEngineStatus('gemini-active');
          setEngineLabel(data.label || 'Gemini AI Active');
        } else if (data.status === 'unavailable') {
          setEngineStatus('unavailable');
          setEngineLabel(data.label || 'AI Temporarily Unavailable');
        } else {
          setEngineStatus('local-mode');
          setEngineLabel(data.label || 'MSK Logistics Solution Artificial Intelligence');
        }
      } else {
        setEngineStatus('local-mode');
        setEngineLabel('MSK Logistics Solution Artificial Intelligence');
      }
    } catch {
      setEngineStatus('local-mode');
      setEngineLabel('MSK Logistics Solution Artificial Intelligence');
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);

    try {
      // 1. Try secure backend API first
      const res = await fetch('/api/orbit-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          conversationHistory: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'gemini-active' && data.reply) {
          setEngineStatus('gemini-active');
          setEngineLabel('Gemini AI Active');

          const aiMsg: ChatMessageItem = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, aiMsg]);
          if (!isOpen) setUnreadCount((prev) => prev + 1);
          setIsLoading(false);
          return;
        } else {
          if (data.status === 'unavailable') {
            setEngineStatus('unavailable');
            setEngineLabel('AI Temporarily Unavailable');
          } else if (data.status === 'local-mode') {
            setEngineStatus('local-mode');
            setEngineLabel('MSK Logistics Solution Artificial Intelligence');
          }

          const replyContent = data.reply || getLocalGroundedResponse(text);
          const aiMsg: ChatMessageItem = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: replyContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, aiMsg]);
          if (!isOpen) setUnreadCount((prev) => prev + 1);
          setIsLoading(false);
          return;
        }
      }

      // If response was not ok, fall back to verified local grounded knowledge
      const localGrounded = getLocalGroundedResponse(text);
      const aiMsg: ChatMessageItem = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: localGrounded,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (!isOpen) setUnreadCount((prev) => prev + 1);
    } catch (err: any) {
      clearTimeout(timeoutId);

      // On network timeout or error, reflect unavailable status and use verified grounded local knowledge
      setEngineStatus('unavailable');
      setEngineLabel('AI Temporarily Unavailable');

      const localGrounded = getLocalGroundedResponse(text);
      const aiMsg: ChatMessageItem = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: localGrounded,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (!isOpen) setUnreadCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isOpen]);

  const handleRetryMessage = useCallback((messageId: string) => {
    // Find previous user message
    const msgIdx = messages.findIndex((m) => m.id === messageId);
    if (msgIdx > 0) {
      const prevUserMsg = messages[msgIdx - 1];
      if (prevUserMsg && prevUserMsg.role === 'user') {
        // Remove error message and re-send
        setMessages((prev) => prev.filter((m) => m.id !== messageId));
        handleSendMessage(prevUserMsg.content);
      }
    }
  }, [messages, handleSendMessage]);

  const handleClearConversation = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setUnreadCount(0);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) { }
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev) setUnreadCount(0);
      return !prev;
    });
  };

  return (
    <>
      <OrbitLauncher
        isOpen={isOpen}
        onClick={handleToggle}
        unreadCount={unreadCount}
      />

      <OrbitChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearConversation={handleClearConversation}
        onRetryMessage={handleRetryMessage}
        isLoading={isLoading}
        engineStatus={engineStatus}
        engineLabel={engineLabel}
      />
    </>
  );
};
