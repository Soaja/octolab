import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ShieldCheck, Truck, Activity, FlaskConical } from 'lucide-react';

const features = [
  {
    id: "01",
    title: 'Ultra-High Purity',
    subtitle: '>99% HPLC Verified',
    description: 'Every batch undergoes rigorous HPLC and Mass Spectrometry analysis to ensure zero compromises on research integrity.',
    icon: FlaskConical,
  },
  {
    id: "02",
    title: 'Secure Logistics',
    subtitle: 'Cold-Chain Delivery',
    description: 'Discreet, rapid shipping across Serbia with temperature-controlled packaging to maintain peptide stability.',
    icon: Truck,
  },
  {
    id: "03",
    title: 'GMP Certified',
    subtitle: 'ISO 9001 Standards',
    description: 'Sourced strictly from GMP-compliant facilities. Our rigorous quality control eliminates batch-to-batch variance.',
    icon: ShieldCheck,
  },
  {
    id: "04",
    title: 'Technical Support',
    subtitle: 'Expert Guidance',
    description: 'Comprehensive datasheets, reconstitution guides, and storage protocols provided for every molecule.',
    icon: Activity,
  },
];

function SpotlightCard({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-white/[0.02] overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-32 bg-black relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Top Center Glow */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent/20 opacity-20 blur-[100px]"></div>

      {/* Bottom Right Glow (Hero-like Element) */}
      <div className="absolute -right-20 -bottom-40 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 opacity-30 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-mono text-xs tracking-widest uppercase mb-4 block"
            >
              The OctoLab Standard
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold text-white max-w-2xl"
            >
              Precision requires <span className="text-gray-500">absolute purity.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-sm text-sm leading-relaxed"
          >
            We don't just sell peptides. We provide the scientific baseline for your next breakthrough.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="rounded-3xl p-8 hover:border-accent/30 transition-colors duration-500 h-full">
                 <div className="flex flex-col h-full justify-between gap-8">
                   <div className="flex items-start justify-between">
                     <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20">
                       <feature.icon size={24} />
                     </div>
                     <span className="text-5xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                       {feature.id}
                     </span>
                   </div>
                   
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                       {feature.title}
                     </h3>
                     <div className="text-xs font-mono text-accent/80 mb-4 uppercase tracking-wider">
                       {feature.subtitle}
                     </div>
                     <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                       {feature.description}
                     </p>
                   </div>
                 </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};