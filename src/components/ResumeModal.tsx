import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, Calendar, Award, CheckCircle2, Bookmark, FileText, Download } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="resume-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            id="resume-modal"
            className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden glass-panel-cyan rounded-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1 font-semibold">Academic CV</span>
                <h3 className="text-2xl font-display font-medium text-white flex items-center gap-2">
                  <FileText className="text-cyan-400 animate-pulse" size={24} />
                  Noora&apos;s Professional Resume
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/Noora_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Noora_Resume.pdf"
                  id="modal-download-resume-btn"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-sans font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Resume</span>
                </a>
                <button
                  id="close-resume-btn"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="p-6 overflow-y-auto space-y-8 flex-1 styles_custom_scroll font-sans text-sm">
              
              {/* Bio Summary */}
              <div className="border-l-2 border-cyan-500/50 pl-4 py-1 space-y-2">
                <h4 className="text-white text-md font-display font-medium">B.Tech Computer Science Engineering (Data Science) Student</h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Motivated B.Tech student with foundational knowledge in Python, SQL, Machine Learning models, and visual analytics. Highly interested in applying engineering concepts to real-world industrial systems through a development or data intern role.
                </p>
              </div>

              {/* Education Grid */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold font-mono text-cyan-400 flex items-center gap-2">
                  <GraduationCap size={18} /> Education Timeline
                </h4>
                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/50 space-y-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h5 className="font-semibold text-white">B.Tech in Computer Science and Engineering (Data Science)</h5>
                      <p className="text-cyan-400 text-xs">K.R. Mangalam University</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 text-slate-400 border border-white/5 flex items-center gap-1">
                      <Calendar size={12} /> 2023 - 2027
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Building robust foundations in Object-Oriented Programming (Python/C++), Relational Database Management Systems (SQL), Big Data architectures, algorithms, data cleaning methodologies, and artificial intelligence frameworks.
                  </p>
                </div>
              </div>

              {/* Certifications & Badges */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold font-mono text-cyan-400 flex items-center gap-2">
                  <Award size={18} /> Credentials & Certifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:border-cyan-500/20 transition-all flex gap-3">
                      <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h5 className="font-medium text-white text-xs">{cert.title}</h5>
                        <p className="text-slate-500 text-[11px] font-mono">{cert.provider} • {cert.date}</p>
                        <p className="text-[10px] text-cyan-300 font-mono">ID: {cert.credentialId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Competencies / Domains */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold font-mono text-cyan-400 flex items-center gap-2">
                  <Bookmark size={18} /> Conceptual Core Strengths
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Predictive Modeling', 'Exploratory Data Analysis', 'SQL Joins & Aggr.', 'Python Scripting', 'Deep Learning Basics', 'Neural Network Triage', 'Vector Graphics', 'Academic Project Management'].map((tag, i) => (
                    <span key={i} className="text-xs bg-cyan-950/40 text-cyan-200 border border-cyan-800/20 px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer / CTA inside modal */}
            <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/40 text-[10px] text-slate-500 font-mono">
              <span>LOCATION: KERALA, INDIA</span>
              <a 
                href="mailto:sriyadnoora@gmail.com" 
                className="text-cyan-400 hover:underline hover:text-cyan-300"
              >
                sriyadnoora@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
