
import React from 'react';
import { Terminal, Github, Linkedin, Mail, Heart, Settings } from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  data: PortfolioData;
  onAdminToggle: () => void;
}

const Footer: React.FC<FooterProps> = ({ data, onAdminToggle }) => {
  const { logo } = data.hero;

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
              {logo ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-500/30">
                  <img src={logo} className="w-full h-full object-cover" alt="Footer Logo" />
                </div>
              ) : (
                <Terminal className="w-6 h-6 text-indigo-500" />
              )}
              <span>KAIUM.<span className="text-indigo-500">DEV</span></span>
            </div>
            <button 
              onClick={onAdminToggle}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-400 transition-colors uppercase tracking-widest"
            >
              <Settings className="w-3 h-3" /> Admin Mode
            </button>
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1 text-center">
            Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by Abdul Kaium &copy; {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-6">
            <a href="https://github.com/kaium10-lab" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/a-kaium10/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:a.kaium2008@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
