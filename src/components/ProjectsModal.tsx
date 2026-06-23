import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Cpu, Filter } from 'lucide-react';
import { EXPERIENCE_PROJECTS } from '../data';
import { sound } from '../utils/sound';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(EXPERIENCE_PROJECTS.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? EXPERIENCE_PROJECTS
    : EXPERIENCE_PROJECTS.filter(p => p.category === selectedCategory);

  const handleHover = () => {
    sound.playHover();
  };

  const handleClick = (category: string) => {
    sound.playClick();
    setSelectedCategory(category);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="projects-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            id="projects-modal"
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden glass-panel-purple rounded-2xl flex flex-col animate-glow-pulse"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">Academic Works</span>
                <h3 className="text-2xl font-display font-medium text-white flex items-center gap-2">
                  <Cpu className="text-purple-400 animate-pulse" size={24} />
                  Projects Showcase
                </h3>
              </div>
              <button
                id="close-projects-btn"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content list */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 styles_custom_scroll">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-slate-400 text-sm max-w-xl font-sans">
                  A selection of B.Tech computer science and engineering coursework assignments, machine learning trials, and interactive experiments.
                </p>

                {/* Filter Controls */}
                <div className="flex items-center gap-2 min-w-fit">
                  <Filter size={14} className="text-purple-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-450 uppercase tracking-wider select-none shrink-0">Filter:</span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onMouseEnter={handleHover}
                      onClick={() => handleClick(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Projects Grid Grid layout and animation */}
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, idx) => {
                    const projectPerformance: { [key: string]: { dataset: string; metric: string; score: string } } = {
                      proj1: { dataset: '15,000 Retail Contexts', metric: 'Silhouette Coeff', score: '0.68' },
                      proj2: { dataset: 'KRM University DB schema', metric: 'Index Speedup', score: '+40%' },
                      proj3: { dataset: 'Custom Image Matrix', metric: 'Val Accuracy', score: '94.7%' },
                      proj4: { dataset: 'Simulated KPI Stream', metric: 'HMR Latency', score: '< 4ms' },
                      proj5: { dataset: 'Multi-variable Housing Data', metric: 'R-Squared Score', score: '0.915' },
                    };

                    return (
                      <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="p-5 rounded-xl border border-white/5 bg-slate-950/40 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              {project.category}
                            </span>
                            <ExternalLink size={14} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <h4 className="text-md font-display font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                            {project.title}
                          </h4>
                          <p className="text-slate-400 text-xs font-sans leading-relaxed mb-4">
                            {project.description}
                          </p>

                          {/* Dataset & Model Card Spec */}
                          {projectPerformance[project.id] && (
                            <div className="mb-4 p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center text-[9px] font-mono">
                              <span className="text-slate-500 max-w-[55%] truncate">
                                Data: <span className="text-slate-350">{projectPerformance[project.id].dataset}</span>
                              </span>
                              <span>
                                <span className="text-purple-400 font-bold">{projectPerformance[project.id].metric}: </span>
                                <span className="text-emerald-400 font-extrabold">{projectPerformance[project.id].score}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <span className="text-slate-500 font-mono text-sm">No projects matching this filter category.</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 text-center text-[10px] text-slate-500 font-mono bg-black/40">
              K.R. MANGALAM UNIVERSITY • B.TECH CSE DATA SCIENCE PROTOTYPES
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
