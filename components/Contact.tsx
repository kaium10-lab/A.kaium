
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { PortfolioData } from '../types';

interface ContactProps {
  data: PortfolioData['contact'];
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-sm font-bold tracking-widest text-indigo-500 uppercase mb-4">Connections</h2>
            <h3 className="text-4xl font-bold text-white mb-8">Get in Touch</h3>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">{data.description}</p>
            <div className="space-y-8">
              {[
                { icon: <Mail className="w-6 h-6 text-indigo-500" />, label: 'Email', value: data.email },
                { icon: <MapPin className="w-6 h-6 text-purple-500" />, label: 'Address', value: data.address },
                { icon: <Phone className="w-6 h-6 text-pink-500" />, label: 'Phone', value: data.phone }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider">{item.label}</span>
                    <span className="block text-lg text-white font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
                  <input type="text" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} placeholder="Your Name" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} placeholder="your@email.com" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600" />
                </div>
              </div>
              <textarea rows={5} required value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} placeholder="How can I help you?" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"></textarea>
              <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-bold transition-all ${isSent ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-xl' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 shadow-xl'} disabled:opacity-70 active:scale-[0.98]`}>
                {isSubmitting ? <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span> : isSent ? <>Message Sent!</> : <>Send Message <Send className="w-5 h-5" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
