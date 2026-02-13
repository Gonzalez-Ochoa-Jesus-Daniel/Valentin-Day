'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ScreenFourProps {
  audioUrl?: string;
}

/* ═══ Shooting stars — different angles, speeds ═══ */
const STARS = [
  { top: '5%',  left: '-5%',  angle: 35,  dur: '2.8s', delay: '0s',   len: 120 },
  { top: '15%', left: '-5%',  angle: 25,  dur: '3.4s', delay: '4s',   len: 90 },
  { top: '8%',  left: '30%',  angle: 40,  dur: '2.2s', delay: '7s',   len: 100 },
  { top: '20%', left: '50%',  angle: 30,  dur: '3s',   delay: '11s',  len: 80 },
  { top: '3%',  left: '70%',  angle: 38,  dur: '2.6s', delay: '15s',  len: 110 },
];

/* ═══ Firefly particles — organic movement ═══ */
const FIREFLIES = [
  { x: '12%', y: '20%', dur: '6s',  delay: '0s',   size: 3 },
  { x: '85%', y: '30%', dur: '7s',  delay: '1s',   size: 2 },
  { x: '25%', y: '70%', dur: '8s',  delay: '0.5s', size: 3 },
  { x: '70%', y: '80%', dur: '6.5s',delay: '2s',   size: 2 },
  { x: '50%', y: '15%', dur: '7.5s',delay: '1.5s', size: 4 },
  { x: '90%', y: '60%', dur: '6s',  delay: '3s',   size: 2 },
  { x: '8%',  y: '50%', dur: '8s',  delay: '0.8s', size: 3 },
  { x: '40%', y: '90%', dur: '7s',  delay: '2.5s', size: 2 },
];

/* ═══ Rising golden orbs ═══ */
const ORBS = [
  { left: '8%',  dur: '11s', delay: '0s',   size: 5 },
  { left: '22%', dur: '14s', delay: '2s',   size: 3 },
  { left: '38%', dur: '12s', delay: '1s',   size: 4 },
  { left: '55%', dur: '13s', delay: '3s',   size: 3 },
  { left: '72%', dur: '11s', delay: '0.5s', size: 5 },
  { left: '88%', dur: '15s', delay: '2.5s', size: 4 },
  { left: '45%', dur: '10s', delay: '4s',   size: 3 },
  { left: '15%', dur: '13s', delay: '5s',   size: 2 },
  { left: '65%', dur: '12s', delay: '1.5s', size: 3 },
  { left: '95%', dur: '14s', delay: '3.5s', size: 2 },
];

/* ═══ Starfield — tiny background stars ═══ */
const STAR_FIELD = Array.from({ length: 30 }, (_, i) => ({
  x: `${Math.round((i * 37 + 13) % 100)}%`,
  y: `${Math.round((i * 53 + 7) % 100)}%`,
  size: (i % 3) + 1,
  delay: `${(i * 0.7) % 5}s`,
  dur: `${3 + (i % 4)}s`,
}));

