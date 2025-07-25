"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const faqs = [
  {
    question: "What is orbitone.cloud?",
    answer: "orbitone.cloud is a 2D virtual world platform where you can create interactive spaces, meet friends, and collaborate in real-time. It's designed to make virtual collaboration accessible and engaging for everyone."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple! Just sign up for a free account, choose your avatar, create a space, and invite your friends. No downloads required - everything works in your browser."
  },
  {
    question: "Can I customize my virtual space?",
    answer: "Yes! You can personalize your virtual spaces with different maps and layouts. We're constantly adding new customization options to make your spaces unique and reflective of your style."
  },
  {
    question: "Is it free to use?",
    answer: "Yes, orbitone.cloud is completely free to use. You can create spaces, invite friends, and collaborate without any cost. We believe virtual collaboration should be accessible to everyone."
  },
  {
    question: "What devices are supported?",
    answer: "orbitone.cloud works on any device with a modern web browser. Whether you're on desktop, tablet, or mobile, you can access your virtual spaces seamlessly across all platforms."
  },
  {
    question: "Can I use it for team meetings?",
    answer: "Absolutely! Many teams use orbitone.cloud for meetings, brainstorming sessions, and team building activities. The real-time collaboration features make it perfect for remote and hybrid teams."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      // Close current FAQ
      const answerRef = answerRefs.current[index];
      if (answerRef) {
        gsap.to(answerRef, {
          height: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setOpenIndex(null);
          }
        });
      }
    } else {
      // Close previously open FAQ
      if (openIndex !== null) {
        const prevAnswerRef = answerRefs.current[openIndex];
        if (prevAnswerRef) {
          gsap.to(prevAnswerRef, {
            height: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }

      // Open new FAQ
      const answerRef = answerRefs.current[index];
      if (answerRef) {
        setOpenIndex(index);
        gsap.fromTo(answerRef, 
          { height: 0 },
          { 
            height: "auto", 
            duration: 0.3, 
            ease: "power2.out" 
          }
        );
      }
    }
  };

  // Initialize refs array
  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, faqs.length);
  }, []);

  return (
    <section id="faq" className="py-24 bg-white" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <header className="text-center mb-16">
          <span className="font-inter text-xs tracking-widest text-purple-500 mb-4 block">
            FAQ
          </span>
          <h2 id="faq-title" className="font-pixelify text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-6 leading-tight">
            Frequently Asked
            <br />
            <span className="text-purple-600">Questions</span>
          </h2>
          <p className="font-inter text-lg sm:text-xl text-purple-700 max-w-2xl mx-auto px-4">
            Everything you need to know about orbitone.cloud
          </p>
        </header>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-purple-200 rounded-2xl overflow-hidden">
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left bg-white hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-pixelify text-lg sm:text-xl font-semibold text-purple-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg 
                      className="w-6 h-6 text-purple-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div 
                ref={(el) => {
                  answerRefs.current[index] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className="font-inter text-purple-700 leading-relaxed text-base sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 