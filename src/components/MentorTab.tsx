import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Terminal, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

export default function MentorTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Greetings, Alchemist! I am your Senior Principal AI Mentor. I specialize in Big O efficiency bounds, robust microservice layouts, and high-performance algorithms. How can I streamline your engineering practices today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const promptSuggestions = [
    'Explain optimal segment tree range queries.',
    'Draft a robust thread-safe connection pool.',
    'Explain Worst-Case bounds of Dinic algorithm.',
    'Trace recursive memoization tree structures.'
  ];

  // Auto scroll chat list to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const dispatchChatMessage = async (prompt: string) => {
    if (!prompt.trim() || isSending) return;
    setIsSending(true);

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: 'ast_' + Date.now(),
            sender: 'assistant',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('AI Response empty.');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'assistant',
          text: `⚠️ Mentor communication exception: Failed to contact AI model server. Verify environment variables.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChatLogs = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: 'Greetings, Alchemist! Conversation lines purged successfully. Ask me any technical optimization task.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper function to render text with formatting
  const renderMessageContent = (text: string) => {
    if (text.includes('```')) {
      const parts = text.split('```');
      return parts.map((part, index) => {
        // If odd index, it is code block
        if (index % 2 !== 0) {
          // Extract language if specified (e.g. js\ncode)
          const firstLineBreak = part.indexOf('\n');
          let codeStr = part;
          let lang = 'javascript';
          if (firstLineBreak !== -1) {
            const possibleLang = part.substring(0, firstLineBreak).trim();
            if (possibleLang.length < 10) {
              lang = possibleLang;
              codeStr = part.substring(firstLineBreak + 1);
            }
          }
          return (
            <div key={index} className="my-4 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 font-mono text-[11px] text-gray-300">
              <div className="bg-gray-900 px-4 py-1.5 border-b border-gray-850 flex items-center justify-between text-gray-500 uppercase tracking-wider text-[9px] font-bold">
                <span>{lang} compiler block</span>
              </div>
              <pre className="p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                <code>{codeStr.trim()}</code>
              </pre>
            </div>
          );
        }
        return <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>;
      });
    }
    return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;
  };

  return (
    <div className="space-y-6 animate-fade-in flex flex-col h-[75vh]">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            Elite AI Mentor Playground
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Teach complexity math, explain data structures, and optimization bounds.</p>
        </div>

        <button
          onClick={clearChatLogs}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/50 hover:bg-gray-900 border border-gray-800 rounded-lg text-[10px] font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Purge Chats
        </button>
      </div>

      {/* Main chat window split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* Left Side: Message logs list */}
        <div className="lg:col-span-8 flex flex-col bg-gray-950/20 border border-gray-800 rounded-xl h-full overflow-hidden">
          
          {/* Messages list pane */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 no-scrollbar min-h-0">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 max-w-4xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                  m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-900 border border-gray-800 text-indigo-400'
                }`}>
                  {m.sender === 'user' ? 'U' : 'M'}
                </div>

                {/* Message Bubble Body */}
                <div className={`p-4 rounded-xl text-xs space-y-1 leading-normal ${
                  m.sender === 'user'
                    ? 'bg-indigo-600/10 border border-indigo-500/20 text-gray-200 text-left'
                    : 'bg-gray-900/40 border border-gray-800 text-gray-300'
                }`}>
                  <div className="font-semibold text-white flex items-center justify-between gap-4 pb-1 border-b border-gray-900/40 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400">
                      {m.sender === 'user' ? 'Local Alchemist' : 'Principal AI Mentor'}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono font-normal">{m.timestamp}</span>
                  </div>
                  <div className="font-mono text-xs text-gray-300">
                    {renderMessageContent(m.text)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* User Input controls bar */}
          <div className="p-4 bg-gray-950 border-t border-gray-900 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') dispatchChatMessage(inputText); }}
              placeholder="Ask me to review code, explain algorithms, or optimize runtime complexity..."
              className="flex-1 px-4 py-2.5 bg-gray-900/60 border border-gray-850 rounded-xl text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50"
              disabled={isSending}
            />
            <button
              onClick={() => dispatchChatMessage(inputText)}
              disabled={isSending || !inputText.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </div>

        </div>

        {/* Right Side: Suggestions pane */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Recommended Prompt Queries</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {promptSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => dispatchChatMessage(sug)}
                className="p-4 bg-gray-950/40 hover:bg-indigo-500/5 border border-gray-800 hover:border-indigo-500/30 rounded-xl text-left cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400 mt-0.5 group-hover:bg-indigo-500/20">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">Query Pattern {idx + 1}</h4>
                    <p className="text-[10px] text-gray-400 leading-normal mt-1 font-mono">{sug}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
