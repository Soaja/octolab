import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Octagon, Search, User, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, toggleCart } = useCart();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Comparison', href: '#comparison' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${
          isScrolled ? 'pt-6' : 'pt-8'
        }`}
      >
        <div className="pointer-events-auto">
          <div 
            className={`
              relative flex items-center justify-between 
              backdrop-blur-xl border 
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${isScrolled 
                ? 'w-[92vw] md:w-[700px] h-14 rounded-full px-4 bg-black border-white/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)]' 
                : 'w-[95vw] md:w-[900px] h-20 rounded-full px-8 bg-black/40 border-white/5 shadow-none'
              }
            `}
          >
            {/* Logo Area - Left Side (Flex-1 ensures it pushes nav to center) */}
            <div className="flex-1 flex justify-start items-center min-w-0">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                <div className={`
                  relative flex items-center justify-center rounded-full transition-all duration-500
                  ${isScrolled ? 'w-8 h-8 bg-emerald-500/10' : 'w-10 h-10 bg-emerald-500/20'}
                `}>
                  <Octagon className={`text-emerald-500 transition-all duration-500 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Text hides on scroll to prevent overlap */}
                <div className={`flex flex-col justify-center transition-all duration-500 overflow-hidden whitespace-nowrap ${isScrolled ? 'opacity-0 w-0 scale-95' : 'opacity-100 w-auto scale-100'}`}>
                  <span className="font-display font-bold text-white tracking-tight leading-none text-lg">
                    OCTO
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                     Lab
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Centered (Removed absolute positioning) */}
            <div className="hidden md:flex items-center shrink-0">
               <div className={`
                 flex items-center gap-1 p-1 rounded-full transition-all duration-500
                 ${isScrolled ? 'bg-transparent' : 'bg-white/5 border border-white/5'}
               `}>
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`
                      relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap
                      ${isScrolled 
                        ? 'text-white hover:text-emerald-400'
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="navbar-hover"
                        className={`absolute inset-0 rounded-full ${isScrolled ? 'bg-white/10' : 'bg-white/10'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Actions - Right Side (Flex-1) */}
            <div className="flex-1 flex justify-end items-center gap-3 min-w-0">
              <div className={`hidden md:flex items-center gap-2 border-r border-white/10 pr-4 mr-2 transition-all duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden pr-0 mr-0' : 'opacity-100'}`}>
                 <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Search className="w-4 h-4" />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <User className="w-4 h-4" />
                 </button>
              </div>

              {/* High Contrast Cart Button */}
              <button 
                onClick={toggleCart}
                className={`
                  relative flex items-center justify-center rounded-full transition-all duration-300 group
                  ${isScrolled ? 'w-8 h-8 bg-white text-black hover:scale-105' : 'w-10 h-10 bg-white text-black hover:bg-emerald-400 hover:scale-105'}
                `}
              >
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-black border-2 border-black"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <div className="md:hidden">
                 <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                 >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                 </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
            className="fixed inset-0 z-40 bg-black flex flex-col pt-32 px-6 md:hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="group flex items-center justify-between py-2 border-b border-white/10 w-full text-left"
                >
                  <span className="text-4xl font-display font-bold text-white group-hover:text-emerald-500 transition-colors">
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-emerald-500 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-8 grid grid-cols-2 gap-4"
              >
                <button className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                  <User className="h-5 w-5" /> Account
                </button>
                <button className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors">
                   Support
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};