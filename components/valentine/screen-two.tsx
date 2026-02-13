'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedRose from './animated-rose';
import DecryptedText from './decrypted-text';
import CardSwap, { Card } from './card-swap';
import { useMemo, useState } from 'react';

interface ScreenTwoProps {
  onYes: () => void;
  onNo: () => void;
}

export default function ScreenTwo({ onYes, onNo }: ScreenTwoProps) {
  const reducedMotion = useReducedMotion();
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const effectsEnabled = !reducedMotion;
  const particleCount = effectsEnabled ? 4 : 2;
  const particleIndices = useMemo(() => Array.from({ length: particleCount }, (_, i) => i), [particleCount]);

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 350;
    const randomY = (Math.random() - 0.5) * 350;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    if (!showSecondQuestion) {
      setShowSecondQuestion(true);
    } else {
      onYes();
    }
  };

  const handleNo = () => {
    if (showSecondQuestion) {
      setShowSecondQuestion(false);
      setNoButtonPosition({ x: 0, y: 0 });
    } else {
      onNo();
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const exitVariants = {
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start py-10 px-6 gap-10 md:gap-14"
    >
      {/* Rosa animada con glow */}
      <motion.div 
        variants={itemVariants}
        className="relative drop-shadow-2xl animate-glow-pulse motion-reduce:animate-none flex-shrink-0 mt-6 scale-75 md:scale-100"
      >
        <AnimatedRose size="md" />
        
        {/* Particles around rose */}
        {particleIndices.map((i) => {
          const angle = (i * Math.PI * 2) / particleCount;
          const x = Math.cos(angle) * 50;
          const y = Math.sin(angle) * 50;

          return (
            <motion.div
              key={i}
              initial={reducedMotion ? { opacity: 0.6, scale: 1 } : { scale: 0, opacity: 0 }}
              animate={
                reducedMotion
                  ? { opacity: 0.6, scale: 1, x, y }
                  : { scale: [0, 1, 0], opacity: [0, 0.7, 0], x, y }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }
              }
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
              style={{ filter: 'blur(1px)' }}
            />
          );
        })}
      </motion.div>

      {/* Separador decorativo */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-2"
      >
        <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 rounded-full" />
        <span className="text-3xl" style={{ filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))' }}>💭</span>
        <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-400 rounded-full" />
      </motion.div>

      {/* Preguntas que cambian con animación DecryptedText */}
      <AnimatePresence mode="wait">
        {!showSecondQuestion ? (
          <motion.div
            key="first-question"
            variants={itemVariants}
            exit={exitVariants}
            className="text-center max-w-3xl flex-shrink-0 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <DecryptedText
                text="¿Estás seguro/a?"
                speed={60}
                animateOn="view"
                sequential
                className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]"
                encryptedClassName="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-200 bg-clip-text text-transparent"
              />
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="second-question"
            variants={itemVariants}
            exit={exitVariants}
            className="text-center max-w-3xl flex-shrink-0 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <DecryptedText
                text="¿O me mientes?"
                speed={60}
                animateOn="view"
                sequential
                className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]"
                encryptedClassName="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent"
              />
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separador decorativo */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-4"
      >
        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-400 rounded-full" />
        <span className="text-2xl">✨</span>
        <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 rounded-full" />
      </motion.div>

      {/* CardSwap para más imágenes chistosas */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg flex-shrink-0 my-8"
        style={{ height: '340px', minHeight: '340px' }}
      >
        <CardSwap
          cardDistance={40}
          verticalDistance={50}
          delay={5500}
          pauseOnHover={true}
          easing="linear"
          width="100%"
          height="300px"
        >
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/two2.jpg"
                alt="Foto 4"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/two1.jpg"
                alt="Foto 5"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Card>
          <Card customClass="rounded-3xl bg-black/50 backdrop-blur-lg border-2 border-yellow-400/30 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black/20">
              <img
                src="/images/two3.jpg"
                alt="Foto 6"
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

      {/* Botones con diseño mejorado */}
      <motion.div
        variants={itemVariants}
        className="flex gap-6 flex-wrap justify-center items-center my-8 mb-12 flex-shrink-0"
      >
        {/* Botón Sí con shine effect */}
        <motion.button
          onClick={handleYes}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 20px 60px rgba(250, 204, 21, 0.5)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative px-12 py-5 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black rounded-full font-bold text-xl shadow-2xl overflow-hidden"
        >
          {effectsEnabled && (
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
          <span className="relative z-10">{showSecondQuestion ? '¡Claro que sí! �' : '¡Sí, seguro! 💛'}</span>
        </motion.button>

        {/* Botón No - que se mueve más dramaticamente */}
        <motion.button
          animate={noButtonPosition}
          onHoverStart={handleNoHover}
          onClick={handleNo}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-neutral-900/90 backdrop-blur-sm text-yellow-400 border-2 border-yellow-500/40 rounded-full font-bold text-xl shadow-lg cursor-pointer"
        >
          {showSecondQuestion ? 'No, es mentira 😅' : 'Ehh... no 😬'}
        </motion.button>
      </motion.div>

      {/* Indicador de progreso animado con mejor estilo */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.div
          animate={effectsEnabled ? { scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] } : { scale: 1, opacity: 1 }}
          transition={effectsEnabled ? { duration: 2.5, repeat: Infinity } : { duration: 0 }}
          className="px-8 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-yellow-400/30"
        >
          <p className="text-base font-semibold text-white drop-shadow-lg">
            {showSecondQuestion ? '✨ ¡Casi lo tienes! ✨' : '💖 Vamos, atrévete... 💖'}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
