class SoundSystem {
  private enabled: boolean = true;
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sound_enabled');
      if (stored !== null) {
        this.enabled = stored === 'true';
      } else {
        this.enabled = true;
      }

      // Safely auto-initialize and resume AudioContext on first user interaction to bypass autoplay blocks
      const resumeAudio = () => {
        if (this.enabled) {
          this.init();
        }
        window.removeEventListener('click', resumeAudio);
        window.removeEventListener('keydown', resumeAudio);
        window.removeEventListener('touchstart', resumeAudio);
      };
      window.addEventListener('click', resumeAudio);
      window.addEventListener('keydown', resumeAudio);
      window.addEventListener('touchstart', resumeAudio);
    }
  }

  toggle(on?: boolean): boolean {
    const previous = this.enabled;
    this.enabled = on !== undefined ? on : !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', String(this.enabled));
    }
    
    // Play transition sounds
    if (this.enabled) {
      this.init();
      this.playPowerUp();
    } else if (previous) {
      this.init();
      this.playPowerDown();
    }
    
    return this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private init() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn("AudioContext initialization failed:", e);
    }
  }

  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Slient fail
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Silent fail
    }
  }

  playPowerUp() {
    this.init();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const t = ctx.currentTime;
      // Synthesize a quick 3-note cyber ascending chord
      [587.33, 783.99, 1046.50].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + index * 0.05);
        
        gain.gain.setValueAtTime(0, t + index * 0.05);
        gain.gain.linearRampToValueAtTime(0.02, t + index * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + index * 0.05 + 0.12);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(t + index * 0.05);
        osc.stop(t + index * 0.05 + 0.12);
      });
    } catch (e) {
      // Silent fail
    }
  }

  playPowerDown() {
    this.init();
    if (!this.ctx) return;

    try {
      const ctx = this.ctx;
      const t = ctx.currentTime;
      // Synthesize a quick 3-note cyber descending chord
      [1046.50, 783.99, 587.33].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + index * 0.05);
        
        gain.gain.setValueAtTime(0, t + index * 0.05);
        gain.gain.linearRampToValueAtTime(0.02, t + index * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + index * 0.05 + 0.12);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(t + index * 0.05);
        osc.stop(t + index * 0.05 + 0.12);
      });
    } catch (e) {
      // Silent fail
    }
  }
}

export const sound = new SoundSystem();
