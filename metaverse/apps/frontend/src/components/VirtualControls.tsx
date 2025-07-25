'use client';

import React from 'react';

interface VirtualControlsProps {
  onDirectionPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onDirectionRelease: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const VirtualControls: React.FC<VirtualControlsProps> = ({
  onDirectionPress,
  onDirectionRelease,
}) => {
  return (
    <div className="fixed bottom-24 right-6 grid grid-cols-3 gap-2 bg-black/60 backdrop-blur-sm p-4 rounded-2xl border border-white/20 touch-none">
      {/* Up button */}
      <div className="col-start-2">
        <button
          className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
          onTouchStart={() => onDirectionPress('up')}
          onTouchEnd={() => onDirectionRelease('up')}
          onMouseDown={() => onDirectionPress('up')}
          onMouseUp={() => onDirectionRelease('up')}
          onMouseLeave={() => onDirectionRelease('up')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Left button */}
      <div className="col-start-1 row-start-2">
        <button
          className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
          onTouchStart={() => onDirectionPress('left')}
          onTouchEnd={() => onDirectionRelease('left')}
          onMouseDown={() => onDirectionPress('left')}
          onMouseUp={() => onDirectionRelease('left')}
          onMouseLeave={() => onDirectionRelease('left')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Down button */}
      <div className="col-start-2 row-start-2">
        <button
          className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
          onTouchStart={() => onDirectionPress('down')}
          onTouchEnd={() => onDirectionRelease('down')}
          onMouseDown={() => onDirectionPress('down')}
          onMouseUp={() => onDirectionRelease('down')}
          onMouseLeave={() => onDirectionRelease('down')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Right button */}
      <div className="col-start-3 row-start-2">
        <button
          className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
          onTouchStart={() => onDirectionPress('right')}
          onTouchEnd={() => onDirectionRelease('right')}
          onMouseDown={() => onDirectionPress('right')}
          onMouseUp={() => onDirectionRelease('right')}
          onMouseLeave={() => onDirectionRelease('right')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VirtualControls; 