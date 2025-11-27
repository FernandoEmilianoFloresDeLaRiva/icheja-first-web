import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RefreshCw, Volume2 } from "lucide-react";
import { theme } from "../../../core/config/theme";
import { useSpeech } from "../../hooks/useSpeech";

// Tipos para el ejercicio
interface DragVowelExerciseProps {
  targetVowel: string; // La vocal objetivo (ej: "a")
  words: string[]; // Lista de palabras que contienen la vocal
  onComplete?: () => void; // Callback cuando completa todas las palabras
}

interface LetterSlot {
  letter: string;
  isVowel: boolean;
  isTarget: boolean; // Si es la vocal objetivo que debe completar
  isFilled: boolean;
  isCorrect: boolean | null; // null = no evaluado, true = correcto, false = incorrecto
}

// Función para verificar si una letra es vocal
const isVowel = (letter: string): boolean => {
  return ["a", "e", "i", "o", "u"].includes(letter.toLowerCase());
};

// Función para generar las opciones de vocales (mezcladas)
const generateVowelOptions = (targetVowel: string): string[] => {
  const vowels = ["a", "e", "i", "o", "u"];
  const options: string[] = [];
  
  // Agregar la vocal objetivo en mayúscula y minúscula
  options.push(targetVowel.toUpperCase());
  options.push(targetVowel.toLowerCase());
  
  // Agregar otras vocales como distractores
  vowels
    .filter((v) => v.toLowerCase() !== targetVowel.toLowerCase())
    .forEach((v) => {
      options.push(v.toLowerCase());
    });
  
  // Mezclar el array
  return options.sort(() => Math.random() - 0.5);
};

// Función para procesar una palabra y crear los slots
const processWord = (word: string, targetVowel: string): LetterSlot[] => {
  return word.split("").map((letter) => {
    const letterIsVowel = isVowel(letter);
    const isTargetVowel = letter.toLowerCase() === targetVowel.toLowerCase();
    
    return {
      letter: letter,
      isVowel: letterIsVowel,
      isTarget: isTargetVowel,
      isFilled: !isTargetVowel, // Las vocales objetivo empiezan vacías
      isCorrect: isTargetVowel ? null : true, // Las consonantes ya están "correctas"
    };
  });
};

