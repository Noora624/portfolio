import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  MailOpen, 
  Linkedin, 
  Github, 
  Phone, 
  MapPin, 
  Award, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Internship Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please specify all required fields to send Noora a message.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    
    // Simulate real web submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', purpose: 'Internship Opportunity', message: '' });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            id="contact-modal"
            className="relative w-full max-w-3xl overflow-hidden glass-panel-cyan rounded-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">Communications</span>
                <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
                  <MailOpen className="text-cyan-400" size={22} />
                  Connect with Noora
                </h3>
              </div>
              <button
                id="close-contact-btn"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Form / Success Display */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Panel: Direct Access Node Info / Social Links */}
                <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">Direct Access Credentials</span>
                      <h4 className="text-md font-display font-bold text-white uppercase tracking-tight">Technical Coordinates</h4>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-300 font-sans">
                      {/* Name */}
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5">
                        <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <Award size={14} />
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">FULL NAME</span>
                          <span className="font-semibold text-white">Noora</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5">
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">LOCATION BASE</span>
                          <span className="font-semibold text-white">Kerala, India</span>
                        </div>
                      </div>

                      {/* Email */}
                      <a 
                        href="mailto:sriyadnoora@gmail.com"
                        className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 transition-colors block group"
                      >
                        <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20">
                          <MailOpen size={14} />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">EMAIL NODE</span>
                          <span className="font-semibold text-white break-all">sriyadnoora@gmail.com</span>
                        </div>
                        <ExternalLink size={10} className="text-slate-500 group-hover:text-cyan-400 shrink-0 self-center" />
                      </a>

                      {/* Phone */}
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5">
                        <div className="p-2 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                          <Phone size={14} />
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">PHONE LINK</span>
                          <span className="font-semibold text-white">+91 9895234016</span>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <a 
                        href="https://linkedin.com/in/xxxx"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-blue-400/20 transition-colors block group"
                      >
                        <div className="p-2 rounded bg-blue-600/10 text-blue-400 border border-blue-600/20 group-hover:bg-blue-600/20">
                          <Linkedin size={14} />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">LINKEDIN NETWORK</span>
                          <span className="font-mono text-[10px] text-white">linkedin.com/in/xxxx</span>
                        </div>
                        <ExternalLink size={10} className="text-slate-500 group-hover:text-[#00E5FF] shrink-0" />
                      </a>

                      {/* GitHub */}
                      <a 
                        href="https://github.com/Noora624"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-slate-400/20 transition-colors block group"
                      >
                        <div className="p-2 rounded bg-neutral-800 text-slate-200 border border-neutral-700">
                          <Github size={14} />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">GITHUB REPOSITORIES</span>
                          <span className="font-mono text-[10px] text-white">https://github.com/Noora624</span>
                        </div>
                        <ExternalLink size={10} className="text-slate-500 group-hover:text-white shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* Availability Badge & Status indicator */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-slate-950 border border-[#00E5FF]/10 space-y-1.5 shadow-[0_0_15px_rgba(0,137,163,0.05)]">
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-black block flex items-stretch gap-1.5 leading-none">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping self-center shrink-0" />
                      <span>AVAILABILITY_STATUS</span>
                    </span>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                      Open for internships and entry-level Data Analyst roles.
                    </p>
                  </div>
                </div>

                {/* Right Panel: Clean form submission or success node */}
                <div className="md:col-span-7 flex flex-col justify-center">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                      {errorMsg && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex gap-2 items-center">
                          <AlertTriangle size={14} className="shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-slate-400 text-xs font-mono">My Name *</label>
                        <input
                          id="input-contact-name"
                          type="text"
                          placeholder="e.g. Hiring Manager"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-lg px-4 py-2 text-white text-xs outline-none transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 text-xs font-mono">My Email *</label>
                        <input
                          id="input-contact-email"
                          type="email"
                          placeholder="e.g. manager@corporation.com"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-lg px-4 py-2 text-white text-xs outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 text-xs font-mono">Inquiry Purpose</label>
                        <select
                          id="input-contact-purpose"
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-lg px-4 py-2 text-slate-300 text-xs outline-none transition-all [&>option]:bg-slate-950"
                          value={formData.purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        >
                          <option value="Internship Opportunity">🚀 Internship Opportunity</option>
                          <option value="Project Collaboration">🤝 Project Collaboration</option>
                          <option value="General Query">💡 General Question</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 text-xs font-mono">Inquiry Narrative *</label>
                        <textarea
                          id="input-contact-message"
                          rows={4}
                          placeholder="Type your message details here..."
                          className="w-full bg-slate-950/60 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-lg px-4 py-2.5 text-white text-xs outline-none transition-all resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button
                          id="submit-contact-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg font-mono font-medium text-white transition-all text-xs cursor-pointer shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                              <span>Transmitting Core Request...</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              <span>Transmit Secure Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="py-8 text-center space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-400"
                      >
                        <CheckCircle2 size={36} className="animate-bounce" />
                      </motion.div>
                      <div className="space-y-1">
                        <h4 className="text-white text-lg font-display font-medium">Transmission Successful</h4>
                        <p className="text-slate-400 text-xs px-6">
                          Your query has been recorded. Noora will contact you directly via <span className="text-cyan-400">{formData.email}</span>. Thank you for reaching out!
                        </p>
                      </div>
                      <button
                        id="finish-contact-btn"
                        onClick={handleReset}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-xs border border-white/10 text-white rounded-lg transition-colors cursor-pointer font-mono"
                      >
                        Confirm & Return
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 text-center text-[10px] text-slate-500 font-mono bg-black/40">
              SECURE TLS CORRESPONDENCE NODE
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
