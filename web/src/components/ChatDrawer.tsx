"use client";

import { useState } from "react";
import { ArrowUpRight, Bot, Send, Sparkles, User, X } from "lucide-react";
import { sendPortfolioChat } from "@/lib/api";
import { ChatTurn } from "@/lib/types";

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
  engineerName: string;
}

const STARTER_PROMPTS = [
  "What are your flagship software projects?",
  "Summarize your primary technical stack.",
  "What are your engineering goals right now?",
];

export function ChatDrawer({ open, onClose, engineerName }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: "assistant",
      content: `Direct interface to ${engineerName}'s live portfolio, resume, and project architecture. Ask anything about shipped systems, tech stack, or roadmap.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(STARTER_PROMPTS);
  const [referenced, setReferenced] = useState<string[]>([]);

  if (!open) return null;

  async function handleSend(rawPrompt?: string) {
    const query = (rawPrompt ?? input).trim();
    if (!query || loading) return;

    const nextHistory: ChatTurn[] = [...messages, { role: "user", content: query }];
    setMessages(nextHistory);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const data = await sendPortfolioChat(query, messages);
      setMessages([...nextHistory, { role: "assistant", content: data.reply }]);
      setReferenced(data.referenced_projects || []);
      if (data.suggested_questions && data.suggested_questions.length > 0) {
        setSuggestions(data.suggested_questions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex justify-end bg-[#0D0D0F]/40 backdrop-blur-[1px]">
      <div className="flex h-[100dvh] w-full max-w-lg flex-col border-l border-[#E4E4E7] bg-white">
        <div className="flex items-center justify-between border-b border-[#E4E4E7] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0D0D0F] text-white">
              <Sparkles className="h-4 w-4 text-[#2557D6]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0D0D0F]">Portfolio Intelligence</h2>
              <p className="font-mono-tech text-xs text-[#52525B]">
                Grounded on live DB & latest resume
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="rounded-[8px] border border-[#E4E4E7] p-2 text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#0D0D0F]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8]">
                  <Bot className="h-4 w-4 text-[#0D0D0F]" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-[8px] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0D0D0F] text-white"
                    : "border border-[#E4E4E7] bg-[#F7F7F8] text-[#0D0D0F]"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#2557D6] text-white">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="space-y-2 rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] p-4">
              <div className="h-3 w-3/4 animate-pulse rounded bg-[#E4E4E7]" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-[#E4E4E7]" />
            </div>
          )}

          {referenced.length > 0 && !loading && (
            <div className="border-t border-[#E4E4E7] pt-3">
              <span className="font-mono-tech text-[11px] font-medium tracking-wider text-[#52525B] uppercase">
                Referenced Systems
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {referenced.map((title) => (
                  <a
                    key={title}
                    href="#work"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 rounded-[8px] border border-[#E4E4E7] bg-white px-2.5 py-1 font-mono-tech text-xs text-[#0D0D0F] hover:border-[#2557D6]"
                  >
                    <span>{title}</span>
                    <ArrowUpRight className="h-3 w-3 text-[#2557D6]" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="border-t border-[#E4E4E7] bg-[#FAFAFA] px-6 py-3">
            <div className="flex flex-wrap gap-1.5">
              {suggestions.slice(0, 3).map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => handleSend(q)}
                  className="rounded-[8px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-left text-xs font-medium text-[#0D0D0F] transition-colors hover:border-[#2557D6] disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-t border-[#E4E4E7] bg-white p-4"
        >
          <label htmlFor="ai-chat-input" className="mb-1.5 block text-xs font-medium text-[#52525B]">
            Query portfolio, resume, or architecture
          </label>
          <div className="flex gap-2">
            <input
              id="ai-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FastAPI, React Native, or recent builds..."
              className="flex-1 rounded-[8px] border border-[#D4D4D8] bg-white px-3.5 py-2.5 text-sm text-[#0D0D0F] outline-none focus:ring-2 focus:ring-[#2557D6] focus:ring-offset-2"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center rounded-[8px] bg-[#2557D6] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#1E47B0] disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
