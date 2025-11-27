// VowelCarouselGame.tsx
import React, { useState } from "react";
import WordCard from "./WordRow";

interface Props {
  words: string[]; // 24 palabras
  targetVowel?: string; // por defecto "a"
}

export default function VowelCarouselGame({ words, targetVowel = "a" }: Props) {
  const CHUNK_SIZE = 3; // cantidad por página

  const [pageIndex, setPageIndex] = useState(0);
  const [validated, setValidated] = useState(false);

  const start = pageIndex * CHUNK_SIZE;
  const currentWords = words.slice(start, start + CHUNK_SIZE);

  const [results, setResults] = useState<Record<number, boolean>>({});

  const handleWordValidation = (wordIndex: number, correct: boolean) => {
    setResults((prev) => ({ ...prev, [wordIndex]: correct }));
  };

  const validateAll = () => {
    setValidated(true);
  };

  const goNext = () => {
    setValidated(false);
    setPageIndex((prev) => prev + 1);
  };

  const isLastPage = start + CHUNK_SIZE >= words.length;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Palabras */}
      <div className="flex flex-row justify-center gap-6">
        {currentWords.map((word, i) => (
          <WordCard
            key={i}
            word={word}
            targetVowel={targetVowel}
            validated={validated}
            onValidate={(correct) => handleWordValidation(start + i, correct)}
          />
        ))}
      </div>

      {/* Botones */}
      <div className="mt-6 flex justify-end gap-4">
        {!validated && (
          <button
            onClick={validateAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Validar palabras
          </button>
        )}

        {validated && !isLastPage && (
          <button
            onClick={goNext}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700"
          >
            Siguiente
          </button>
        )}

        {validated && isLastPage && (
          <div className="text-green-600 font-semibold">
            ¡Has completado todas las palabras!
          </div>
        )}
      </div>
    </div>
  );
}
