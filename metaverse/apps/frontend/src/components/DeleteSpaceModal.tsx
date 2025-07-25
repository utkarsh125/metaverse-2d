'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface DeleteSpaceModalProps {
  isOpen: boolean;
  spaceName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteSpaceModal({ 
  isOpen, 
  spaceName, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: DeleteSpaceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Animate modal in
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleCancel = () => {
    if (modalRef.current && contentRef.current) {
      // Animate modal out
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: "power2.in"
      });
      
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: onCancel
      });
    } else {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && !isLoading && handleCancel()}
    >
      <div
        ref={contentRef}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/10 w-full max-w-md"
      >
        <div className="p-8">
          {/* Warning Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Delete Space
          </h2>

          {/* Message */}
          <p className="text-gray-300 text-center mb-2">
            Are you sure you want to delete
          </p>
          <p className="text-white font-semibold text-center mb-6">
            &ldquo;{spaceName}&rdquo;?
          </p>
          <p className="text-gray-400 text-sm text-center mb-8">
            This action cannot be undone. All data in this space will be permanently lost.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Space</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 