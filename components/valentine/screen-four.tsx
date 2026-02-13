'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

interface ScreenFourProps {
  audioUrl?: string;
}

export default function ScreenFour({ audioUrl }: ScreenFourProps) {
  const reducedMotion = useReducedMotion();
  const effectsEnabled = !reducedMotion;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  // Auto-play music on mount
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

  // Sparkle particles
  const sparkles = useMemo(
    () =>
      Array.from({ length: effectsEnabled ? 18 : 0 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      })),
    [effectsEnabled]
  );

  // Floating hearts
  const hearts = useMemo(
    () =>
      Array.from({ length: effectsEnabled ? 6 : 0 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        duration: Math.random() * 6 + 10,
        delay: Math.random() * 3,
        size: Math.random() * 1.5 + 1,
      })),
    [effectsEnabled]
  );

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Hidden audio */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      {/* Dark gradient background with golden accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/20 via-transparent to-amber-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent" />
      </div>

      {/* Golden glow orbs */}
      {effectsEnabled && (
        <>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-300/15 rounded-full blur-[100px] pointer-events-none"
          />
        </>
      )}

      {/* Sparkle particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.2, 0] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-yellow-300"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: `0 0 ${s.size * 4}px ${s.size * 2}px rgba(250, 204, 21, 0.6)`,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '110%', x: `${h.x}%`, opacity: 0.4 }}
            animate={{ y: '-15%', opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
              ease: 'linear',
            }}
            className="absolute will-change-transform"
            style={{
              fontSize: `${h.size}rem`,
              filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.5))',
            }}
          >
            💛
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-6"
      >
        {/* Top decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/80" />
          <motion.span
            animate={effectsEnabled ? { rotate: [0, 360] } : undefined}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-2xl"
            style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))' }}
          >
            ✨
          </motion.span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/80" />
        </motion.div>

        {/* "Te amo" - main hero text */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h1
            animate={
              effectsEnabled
                ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                : undefined
            }
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-none tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #facc15, #fde68a, #ffffff, #fde68a, #facc15)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter:
                'drop-shadow(0 0 40px rgba(250, 204, 21, 0.6)) drop-shadow(0 0 80px rgba(250, 204, 21, 0.3))',
            }}
          >
            Te amo
          </motion.h1>
        </motion.div>

        {/* "mucho" - secondary text with reveal */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold"
            style={{
              backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.5))',
            }}
          >
            mucho
          </motion.h2>
        </motion.div>

        {/* Heart pulse animation */}
        <motion.div variants={itemVariants} className="relative my-4">
          <motion.span
            animate={
              effectsEnabled
                ? { scale: [1, 1.25, 1, 1.25, 1], opacity: [0.8, 1, 0.8, 1, 0.8] }
                : undefined
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl md:text-8xl inline-block"
            style={{
              filter:
                'drop-shadow(0 0 25px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 50px rgba(250, 204, 21, 0.4))',
            }}
          >
            💛
          </motion.span>

          {/* Pulse rings */}
          {effectsEnabled &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full border-2 border-yellow-400/40 pointer-events-none"
                style={{ margin: '-20%' }}
              />
            ))}
        </motion.div>

        {/* Subtitle message */}
        <motion.div variants={itemVariants} className="text-center max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-yellow-100/80"
            style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.3))' }}
          >
            Eres lo mejor que me ha pasado 💫
          </motion.p>
        </motion.div>

        {/* Bottom decorative emojis */}
        <motion.div variants={itemVariants} className="flex gap-5 justify-center text-3xl mt-2">
          {['⭐', '💛', '✨', '🌟', '💫'].map((emoji, i) =>
            effectsEnabled ? (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.5))' }}
              >
                {emoji}
              </motion.span>
            ) : (
              <span
                key={i}
                style={{ filter: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.5))' }}
              >
                {emoji}
              </span>
            )
          )}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/80" />
          <motion.span
            animate={effectsEnabled ? { rotate: [360, 0] } : undefined}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="text-2xl"
            style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))' }}
          >
            ✨
          </motion.span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/80" />
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
