import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, FileText, Thermometer, Microscope, CheckCircle2, ScanLine, Binary } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const protocols = [
  {
    title: "HPLC Analysis",
    subtitle: "High-Performance Liquid Chromatography",
    description: "Every batch undergoes rigorous HPLC testing to separate, identify, and quantify each component in the mixture. We maintain a strict >99% purity threshold.",
    icon: Activity,
    stat: "99.9%"
  },
  {
    title: "Mass Spectrometry",
    subtitle: "Molecular Weight Verification",
    description: "We verify the exact molecular weight of our peptides to ensure the sequence is correct and free from synthesis by-products or deletion sequences.",
    icon: Microscope,
    stat: "Precise"
  },
  {
    title: "Cold Chain Logistics",
    subtitle: "Temperature Integrity",
    description: "From our synthesis facility to your door, peptides are stored in lyophilized powder form at -20°C to prevent degradation.",
    icon: Thermometer,
    stat: "-20°C"
  },
  {
    title: "Documentation",
    subtitle: "Full Transparency",
    description: "Certificate of Analysis (COA) and MS reports are available for every batch. We believe in showing our work, not just claiming it.",
    icon: FileText,
    stat: "Verified"
  }
];

export const Quality: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl"
          >
             <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">Quality Assurance Protocols</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-8 leading-[0.9]">
               The Science of <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-white">Certainty.</span>
             </h1>
             
             <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl border-l-2 border-emerald-500/30 pl-8">
               In an industry filled with opacity, OctoLab provides a baseline of absolute truth. 
               We do not rely on manufacturer claims. We verify.
             </p>
          </motion.div>
        </div>
      </section>

      {/* The Protocol Grid */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {protocols.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-black border border-white/10 rounded-3xl p-10 overflow-hidden hover:border-emerald-500/30 transition-colors duration-500"
              >
                {/* Background Hover Glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-900/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

                <div className="relative z-10 flex justify-between items-start mb-8">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                      <item.icon className="w-8 h-8" />
                   </div>
                   <span className="text-4xl font-display font-bold text-white/10 group-hover:text-white/20 transition-colors">
                      0{index + 1}
                   </span>
                </div>

                <div className="relative z-10">
                   <h3 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h3>
                   <p className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-6">{item.subtitle}</p>
                   <p className="text-gray-400 leading-relaxed mb-8">
                     {item.description}
                   </p>
                </div>

                {/* Stat Bar */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
                   <span className="text-xs text-gray-500 font-mono uppercase">Standard</span>
                   <span className="text-xl font-bold text-white">{item.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Data Representation (Fake Graph) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              <div className="w-full lg:w-1/2">
                 <h2 className="text-4xl font-display font-bold text-white mb-6">High-Performance <br/>Liquid Chromatography</h2>
                 <p className="text-gray-400 mb-8 leading-relaxed">
                   The graph represents a standard HPLC read-out. The single, sharp peak demonstrates purity. 
                   Impurities would appear as secondary, smaller peaks ("shoulders") on the timeline. 
                   Our standard requires the main peak area to exceed 99% of the total integrated area.
                 </p>
                 <ul className="space-y-4">
                    {[
                      "Solvent: Acetonitrile / Water (TFA)", 
                      "Column: C18 Reverse Phase", 
                      "Detection: UV at 220nm",
                      "Flow Rate: 1.0 ml/min"
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-mono border-b border-white/5 pb-2">
                         <Binary className="w-4 h-4 text-emerald-500" />
                         {spec}
                      </li>
                    ))}
                 </ul>
              </div>

              {/* The "Graph" Visual */}
              <div className="w-full lg:w-1/2 relative">
                 <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] opacity-20"></div>
                 <div className="relative bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 h-[400px] flex items-end">
                    
                    {/* Grid Lines */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-20">
                       {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
                    </div>

                    {/* The Line (SVG) */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                       <motion.path 
                          d="M0,350 L50,348 L100,349 L150,345 L180,348 L200,50 L220,348 L250,349 L300,348 L350,349 L400,348 L500,350"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                       />
                       {/* Area under curve */}
                       <motion.path 
                          d="M0,350 L50,348 L100,349 L150,345 L180,348 L200,50 L220,348 L250,349 L300,348 L350,349 L400,348 L500,350 L500,400 L0,400 Z"
                          fill="url(#gradient)"
                          stroke="none"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.2 }}
                          transition={{ delay: 1, duration: 1 }}
                       />
                       <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                             <stop offset="0%" stopColor="#10b981" />
                             <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                       </defs>
                    </svg>

                    {/* Data Points */}
                    <motion.div 
                       initial={{ opacity: 0, scale: 0 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 1.5 }}
                       className="absolute top-[10%] left-[40%] bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded text-[10px] font-mono text-emerald-400"
                    >
                       RETENTION TIME: 12.4s
                       <br />
                       AREA: 99.82%
                    </motion.div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-emerald-900/10 border-t border-white/10 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Verified Research Grade</h2>
            <p className="text-gray-400 text-lg mb-10">
               Ready to conduct research with confidence? Browse our catalog of fully verified compounds.
            </p>
            <button 
               onClick={() => navigate('/shop')}
               className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors duration-300"
            >
               Access Catalog
            </button>
         </div>
      </section>

    </div>
  );
};