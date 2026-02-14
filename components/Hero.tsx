
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData['hero'];
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = data.roles[roleIndex];
      if (!currentRole) return;
      
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
          setSpeed(100);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % data.roles.length);
          setSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, speed, data.roles]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-6 border border-indigo-500/20">
              {data.badgeText}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {data.firstName} <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {data.lastName}
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {data.description.split('. ')[0]}. I am a <span className="text-indigo-400 font-mono font-medium">{displayText}<span className="animate-pulse">|</span></span>.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-indigo-600/20 cursor-pointer">
                Contact Me <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a href="#projects" onClick={(e) => scrollToSection(e, '#projects')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold transition-all cursor-pointer">
                View Projects
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
          <div className="relative w-full max-w-[450px] aspect-square mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-slate-900 rounded-full border border-white/10 overflow-hidden shadow-2xl group">
                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 opacity-90 group-hover:opacity-100" style={{ objectPosition: 'center 20%' }} />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
            </div>

            {/* DPI Cyber Security Club Banner */}
            <motion.a 
              href={data.club.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="absolute -top-6 -right-6 md:-right-12 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 max-w-[280px] group hover:border-indigo-500/50 transition-all z-20 cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-indigo-600">
                <img src={data.club.banner} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white/40 group-hover:text-white/80 transition-colors" />
                </div>
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-1.5 mb-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Member Affiliation</span>
                </div>
                <h4 className="text-white font-bold text-sm leading-tight group-hover:text-indigo-300 transition-colors">{data.club.name}</h4>
                <p className="text-slate-500 text-[10px] font-medium mb-1">{data.club.description}</p>
                <div className="flex items-center gap-1 text-[9px] text-indigo-400/60 font-bold uppercase group-hover:text-indigo-400">
                  Visit Club <ExternalLink className="w-2 h-2" />
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
