'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useRef, useEffect, useState } from 'react';

interface Lyric {
  time: number;
  text: string;
}

interface MusicPlayerWithLyricsProps {
  audioUrl?: string;
  lyrics?: Lyric[];
  lyricsText?: string;
  timingConfig?: {
    secondsPerChar?: number;
    minLineSeconds?: number;
    maxLineSeconds?: number;
    blankLinePauseSeconds?: number;
    offsetSeconds?: number;
    fitToAudio?: boolean;
    tailSeconds?: number;
  };
}

const DEFAULT_LYRICS: Lyric[] = [
  { time: 0, text: "Cada momento contigo" },
  { time: 3, text: "Es un regalo del cielo" },
  { time: 6, text: "Eres mi luz, mi alegría" },
  { time: 9, text: "Mi razón para sonreír" },
  { time: 12, text: "Te amo con todo mi corazón" },
  { time: 15, text: "Hoy y siempre" },
  { time: 18, text: "Serás mi San Valentín" },
];

export default function MusicPlayerWithLyrics({
  audioUrl,
  lyrics = [],
  lyricsText,
  timingConfig,
}: MusicPlayerWithLyricsProps) {
  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastTimeRef = useRef(0);

  const displayLyrics = useMemo(() => {
    if (lyrics.length > 0) return lyrics;

    const text = lyricsText?.trim();
    if (!text) return DEFAULT_LYRICS;

    const config = {
      secondsPerChar: 0.08,
      minLineSeconds: 2.2,
      maxLineSeconds: 5.5,
      blankLinePauseSeconds: 1.2,
      offsetSeconds: 0,
      fitToAudio: true,
      tailSeconds: 1.2,
      ...timingConfig,
    };

    const lines = text.split('\n');
    const durations: Array<{ text: string; seconds: number }> = [];
    let estimatedTotal = 0;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        estimatedTotal += config.blankLinePauseSeconds;
        continue;
      }

      const estimated = Math.min(
        config.maxLineSeconds,
        Math.max(config.minLineSeconds, line.length * config.secondsPerChar)
      );
      durations.push({ text: line, seconds: estimated });
      estimatedTotal += estimated;
    }

    const availableDuration = Math.max(0.5, duration - config.tailSeconds);
    const scale = config.fitToAudio && duration > 0 && estimatedTotal > 0
      ? Math.max(0.2, availableDuration / estimatedTotal)
      : 1;

    let time = 0;
    return durations.map(({ text, seconds }) => {
      const lineTime = time + config.offsetSeconds;
      time += seconds * scale;
      return { time: lineTime, text };
    });
  }, [duration, lyrics, lyricsText, timingConfig]);
  const visibleLyrics = useMemo(() => {
    const start = Math.max(0, currentLyricIndex - 1);
    const end = Math.min(displayLyrics.length, currentLyricIndex + 2);
    return displayLyrics.slice(start, end).map((lyric, i) => ({
      ...lyric,
      index: start + i,
    }));
  }, [displayLyrics, currentLyricIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const nextTime = audio.currentTime;
      if (Math.abs(nextTime - lastTimeRef.current) < 0.08) return;
      lastTimeRef.current = nextTime;
      setCurrentTime(nextTime);

      let index = -1;
      for (let i = 0; i < displayLyrics.length; i += 1) {
        const nextLyric = displayLyrics[i + 1];
        if (nextTime >= displayLyrics[i].time && (!nextLyric || nextTime < nextLyric.time)) {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        setCurrentLyricIndex(index);
      }
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadeddata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadeddata', setAudioData);
    };
  }, [displayLyrics]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Audio element */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} />
      )}

      {/* Lyrics Display */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 min-h-[200px] flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          {visibleLyrics.map((lyric) => {
            const isActive = currentLyricIndex === lyric.index;
            const nextTime = displayLyrics[lyric.index + 1]?.time ?? Math.max(duration, lyric.time + 2);
            const lineProgress = isActive && nextTime > lyric.time
              ? Math.min(1, Math.max(0, (currentTime - lyric.time) / (nextTime - lyric.time)))
              : 0;

            return (
            <motion.p
              key={lyric.index}
              initial={reducedMotion ? false : { opacity: 0.3, scale: 0.95 }}
              animate={
                reducedMotion
                  ? { opacity: currentLyricIndex === lyric.index ? 1 : 0.5 }
                  : {
                      opacity: currentLyricIndex === lyric.index ? 1 : 0.35,
                      scale: currentLyricIndex === lyric.index ? 1.05 : 0.98,
                      y: currentLyricIndex === lyric.index ? -6 : 0,
                    }
              }
              transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
              className={`text-2xl md:text-4xl font-bold ${
                isActive
                  ? 'drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]'
                  : 'text-yellow-200/50'
              }`}
              style={{
                fontFamily: isActive ? 'Playfair Display, serif' : 'inherit',
                color: isActive ? 'transparent' : undefined,
                backgroundImage: isActive
                  ? 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,230,130,1))'
                  : undefined,
                backgroundSize: isActive ? `${Math.max(6, lineProgress * 100)}% 100%` : undefined,
                backgroundRepeat: 'no-repeat',
                backgroundClip: isActive ? 'text' : undefined,
                WebkitBackgroundClip: isActive ? 'text' : undefined,
              }}
            >
              {lyric.text}
            </motion.p>
            );
          })}
        </div>
      </motion.div>

      {/* Music Player Controls */}
      {audioUrl && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/40 shadow-2xl"
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-yellow-200/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentTime / duration) * 100}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-yellow-100">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={togglePlay}
              whileHover={reducedMotion ? undefined : { scale: 1.06 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow"
            >
              {isPlaying ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Placeholder when no audio */}
      {!audioUrl && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 text-center"
        >
          <p className="text-yellow-100 font-medium mb-2">🎵 Agrega tu canción especial</p>
          <p className="text-yellow-200/70 text-sm">
            Actualiza audioUrl en page.tsx con la URL de tu música
          </p>
        </motion.div>
      )}
    </div>
  );
}
