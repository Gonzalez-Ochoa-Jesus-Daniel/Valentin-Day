'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AnimatedRose from './animated-rose';
import DecryptedText from './decrypted-text';
import CardSwap, { Card } from './card-swap';
import { memo, useMemo, useState } from 'react';

interface ScreenOneProps {
  onYes: () => void;
  onNo: () => void;
}

const FloatingHearts = memo(function FloatingHearts({ count }: { count: number }) {
  const indices = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {indices.map((i) => (
        <motion.div
          key={i}
          initial={{ y: '100%', x: `${20 + i * 15}%`, opacity: 0 }}
          animate={{
            y: '-10%',
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
          className="absolute text-3xl will-change-transform"
          style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))' }}
        >
          💛
        </motion.div>
      ))}
    </div>
  );
});

const RoseParticles = memo(function RoseParticles({ count, radius }: { count: number; radius: number }) {
  const reducedMotion = useReducedMotion();
  const indices = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  return (
    <>
      {indices.map((i) => {
        const angle = (i * Math.PI * 2) / count;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            initial={reducedMotion ? { opacity: 0.6, scale: 1 } : { scale: 0, opacity: 0 }}
            animate={
              reducedMotion
                ? { opacity: 0.6, scale: 1, x, y }
                : { scale: [0, 1, 0], opacity: [0, 0.8, 0], x, y }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }
            }
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
            style={{ filter: 'blur(1px)' }}
          />
        );
      })}
    </>
  );
});

export default function ScreenOne({ onYes, onNo }: ScreenOneProps) {
  const reducedMotion = useReducedMotion();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const effectsEnabled = !reducedMotion;
  const floatingHeartsCount = effectsEnabled ? 3 : 1;
  const roseParticleCount = effectsEnabled ? 5 : 2;
  const showShine = effectsEnabled;

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start py-10 px-6 gap-10 md:gap-14"
    >
      {/* Decorative floating hearts */}
      <FloatingHearts count={floatingHeartsCount} />

      {/* Rosa animada con glow y partículas alrededor */}
      <motion.div 
        variants={itemVariants}
        className="relative drop-shadow-2xl flex-shrink-0 mt-6"
      >
        <div className="animate-glow-pulse motion-reduce:animate-none scale-75 md:scale-100">
          <AnimatedRose size="md" />
        </div>
        
        {/* Particles around rose */}
        <RoseParticles count={roseParticleCount} radius={60} />
      </motion.div>

      {/* Separador decorativo */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-2"
      >
        <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 rounded-full" />
        <span className="text-3xl animate-pulse motion-reduce:animate-none" style={{ filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))' }}>💛</span>
        <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-400 rounded-full" />
      </motion.div>

      {/* Pregunta principal con animación DecryptedText */}
      <motion.div variants={itemVariants} className="text-center max-w-3xl flex-shrink-0 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-balance">
          <DecryptedText
            text="¿Quieres ser mi"
            speed={65}
            animateOn="view"
            sequential
            className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]"
            encryptedClassName="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-200 bg-clip-text text-transparent"
          />
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
          <DecryptedText
            text="San Valentín?"
            speed={65}
            animateOn="view"
            sequential
            className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]"
            encryptedClassName="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent"
          />
        </h1>
      </motion.div>

      {/* Separador decorativo */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-4"
      >
        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-400 rounded-full" />
        <span className="text-2xl">✨</span>
        <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 rounded-full" />
      </motion.div>

      {/* CardSwap para imágenes chistosas con mejor espaciado */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg flex-shrink-0 my-8"
        style={{ height: '340px', minHeight: '340px' }}
      >
        <CardSwap
          cardDistance={40}
          verticalDistance={50}
          delay={6000}
          pauseOnHover={true}
          easing="linear"
          width="100%"
          height="300px"
        >
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/sanvalentin1.jpg"
                alt="Foto 1"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/one1.jpg"
                alt="Foto 2"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/one2.jpg"
                alt="Foto 3"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
        </CardSwap>
      </motion.div>

      {/* Separador decorativo antes de botones */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-6"
      >
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 rounded-full" />
        <span className="text-3xl animate-heartbeat motion-reduce:animate-none" style={{ filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))' }}>💛</span>
        <div className="h-0.5 w-24 bg-gradient-to-l from-transparent via-amber-400 to-amber-400 rounded-full" />
      </motion.div>

      {/* Botones con diseño premium */}
      <motion.div
        variants={itemVariants}
        className="flex gap-6 flex-wrap justify-center items-center my-8 mb-12 flex-shrink-0"
      >
        {/* Botón Sí - Gradiente Premium con brillo */}
        <motion.button
          onClick={onYes}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 20px 60px rgba(250, 204, 21, 0.5)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative px-12 py-5 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black rounded-full font-bold text-xl shadow-2xl overflow-hidden"
        >
          {showShine && (
            <motion.div
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: '50%' }}
            />
          )}
          <span className="relative z-10">¡Sí! �</span>
        </motion.button>

        {/* Botón No - que se mueve chistosamente */}
        <motion.button
          animate={noButtonPosition}
          onHoverStart={handleNoHover}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-neutral-900/90 backdrop-blur-sm text-yellow-400 border-2 border-yellow-500/40 rounded-full font-bold text-xl shadow-lg cursor-pointer"
        >
          No 😅
        </motion.button>
      </motion.div>

      {/* Decorative glowing orbs */}
      {!reducedMotion && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="fixed top-1/4 left-10 w-28 h-28 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="fixed bottom-1/4 right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"
          />
        </>
      )}
    </motion.div>
  );
}
