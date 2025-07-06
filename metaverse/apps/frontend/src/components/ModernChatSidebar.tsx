'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../lib/types';

interface ModernChatSidebarProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  currentUsername: string;
}

export default function ModernChatSidebar({ 
  onSendMessage, 
  messages, 
  currentUsername 
}: ModernChatSidebarProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    console.log('ModernChatSidebar: Messages updated, new count:', messages.length);
    console.log('ModernChatSidebar: Current messages:', messages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ModernChatSidebar: handleSubmit called with message:', newMessage);
    if (newMessage.trim()) {
      console.log('ModernChatSidebar: Calling onSendMessage with:', newMessage.trim());
      onSendMessage(newMessage.trim());
      setNewMessage('');
    } else {
      console.log('ModernChatSidebar: Message is empty, not sending');
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-96 h-full bg-slate-900 border-l border-slate-700 flex flex-col">
      {/* Chat Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <h3 className="text-lg font-bold text-white">Space Chat</h3>
        </div>
        <p className="text-sm text-slate-400 mt-1">{messages.length} messages</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/>
                </svg>
              </div>
              <p className="text-white font-medium mb-1">No messages yet</p>
              <p className="text-sm text-slate-400">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.username === currentUsername ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg relative ${
                    message.username === currentUsername
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold opacity-90">
                      {message.username === currentUsername ? 'You' : message.username}
                    </span>
                    <span className="text-xs opacity-60 ml-2">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  
                  {/* Message tail */}
                  <div 
                    className={`absolute top-3 w-2 h-2 transform rotate-45 ${
                      message.username === currentUsername
                        ? 'bg-blue-600 -right-1'
                        : 'bg-slate-700 -left-1'
                    }`}
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-slate-800 border-t border-slate-700 p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              maxLength={200}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">
              {newMessage.length}/200
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
} 