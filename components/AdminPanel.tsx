
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Layout, User, Code, Briefcase, PhoneCall, Upload, Image as ImageIcon, Lock, Key, Shield, ToggleLeft, ToggleRight, ShieldCheck, Link as LinkIcon, GraduationCap } from 'lucide-react';
import { PortfolioData, Project } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, data, onSave }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [tempData, setTempData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'skills' | 'projects' | 'contact' | 'security'>('general');

  useEffect(() => {
    if (isOpen) {
      const isPersistent = !data.settings.requirePasswordEveryTime;
      const wasUnlocked = sessionStorage.getItem('admin_session_unlocked') === 'true';
      
      if (isPersistent && wasUnlocked) {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
        setPasswordInput('');
      }
    }
  }, [isOpen, data.settings.requirePasswordEveryTime]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === data.settings.password) {
      setIsUnlocked(true);
      setLoginError(false);
      if (!data.settings.requirePasswordEveryTime) {
        sessionStorage.setItem('admin_session_unlocked', 'true');
      }
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleSave = () => {
    onSave(tempData);
    onClose();
  };

  const updateNested = (category: string, field: string, value: any) => {
    setTempData(prev => ({
      ...prev,
      [category]: { ...prev[category as keyof PortfolioData], [field]: value }
    }));
  };

  const updateClub = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        club: {
          ...prev.hero.club,
          [field]: value
        }
      }
    }));
  };

  const updateEducation = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        education: {
          ...prev.about.education,
          [field]: value
        }
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large! Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl overflow-y-auto p-4 md:p-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md bg-slate-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/20">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">Admin Access</h2>
              <p className="text-slate-500 text-sm mt-2">Please enter your password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input 
                  type="password" 
                  autoFocus
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter Password"
                  className={`w-full bg-slate-950 border ${loginError ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all`}
                />
              </div>
              {loginError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs font-bold text-center">
                  Incorrect password. Please try again.
                </motion.p>
              )}
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
              >
                Unlock Panel
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col min-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-indigo-600">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Layout className="w-6 h-6" /> Portfolio Editor
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button onClick={onClose} className="p-2 text-white/60 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-slate-950/50 p-6 space-y-2 border-r border-white/5">
                {[
                  { id: 'general', icon: User, label: 'Hero Section' },
                  { id: 'about', icon: Layout, label: 'About Me' },
                  { id: 'skills', icon: Code, label: 'Skills' },
                  { id: 'projects', icon: Briefcase, label: 'Projects' },
                  { id: 'contact', icon: PhoneCall, label: 'Contact' },
                  { id: 'security', icon: Shield, label: 'Security' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                      activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" /> {tab.label}
                  </button>
                ))}
              </div>

              {/* Editor Area */}
              <div className="flex-1 p-8 overflow-y-auto max-h-[75vh]">
                <AnimatePresence mode="wait">
                  {activeTab === 'general' && (
                    <motion.div key="general" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="space-y-4 w-full md:w-1/3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Navbar Logo</label>
                               <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                                 <img src={tempData.hero.logo} className="w-full h-full object-cover" />
                                 <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                                   <Upload className="w-4 h-4 text-white mb-1" />
                                   <span className="text-[8px] text-white font-bold uppercase">Update</span>
                                   <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateNested('hero', 'logo', base64))} />
                                 </label>
                               </div>
                            </div>
                            <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tab Favicon</label>
                               <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                                 <img src={tempData.hero.favicon} className="w-full h-full object-cover" />
                                 <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                                   <Upload className="w-4 h-4 text-white mb-1" />
                                   <span className="text-[8px] text-white font-bold uppercase">Update</span>
                                   <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateNested('hero', 'favicon', base64))} />
                                 </label>
                               </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero Main Photo</label>
                               <div className="relative group w-full aspect-square rounded-3xl overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                                 <img src={tempData.hero.profileImage} className="w-full h-full object-cover" />
                                 <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                                   <Upload className="w-6 h-6 text-white mb-1" />
                                   <span className="text-[10px] text-white font-bold uppercase tracking-widest">Replace Photo</span>
                                   <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateNested('hero', 'profileImage', base64))} />
                                 </label>
                               </div>
                          </div>

                          <label className="block text-xs font-bold text-slate-500 uppercase mt-6">Club Banner Logo</label>
                          <div className="relative group w-full aspect-video rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                            <img src={tempData.hero.club.banner} className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                              <ShieldCheck className="w-6 h-6 text-white mb-1" />
                              <span className="text-[10px] text-white font-bold">Update Banner Logo</span>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateClub('banner', base64))} />
                            </label>
                          </div>
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name</label>
                              <input value={tempData.hero.firstName} onChange={e => updateNested('hero', 'firstName', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name</label>
                              <input value={tempData.hero.lastName} onChange={e => updateNested('hero', 'lastName', e.target.value)} className="admin-input" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Roles (Comma separated)</label>
                            <input value={tempData.hero.roles.join(', ')} onChange={e => updateNested('hero', 'roles', e.target.value.split(', '))} className="admin-input" />
                          </div>

                          <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4 mt-4">
                            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Club Banner Details</h4>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Club Name</label>
                              <input value={tempData.hero.club.name} onChange={e => updateClub('name', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Club Subtitle/Description</label>
                              <input value={tempData.hero.club.description} onChange={e => updateClub('description', e.target.value)} className="admin-input" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1 flex items-center gap-1"><LinkIcon className="w-2.5 h-2.5" /> Club Link (URL)</label>
                              <input value={tempData.hero.club.link} onChange={e => updateClub('link', e.target.value)} className="admin-input" placeholder="https://..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'about' && (
                    <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 space-y-4">
                          <label className="block text-xs font-bold text-slate-500 uppercase">About Me Photo</label>
                          <div className="relative group aspect-[4/5] rounded-3xl overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                            <img src={tempData.about.profileImage} className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                              <Upload className="w-8 h-8 text-white mb-2" />
                              <span className="text-sm text-white font-bold">Replace Photo</span>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateNested('about', 'profileImage', base64))} />
                            </label>
                          </div>
                          
                          <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4 mt-4">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                              <GraduationCap className="w-3.5 h-3.5" /> Education Banner
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1">Icon/Logo</label>
                                    <div className="relative group w-full aspect-square rounded-xl overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                                       <img src={tempData.about.education?.image} className="w-full h-full object-cover" />
                                       <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                          <Upload className="w-4 h-4 text-white" />
                                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateEducation('image', base64))} />
                                       </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1">Background Image</label>
                                    <div className="relative group w-full aspect-square rounded-xl overflow-hidden border-2 border-indigo-500/30 bg-slate-950">
                                       <img src={tempData.about.education?.bannerImage} className="w-full h-full object-cover" />
                                       <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                          <Upload className="w-4 h-4 text-white" />
                                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => updateEducation('bannerImage', base64))} />
                                       </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1">Label</label>
                              <input value={tempData.about.education?.label || ''} onChange={e => updateEducation('label', e.target.value)} className="admin-input !py-2 !text-xs" placeholder="e.g. Education" />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1">Degree/Value</label>
                              <input value={tempData.about.education?.degree || ''} onChange={e => updateEducation('degree', e.target.value)} className="admin-input !py-2 !text-xs" placeholder="e.g. Diploma in CST" />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1 flex items-center gap-1"><LinkIcon className="w-2.5 h-2.5" /> Link (URL)</label>
                              <input value={tempData.about.education?.link || ''} onChange={e => updateEducation('link', e.target.value)} className="admin-input !py-2 !text-xs" placeholder="https://..." />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section Subtitle</label>
                            <input value={tempData.about.subtitle} onChange={e => updateNested('about', 'subtitle', e.target.value)} className="admin-input" />
                          </div>
                          {tempData.about.paragraphs.map((p, idx) => (
                            <div key={idx}>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Paragraph {idx + 1}</label>
                              <div className="flex gap-2">
                                <textarea rows={4} value={p} onChange={e => {
                                  const newP = [...tempData.about.paragraphs];
                                  newP[idx] = e.target.value;
                                  updateNested('about', 'paragraphs', newP);
                                }} className="admin-input" />
                                <button onClick={() => {
                                  const newP = tempData.about.paragraphs.filter((_, i) => i !== idx);
                                  updateNested('about', 'paragraphs', newP);
                                }} className="text-red-500 self-start p-2"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                          ))}
                          <button onClick={() => updateNested('about', 'paragraphs', [...tempData.about.paragraphs, ''])} className="flex items-center gap-2 text-indigo-400 font-bold px-4 py-2 hover:bg-indigo-500/10 rounded-xl transition-colors"><Plus className="w-4 h-4" /> Add Paragraph</button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div key="skills" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                      {tempData.skills.map((cat, catIdx) => (
                        <div key={catIdx} className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4">
                          <div className="flex items-center justify-between">
                            <input value={cat.title} onChange={e => {
                              const newCats = [...tempData.skills];
                              newCats[catIdx].title = e.target.value;
                              setTempData({...tempData, skills: newCats});
                            }} className="bg-transparent border-b border-indigo-500/50 text-lg font-bold text-white focus:outline-none w-1/2" />
                            <button onClick={() => {
                              const newCats = tempData.skills.filter((_, i) => i !== catIdx);
                              setTempData({...tempData, skills: newCats});
                            }} className="text-red-500 hover:text-red-400 p-2"><Trash2 className="w-5 h-5" /></button>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Skills (Comma separated)</label>
                            <input value={cat.skills.join(', ')} onChange={e => {
                              const newCats = [...tempData.skills];
                              newCats[catIdx].skills = e.target.value.split(', ');
                              setTempData({...tempData, skills: newCats});
                            }} className="admin-input" />
                          </div>
                        </div>
                      ))}
                      <button onClick={() => setTempData({...tempData, skills: [...tempData.skills, {title: 'New Category', skills: []}]})} className="flex items-center gap-2 text-indigo-400 font-bold px-4 py-2 hover:bg-indigo-500/10 rounded-xl transition-colors"><Plus className="w-4 h-4" /> Add Category</button>
                    </motion.div>
                  )}

                  {activeTab === 'projects' && (
                    <motion.div key="projects" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                      {tempData.projects.map((proj, pIdx) => (
                        <div key={proj.id} className="p-6 bg-slate-950/50 rounded-3xl border border-white/5 space-y-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3">
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Project Image</label>
                               <div className="relative group aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                                  <img src={proj.image} className="w-full h-full object-cover" />
                                  <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                                    <ImageIcon className="w-6 h-6 text-white mb-2" />
                                    <span className="text-xs text-white font-bold">Replace Cover</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => {
                                      const newProjs = [...tempData.projects];
                                      newProjs[pIdx].image = base64;
                                      setTempData({...tempData, projects: newProjs});
                                    })} />
                                  </label>
                               </div>
                            </div>
                            <div className="flex-1 space-y-4">
                               <div className="flex items-center justify-between">
                                <input value={proj.title} onChange={e => {
                                  const newProjs = [...tempData.projects];
                                  newProjs[pIdx].title = e.target.value;
                                  setTempData({...tempData, projects: newProjs});
                                }} className="bg-transparent border-b border-indigo-500/50 text-xl font-bold text-white focus:outline-none w-3/4" />
                                <button onClick={() => {
                                  const newProjs = tempData.projects.filter((_, i) => i !== pIdx);
                                  setTempData({...tempData, projects: newProjs});
                                }} className="text-red-500 hover:text-red-400 p-2"><Trash2 className="w-5 h-5" /></button>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                <textarea rows={3} value={proj.description} onChange={e => {
                                  const newProjs = [...tempData.projects];
                                  newProjs[pIdx].description = e.target.value;
                                  setTempData({...tempData, projects: newProjs});
                                }} className="admin-input" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GitHub URL</label>
                                <input value={proj.githubUrl} onChange={e => {
                                  const newProjs = [...tempData.projects];
                                  newProjs[pIdx].githubUrl = e.target.value;
                                  setTempData({...tempData, projects: newProjs});
                                }} className="admin-input" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                       <button onClick={() => setTempData({...tempData, projects: [...tempData.projects, {id: Date.now(), title: 'New Project', description: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800', tags: [], githubUrl: '', liveUrl: ''}]})} className="flex items-center gap-2 text-indigo-400 font-bold px-4 py-2 hover:bg-indigo-500/10 rounded-xl transition-colors"><Plus className="w-4 h-4" /> Add New Project</button>
                    </motion.div>
                  )}

                  {activeTab === 'contact' && (
                    <motion.div key="contact" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                          <input value={tempData.contact.email} onChange={e => updateNested('contact', 'email', e.target.value)} className="admin-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
                          <input value={tempData.contact.phone} onChange={e => updateNested('contact', 'phone', e.target.value)} className="admin-input" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location / Address</label>
                        <input value={tempData.contact.address} onChange={e => updateNested('contact', 'address', e.target.value)} className="admin-input" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Section Description</label>
                        <textarea rows={4} value={tempData.contact.description} onChange={e => updateNested('contact', 'description', e.target.value)} className="admin-input" />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Security Settings</h3>
                      
                      <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Admin Panel Password</label>
                          <div className="relative">
                             <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                             <input 
                              type="text" 
                              value={tempData.settings.password} 
                              onChange={e => updateNested('settings', 'password', e.target.value)} 
                              className="admin-input pl-12" 
                              placeholder="New Password"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-white/5">
                          <div>
                            <h4 className="text-white font-bold text-sm">Require Password Every Time</h4>
                            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                              If disabled, the panel will remember you until the browser tab is closed.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              const newVal = !tempData.settings.requirePasswordEveryTime;
                              updateNested('settings', 'requirePasswordEveryTime', newVal);
                              if (newVal) {
                                sessionStorage.removeItem('admin_session_unlocked');
                              }
                            }}
                            className={`flex items-center transition-colors ${tempData.settings.requirePasswordEveryTime ? 'text-indigo-500' : 'text-slate-600'}`}
                          >
                            {tempData.settings.requirePasswordEveryTime ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-900/50 p-3 rounded-lg border border-white/5">
                          Note: Security settings take effect after saving changes.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(2, 6, 23, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.75rem 1.25rem;
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .admin-input:focus {
          outline: none;
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;