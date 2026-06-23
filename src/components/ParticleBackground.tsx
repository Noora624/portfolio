import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse
    const mouse = { x: -1000, y: -1000, radius: 150 };

    // Configurable particle arrays
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(45, Math.floor((width * height) / 35000));

    // Colors
    const glowColors = [
      'rgba(0, 229, 255, ',   // Neon Cyan
      'rgba(139, 92, 246, ',  // Vibrant Purple
      'rgba(236, 72, 153, ',  // Neon Pink
    ];

    // Seed particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.2,
        color: glowColors[Math.floor(Math.random() * glowColors.length)],
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    // Moving light streaks
    interface Streak {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
      color: string;
    }
    const streaks: Streak[] = [];
    const streakCount = 5;
    for (let i = 0; i < streakCount; i++) {
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.18 + 0.05,
        width: Math.random() * 1.5 + 0.6,
        color: glowColors[Math.floor(Math.random() * glowColors.length)],
      });
    }

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    
    resizeObserver.observe(canvas.parentElement || document.body);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render moving light streaks
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.x += s.speed;
        if (s.x > width + s.length) {
          s.x = -s.length;
          s.y = Math.random() * height;
        }
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.5, `${s.color}${s.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y);
        ctx.stroke();
      }

      // Render links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce borders
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Gentle interactive mouse behavior
        if (mouse.x !== -1000) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            // Push away slightly
            const force = (mouse.radius - dist) / mouse.radius;
            p1.x += (dx / dist) * force * 1.5;
            p1.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Check relative distance for connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection range
          if (dist < 115) {
            const linkAlpha = (1 - dist / 115) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Linear gradient connection for high quality looks
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `${p1.color}${linkAlpha})`);
            grad.addColorStop(1, `${p2.color}${linkAlpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
    />
  );
}
