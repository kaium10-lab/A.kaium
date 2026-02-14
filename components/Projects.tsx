
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  data: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-bold tracking-widest text-indigo-500 uppercase mb-4">My Work</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white">Projects & Experience</motion.h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-10">
        {data.map((project, idx) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="group relative flex flex-col w-full md:w-[calc(50%-20px)] lg:w-[calc(45%-20px)] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-10 flex flex-col flex-1">
              <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                {project.title}
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{project.description}</p>
              <div className="mt-auto flex gap-4">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl transition-all border border-white/10 cursor-pointer">
                   <Github className="w-4 h-4" /> View Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
