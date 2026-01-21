import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Activity, Scan, Atom } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const products: Product[] = [
  {
    id: '1',
    name: 'BPC-157',
    price: 3000,
    description: 'Body Protection Compound-157. A pentadecapeptide composed of 15 amino acids.',
    tags: ['Regeneration', 'Recovery'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', 
  },
  {
    id: '2',
    name: 'TB-500',
    price: 6000,
    description: 'Synthetic fraction of the protein thymosin beta-4 present in virtually all human and animal cells.',
    tags: ['Mobility', 'Repair'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'GHK-Cu',
    price: 6000,
    description: 'Copper peptide. A naturally occurring copper complex used in advanced research.',
    tags: ['Skin', 'Cellular'],
    image: 'https://images.unsplash.com/photo-1624720114708-07030a2fe117?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Ipamorelin',
    price: 6000,
    description: 'A pentapeptide and a ghrelin mimetic. Selective growth hormone secretagogue.',
    tags: ['Metabolism', 'Growth'],
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=800',
  }
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative flex flex-col h-full bg-white border-r border-b border-slate-100 p-8 hover:z-10 hover:shadow-[0_0_50px_rgba(0,0,0,0.05)] transition-all duration-500"
    >
        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/10 transition-colors pointer-events-none" />

        {/* Header: ID and Purity */}
        <div className="flex justify-between items-start mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Reference
                </span>
                <span className="font-mono text-xs font-bold text-slate-700">
                    {product.id.padStart(3, '0')}-OCTO
                </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 rounded-full">
                <Activity className="w-3 h-3" /> 99.8% PURITY
            </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[1/1] mb-10 overflow-hidden bg-slate-50 rounded-2xl group-hover:rounded-sm transition-all duration-500">
            {/* Loading Skeleton Pulse */}
            <div className="absolute inset-0 bg-slate-100 animate-pulse group-hover:hidden" />
            
            <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
            />
            
            {/* Overlay Grid on Hover */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Hover Action */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-emerald-600 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Scan className="w-6 h-6" />
                 </div>
            </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
            <div className="mb-4">
                 <h3 className="text-3xl font-display font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                </h3>
                <div className="h-0.5 w-0 group-hover:w-12 bg-emerald-500 mt-2 transition-all duration-500" />
            </div>
           
            <p className="text-sm text-slate-500 line-clamp-2 mb-8 leading-relaxed font-light">
                {product.description}
            </p>

            <div className="flex items-end justify-between border-t border-slate-100 pt-6 group-hover:border-emerald-500/20 transition-colors">
                <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Unit Price (5mg)</span>
                    <span className="font-display font-bold text-xl text-slate-900">
                        {product.price.toLocaleString('sr-RS')} <span className="text-sm font-sans font-medium text-slate-400">RSD</span>
                    </span>
                </div>
                
                <button 
                  onClick={() => addToCart(product)}
                  className="group/btn relative overflow-hidden pl-4 pr-12 py-3 rounded-full bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                >
                    <span className="relative z-10">Add</span>
                    <div className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                         <Plus className="w-4 h-4" />
                    </div>
                </button>
            </div>
        </div>
    </motion.div>
  );
};

export const Products: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="bg-white relative z-10">
      
      {/* Aesthetic Top Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-[1920px] mx-auto">
        
        {/* Section Header - Minimalist & Large */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-12 py-24 md:py-32 border-b border-slate-100 bg-slate-50/30">
             <div className="max-w-3xl relative">
                <div className="absolute -left-12 top-0 bottom-0 w-1 bg-emerald-500 hidden md:block"></div>
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-emerald-600 font-mono text-xs tracking-[0.2em] uppercase mb-6 block"
                >
                    <Atom className="inline-block w-4 h-4 mr-2 -mt-1" />
                    Laboratory Catalog
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-9xl font-display font-bold text-slate-900 tracking-tighter leading-[0.9]"
                >
                    Precision <br/>
                    <span className="text-slate-300">Chemistry.</span>
                </motion.h2>
             </div>
             
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 md:mt-0"
             >
                <button 
                    onClick={() => navigate('/shop')}
                    className="relative group overflow-hidden rounded-full bg-slate-900 text-white px-8 py-5 flex items-center gap-6 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:scale-[1.02]"
                >
                    {/* Liquid Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    
                    <span className="relative font-display font-bold uppercase tracking-widest text-sm z-10">
                        View Full Archive
                    </span>
                    
                    <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                         <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </button>
             </motion.div>
        </div>

        {/* The Grid - Seamless Border Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-slate-100">
           {products.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
           ))}
        </div>

        {/* Bottom Decorative Strip */}
        <div className="w-full py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap opacity-40">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                        OctoLab &bull; High Performance Research Peptides &bull;
                    </span>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};