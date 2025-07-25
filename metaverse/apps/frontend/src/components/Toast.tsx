'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, type, title, message, duration = 4000, onClose }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      // Animate toast in
      gsap.fromTo(toastRef.current, 
        { opacity: 0, x: 400, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Animate progress bar
      if (progressRef.current) {
        gsap.fromTo(progressRef.current,
          { width: "100%" },
          { width: "0%", duration: duration / 1000, ease: "none" }
        );
      }

      // Auto close
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        opacity: 0,
        x: 400,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => onClose(id)
      });
    } else {
      onClose(id);
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/90',
          border: 'border-green-400/50',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'error':
        return {
          bg: 'bg-red-500/90',
          border: 'border-red-400/50',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      case 'info':
        return {
          bg: 'bg-blue-500/90',
          border: 'border-blue-400/50',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-500/90',
          border: 'border-gray-400/50',
          icon: null
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      ref={toastRef}
      className={`relative ${styles.bg} backdrop-blur-md border ${styles.border} rounded-xl shadow-2xl p-4 min-w-[320px] max-w-[400px]`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {styles.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1">
            {title}
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-white/60 transition-all duration-100"
        />
      </div>
    </div>
  );
} 