/* ═══ Musical notes that float when audio plays ═══ */
const NOTES = [
  { emoji: '♪', left: '5%',  dur: '8s',  delay: '0s' },
  { emoji: '♫', left: '20%', dur: '10s', delay: '2s' },
  { emoji: '♪', left: '35%', dur: '9s',  delay: '4s' },
  { emoji: '♫', left: '60%', dur: '11s', delay: '1s' },
  { emoji: '♪', left: '78%', dur: '8.5s',delay: '3s' },
  { emoji: '♫', left: '92%', dur: '10s', delay: '5s' },
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
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      {/* ═══════════ ALL CSS KEYFRAMES — only transform + opacity = GPU composited ═══════════ */}
      <style jsx>{`
        /* Aurora color shift */
        @keyframes aurora-shift {
          0%   { filter: hue-rotate(0deg); opacity: 0.6; }
          33%  { filter: hue-rotate(15deg); opacity: 0.8; }
          66%  { filter: hue-rotate(-10deg); opacity: 0.7; }
          100% { filter: hue-rotate(0deg); opacity: 0.6; }
        }

        /* Shooting star */
        @keyframes shoot {
          0%   { transform: translateX(0) translateY(0) scaleX(0); opacity: 0; }
          5%   { opacity: 1; scaleX(1); }
          70%  { opacity: 1; }
          100% { transform: translateX(100vw) translateY(60vh) scaleX(1); opacity: 0; }
        }

        /* Firefly — organic float path */
        @keyframes firefly {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          25%      { transform: translate(30px, -20px) scale(1.3); opacity: 0.9; }
          50%      { transform: translate(-15px, -40px) scale(0.8); opacity: 0.4; }
          75%      { transform: translate(20px, 10px) scale(1.1); opacity: 1; }
        }

        /* Rising orbs */
        @keyframes rise {
          0%   { transform: translateY(100vh) scale(0.3); opacity: 0; }
          15%  { opacity: 0.8; transform: translateY(80vh) scale(1); }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
        }

        /* Concentric pulse rings */
        @keyframes ring-expand {
          0%   { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }

        /* Gentle float for text */
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        /* Slow spin */
        @keyframes slow-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Real heartbeat — double pulse */
        @keyframes real-heartbeat {
          0%, 100% { transform: scale(1); }
          15%      { transform: scale(1.25); }
          30%      { transform: scale(1); }
          45%      { transform: scale(1.18); }
          60%      { transform: scale(1); }
        }

        /* Text glow pulse */
        @keyframes text-glow-pulse {
          0%, 100% { text-shadow: 0 0 20px rgba(250,204,21,0.3), 0 0 60px rgba(250,204,21,0.1); }
          50%      { text-shadow: 0 0 40px rgba(250,204,21,0.6), 0 0 100px rgba(250,204,21,0.2), 0 0 150px rgba(250,204,21,0.1); }
        }

        /* ✨ NEW: Starfield twinkle */
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          50%      { opacity: 0.8; transform: scale(1); }
        }

        /* ✨ NEW: SVG heart draw — stroke-dashoffset is GPU composited */
        @keyframes draw-heart {
          0%   { stroke-dashoffset: 800; opacity: 0; }
          10%  { opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          85%  { stroke-dashoffset: 0; opacity: 0.6; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }

        @keyframes heart-glow-breathe {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.5; }
        }

        /* ✨ NEW: Musical notes floating */
        @keyframes note-float {
          0%   { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
          10%  { opacity: 0.6; transform: translateY(80vh) rotate(15deg) scale(0.8); }
          50%  { opacity: 0.4; transform: translateY(40vh) rotate(-10deg) scale(1); }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-10vh) rotate(20deg) scale(0.6); opacity: 0; }
        }

        /* ✨ NEW: Infinity draw */
        @keyframes draw-infinity {
          0%   { stroke-dashoffset: 500; opacity: 0; }
          15%  { opacity: 0.8; }
          60%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }

        /* ✨ NEW: Diamond sparkle burst */
        @keyframes diamond-burst {
          0%   { transform: scale(0) rotate(0deg); opacity: 0; }
          50%  { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* ═══ BACKGROUND — Aurora / Northern lights effect ═══ */}
      <div className="fixed inset-0 -z-10 bg-black">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

        {/* Aurora band 1 — warm gold/amber */}
        <div
          className="absolute top-0 left-0 w-full h-[60%]"
          style={{
            background: 'linear-gradient(135deg, transparent 20%, rgba(250,204,21,0.07) 40%, rgba(245,158,11,0.1) 50%, rgba(250,204,21,0.05) 65%, transparent 80%)',
            animation: 'aurora-shift 12s infinite ease-in-out',
            willChange: 'filter, opacity',
          }}
        />

        {/* Aurora band 2 — offset, different timing */}
        <div
          className="absolute bottom-0 right-0 w-full h-[50%]"
          style={{
            background: 'linear-gradient(225deg, transparent 25%, rgba(251,191,36,0.06) 45%, rgba(217,119,6,0.08) 55%, transparent 75%)',
            animation: 'aurora-shift 16s 3s infinite ease-in-out',
            willChange: 'filter, opacity',
          }}
        />

        {/* Center glow — radial gradient, no blur filter */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(250,204,21,0.06)_0%,transparent_100%)]" />
      </div>

      {/* ═══ SHOOTING STARS — CSS only, stunning trail effect ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {STARS.map((s, i) => (
          <div
            key={`star-${i}`}
            className="absolute"
            style={{
              top: s.top,
              left: s.left,
              width: s.len,
              height: 2,
              background: `linear-gradient(90deg, transparent, rgba(250,204,21,0.8) 40%, #fff 90%, transparent)`,
              borderRadius: 999,
              transform: `rotate(${s.angle}deg)`,
              animation: `shoot ${s.dur} ${s.delay} infinite ease-in`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ═══ FIREFLIES — organic floating points of light ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {FIREFLIES.map((f, i) => (
          <div
            key={`fly-${i}`}
            className="absolute rounded-full"
            style={{
              left: f.x,
              top: f.y,
              width: f.size,
              height: f.size,
              background: 'radial-gradient(circle, rgba(250,204,21,0.9) 0%, rgba(250,204,21,0) 70%)',
              animation: `firefly ${f.dur} ${f.delay} infinite ease-in-out`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ═══ RISING GOLDEN ORBS — magical floating lights ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {ORBS.map((o, i) => (
          <div
            key={`orb-${i}`}
            className="absolute bottom-0 rounded-full"
            style={{
              left: o.left,
              width: o.size,
              height: o.size,
              background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(250,204,21,0) 70%)',
              animation: `rise ${o.dur} ${o.delay} infinite ease-in-out`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ═══ DECORATIVE SPINNING RING — behind content ═══ */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <div
          className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-yellow-400/10"
          style={{
            animation: 'slow-spin 30s linear infinite',
            background: 'conic-gradient(from 0deg, transparent, rgba(250,204,21,0.08) 25%, transparent 50%, rgba(245,158,11,0.06) 75%, transparent)',
            willChange: 'transform',
          }}
        />
      </div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <div
          className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] rounded-full border border-yellow-400/5"
          style={{
            animation: 'slow-spin 45s linear infinite reverse',
            background: 'conic-gradient(from 180deg, transparent, rgba(251,191,36,0.05) 25%, transparent 50%, rgba(250,204,21,0.04) 75%, transparent)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ═══ ✨ NEW: STARFIELD — tiny distant stars ═══ */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {STAR_FIELD.map((s, i) => (
          <div
            key={`sf-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              animation: `star-twinkle ${s.dur} ${s.delay} infinite ease-in-out`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ═══ ✨ NEW: SVG SELF-DRAWING HEART — behind the emoji heart ═══ */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[3]">
        <svg
          viewBox="0 0 200 200"
          className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]"
          fill="none"
          style={{ marginTop: '20px' }}
        >
          <path
            d="M100 180 C60 140, 10 120, 10 80 C10 40, 50 20, 100 60 C150 20, 190 40, 190 80 C190 120, 140 140, 100 180Z"
            stroke="url(#heartGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="800"
            style={{
              animation: 'draw-heart 4s 1.5s ease-out forwards',
              willChange: 'stroke-dashoffset, opacity',
            }}
          />
          {/* Second heart — delayed, breathes */}
          <path
            d="M100 170 C65 135, 25 118, 25 82 C25 48, 58 30, 100 65 C142 30, 175 48, 175 82 C175 118, 135 135, 100 170Z"
            stroke="url(#heartGrad2)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="700"
            style={{
              animation: 'draw-heart 5s 2.5s ease-out forwards',
              willChange: 'stroke-dashoffset, opacity',
            }}
          />
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="heartGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ═══ ✨ NEW: MUSICAL NOTES floating when audio plays ═══ */}
      {audioStarted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
          {NOTES.map((n, i) => (
            <span
              key={`note-${i}`}
              className="absolute bottom-0 text-yellow-400/40 text-2xl"
              style={{
                left: n.left,
                animation: `note-float ${n.dur} ${n.delay} infinite ease-in-out`,
                willChange: 'transform, opacity',
              }}
            >
              {n.emoji}
            </span>
          ))}
        </div>
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-4"
      >
        {/* Top decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-400/40 to-yellow-400/70 rounded-full" />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl"
          >
            ✦
          </motion.span>
          <span className="text-xs text-yellow-400/40 tracking-[0.5em] uppercase font-light">para ti</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl"
          >
            ✦
          </motion.span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-yellow-400/40 to-yellow-400/70 rounded-full" />
        </motion.div>

        {/* "Te amo" — EPIC entrance + glow pulse */}
        <motion.div variants={itemVariants} className="text-center relative">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              opacity: { duration: 1, ease: 'easeOut' },
              scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear', delay: 1.5 },
            }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black leading-none tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #f59e0b, #facc15, #fef3c7, #ffffff, #fef3c7, #facc15, #f59e0b)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'text-glow-pulse 3s 2s infinite ease-in-out',
            }}
          >
            Te amo
          </motion.h1>
        </motion.div>

        {/* "mucho" — dramatic letter spacing reveal */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '1em', y: 20 }}
            animate={{ opacity: 1, letterSpacing: '0.25em', y: 0 }}
            transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold"
            style={{
              backgroundImage: 'linear-gradient(90deg, #d97706, #f59e0b, #fbbf24, #fde68a, #fbbf24, #f59e0b, #d97706)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'text-glow-pulse 4s 3s infinite ease-in-out',
            }}
          >
            mucho
          </motion.h2>
        </motion.div>

        {/* ✨ NEW: SVG Infinity symbol — draws itself between text and heart */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3"
        >
          <svg viewBox="0 0 120 40" className="w-20 h-7 sm:w-24 sm:h-8" fill="none">
            <path
              d="M30 20 C30 10, 10 10, 10 20 C10 30, 30 30, 30 20 C30 10, 50 10, 50 20 L70 20 C70 10, 90 10, 90 20 C90 30, 110 30, 110 20 C110 10, 90 10, 90 20 C90 30, 70 30, 70 20 L50 20"
              stroke="url(#infGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="500"
              style={{
                animation: 'draw-infinity 4s 2s ease-out forwards',
                willChange: 'stroke-dashoffset, opacity',
              }}
            />
            <defs>
              <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Heart — real heartbeat + expanding rings */}
        <motion.div variants={itemVariants} className="my-3 relative flex items-center justify-center">
          {/* Concentric pulse rings — CSS only */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-yellow-400/25"
            style={{ animation: 'ring-expand 3s 0s infinite ease-out', willChange: 'transform, opacity' }} />
          <div className="absolute w-20 h-20 rounded-full border border-amber-400/20"
            style={{ animation: 'ring-expand 3s 1s infinite ease-out', willChange: 'transform, opacity' }} />
          <div className="absolute w-20 h-20 rounded-full border border-yellow-300/15"
            style={{ animation: 'ring-expand 3s 2s infinite ease-out', willChange: 'transform, opacity' }} />

          <span
            className="text-6xl sm:text-7xl md:text-8xl inline-block relative z-10"
            style={{
              animation: 'real-heartbeat 1.8s infinite ease-in-out',
              textShadow: '0 0 30px rgba(250,204,21,0.5), 0 0 60px rgba(250,204,21,0.2)',
              willChange: 'transform',
            }}
          >
            💛
          </span>
        </motion.div>

        {/* Subtitle — elegant fade + float */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-xl"
          style={{ animation: 'gentle-float 5s infinite ease-in-out' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl font-light text-yellow-100/70 tracking-wide"
          >
            Eres lo mejor que me ha pasado 💫
          </motion.p>
        </motion.div>

        {/* ✨ NEW: Second message — delayed dramatic reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ animation: 'gentle-float 6s 1s infinite ease-in-out' }}
        >
          <p className="text-sm sm:text-base md:text-lg tracking-[0.4em] uppercase font-light"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(250,204,21,0.4), rgba(254,243,199,0.7), rgba(250,204,21,0.4))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            hoy, mañana y siempre
          </p>
        </motion.div>

        {/* ✨ NEW: Diamond sparkle decorations */}
        <motion.div variants={itemVariants} className="flex gap-8 justify-center items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={`d-${i}`}
              className="text-yellow-400/60 text-xs"
              style={{
                animation: `diamond-burst 3s ${i * 1}s infinite ease-in-out`,
                willChange: 'transform, opacity',
              }}
            >
              ◆
            </span>
          ))}
        </motion.div>

        {/* Bottom emojis — stagger explosion + gentle float */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center text-2xl sm:text-3xl mt-1">
          {['⭐', '💛', '✨', '🌟', '💫', '🌙'].map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 3 + i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ animation: `gentle-float ${3.5 + i * 0.5}s ${i * 0.4}s infinite ease-in-out` }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mt-1">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-400/40 to-yellow-400/70 rounded-full" />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="text-xl"
          >
            ✦
          </motion.span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-yellow-400/40 to-yellow-400/70 rounded-full" />
        </motion.div>

        {/* Tap to play hint */}
        {!audioStarted && audioUrl && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-yellow-300/50 text-sm mt-3 tracking-widest uppercase font-light"
          >
            Toca para escuchar la música 🎵
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
