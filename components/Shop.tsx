import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ShoppingCart, FlaskConical, Activity, FileCheck, Star, Hexagon, Search, ArrowDown, Database, Cpu, ScanLine, Filter } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const products: Product[] = [
  {
    id: '1',
    name: 'BPC-157',
    price: 3000,
    description: 'A synthetic peptide consisting of 15 amino acids. Derived from a protective protein found in the stomach.',
    tags: ['Regeneration', 'Gastric', 'Tendon'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    name: 'TB-500',
    price: 6000,
    description: 'A synthetic version of the naturally occurring peptide Thymosin Beta-4. Plays a vital role in cell proliferation.',
    tags: ['Muscle', 'Flexibility', 'Recovery'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    name: 'GHK-Cu',
    price: 6000,
    description: 'A natural copper complex that has been found to tighten loose skin and reverse thinning of aged skin.',
    tags: ['Dermal', 'Cosmetic', 'Anti-Aging'],
    image: 'https://images.unsplash.com/photo-1624720114708-07030a2fe117?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '4',
    name: 'Ipamorelin',
    price: 6000,
    description: 'A selective growth hormone secretagogue and ghrelin receptor agonist. Does not significantly increase cortisol.',
    tags: ['HGH', 'Metabolism', 'Lean Mass'],
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=1200',
  }
];

// --- Sub-Components ---

const ParticleField = () => {
  // Create a random field of particles
  const particles = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-emerald-500 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const ProductSection = ({ product, index }: { product: Product; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Parallax Text & Image
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen relative flex items-center py-24 overflow-hidden bg-black border-t border-white/5">
      
      {/* Background Ambience */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none`}
           style={{ backgroundColor: isEven ? '#10b981' : '#3b82f6' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          
          {/* Visual Side */}
          <motion.div 
            style={{ y: yImage, opacity }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10 bg-white/[0.02]">
              {/* Tech Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-emerald-500/50 z-20"/>
              <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-emerald-500/50 z-20"/>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-emerald-500/50 z-20"/>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-emerald-500/50 z-20"/>

              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent z-10" />
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
              
              {/* Data Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 p-6 z-20">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest">Spectral Analysis</span>
                  </div>
                  <span className="text-[10px] font-bold text-black bg-emerald-500 px-2 py-0.5">VERIFIED</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent mb-4"></div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-gray-500 mb-1 font-mono uppercase text-[9px]">Sequence ID</span>
                    <span className="text-gray-300 font-mono">SEQ-{product.id.padStart(3, '0')}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1 font-mono uppercase text-[9px]">Mass</span>
                    <span className="text-gray-300 font-mono">1419.5 g/mol</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Big Number */}
            <span className="absolute -top-16 -left-10 text-[12rem] font-bold text-white/[0.02] font-display leading-none pointer-events-none select-none">
              0{index + 1}
            </span>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            style={{ y: yText, opacity }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-emerald-500 fill-emerald-500" />)}
              </div>
              <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Research Grade / 99.9%</span>
            </div>

            <p className="text-lg text-gray-400 font-light leading-relaxed mb-10 max-w-lg border-l-2 border-emerald-500/20 pl-6">
              {product.description}
            </p>

            {/* Pricing & Cart */}
            <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
               <div className="bg-black rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                     <Activity className="w-12 h-12 text-emerald-500" />
                  </div>

                  <div className="flex items-end justify-between mb-8 relative z-10">
                      <div>
                        <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1">Vial Configuration: 5mg</span>
                        <span className="text-4xl font-display font-bold text-white">{product.price.toLocaleString()} <span className="text-sm text-emerald-500 font-sans font-medium">RSD</span></span>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-2 py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to List
                      </button>
                      <button className="flex items-center justify-center gap-2 py-4 px-6 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium uppercase tracking-wider text-xs transition-colors">
                        <FileCheck className="w-4 h-4" /> Specification
                      </button>
                  </div>
               </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

export const Shop: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  
  // Subtle parallax for the main hero text
  const heroTextX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 });
  const heroTextY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 });

  // Scanline effect
  const scanlineY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), { stiffness: 50, damping: 20 });

  return (
    <div className="bg-black min-h-screen pt-20" onMouseMove={handleMouseMove}>
      
      {/* --- NEW MODERN HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. Dynamic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>
        
        {/* 2. Particle Field */}
        <ParticleField />

        {/* 3. The Central "Void" Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* 4. Scanning Line (Vertical) */}
        <motion.div 
            style={{ left: scanlineY }}
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none hidden md:block" 
        />

        {/* 5. Main Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center py-12 md:py-0">
            
            {/* Top HUD Bar */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 md:top-12 left-6 right-6 flex justify-between items-center text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest border-b border-white/5 pb-4"
            >
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="hidden sm:inline">System Online</span>
                    <span className="sm:hidden">Online</span>
                </div>
                <div>
                     TLS 1.3 <span className="hidden sm:inline">SECURE</span>
                </div>
            </motion.div>

            {/* Typography */}
            <div className="flex flex-col items-start relative mt-8 md:mt-0">
                 <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-4"
                 >
                    <div className="px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                        Index v2.0
                    </div>
                    <div className="h-px w-20 bg-emerald-500/30" />
                 </motion.div>

                 <motion.h1
                    style={{ x: heroTextX, y: heroTextY }}
                    className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-display font-bold text-white leading-[0.9] tracking-tighter mb-6 md:mb-8 mix-blend-screen"
                 >
                    MOLECULAR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-200 to-white">
                        CATALOG
                    </span>
                 </motion.h1>

                 <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-xl text-base md:text-lg text-gray-400 font-light border-l border-white/20 pl-6 ml-2"
                 >
                    Access purified peptide sequences for advanced laboratory research. <br className="hidden sm:block" />
                    <span className="text-emerald-500">Full traceability from synthesis to vial.</span>
                 </motion.p>
            </div>

            {/* Bottom Interaction Area */}
            <div className="absolute bottom-8 md:bottom-24 w-full left-0 px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 md:gap-8 border-t border-white/10 pt-6 md:pt-8">
                    
                    {/* Search Module */}
                    <div className="w-full md:w-auto flex-1 max-w-lg mb-2 md:mb-0">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 block">
                            Database Query
                        </label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Enter CAS Number or Name..."
                                className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 focus:outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-all font-mono text-sm"
                            />
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-emerald-500/10 border-l border-white/10 flex items-center justify-center text-emerald-500">
                                <Search className="w-4 h-4" />
                            </div>
                            {/* Animated Corners for Input */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/0 group-hover:border-emerald-500 transition-colors duration-300" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/0 group-hover:border-emerald-500 transition-colors duration-300" />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="w-full md:w-auto grid grid-cols-2 gap-6 md:flex md:gap-12">
                         <div className="flex flex-col">
                             <span className="text-2xl md:text-3xl font-display font-bold text-white">04</span>
                             <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Active Agents</span>
                         </div>
                         <div className="flex flex-col">
                             <span className="text-2xl md:text-3xl font-display font-bold text-white">99%</span>
                             <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Purity Index</span>
                         </div>
                    </div>

                </div>
            </div>

        </div>

        {/* Decorative HUD Elements */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 items-end pointer-events-none opacity-50">
             <Database className="w-6 h-6 text-emerald-500/40" />
             <Cpu className="w-6 h-6 text-emerald-500/40" />
             <ScanLine className="w-6 h-6 text-emerald-500/40" />
             <div className="w-px h-32 bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent"></div>
        </div>

      </section>

      {/* Filter Bar (Sticky) */}
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-y border-white/10 px-4 md:px-6 py-4">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
             <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider">
                 <Filter className="w-4 h-4 text-emerald-500" />
                 <span className="hidden sm:inline">Filter Results</span>
                 <span className="sm:hidden">Filter</span>
             </div>
             <div className="flex gap-4">
                 <button className="text-gray-500 hover:text-white text-xs font-mono uppercase transition-colors">By Popularity</button>
                 <button className="text-gray-500 hover:text-white text-xs font-mono uppercase transition-colors">By Price</button>
             </div>
         </div>
      </div>

      {/* Products Render */}
      <div className="bg-black">
        {products.map((product, index) => (
            <ProductSection key={product.id} product={product} index={index} />
        ))}
      </div>

    </div>
  );
};