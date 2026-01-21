import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FluidBackground } from './FluidBackground';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-primary">
      {/* Three.js Fluid Background - Remains identical */}
      <FluidBackground />
      
      {/* Texture Overlay for texture/grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-10 mix-blend-soft-light"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center pointer-events-none flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // smooth custom cubic-bezier
          className="pointer-events-auto flex flex-col items-center w-full"
        >
           {/* Modern Badge - Glassy & Blended */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-accent/90 mb-8 md:mb-16 backdrop-blur-md"
          >
            <Microscope className="h-3.5 w-3.5" />
            <span className="tracking-[0.2em] uppercase text-gray-300">Strictly for Research Use</span>
          </motion.div>
          
          {/* Main Headline - Ethereal & Blended */}
          <h1 className="flex flex-col items-center justify-center font-display font-bold leading-none mb-10 md:mb-16 relative w-full">
             {/* Ambient Glow behind text */}
            <div className="absolute inset-0 bg-accent/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none opacity-50" />

            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.8em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[10px] md:text-sm font-semibold text-accent uppercase mb-4 md:mb-6 z-10 whitespace-nowrap"
            >
              The Future of
            </motion.span>

            {/* Line 1: Fades from white to transparent (Fog effect) */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 drop-shadow-2xl z-10 pb-2 md:pb-4">
              PRECISION
            </span>

            {/* Line 2: Outline style (Lets background show through) */}
            <span 
               className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight text-transparent z-10 -mt-2 md:-mt-8 mix-blend-overlay md:mix-blend-normal opacity-80"
               style={{ 
                 WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
               }}
            >
              RESEARCH
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm md:text-lg text-gray-400/80 mb-10 md:mb-20 leading-loose font-sans font-light tracking-wide mix-blend-screen px-4 md:px-0">
            Engineered for <span className="text-white/90 font-medium">purity</span>. 
            Tested for <span className="text-white/90 font-medium">integrity</span>. 
            <br className="hidden md:block" />
            OctoLab sets the gold standard.
          </p>

          {/* CTA Buttons - Minimalist */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full z-10">
            <motion.button
              onClick={() => navigate('/shop')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto group relative px-8 py-4 bg-transparent overflow-hidden rounded-full flex items-center justify-center gap-3 transition-all cursor-pointer border border-accent/20 md:border-transparent"
            >
              <div className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-full group-hover:bg-accent/20 transition-colors backdrop-blur-sm" />
              <span className="relative tracking-[0.15em] uppercase text-xs font-bold text-accent group-hover:text-white transition-colors">Explore Catalog</span>
              <ArrowRight className="relative h-4 w-4 text-accent group-hover:text-white group-hover:translate-x-1 transition-all" />
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/quality')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 text-gray-400 hover:text-white transition-colors text-xs font-bold tracking-[0.15em] uppercase cursor-pointer text-center"
            >
              Quality Assurance
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Blended */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/10 z-20 pointer-events-none mix-blend-overlay"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase hidden md:block">Scroll</span>
        <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>
      </motion.div>
    </section>
  );
};