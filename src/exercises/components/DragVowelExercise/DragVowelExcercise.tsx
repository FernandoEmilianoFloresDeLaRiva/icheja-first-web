import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, Square, Sparkles } from "lucide-react";
import { theme } from "../../../core/config/theme";
import { useSpeech } from "../../hooks/useSpeech";

// Banco de palabras por vocal
const WORD_BANK: Record<string, string[]> = {
  a: [
     "mango", "casa", "gato", "pato", "rana", 
      "vaca", "agua", "mamá", "papá", "mesa", 
      "cama", "silla", "taza", "boca", "cara", 
      "mano", "pan", "sal", "mar", "luna", 
      "bola", "caja", "lápiz", "árbol"

  ],
  e: [
    "leche", "nene", "verde", "diente", "puente", "mente", "fuente", "gente",
    "frente", "suerte", "puede", "tiene", "viene", "quiere", "cree", "lee"
  ],
  i: [
    "piso", "hijo", "mina", "risa", "vida", "cita", "fila", "lima", "pila",
    "tiza", "rica", "mira", "gira", "tira", "pinta", "linda", "lista"
  ],
  o: [
    "oso", "lobo", "mono", "polo", "codo", "foto", "gorro", "pozo", "rojo",
    "toro", "como", "poco", "loco", "coco", "moño", "pollo", "ojo"
  ],
  u: [
    "uva", "luna", "cuna", "duda", "fuga", "junta", "mula", "nube", "puma",
    "ruta", "cura", "pura", "dura", "muro", "puro", "tubo", "cubo"
  ],
};

interface DragVowelExerciseProps {
  targetVowel?: string;
  wordsPerRound?: number;
}

interface LetterSlot {
  letter: string;
  isTarget: boolean;
  isFilled: boolean;
  isCorrect: boolean | null;
  filledWith: string;
}

const isVowel = (letter: string): boolean => {
  return ["a", "e", "i", "o", "u"].includes(letter.toLowerCase());
};

