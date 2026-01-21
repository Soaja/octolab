import React from 'react';
import { motion } from 'framer-motion';
import { Octagon, Mail, MapPin, ArrowUpRight, Github, Twitter, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black relative pt-32 pb-10 overflow-hidden text-white">
      {/* Texture & Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-10 mix-blend-soft-light"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Top Section: CTA & Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-b border-white/10 pb-20 mb-20">
            <div className="max-w-2xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-6"
                >
                    Ready to elevate <br />
                    <span className="text-emerald-500">your research?</span>
                </motion.h2>
                <p className="text-slate-400 text-lg">Join the elite network of scientists using OctoLab.</p>
            </div>

            <div className="w-full md:w-auto">
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-mono uppercase tracking-widest text-emerald-500">Stay Updated</label>
                    <div className="relative group">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                        />
                        <button className="absolute right-2 top-2 p-2 rounded-full bg-emerald-500 text-black hover:scale-110 transition-transform">
                            <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            
            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
                 <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Octagon className="h-6 w-6 text-emerald-500" />
                        </div>
                        <span className="font-display font-bold text-2xl tracking-tight">
                            OCTO LAB
                        </span>
                    </div>
                    <p className="text-slate-500 leading-relaxed mb-8 max-w-sm">
                        Defining the absolute standard for peptide synthesis and research purity. Engineered for those who demand certainty.
                    </p>
                 </div>
                 
                 <div className="flex gap-4">
                    {[Twitter, Github, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="p-3 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                 </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2">
                <h4 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-8">Platform</h4>
                <ul className="space-y-4">
                    <li>
                        <Link to="/shop" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                            Products
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </li>
                     <li>
                        <Link to="/quality" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                            Technology
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/quality" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                            Quality Control
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </li>
                </ul>
            </div>

             <div className="md:col-span-2">
                <h4 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-8">Support</h4>
                <ul className="space-y-4">
                    {['Documentation', 'API Status', 'Shipping Policy', 'Contact Us'].map(item => (
                        <li key={item}>
                            <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

             <div className="md:col-span-4 bg-white/5 rounded-3xl p-8 border border-white/10">
                <h4 className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-6">Contact</h4>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <span className="block text-white font-medium">Headquarters</span>
                            <span className="text-slate-500 text-sm">Savski Venac, Belgrade<br/>Serbia</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-slate-400 mt-1" />
                        <div>
                            <span className="block text-white font-medium">Email Us</span>
                            <span className="text-slate-500 text-sm">research@octolab.com</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Huge Watermark Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-[0.03] pointer-events-none select-none w-full text-center">
                <span className="text-[15vw] font-display font-bold leading-none tracking-tighter">OCTO</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Systems Operational
            </div>

            <p className="text-slate-600 text-xs">
                © {new Date().getFullYear()} OctoLab. For Research Use Only.
            </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-12 bg-red-950/20 border border-red-500/10 rounded-lg p-4 text-center">
            <p className="text-[10px] text-red-200/60 uppercase tracking-wide">
                Warning: Products sold on this site are for laboratory research purposes only. Not for human consumption.
            </p>
        </div>

      </div>
    </footer>
  );
};