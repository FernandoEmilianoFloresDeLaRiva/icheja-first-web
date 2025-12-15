import { useLocation } from "wouter";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../core/config/theme";
import alfiImage from "../../assets/images/splash/Alfi.svg";
import playIcon from "../../assets/images/splash/play.png";
import alfiAudio from "../../assets/images/splash/play_alfi.mp3";
import logosImage from "../../assets/images/splash/logos.png";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLocation("/exercises");
  };

  const handleStartTour = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Guardar en sessionStorage que se debe iniciar el tour
    sessionStorage.setItem("start-tour", "true");
    setLocation("/exercises");
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Variantes de animación para el contenedor principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Variantes para elementos hijos
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animación flotante para Alfi
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Animación de pulso para el botón de play cuando está reproduciendo
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-gray-50 relative overflow-hidden">
      {/* Efecto de partículas de fondo animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-200/20"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Header animado */}
      <motion.header
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 63, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: theme.colors.primary.pink,
          overflow: "hidden",
        }}
      />

      {/* Contenido principal */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center relative pb-24 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center w-full">
          {/* Contenedor superior con texto, reproductor y Alfi */}
          <div className="flex flex-row items-center justify-center w-full px-8 mb-8 gap-12">
            {/* Contenedor izquierdo con textos y botón */}
            <motion.div
              className="flex flex-col items-start gap-6"
              variants={itemVariants}
            >
              {/* Texto Hola soy Alfi con animación de escritura */}
              <motion.h1
                style={{
                  width: "713px",
                  height: "134px",
                  opacity: 1,
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontSize: "111.77px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textAlign: "left",
                  color: theme.colors.primary.pink,
                  margin: 0,
                }}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02 }}
              >
                Hola soy Alfi
              </motion.h1>

              {/* Texto debajo de Hola soy Alfi */}
              <motion.p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontSize: "39.83px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textAlign: "left",
                  color: "#000000",
                  width: "713px",
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                te acompañaré en tu proceso de alfabetizacion
              </motion.p>

              {/* Botón Iniciar con animaciones mejoradas */}
              <motion.button
                onClick={(e) => handleStart(e)}
                type="button"
                className="font-semibold text-white whitespace-nowrap flex items-center justify-center relative overflow-hidden"
                style={{
                  width: "401px",
                  height: "100px",
                  borderRadius: "37px",
                  padding: "0 32px",
                  gap: "8px",
                  backgroundColor: theme.colors.primary.pink,
                  fontSize: "32px",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(201, 1, 102, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Efecto de brillo al hacer hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Iniciar</span>
              </motion.button>
            </motion.div>

            {/* Reproductor de audio CENTRADO */}
            <motion.div
              className="flex items-center justify-center"
              variants={itemVariants}
              style={{
                width: "120px",
                height: "120px",
                flexShrink: 0,
                position: "relative",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
            >
                {/* Ondas animadas cuando está reproduciendo - Perfectamente centradas */}
                <AnimatePresence>
                  {isPlaying &&
                    [0, 1, 2].map((i) => (
                      <motion.div
                        key={`wave-${i}`}
                        className="absolute rounded-full border-2 border-pink-400"
                        style={{
                          width: "120px",
                          height: "120px",
                          left: "0px",
                          top: "0px",
                          pointerEvents: "none",
                        }}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{
                          scale: [0.8, 1.5, 2],
                          opacity: [0.6, 0.3, 0],
                        }}
                        exit={{
                          scale: 2.2,
                          opacity: 0,
                          transition: {
                            duration: 0.25,
                            ease: "easeIn",
                          },
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                </AnimatePresence>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Doble funcionalidad: reproducir audio Y al hacer clic cuando no está reproduciendo, iniciar tour
                    if (!isPlaying) {
                      handleStartTour(e);
                    }
                    togglePlay();
                  }}
                  type="button"
                  className="cursor-pointer relative z-10"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isPlaying ? pulseAnimation : {}}
                >
                  <img
                    src={playIcon}
                    alt="Reproducir audio de Alfi"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                </motion.button>
                <audio
                  ref={audioRef}
                  src={alfiAudio}
                  onEnded={handleAudioEnded}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
              </motion.div>

              {/* Mascota Alfi con animación flotante */}
              <motion.div
                className="flex justify-center items-center cursor-pointer"
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  ...floatingAnimation,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.6 },
                  scale: { duration: 0.8, delay: 0.6 },
                  rotate: { duration: 0.8, delay: 0.6 },
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleStartTour(e);
                }}
              >
                <img
                  src={alfiImage}
                  alt="Alfi - Mascota de la empresa"
                  className="max-w-full h-auto object-contain"
                  style={{ maxHeight: "400px" }}
                />
              </motion.div>
          </div>

          {/* Imagen de logos centrada con animación */}
          <motion.div
            style={{
              position: "absolute",
              width: "852px",
              height: "120.56px",
              bottom: "83px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: "easeOut",
            }}
          >
            <motion.img
              src={logosImage}
              alt="Logos"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Footer animado */}
      <motion.footer
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 63, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{
          backgroundColor: theme.colors.primary.pink,
          overflow: "hidden",
        }}
      />
    </div>
  );
}

