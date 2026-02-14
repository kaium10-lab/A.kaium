
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getAIResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm Abdul's AI assistant. Ask me anything about his projects, skills, or studies at DPI!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getAIResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Portfolio Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }} 
                className="text-white/60 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              />
              <button 
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-colors active:scale-90 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-600/40 relative group cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
        
        <div className="absolute right-full mr-4 px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Ask my AI Assistant!
        </div>
      </motion.button>
    </div>
  );
};

export default AIChat;