export default function DragVowelExercise({
  targetVowel,
  words,
  onComplete,
}: DragVowelExerciseProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [slots, setSlots] = useState<LetterSlot[]>([]);
  const [vowelOptions, setVowelOptions] = useState<string[]>([]);
  const [draggedVowel, setDraggedVowel] = useState<string | null>(null);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
  
  const { speak, isSpeaking, cancel } = useSpeech();
  
  const currentWord = words[currentWordIndex];

  // Inicializar/resetear cuando cambia la palabra
  useEffect(() => {
    if (currentWord) {
      setSlots(processWord(currentWord, targetVowel));
      setVowelOptions(generateVowelOptions(targetVowel));
      setIsWordComplete(false);
    }
  }, [currentWord, targetVowel]);

  // Verificar si la palabra está completa
  useEffect(() => {
    const allTargetsFilled = slots
      .filter((slot) => slot.isTarget)
      .every((slot) => slot.isFilled && slot.isCorrect === true);
    
    if (allTargetsFilled && slots.length > 0) {
      setIsWordComplete(true);
      setCompletedWords((prev) => new Set(prev).add(currentWordIndex));
    }
  }, [slots, currentWordIndex]);

  // Manejar inicio de arrastre
  const handleDragStart = (vowel: string) => {
    setDraggedVowel(vowel);
  };

  // Manejar fin de arrastre
  const handleDragEnd = () => {
    setDraggedVowel(null);
  };

  // Manejar soltar en un slot
  const handleDrop = (slotIndex: number) => {
    if (!draggedVowel) return;
    
    const slot = slots[slotIndex];
    if (!slot.isTarget || slot.isCorrect === true) return;

    const isCorrectVowel = draggedVowel.toLowerCase() === targetVowel.toLowerCase();
    
    setSlots((prevSlots) =>
      prevSlots.map((s, idx) =>
        idx === slotIndex
          ? {
              ...s,
              isFilled: true,
              isCorrect: isCorrectVowel,
              letter: isCorrectVowel ? draggedVowel : s.letter,
            }
          : s
      )
    );

    // Si es incorrecto, resetear después de un momento
    if (!isCorrectVowel) {
      setTimeout(() => {
        setSlots((prevSlots) =>
          prevSlots.map((s, idx) =>
            idx === slotIndex
              ? { ...s, isFilled: false, isCorrect: null }
              : s
          )
        );
      }, 1000);
    }

    setDraggedVowel(null);
  };

  // Manejar touch en móviles
  const handleTouchStart = (vowel: string) => {
    setDraggedVowel(vowel);
  };

  const handleTouchEnd = (slotIndex: number) => {
    if (draggedVowel) {
      handleDrop(slotIndex);
    }
  };

  // Cargar nueva palabra
  const loadNewWord = () => {
    const nextIndex = (currentWordIndex + 1) % words.length;
    setCurrentWordIndex(nextIndex);
  };

  // Navegación
  const goToPrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  // Reproducir palabra
  const speakWord = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(currentWord, { lang: "es-MX", rate: 0.7 });
    }
  };

  // Obtener color del slot según estado
  const getSlotStyle = (slot: LetterSlot) => {
    if (!slot.isTarget) {
      return "bg-white border-gray-300 text-gray-800";
    }
    if (slot.isCorrect === true) {
      return "bg-green-100 border-green-500 text-green-700";
    }
    if (slot.isCorrect === false) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    return "bg-gray-50 border-gray-400 border-dashed";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Indicador de progreso */}
      <div className="flex justify-center gap-2 mb-6">
        {words.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentWordIndex
                ? "bg-pink-500"
                : completedWords.has(idx)
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Área de la palabra */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* Botón anterior */}
        <button
          onClick={goToPrevious}
          disabled={currentWordIndex === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={32} className="text-gray-600" />
        </button>

        {/* Slots de letras */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-2 items-center"
          >
            {slots.map((slot, index) => (
              <motion.div
                key={index}
                className={`
                  w-16 h-20 sm:w-20 sm:h-24 
                  flex items-center justify-center 
                  text-3xl sm:text-4xl font-bold 
                  border-2 rounded-lg
                  transition-all duration-300
                  ${getSlotStyle(slot)}
                  ${slot.isTarget && !slot.isFilled ? "cursor-pointer" : ""}
                `}
                onDragOver={(e) => {
                  if (slot.isTarget && !slot.isCorrect) {
                    e.preventDefault();
                  }
                }}
                onDrop={() => handleDrop(index)}
                onClick={() => {
                  if (slot.isTarget && draggedVowel) {
                    handleTouchEnd(index);
                  }
                }}
                whileHover={
                  slot.isTarget && !slot.isCorrect
                    ? { scale: 1.05 }
                    : {}
                }
                animate={
                  slot.isCorrect === false
                    ? { x: [0, -5, 5, -5, 5, 0] }
                    : slot.isCorrect === true
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
              >
                {slot.isFilled ? slot.letter : ""}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botón siguiente */}
        <button
          onClick={goToNext}
          disabled={currentWordIndex === words.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={32} className="text-gray-600" />
        </button>
      </div>

      {/* Botón de audio */}
      <div className="flex justify-center mb-6">
        <button
          onClick={speakWord}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary.turquoise }}
        >
          <Volume2 size={20} />
          <span className="font-medium">
            {isSpeaking ? "Detener" : "Escuchar palabra"}
          </span>
        </button>
      </div>

      {/* Opciones de vocales para arrastrar */}
      <div className="flex justify-center gap-3 sm:gap-4 mb-8">
        {vowelOptions.map((vowel, index) => (
          <motion.button
            key={`${vowel}-${index}`}
            draggable
            onDragStart={() => handleDragStart(vowel)}
            onDragEnd={handleDragEnd}
            onTouchStart={() => handleTouchStart(vowel)}
            onClick={() => setDraggedVowel(draggedVowel === vowel ? null : vowel)}
            className={`
              w-14 h-14 sm:w-16 sm:h-16
              flex items-center justify-center
              text-2xl sm:text-3xl font-bold text-white
              rounded-xl cursor-grab active:cursor-grabbing
              shadow-lg hover:shadow-xl
              transition-all duration-200
              ${draggedVowel === vowel ? "ring-4 ring-yellow-400 scale-110" : ""}
            `}
            style={{ backgroundColor: "#0077B6" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {vowel}
          </motion.button>
        ))}
      </div>

      {/* Mensaje de éxito y botón de nueva palabra */}
      <AnimatePresence>
        {isWordComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="text-4xl">🎉</span>
              <p
                className="text-2xl font-bold mt-2"
                style={{ color: theme.colors.primary.pink }}
              >
                ¡Muy bien! Completaste la palabra
              </p>
            </div>
            
            <button
              onClick={loadNewWord}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: theme.colors.primary.turquoise }}
            >
              <RefreshCw size={20} />
              Cargar nueva palabra
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instrucciones para móvil */}
      <p className="text-center text-gray-500 text-sm mt-6 sm:hidden">
        Toca una vocal y luego toca el espacio vacío para colocarla
      </p>
      <p className="text-center text-gray-500 text-sm mt-6 hidden sm:block">
        Arrastra la vocal correcta al espacio vacío
      </p>
    </div>
  );
}
