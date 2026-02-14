
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Terminal, Search, Users } from 'lucide-react';
import { PortfolioData } from '../types';

interface SkillsProps {
  data: PortfolioData['skills'];
}

const getIcon = (idx: number) => {
  const icons = [
    <Monitor className="w-6 h-6 text-indigo-400" />,
    <Terminal className="w-6 h-6 text-purple-400" />,
    <Search className="w-6 h-6 text-pink-400" />,
    <Users className="w-6 h-6 text-teal-400" />
  ];
  return icons[idx % icons.length];
};

const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-bold tracking-widest text-indigo-500 uppercase mb-4">Abilities</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white">My Core Skillset</motion.h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((category, idx) => (
            <motion.div key={category.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-500/10 transition-colors">
                {getIcon(idx)}
              </div>
              <h4 className="text-xl font-bold text-white mb-6">{category.title}</h4>
              <ul className="space-y-3">
                {category.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
