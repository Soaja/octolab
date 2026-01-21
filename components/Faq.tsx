import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { FaqItem } from '../types';

const faqData: FaqItem[] = [
  {
    question: "What are research peptides?",
    answer: "Peptides are short chains of amino acids acting as protein building blocks. Synthesized strictly for in-vitro laboratory experimentation to understand biological signaling and cellular repair."
  },
  {
    question: "Are these for human use?",
    answer: "Absolutely not. These are chemical reference materials for laboratory research only. Not for use as food, drugs, cosmetics, or household chemicals."
  },
  {
    question: "Storage protocols?",
    answer: "Lyophilized peptides remain stable at -20°C for years. Reconstituted peptides must be kept at 4°C and used within weeks. Avoid freeze-thaw cycles."
  },
  {
    question: "Do you verify purity?",
    answer: "Every single batch. We provide HPLC and Mass Spectrometry reports demonstrating >99% purity. We sell certainty, not just chemicals."
  },
  {
    question: "Shipping & Handling?",
    answer: "Expedited cold-chain shipping across Serbia. Specialized packaging ensures the molecular integrity of the peptides during transit."
  }
];

export const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-40 bg-black relative overflow-hidden min-h-screen flex items-center">
      
      {/* 1. Giant Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            transition={{ duration: 1 }}
            className="text-[40vw] font-display font-bold text-white leading-none tracking-tighter blur-sm"
            style={{ 
                WebkitTextStroke: '2px white',
                color: 'transparent'
            }}
        >
            FAQ
        </motion.span>
      </div>

      {/* 2. Abstract Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
             <div className="h-px w-12 bg-emerald-500"></div>
             <span className="text-emerald-500 font-mono text-sm tracking-[0.2em] uppercase">Knowledge Base</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight"
          >
            Questions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">Answered.</span>
          </motion.h2>
        </div>

        {/* The List */}
        <div className="flex flex-col gap-6">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className={`group cursor-pointer relative ${isOpen ? 'z-20' : 'z-10'}`}
              >
                {/* Focus Effect: Dim others when one is open (handled by opacity on parent container technically, but we simulate via classes) */}
                <div className={`transition-all duration-500 ease-out ${activeIndex !== null && !isOpen ? 'opacity-30 blur-[2px] scale-95' : 'opacity-100 scale-100'}`}>
                    
                    {/* Card Container */}
                    <div className={`
                        relative overflow-hidden rounded-3xl transition-all duration-500
                        ${isOpen 
                            ? 'bg-slate-900/80 border-emerald-500/30 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                        }
                        border backdrop-blur-xl
                    `}>
                        {/* Glowing Side Bar for Active State */}
                        {isOpen && (
                            <motion.div 
                                layoutId="glow-bar"
                                className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_0_20px_2px_rgba(16,185,129,0.5)]" 
                            />
                        )}

                        <div className="p-8 md:p-10">
                            <div className="flex items-start justify-between gap-6">
                                <h3 className={`text-xl md:text-2xl font-display font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    {item.question}
                                </h3>
                                <div className={`flex-shrink-0 mt-1 transition-transform duration-500 ${isOpen ? 'rotate-180 text-emerald-400' : 'rotate-0 text-slate-500'}`}>
                                    {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-lg text-slate-300 leading-relaxed font-light border-l border-white/10 pl-6">
                                            {item.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background Gradient for Active State */}
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none"
                            />
                        )}
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 flex items-center justify-between border-t border-white/10 pt-8"
        >
            <p className="text-slate-500 text-sm">Cannot find what you are looking for?</p>
            <a href="#contact" className="group flex items-center gap-3 text-white font-bold text-sm uppercase tracking-wider hover:text-emerald-400 transition-colors">
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                </div>
                Contact Support
            </a>
        </motion.div>

      </div>
    </section>
  );
};