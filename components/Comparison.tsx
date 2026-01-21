import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, AlertCircle, Zap, Ban, TestTube2 } from 'lucide-react';

const octoFeatures = [
    { text: "Purity >99% (HPLC Verified)", icon: ShieldCheck },
    { text: "Temperature-Controlled Storage", icon: Zap },
    { text: "EU-Based Independent Testing", icon: TestTube2 },
    { text: "Next-Day Cold Chain Shipping", icon: Check },
    { text: "Full COA Documentation", icon: Check },
];

const competitorFeatures = [
    { text: "Unknown Source & Purity", icon: AlertCircle },
    { text: "Standard Room Temp Storage", icon: Ban },
    { text: "No Verification Data", icon: X },
    { text: "Slow, Standard Shipping", icon: X },
    { text: "No Documentation", icon: X },
];

export const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
      </div>
      
      {/* Magical Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-emerald-100/40 rounded-full blur-[120px] -translate-x-1/2"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6"
          >
            Why choose <span className="text-emerald-500">OctoLab?</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We operate at a standard that most competitors cannot afford to match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Competitor Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <X className="w-24 h-24 text-red-500" />
             </div>
             <h3 className="text-2xl font-bold text-slate-400 mb-8">Industry Standard</h3>
             <ul className="space-y-6">
                {competitorFeatures.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-500">
                    <div className="p-2 rounded-full bg-red-100/50 text-red-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.text}
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* OctoLab Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-emerald-500/10"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Check className="w-24 h-24 text-emerald-500" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
             
             <h3 className="text-2xl font-bold text-white mb-8">OctoLab Standard</h3>
             <ul className="space-y-6 relative z-10">
                {octoFeatures.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium">
                    <div className="p-2 rounded-full bg-emerald-500 text-black">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.text}
                  </li>
                ))}
             </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};