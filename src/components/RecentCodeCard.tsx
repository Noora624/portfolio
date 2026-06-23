import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, Play, Pause, ChevronRight, FileCode, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface RecentCodeCardProps {
  theme?: 'dark' | 'light';
}

export default function RecentCodeCard({ theme = 'dark' }: RecentCodeCardProps) {
  const [lang, setLang] = useState<'python' | 'sql'>('python');
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const isDark = theme === 'dark';

  // Toggle play/pause for auto-scrolling
  const togglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  const selectLanguage = (selectedLang: 'python' | 'sql') => {
    sound.playClick();
    setLang(selectedLang);
    // Reset scroll when language changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleCopy = () => {
    sound.playClick();
    const rawCode = lang === 'python' ? pythonRaw : sqlRaw;
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Auto-scrolling logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScrollHeight = container.scrollHeight - container.clientHeight;
      if (maxScrollHeight <= 0) return;

      // Increment scroll position
      if (container.scrollTop >= maxScrollHeight - 1) {
        // Wait at the bottom for 1.5s then loop back to top
        clearInterval(interval);
        setTimeout(() => {
          if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
          }
          // Re-trigger the active scroll loop
          setIsPlaying(false);
          setTimeout(() => setIsPlaying(true), 1200);
        }, 1500);
      } else {
        container.scrollTop += 0.85; // smooth scrolling increment
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, lang]);

  const pythonRaw = `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load research dataset & clean missing features
df = pd.read_csv("./analytics_dataset.csv")
df.fillna(method="ffill", inplace=True)

# Feature Engineering: segment high-yield values
df["kpi_index"] = df["metrics"] * np.log(df["volume"] + 1)
X = df.drop(columns=["target_label", "id"])
y = df["target_label"]

# Train/Test partitioning
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(n_estimators=100, max_depth=8)
clf.fit(X_tr, y_tr)

# Compile accuracies
accuracy = clf.score(X_te, y_te)
print(f"🌟 Optimization Model Acc: {accuracy * 100:.2f}%")`;

  const sqlRaw = `-- Analyze user metrics and retention using window functions
WITH cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', registration_date) AS cohort_month,
    FIRST_VALUE(volume_gb) OVER(
      PARTITION BY user_id 
      ORDER BY transaction_timestamp
    ) AS initial_volume
  FROM dwh_analytics.user_activity_logs
  WHERE status = 'ACTIVE'
),
aggregated_metrics AS (
  SELECT 
    cohort_month,
    COUNT(DISTINCT user_id) AS total_users,
    SUM(initial_volume) AS total_onboard_volume,
    AVG(initial_volume) AS average_onboard_volume
  FROM cohorts
  GROUP BY 1
)
SELECT 
  cohort_month,
  total_users,
  total_onboard_volume,
  ROUND(average_onboard_volume, 2) AS avg_onboard_vol_gb,
  LAG(total_users, 1) OVER (ORDER BY cohort_month) AS prev_month_users
FROM aggregated_metrics
ORDER BY cohort_month DESC;`;

  return (
    <div 
      className={`rounded-3xl border backdrop-blur-md relative overflow-hidden group/term transition-all duration-300 ${
        isDark 
          ? 'bg-slate-950/40 border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] hover:border-[#00E5FF]/30' 
          : 'bg-white/70 border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#00e5ff]/40'
      }`}
    >
      {/* Sparkles top line glow */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent opacity-0 group-hover/term:opacity-100 transition-opacity duration-300" />

      {/* Terminal Title Bar */}
      <div className={`px-5 py-3.5 border-b flex items-center justify-between font-mono text-[10px] ${
        isDark ? 'border-white/5 bg-slate-900/40' : 'border-slate-205 bg-slate-50/70'
      }`}>
        <div className="flex items-center gap-2">
          {/* Mac Buttons Mock */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          </div>
          <Terminal size={11} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
          <span className={isDark ? 'text-slate-400' : 'text-slate-655'}>noora@ds-compile:~/recent_code</span>
        </div>
        
        {/* Active terminal status beacon */}
        <div id="terminal-pulse-beacon" className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-ping" />
          <span className={`text-[9px] font-bold ${isDark ? 'text-[#00E5FF]/90' : 'text-cyan-705'}`}>LIVE_CODE</span>
        </div>
      </div>

      {/* Toggles and controls container */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'border-white/5 bg-slate-950/20' : 'border-slate-205 bg-slate-50/30'
      }`}>
        {/* Language Selection Tabs */}
        <div className="flex bg-slate-200/40 dark:bg-slate-900/60 p-0.5 rounded-lg border border-slate-300/30 dark:border-white/5">
          <button
            onClick={() => selectLanguage('python')}
            className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-md transition-all cursor-pointer ${
              lang === 'python'
                ? 'bg-amber-400/20 text-amber-500 border border-amber-500/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Python (Pandas)
          </button>
          <button
            onClick={() => selectLanguage('sql')}
            className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-md transition-all cursor-pointer ${
              lang === 'sql'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/20 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SQL Query
          </button>
        </div>

        {/* Play/Pause Auto-Scroll and Copy Operations */}
        <div className="flex items-center gap-2 font-mono">
          {/* Copy Button */}
          <button 
            onClick={handleCopy}
            className={`p-1.5 rounded border text-[9px] flex items-center gap-1 cursor-pointer transition-all ${
              copied 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white dark:hover:bg-white/5 hover:border-slate-700'
            }`}
          >
            {copied ? <Check size={11} /> : <FileCode size={11} />}
            <span>{copied ? 'COPIED!' : 'COPY'}</span>
          </button>

          {/* Auto Scroll Toggle */}
          <button
            onClick={togglePlay}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 text-[9px] font-mono font-bold cursor-pointer transition-all ${
              isPlaying 
                ? 'bg-[#00E5FF]/10 border-[#00E5FF]/20 text-[#00E5FF]' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white dark:hover:bg-white/5 hover:border-slate-700'
            }`}
          >
            {isPlaying ? <Pause size={10} className="animate-pulse" /> : <Play size={10} />}
            <span>AUTO_SCROLL: {isPlaying ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Code panel with scrolling effect */}
      <div 
        ref={scrollContainerRef}
        className="p-5 overflow-y-auto max-h-[290px] text-[11px] sm:text-xs font-mono leading-relaxed styles_custom_scroll h-[250px] relative select-all scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="space-y-1 pb-4">
          {lang === 'python' ? (
            <>
              <div><span className="text-pink-400 font-bold">import</span> pandas <span className="text-pink-400 font-bold">as</span> pd</div>
              <div><span className="text-pink-400 font-bold">import</span> numpy <span className="text-pink-400 font-bold">as</span> np</div>
              <div><span className="text-pink-400 font-bold">from</span> sklearn.model_selection <span className="text-pink-400 font-bold">import</span> train_test_split</div>
              <div><span className="text-pink-400 font-bold">from</span> sklearn.ensemble <span className="text-pink-400 font-bold">import</span> RandomForestClassifier</div>
              <div className="h-2" />
              <div><span className="text-slate-450 dark:text-slate-500 italic"># Load pipeline research dataset</span></div>
              <div>df = pd.read_csv(<span className="text-amber-450 dark:text-amber-300">&quot;./analytics_dataset.csv&quot;</span>)</div>
              <div>df.fillna(method=<span className="text-amber-450 dark:text-amber-300">&quot;ffill&quot;</span>, inplace=<span className="text-blue-500 font-semibold">True</span>)</div>
              <div className="h-2" />
              <div><span className="text-slate-450 dark:text-slate-500 italic"># Feature Engineering: segment high-yield variables</span></div>
              <div>df[<span className="text-amber-450 dark:text-amber-300">&quot;kpi_index&quot;</span>] = df[<span className="text-amber-450 dark:text-amber-300">&quot;metrics&quot;</span>] * np.log(df[<span className="text-amber-450 dark:text-amber-300">&quot;volume&quot;</span>] + <span className="text-purple-400">1</span>)</div>
              <div>X = df.drop(columns=[<span className="text-amber-450 dark:text-amber-300">&quot;target_label&quot;</span>, <span className="text-amber-450 dark:text-amber-300">&quot;id&quot;</span>])</div>
              <div>y = df[<span className="text-amber-450 dark:text-amber-300">&quot;target_label&quot;</span>]</div>
              <div className="h-2" />
              <div><span className="text-slate-450 dark:text-slate-500 italic"># Split dataset & train Random Forest Classifier</span></div>
              <div>X_tr, X_te, y_tr, y_te = train_test_split(</div>
              <div>  X, y, test_size=<span className="text-purple-400 font-bold">0.2</span>, random_state=<span className="text-purple-400 font-bold">42</span></div>
              <div>)</div>
              <div>clf = RandomForestClassifier(n_estimators=<span className="text-purple-400">100</span>, max_depth=<span className="text-purple-400">8</span>)</div>
              <div>clf.fit(X_tr, y_tr)</div>
              <div className="h-2" />
              <div><span className="text-slate-450 dark:text-slate-500 italic"># Evaluate classifier model stats</span></div>
              <div>accuracy = clf.score(X_te, y_te)</div>
              <div>print(<span className="text-amber-450 dark:text-amber-300">f&quot;🌟 Optimization Model Acc: </span><span className="text-pink-400 font-bold">&#123;</span>accuracy * <span className="text-purple-400">100</span><span className="text-pink-400 font-bold">:.2f&#125;</span><span className="text-amber-450 dark:text-amber-300">%&quot;</span>)</div>
            </>
          ) : (
            <>
              <div><span className="text-[#8B5CF6] font-bold">WITH</span> cohorts <span className="text-[#8B5CF6] font-bold">AS</span> (</div>
              <div>  <span className="text-[#8B5CF6] font-bold">SELECT</span> </div>
              <div>    user_id,</div>
              <div>    DATE_TRUNC(<span className="text-amber-450 dark:text-amber-300">&apos;month&apos;</span>, registration_date) <span className="text-[#8B5CF6] font-bold">AS</span> cohort_month,</div>
              <div>    FIRST_VALUE(volume_gb) OVER(</div>
              <div>      PARTITION <span className="text-[#8B5CF6] font-bold">BY</span> user_id </div>
              <div>      <span className="text-[#8B5CF6] font-bold">ORDER BY</span> transaction_timestamp</div>
              <div>    ) <span className="text-[#8B5CF6] font-bold">AS</span> initial_volume</div>
              <div>  <span className="text-[#8B5CF6] font-bold">FROM</span> dwh_analytics.user_activity_logs</div>
              <div>  <span className="text-[#8B5CF6] font-bold">WHERE</span> status = <span className="text-amber-450 dark:text-amber-300">&apos;ACTIVE&apos;</span></div>
              <div>),</div>
              <div>aggregated_metrics <span className="text-[#8B5CF6] font-bold">AS</span> (</div>
              <div>  <span className="text-[#8B5CF6] font-bold">SELECT</span> </div>
              <div>    cohort_month,</div>
              <div>    COUNT(<span className="text-[#8B5CF6] font-bold">DISTINCT</span> user_id) <span className="text-[#8B5CF6] font-bold">AS</span> total_users,</div>
              <div>    SUM(initial_volume) <span className="text-[#8B5CF6] font-bold">AS</span> total_onboard_volume,</div>
              <div>    AVG(initial_volume) <span className="text-[#8B5CF6] font-bold">AS</span> average_onboard_volume</div>
              <div>  <span className="text-[#8B5CF6] font-bold">FROM</span> cohorts</div>
              <div>  <span className="text-[#8B5CF6] font-bold">GROUP BY</span> <span className="text-purple-400">1</span></div>
              <div>)</div>
              <div><span className="text-[#8B5CF6] font-bold">SELECT</span> </div>
              <div>  cohort_month,</div>
              <div>  total_users,</div>
              <div>  total_onboard_volume,</div>
              <div>  ROUND(average_onboard_volume, <span className="text-purple-400">2</span>) <span className="text-[#8B5CF6] font-bold">AS</span> avg_onboard_vol_gb,</div>
              <div>  LAG(total_users, <span className="text-purple-400">1</span>) OVER (<span className="text-[#8B5CF6] font-bold">ORDER BY</span> cohort_month) <span className="text-[#8B5CF6] font-bold">AS</span> prev_month_users</div>
              <div><span className="text-[#8B5CF6] font-bold">FROM</span> aggregated_metrics</div>
              <div><span className="text-[#8B5CF6] font-bold">ORDER BY</span> cohort_month <span className="text-[#00E5FF] font-bold">DESC</span>;</div>
            </>
          )}
        </div>
      </div>

      <div className={`p-3 text-[9px] font-mono flex justify-between ${
        isDark ? 'bg-slate-950/80 border-t border-white/5 text-slate-500' : 'bg-slate-50/80 border-t border-slate-200 text-slate-500'
      }`}>
        <span className="flex items-center gap-1">
          <ChevronRight size={10} className="text-[#00E5FF]" />
          Compile Speed: <strong className={isDark ? 'text-white' : 'text-slate-800'}>0.042s</strong>
        </span>
        <span>Lines: {lang === 'python' ? '22' : '23'}</span>
      </div>
    </div>
  );
}
