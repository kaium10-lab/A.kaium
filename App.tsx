import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { PortfolioData } from './types';

const INITIAL_DATA: PortfolioData = {
  hero: {
    firstName: "ABDUL",
    lastName: "KAIUM",
    roles: ["Computer Science Student", "Python Developer", "Cyber Security Enthusiast", "Tech Explorer"],
    description: "1st Semester Student of Diploma in Computer Science & Technology. I am passionate about automation and cyber security.",
    badgeText: "Diploma Student @ DPI",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
    favicon: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
    club: {
      name: "DPI Cyber Security Club",
      description: "Securing the digital frontier at Daffodil",
      banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      link: "https://daffodilpolytechnic.edu.bd/"
    }
  },
  about: {
    title: "About Me",
    subtitle: "Background",
    paragraphs: [
      "I am Abdul Kaium, a 1st Semester student of Diploma in Computer Science & Technology at Daffodil Polytechnic Institute.",
      "Passionate about solving problems through code, I am currently mastering Python for automation and exploring the depths of Cyber Security to build a safer digital future.",
      "My journey is defined by constant learning and a drive to contribute to the tech community."
    ],
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
    education: {
      label: "Education",
      degree: "Diploma in CST",
      link: "https://daffodilpolytechnic.edu.bd/",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400",
      bannerImage: "https://images.unsplash.com/photo-1523050335102-c325097824fb?auto=format&fit=crop&q=80&w=800"
    }
  },
  skills: [
    { title: 'Software & Productivity', skills: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Email Management', 'Google Apps'] },
    { title: 'Programming & Data', skills: ['Python (Learning)', 'Data Entry', 'File Management', 'Basic CLI Tools'] },
    { title: 'Research & Web', skills: ['Internet Research', 'Technical Documentation', 'Cyber Security Basics'] },
    { title: 'Professional Skills', skills: ['Time Management', 'Teamwork', 'Critical Thinking', 'Fast Learning'] }
  ],
  projects: [
    {
      id: 1,
      title: 'PDF Merger (Python CLI)',
      description: 'A Python command-line utility that allows users to merge multiple PDF documents into a single file efficiently.',
      image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800',
      tags: ['Python', 'PyPDF2', 'Automation'],
      liveUrl: 'https://github.com/kaium10-lab/py-PDF-Marger',
      githubUrl: 'https://github.com/kaium10-lab/py-PDF-Marger'
    }
  ],
  contact: {
    email: 'a.kaium2008@gmail.com',
    address: 'Bonomala, Tongi, Gazipur',
    phone: '+8801637262636',
    description: 'I am always open to discussing new projects or sharing tech insights. Reach out anytime!'
  },
  settings: {
    password: 'admin123',
    requirePasswordEveryTime: true
  }
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load saved data on startup
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Update Favicon dynamically when it changes in portfolioData
  useEffect(() => {
    if (portfolioData.hero.favicon) {
      const link = document.getElementById('favicon') as HTMLLinkElement;
      if (link) {
        link.href = portfolioData.hero.favicon;
      }
    }
  }, [portfolioData.hero.favicon]);

  const handleSaveData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 -z-10 bg-slate-950 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative z-0">
            <Navbar logo={portfolioData.hero.logo} />
            <main>
              <Hero data={portfolioData.hero} />
              <About data={portfolioData.about} />
              <Skills data={portfolioData.skills} />
              <Projects data={portfolioData.projects} />
              <Contact data={portfolioData.contact} />
            </main>
            <Footer data={portfolioData} onAdminToggle={() => setIsAdminOpen(true)} />
            <AdminPanel 
              isOpen={isAdminOpen} 
              onClose={() => setIsAdminOpen(false)} 
              data={portfolioData} 
              onSave={handleSaveData} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
