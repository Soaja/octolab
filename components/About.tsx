import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Microscope, Globe2, Award, FlaskConical, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Purity Guaranteed', value: '99.9%' },
  { label: 'Research Papers', value: '500+' },
  { label: 'Lab Partners', value: '45' },
  { label: 'Global Delivery', value: '24h' },
];

const AboutCard = ({ title, subtitle, icon: Icon, delay, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const sheenX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`relative group bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden ${className}`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(16, 185, 129, 0.15), transparent 60%)`
        }}
      />
      
      <div className="relative z-20 h-full p-8 flex flex-col justify-between">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>
         <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/60 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" 
         />
         <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" 
         />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Typography & Story */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Who We Are
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[0.95] mb-8 tracking-tight"
            >
              Architects of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Purity.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 leading-relaxed mb-8 border-l-2 border-emerald-500/30 pl-6"
            >
              OctoLab wasn't founded by businessmen—it was built by biochemists frustrated by the lack of transparency in the industry. We bridge the gap between advanced chemical synthesis and laboratory application.
            </motion.p>

            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="text-slate-500 mb-12"
            >
               Our mission is simple: to provide a baseline of absolute certainty for your research. When variables matter, OctoLab is the constant.
            </motion.p>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Grid */}
          <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
            {/* Abstract Background Elements */}
            <motion.div 
              style={{ y: y1, rotate: -6 }}
              className="absolute top-0 right-10 w-64 h-80 bg-slate-100 rounded-[2rem] -z-10"
            />
            
            {/* Card 1: Lab Image */}
            <motion.div
              style={{ y: y2 }} 
              className="absolute top-10 left-0 w-72 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1581093588401-fbb07366f955?auto=format&fit=crop&q=80&w=600" 
                alt="Lab Clean Room" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <span className="text-white font-display font-bold tracking-wide">Clean Room<br/>Synthesis</span>
              </div>
            </motion.div>

            {/* Card 2: Interactive Feature */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 z-20">
               <AboutCard 
                  title="EU Certified"
                  subtitle="Compliant with ISO 9001 standards for laboratory chemical handling."
                  icon={Globe2}
                  delay={0.4}
                  className="aspect-square"
               />
            </div>

            {/* Card 3: Interactive Feature */}
            <div className="absolute bottom-0 left-20 w-80 z-30">
               <AboutCard 
                  title="Science First"
                  subtitle="Led by a team of PhD researchers and chemical engineers."
                  icon={Microscope}
                  delay={0.5}
                  className="h-48"
               />
            </div>
          </div>

          {/* Mobile Image (Visible only on small screens) */}
          <div className="lg:hidden rounded-3xl overflow-hidden shadow-xl shadow-slate-200 border border-slate-100">
            <img 
                src="https://images.unsplash.com/photo-1581093588401-fbb07366f955?auto=format&fit=crop&q=80&w=800" 
                alt="Lab" 
                className="w-full h-64 object-cover"
            />
            <div className="p-6 bg-white">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Research Grade</h3>
                        <p className="text-slate-500 text-sm">Every batch is tested for purity and concentration.</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};