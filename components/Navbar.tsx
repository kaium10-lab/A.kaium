
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  logo?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#!"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group cursor-pointer"
          >
            {logo ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <img src={logo} className="w-full h-full object-cover" alt="Logo" />
              </div>
            ) : (
              <Terminal className="w-6 h-6 text-indigo-500 group-hover:rotate-12 transition-transform" />
            )}
            <span>KAIUM.<span className="text-indigo-500">DEV</span></span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }} 
              className="text-slate-200 p-2 relative z-50 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-300 hover:text-white text-lg font-medium py-2 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold mt-2 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
