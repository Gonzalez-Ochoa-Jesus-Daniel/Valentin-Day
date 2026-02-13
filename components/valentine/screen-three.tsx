'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import AnimatedRose from './animated-rose';
import Confetti from './confetti';
import DecryptedText from './decrypted-text';

interface ScreenThreeProps {
  videoUrl?: string;
  onNext: () => void;
}

export default function ScreenThree({ videoUrl, onNext }: ScreenThreeProps) {
  const reducedMotion = useReducedMotion();
  const effectsEnabled = !reducedMotion;
  const sparkleCount = effectsEnabled ? 4 : 0;
  const effectiveVideoUrl = videoUrl ?? '/videos/video-10s.mp4';
  const sparkles = useMemo(
    () =>
      Array.from({ length: sparkleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 5,
        scale: Math.random() * 0.5 + 0.5,
        size: Math.random() * 2 + 1.5,
      })),
    [sparkleCount]
  );
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
      {/* Dark gradient background with golden accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/15 via-transparent to-amber-900/15"></div>
      </div>

      {/* Golden sparkles background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              x: `${sparkle.x}%`,
              y: '120%',
              opacity: 0.4,
              scale: sparkle.scale,
            }}
            animate={{
              y: '-20%',
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: 'linear',
            }}
            className="absolute text-yellow-200"
            style={{
              fontSize: `${sparkle.size}rem`,
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full min-h-full flex flex-col items-center justify-start py-12 px-6 gap-8"
      >
        {effectsEnabled && <Confetti intensity={0.15} />}

        {/* Texto grande al entrar */}
        <motion.div variants={textVariants} className="text-center max-w-4xl flex-shrink-0 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wide text-balance">
            <DecryptedText
              text="SEGURISIMA"
              speed={70}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,215,0,1)]"
              encryptedClassName="bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        {/* Rosa grande con animación y glow */}
        <motion.div
          variants={itemVariants}
          className="relative drop-shadow-2xl flex-shrink-0 scale-90 md:scale-100"
        >
          <div style={{ filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))' }}>
            <AnimatedRose size="md" />
          </div>
          
          {/* Estrellas orbitando */}
          {[0, 120, 240].map((angle) => (
            <motion.div
              key={angle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute text-3xl"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
              }}
            >
              {effectsEnabled ? (
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    transform: `rotate(${angle}deg) translateX(80px)`,
                  }}
                >
                  <span>⭐</span>
                </motion.div>
              ) : (
                <span
                  style={{
                    transform: `rotate(${angle}deg) translateX(80px)`,
                  }}
                >
                  ⭐
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Anuncio antes del video */}
        <motion.div variants={textVariants} className="w-full max-w-3xl flex-shrink-0">
          <div className="rounded-3xl bg-black/40 backdrop-blur-lg border-2 border-yellow-400/30 px-6 py-5 text-center shadow-xl">
            <p className="text-lg sm:text-xl font-semibold text-white drop-shadow">
              Espera viene un pequeno video y despues las gracias pero espera
            </p>
          </div>
        </motion.div>

        {/* Video (10s) */}
        <motion.div variants={textVariants} className="w-full max-w-3xl flex-shrink-0 my-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/20 border-2 border-yellow-400/30"
          >
            <div className="aspect-video">
              <video
                src={effectiveVideoUrl}
                className="w-full h-full"
                controls
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Texto principal "Gracias" con DecryptedText */}
        <motion.div variants={textVariants} className="text-center max-w-3xl flex-shrink-0 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-balance">
            <DecryptedText
              text="¡Gracias!"
              speed={60}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,215,0,1)]"
              encryptedClassName="bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        {/* Subtítulo "Te amo" con estrellas y animación */}
        <motion.div
          variants={textVariants}
          className="flex items-center gap-4 justify-center flex-wrap flex-shrink-0"
        >
          {effectsEnabled ? (
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-5xl"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}
            >
              ⭐
            </motion.span>
          ) : (
            <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}>
              ⭐
            </span>
          )}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-balance">
            <DecryptedText
              text="Te amo"
              speed={60}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,215,0,1)]"
              encryptedClassName="bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent"
            />
          </h2>
          {effectsEnabled ? (
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-5xl"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}
            >
              ⭐
            </motion.span>
          ) : (
            <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}>
              ⭐
            </span>
          )}
        </motion.div>

        {/* Boton para continuar a la cancion */}
        <motion.div variants={textVariants} className="flex justify-center w-full my-4">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black font-bold text-lg shadow-xl"
          >
            Ver la cancion
          </motion.button>
        </motion.div>

        {/* Decoración de emojis animados */}
        <motion.div
          variants={textVariants}
          className="flex gap-4 justify-center text-4xl my-8 flex-wrap flex-shrink-0"
        >
          {['⭐', '💛', '✨', '🌟', '💫', '⚡'].map((emoji, i) => (
            effectsEnabled ? (
              <motion.span
                key={i}
                animate={{
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}
              >
                {emoji}
              </motion.span>
            ) : (
              <span
                key={i}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}
              >
                {emoji}
              </span>
            )
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
