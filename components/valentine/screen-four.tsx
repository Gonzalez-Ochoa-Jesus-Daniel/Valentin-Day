'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ScreenFourProps {
  audioUrl?: string;
}

/* ── Partículas doradas flotantes (CSS puro, 0 costo JS) ── */
const PARTICLES = [
  { left: '10%', delay: '0s', dur: '7s', size: 3 },
  { left: '25%', delay: '1.5s', dur: '9s', size: 2 },
  { left: '45%', delay: '0.8s', dur: '8s', size: 4 },
  { left: '65%', delay: '2.2s', dur: '10s', size: 2 },
  { left: '80%', delay: '0.3s', dur: '7.5s', size: 3 },
  { left: '92%', delay: '1.8s', dur: '9.5s', size: 2 },
];

/* ── Estrellas que parpadean en las esquinas (CSS puro) ── */
const TWINKLES = [
  { top: '8%', left: '6%', delay: '0s', size: '1.2rem' },
  { top: '12%', right: '8%', delay: '1.4s', size: '1rem' },
  { bottom: '15%', left: '10%', delay: '0.7s', size: '0.9rem' },
  { bottom: '10%', right: '12%', delay: '2.1s', size: '1.1rem' },
  { top: '35%', right: '5%', delay: '0.4s', size: '0.8rem' },
  { top: '55%', left: '4%', delay: '1.8s', size: '0.85rem' },
];

export default function ScreenFour({ audioUrl }: ScreenFourProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    audio.volume = 0.7;
    audio.loop = true;
    const tryPlay = () => {
      audio.play().then(() => setAudioStarted(true)).catch(() => {});
    };
    tryPlay();
    const handler = () => { tryPlay(); window.removeEventListener('click', handler); };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [audioUrl]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      {/* ── CSS keyframes (solo opacity + transform = GPU friendly) ── */}
      <style jsx>{`
        @keyframes float-up {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>

      {/* ── Fondo con gradientes estáticos (sin blur) ── */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/15 via-transparent to-amber-900/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.05)_0%,transparent_40%)]" />
      </div>

      {/* ── Partículas doradas flotando hacia arriba (CSS puro) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full bg-yellow-400/80"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `float-up ${p.dur} ${p.delay} infinite ease-in-out`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ── Estrellas parpadeantes en las esquinas (CSS puro) ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {TWINKLES.map((t, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: t.top,
              left: t.left,
              right: t.right,
              bottom: t.bottom,
              fontSize: t.size,
              animation: `twinkle 3s ${t.delay} infinite ease-in-out`,
              willChange: 'transform, opacity',
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-5"
      >
        {/* Top decorative line con sparkles */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-400/60 to-yellow-400/80 rounded-full" />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl"
          >
            ✨
          </motion.span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-yellow-400/60 to-yellow-400/80 rounded-full" />
        </motion.div>

        {/* "Te amo" — entrada épica + gradient shimmer */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 1, ease: 'easeOut' },
              backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear', delay: 1 },
            }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-none tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #facc15, #fde68a, #ffffff, #fde68a, #facc15, #fde68a)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Te amo
          </motion.h1>
        </motion.div>

        {/* "mucho" — letter spacing reveal + gradient */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.8em', scale: 0.9 }}
            animate={{ opacity: 1, letterSpacing: '0.2em', scale: 1 }}
            transition={{ duration: 1.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold"
            style={{
              backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fde68a, #fbbf24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            mucho
          </motion.h2>
        </motion.div>

        {/* Heart — heartbeat + pulse ring (CSS animation, no JS) */}
        <motion.div variants={itemVariants} className="my-4 relative flex items-center justify-center">
          {/* Pulse ring - CSS only */}
          <div
            className="absolute w-24 h-24 rounded-full border-2 border-yellow-400/30"
            style={{ animation: 'pulse-ring 2.5s infinite ease-out' }}
          />
          <div
            className="absolute w-24 h-24 rounded-full border border-yellow-400/20"
            style={{ animation: 'pulse-ring 2.5s 1.2s infinite ease-out' }}
          />

          <motion.span
            animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl md:text-8xl inline-block relative z-10"
            style={{ textShadow: '0 0 40px rgba(250, 204, 21, 0.5)' }}
          >
            💛
          </motion.span>
        </motion.div>

        {/* Subtitle — fade in con float */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-xl"
          style={{ animation: 'gentle-float 4s infinite ease-in-out' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-yellow-100/80"
          >
            Eres lo mejor que me ha pasado 💫
          </motion.p>
        </motion.div>

        {/* Bottom emojis — stagger con gentle bounce */}
        <motion.div variants={itemVariants} className="flex gap-5 justify-center text-3xl mt-2">
          {['⭐', '💛', '✨', '🌟', '💫'].map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
              style={{
                animation: `gentle-float ${3 + i * 0.4}s ${i * 0.3}s infinite ease-in-out`,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-400/60 to-yellow-400/80 rounded-full" />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="text-2xl"
          >
            ✨
          </motion.span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-yellow-400/60 to-yellow-400/80 rounded-full" />
        </motion.div>

        {/* Tap to play hint */}
        {!audioStarted && audioUrl && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-300/60 text-sm mt-4"
          >
            Toca la pantalla para escuchar la música 🎵
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
