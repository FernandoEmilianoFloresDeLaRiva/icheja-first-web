import React from "react";
import DragVowelExercise from "./DragVowelExercise";
import ExerciseHeader from "../ExerciseHeader/ExerciseHeader";
import ExerciseInstructions from "../ExerciseInstructions/ExerciseInstructions";
import { parseTitleExercises } from "../../utils/parseTitleExercise";

// Configuración de palabras por vocal
export const VOWEL_WORDS_CONFIG: Record<string, string[]> = {
  a: [
    "avena",
    "casa",
    "mesa",
    "manzana",
    "banana",
    "rata",
    "cama",
    "papa",
    "sala",
    "taza",
    "vaca",
    "pala",
    "lata",
    "masa",
    "rama",
  ],
  e: [
    "leche",
    "nene",
    "verde",
    "diente",
    "puente",
    "mente",
    "fuente",
    "gente",
    "frente",
    "suerte",
  ],
  i: [
    "piso",
    "hijo",
    "mina",
    "risa",
    "vida",
    "cita",
    "fila",
    "lima",
    "pila",
    "tiza",
  ],
  o: [
    "oso",
    "lobo",
    "mono",
    "polo",
    "codo",
    "dodo",
    "foto",
    "gorro",
    "pozo",
    "rojo",
  ],
  u: [
    "uva",
    "luna",
    "cuna",
    "duda",
    "fuga",
    "junta",
    "mula",
    "nube",
    "puma",
    "ruta",
  ],
};

// Función para obtener palabras aleatorias de una vocal
export const getRandomWords = (vowel: string, count: number = 5): string[] => {
  const words = VOWEL_WORDS_CONFIG[vowel.toLowerCase()] || [];
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

interface DragVowelExerciseWrapperProps {
  // Props del ejercicio existente
  exerciseTitle: string;
  chapter: string;
  subject: string;
  // Props específicas del ejercicio de vocales
  targetVowel?: string;
  customWords?: string[];
  wordCount?: number;
}

export default function DragVowelExerciseWrapper({
  exerciseTitle,
  chapter,
  subject,
  targetVowel = "a",
  customWords,
  wordCount = 5,
}: DragVowelExerciseWrapperProps) {
  const { parsedTitle, number } = parseTitleExercises(exerciseTitle);
  
  // Usar palabras personalizadas o generar aleatorias
  const words = customWords || getRandomWords(targetVowel, wordCount);

  const instructionContent = `Mira cada palabra. Algunas letras se escondieron y necesitan tu ayuda. 
    Arrastra la vocal "${targetVowel.toUpperCase()}" a los espacios vacíos para completar cada palabra. 
    Si no estás seguro, puedes presionar el botón de audio para escuchar la palabra.`;

  return (
    <div className="rounded-xl">
      {/* Header del ejercicio */}
      <ExerciseHeader
        chapter={chapter}
        subject={subject}
        title={parsedTitle || "Completa la palabra"}
        number={number}
      />

      {/* Instrucciones */}
      <ExerciseInstructions
        voiceContent={`${exerciseTitle}. ${instructionContent}`}
        subtitle="Instrucciones"
        content={instructionContent}
      />

      {/* Contenedor del ejercicio */}
      <div className="bg-[#EEE] shadow-2xs shadow-gray-300 rounded-xl p-6 mb-6">
        <DragVowelExercise
          targetVowel={targetVowel}
          words={words}
          onComplete={() => {
            console.log("¡Todas las palabras completadas!");
          }}
        />
      </div>
    </div>
  );
}