const getRandomWords = (vowel: string, count: number): string[] => {
  const words = WORD_BANK[vowel.toLowerCase()] || WORD_BANK["a"];
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const generateVowelOptions = (): string[] => {
  return ["i", "a", "e", "o", "a"];
};

const processWord = (word: string, targetVowel: string): LetterSlot[] => {
  return word.split("").map((letter) => {
    const isTargetVowel = letter.toLowerCase() === targetVowel.toLowerCase();
    return {
      letter: letter,
      isTarget: isTargetVowel,
      isFilled: !isTargetVowel,
      isCorrect: isTargetVowel ? null : true,
      filledWith: isTargetVowel ? "" : letter,
    };
  });
};

export default function DragVowelExercise({
  targetVowel = "a",
  wordsPerRound = 5,
}: DragVowelExerciseProps) {
  const [words, setWords] = useState<string[]>(() => getRandomWords(targetVowel, wordsPerRound));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [slots, setSlots] = useState<LetterSlot[]>([]);
  const [vowelOptions] = useState<string[]>(() => generateVowelOptions());
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [completedWordsCount, setCompletedWordsCount] = useState(0);
  const [currentWordCompleted, setCurrentWordCompleted] = useState(false);
  const [allWordsCompleted, setAllWordsCompleted] = useState(false);

  const { speak, isSpeaking, cancel } = useSpeech();

  const currentWord = words[currentWordIndex];

  // Inicializar slots cuando cambia la palabra
  useEffect(() => {
    if (currentWord) {
      setSlots(processWord(currentWord, targetVowel));
      setCurrentWordCompleted(false);
      setSelectedVowel(null);
    }
  }, [currentWordIndex, currentWord, targetVowel]);

  // Verificar si la palabra actual está completa
  const checkWordComplete = (currentSlots: LetterSlot[]): boolean => {
    const targetSlots = currentSlots.filter((slot) => slot.isTarget);
    return targetSlots.length > 0 && targetSlots.every((slot) => slot.isCorrect === true);
  };

  // Seleccionar una vocal
  const handleSelectVowel = (vowel: string) => {
    if (currentWordCompleted || allWordsCompleted) return;
    setSelectedVowel(vowel);
  };

  // Colocar vocal en un slot
  const handlePlaceVowel = (slotIndex: number) => {
    if (!selectedVowel || currentWordCompleted) return;

    const slot = slots[slotIndex];
    if (!slot.isTarget || slot.isCorrect === true) return;

    const isCorrectVowel = selectedVowel.toLowerCase() === targetVowel.toLowerCase();

    const newSlots = slots.map((s, idx) => {
      if (idx !== slotIndex) return s;
      return {
        ...s,
        isFilled: true,
        isCorrect: isCorrectVowel,
        filledWith: selectedVowel,
      };
    });

    setSlots(newSlots);
    setSelectedVowel(null);

    if (isCorrectVowel) {
      // Verificar si la palabra está completa
      if (checkWordComplete(newSlots)) {
        setCurrentWordCompleted(true);
        const newCount = completedWordsCount + 1;
        setCompletedWordsCount(newCount);
        
        if (newCount >= words.length) {
          setAllWordsCompleted(true);
        }
      }
    } else {
      // Si es incorrecto, resetear después de 1 segundo
      setTimeout(() => {
        setSlots((prevSlots) =>
          prevSlots.map((s, idx) => {
            if (idx !== slotIndex) return s;
            return {
              ...s,
              isFilled: false,
              isCorrect: null,
              filledWith: "",
            };
          })
        );
      }, 1000);
    }
  };

  // Ir a siguiente palabra
  const goToNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
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

  // Generar nuevas palabras
  const generateNewWords = () => {
    const newWords = getRandomWords(targetVowel, wordsPerRound);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCompletedWordsCount(0);
    setAllWordsCompleted(false);
    setCurrentWordCompleted(false);
    setSelectedVowel(null);
  };

  // Reproducir palabra
  const handleSpeak = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(currentWord, { lang: "es-MX", rate: 0.7 });
    }
  };

  // Obtener estilo del slot según estado
  const getSlotStyle = (slot: LetterSlot): string => {
    if (!slot.isTarget) {
      return "bg-white border-gray-300 text-gray-800";
    }
    if (slot.isCorrect === true) {
      return "bg-green-100 border-green-500 text-green-700";
    }
    if (slot.isCorrect === false) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    if (selectedVowel) {
      return "bg-blue-50 border-blue-400 border-dashed cursor-pointer";
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
                : idx < completedWordsCount
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Contador de progreso */}
      <p className="text-center text-gray-500 mb-4">
        Palabra {currentWordIndex + 1} de {words.length} | Completadas: {completedWordsCount}
      </p>

      {/* Área de la palabra */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* Botón anterior */}
        <button
          onClick={goToPrevious}
          disabled={currentWordIndex === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          type="button"
        >
          <ChevronLeft size={32} className="text-gray-600" />
        </button>

        {/* Slots de letras */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`word-${currentWordIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-2 items-center"
          >
            {slots.map((slot, index) => (
              <motion.div
                key={`slot-${currentWordIndex}-${index}`}
                onClick={() => {
                  if (slot.isTarget && slot.isCorrect !== true && selectedVowel) {
                    handlePlaceVowel(index);
                  }
                }}
                className={`
                  w-14 h-18 sm:w-18 sm:h-22 
                  flex items-center justify-center 
                  text-3xl sm:text-4xl font-bold 
                  border-2 rounded-lg
                  transition-all duration-200
                  select-none
                  ${getSlotStyle(slot)}
                `}
                animate={
                  slot.isCorrect === false
                    ? { x: [0, -5, 5, -5, 5, 0] }
                    : slot.isCorrect === true
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 0.3 }}
              >
                {slot.isFilled ? slot.filledWith || slot.letter : ""}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botón siguiente */}
        <button
          onClick={goToNext}
          disabled={currentWordIndex === words.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          type="button"
        >
          <ChevronRight size={32} className="text-gray-600" />
        </button>
      </div>

      {/* Botón de audio */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleSpeak}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary.turquoise }}
        >
          {isSpeaking ? <Square size={20} /> : <Volume2 size={20} />}
          <span className="font-medium">
            {isSpeaking ? "Detener" : "Escuchar palabra"}
          </span>
        </button>
      </div>

      {/* Instrucción - solo mostrar si NO está completa la palabra actual */}
      {!currentWordCompleted && !allWordsCompleted && (
        <p className="text-center text-gray-600 mb-4 font-medium">
          {selectedVowel
            ? `Ahora toca el espacio vacío para colocar "${selectedVowel}"`
            : "Primero selecciona una vocal de abajo"}
        </p>
      )}

      {/* Opciones de vocales - ocultar cuando todas están completas */}
      {!allWordsCompleted && (
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          {vowelOptions.map((vowel, index) => (
            <motion.button
              key={`vowel-${vowel}-${index}`}
              type="button"
              onClick={() => handleSelectVowel(vowel)}
              disabled={currentWordCompleted}
              className={`
                w-14 h-14 sm:w-16 sm:h-16
                flex items-center justify-center
                text-2xl sm:text-3xl font-bold text-white
                rounded-xl
                shadow-lg hover:shadow-xl
                transition-all duration-200
                select-none
                disabled:opacity-50 disabled:cursor-not-allowed
                ${selectedVowel === vowel ? "ring-4 ring-yellow-400 scale-110" : ""}
              `}
              style={{ backgroundColor: "#0077B6" }}
              whileHover={{ scale: currentWordCompleted ? 1 : 1.05 }}
              whileTap={{ scale: currentWordCompleted ? 1 : 0.95 }}
            >
              {vowel}
            </motion.button>
          ))}
        </div>
      )}

      {/* Mensaje cuando completa UNA palabra (pero no todas) */}
      <AnimatePresence>
        {currentWordCompleted && !allWordsCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="text-4xl">✅</span>
              <p
                className="text-xl font-bold mt-2"
                style={{ color: theme.colors.primary.turquoise }}
              >
                ¡Correcto! "{currentWord}"
              </p>
            </div>

            {currentWordIndex < words.length - 1 && (
              <button
                onClick={goToNextWord}
                type="button"
                className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: theme.colors.primary.pink }}
              >
                <ChevronRight size={20} />
                Siguiente palabra
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje cuando completa TODAS las palabras */}
      <AnimatePresence>
        {allWordsCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="text-5xl">🎉</span>
              <p
                className="text-2xl font-bold mt-2"
                style={{ color: theme.colors.primary.pink }}
              >
                ¡Felicidades! Completaste las {words.length} palabras
              </p>
            </div>

            <button
              onClick={generateNewWords}
              type="button"
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: theme.colors.primary.turquoise }}
            >
              <Sparkles size={20} />
              Generar palabras nuevas
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}