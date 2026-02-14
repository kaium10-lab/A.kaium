
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';

interface AboutProps {
  data: PortfolioData['about'];
}

const About: React.FC<AboutProps> = ({ data }) => {
  const { education } = data;
  
  const BannerWrapper = education.link ? 'a' : 'div';
  const wrapperProps = education.link 
    ? { href: education.link, target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <section id="about" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-indigo-500/10 bg-slate-900">
              <img src={data.profileImage} alt="About" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" style={{ objectPosition: 'center 20%' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 z-20"
            >
              {/* @ts-ignore */}
              <BannerWrapper {...wrapperProps} className={`block p-0 min-w-[240px] md:min-w-[280px] bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md hover:border-indigo-500/50 transition-all overflow-hidden relative group/banner cursor-pointer`}>
                {/* Banner Background */}
                {education.bannerImage && (
                  <div className="absolute inset-0 z-0">
                    <img src={education.bannerImage} className="w-full h-full object-cover opacity-30 group-hover/banner:scale-110 transition-transform duration-700" alt="Banner Background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                  </div>
                )}
                
                <div className="relative z-10 p-6 flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-500 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover/banner:rotate-3 transition-transform">
                        {education.image ? (
                           <img src={education.image} className="w-full h-full object-cover opacity-90 group-hover/banner:opacity-100 transition-opacity" alt="Education Icon" />
                        ) : (
                           <GraduationCap className="text-white w-7 h-7" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">{education.label}</p>
                          {education.link && <ExternalLink className="w-2.5 h-2.5 text-indigo-400 opacity-60 group-hover/banner:opacity-100 transition-opacity" />}
                        </div>
                        <p className="text-white font-bold text-base leading-tight group-hover/banner:text-indigo-200 transition-colors">{education.degree}</p>
                    </div>
                </div>
              </BannerWrapper>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-sm font-bold tracking-widest text-indigo-500 uppercase mb-4">{data.subtitle}</h2>
            <h3 className="text-4xl font-bold text-white mb-6">{data.title}</h3>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
