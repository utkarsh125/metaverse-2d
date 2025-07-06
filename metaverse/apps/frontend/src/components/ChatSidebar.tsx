'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../lib/types';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  currentUsername: string;
}

export default function ChatSidebar({ 
  isOpen, 
  onToggle, 
  onSendMessage, 
  messages, 
  currentUsername 
}: ChatSidebarProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    console.log('ChatSidebar: Messages updated, new count:', messages.length);
    console.log('ChatSidebar: Current messages:', messages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ChatSidebar: handleSubmit called with message:', newMessage);
    if (newMessage.trim()) {
      console.log('ChatSidebar: Calling onSendMessage with:', newMessage.trim());
      onSendMessage(newMessage.trim());
      setNewMessage('');
    } else {
      console.log('ChatSidebar: Message is empty, not sending');
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* 8-bit Style Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-24 right-4 z-50 transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ 
          zIndex: 100,
          width: '56px',
          height: '56px',
          background: 'linear-gradient(45deg, #ff6b6b 0%, #ff8e8e 50%, #ff6b6b 100%)',
          border: '4px solid #2c3e50',
          borderRadius: '0px',
          boxShadow: '4px 4px 0px #1a252f, inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.3)',
          imageRendering: 'pixelated'
        }}
      >
        <div className="text-white font-bold text-lg">💬</div>
      </button>

      {/* 8-bit Style Chat Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          zIndex: 90,
          background: 'linear-gradient(180deg, #34495e 0%, #2c3e50 100%)',
          border: '4px solid #1a252f',
          borderRight: 'none',
          boxShadow: '-8px 0px 0px #1a252f, inset 2px 2px 0px rgba(255,255,255,0.1)',
          imageRendering: 'pixelated'
        }}
      >
        {/* 8-bit Header */}
        <div 
          className="text-white p-4 flex justify-between items-center relative"
          style={{
            background: 'linear-gradient(45deg, #e74c3c 0%, #c0392b 100%)',
            border: '2px solid #8b0000',
            boxShadow: 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.2)'
          }}
        >
          <h3 className="text-lg font-bold" style={{ 
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px #8b0000',
            letterSpacing: '1px'
          }}>
            ⚡ SPACE CHAT ⚡
          </h3>
          <button
            onClick={onToggle}
            className="hover:scale-110 active:scale-95 transition-transform"
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #95a5a6 0%, #7f8c8d 100%)',
              border: '2px solid #34495e',
              borderRadius: '0px',
              boxShadow: '2px 2px 0px #2c3e50, inset -1px -1px 0px rgba(0,0,0,0.3), inset 1px 1px 0px rgba(255,255,255,0.3)'
            }}
          >
            <span className="text-white font-bold text-lg">×</span>
          </button>
        </div>

        {/* 8-bit Messages Container */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3 h-full pb-24"
          style={{
            background: 'linear-gradient(180deg, #34495e 0%, #2c3e50 100%)',
            backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 2px, transparent 2px),
              radial-gradient(circle at 75px 75px, rgba(255,255,255,0.05) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px',
            imageRendering: 'pixelated'
          }}
        >
          {messages.length === 0 ? (
            <div 
              className="text-center mt-8 p-4"
              style={{
                background: 'linear-gradient(45deg, #3498db 0%, #2980b9 100%)',
                border: '2px solid #1e3a8a',
                borderRadius: '0px',
                boxShadow: '4px 4px 0px #1e3a8a, inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.3)'
              }}
            >
              <p className="text-white font-bold" style={{ 
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px #1e3a8a',
                fontSize: '14px'
              }}>
                🎮 NO MESSAGES YET! 🎮
              </p>
              <p className="text-blue-100 text-sm mt-2" style={{ 
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #1e3a8a'
              }}>
                Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.username === currentUsername ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className="max-w-xs px-3 py-2 relative"
                  style={{
                    background: message.username === currentUsername 
                      ? 'linear-gradient(45deg, #27ae60 0%, #229954 100%)'
                      : 'linear-gradient(45deg, #f39c12 0%, #e67e22 100%)',
                    border: '2px solid ' + (message.username === currentUsername ? '#1e8449' : '#d35400'),
                    borderRadius: '0px',
                    boxShadow: '3px 3px 0px ' + (message.username === currentUsername ? '#1e8449' : '#d35400') + ', inset -1px -1px 0px rgba(0,0,0,0.3), inset 1px 1px 0px rgba(255,255,255,0.3)',
                    imageRendering: 'pixelated'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-xs font-bold text-white"
                      style={{ 
                        fontFamily: 'monospace',
                        textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {message.username === currentUsername ? '👤 YOU' : `👤 ${message.username.toUpperCase()}`}
                    </span>
                    <span 
                      className="text-xs opacity-75 text-white"
                      style={{ 
                        fontFamily: 'monospace',
                        textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p 
                    className="text-sm text-white"
                    style={{ 
                      fontFamily: 'monospace',
                      textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                      lineHeight: '1.4'
                    }}
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 8-bit Message Input */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            background: 'linear-gradient(180deg, #34495e 0%, #2c3e50 100%)',
            border: '2px solid #1a252f',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            boxShadow: 'inset 0px 2px 0px rgba(255,255,255,0.1)'
          }}
        >
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-white placeholder-gray-300"
              style={{
                background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
                border: '2px solid #1a252f',
                borderRadius: '0px',
                boxShadow: 'inset 2px 2px 0px rgba(0,0,0,0.3), inset -1px -1px 0px rgba(255,255,255,0.1)',
                fontFamily: 'monospace',
                fontSize: '14px',
                outline: 'none'
              }}
              maxLength={200}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 text-white font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: !newMessage.trim() 
                  ? 'linear-gradient(45deg, #95a5a6 0%, #7f8c8d 100%)'
                  : 'linear-gradient(45deg, #e74c3c 0%, #c0392b 100%)',
                border: '2px solid ' + (!newMessage.trim() ? '#7f8c8d' : '#8b0000'),
                borderRadius: '0px',
                boxShadow: !newMessage.trim() 
                  ? '2px 2px 0px #7f8c8d, inset -1px -1px 0px rgba(0,0,0,0.3), inset 1px 1px 0px rgba(255,255,255,0.3)'
                  : '3px 3px 0px #8b0000, inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.3)',
                fontFamily: 'monospace',
                fontSize: '14px',
                letterSpacing: '1px',
                textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated'
              }}
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* 8-bit Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-80 transition-opacity duration-300"
          onClick={onToggle}
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            backdropFilter: 'blur(2px)',
            imageRendering: 'pixelated'
          }}
        />
      )}
    </>
  );
} 