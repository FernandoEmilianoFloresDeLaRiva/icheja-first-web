// VowelCarouselGame.tsx
import { useEffect, useMemo, useState } from "react";
import WordCard from "./WordRow";

type Props = {
  targetVowel?: string; // por defecto "a"
  onComplete?: () => void;
};

const words = [
  "mango", "casa", "gato", "pato", "rana", 
  "vaca", "agua", "mamá", "papá", "mesa", 
  "cama", "silla", "taza", "boca", "cara", 
  "mano", "pan", "sal", "mar", "luna", 
  "bola", "caja", "lápiz", "árbol"
];

export default function VowelCarouselGame({
  targetVowel = "a",
  onComplete,
}: Props) {
  const CHUNK_SIZE = 3;
  const [pageIndex, setPageIndex] = useState(0);

  // estado de selección para la página actual:
  // estructura: { [wordLocalIndex]: { correctSet: Set<number>, wrongSet: Set<number> } }
  const [pageSelections, setPageSelections] = useState<
    Record<number, { correct: Set<number>; wrong: Set<number> }>
  >({});

  // palabras visibles en esta página
  const start = pageIndex * CHUNK_SIZE;
  const currentWords = words.slice(start, start + CHUNK_SIZE);

  // cuenta total de 'a' (targetVowel) en la página actual
  const totalAsInPage = useMemo(() => {
    let total = 0;
    currentWords.forEach((w) => {
      total += Array.from(w).filter(
        (ch) =>
          ch
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() === targetVowel.toLowerCase()
      ).length;
    });
    return total;
  }, [currentWords, targetVowel]);

  // número de 'a' correctamente seleccionadas en la página
  const correctAsSelectedCount = useMemo(() => {
    let c = 0;
    for (let i = 0; i < currentWords.length; i++) {
      const info = pageSelections[i];
      if (info) c += info.correct.size;
    }
    return c;
  }, [pageSelections, currentWords.length]);

  // manejar click de letra desde WordCard
  // manejar click de letra desde WordCard (corrección: inmutabilidad total)
  const handleLetterClick = (
    wordLocalIndex: number,
    letterIndex: number,
    isTarget: boolean
  ) => {
    setPageSelections((prev) => {
      // clonamos el objeto externo
      const copy: Record<number, { correct: Set<number>; wrong: Set<number> }> =
        { ...prev };

      // clonamos o inicializamos la entrada para wordLocalIndex
      const prevEntry = prev[wordLocalIndex];
      const correctSet = new Set<number>(
        prevEntry ? Array.from(prevEntry.correct) : []
      );
      const wrongSet = new Set<number>(
        prevEntry ? Array.from(prevEntry.wrong) : []
      );

      // si ya fue seleccionada esa letra (en cualquiera de los sets) no hacemos nada
      if (correctSet.has(letterIndex) || wrongSet.has(letterIndex)) {
        return prev; // no hay cambio
      }

      // añadimos a la set correspondiente (no mutamos prev)
      if (isTarget) correctSet.add(letterIndex);
      else wrongSet.add(letterIndex);

      // asignamos una nueva entrada (nuevo objeto) en el copy
      copy[wordLocalIndex] = { correct: correctSet, wrong: wrongSet };

      return copy;
    });
  };

  // efecto: cuando ya se seleccionaron todas las 'a' de la página, avanzar
  useEffect(() => {
    if (totalAsInPage > 0 && correctAsSelectedCount >= totalAsInPage) {
      // pequeñas espera para que usuario vea último cambio (0.4s)
      const t = setTimeout(() => {
        const nextStart = (pageIndex + 1) * CHUNK_SIZE;
        const isLastPage = nextStart >= words.length;
        if (isLastPage) {
          onComplete?.();
          // opcional: reiniciar al comienzo
          // setPageIndex(0);
          // setPageSelections({});
        } else {
          setPageIndex((p) => p + 1);
          setPageSelections({}); // reset selections para la nueva página
        }
      }, 400);

      return () => clearTimeout(t);
    }
  }, [
    correctAsSelectedCount,
    totalAsInPage,
    pageIndex,
    words.length,
    onComplete,
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 rounded-xl p-8">
        {/* fila única con 3 tarjetas */}
        <div className="flex gap-6 justify-center items-start">
          {currentWords.map((word, i) => {
            const info = pageSelections[i] ?? {
              correct: new Set<number>(),
              wrong: new Set<number>(),
            };
            return (
              <WordCard
                key={i}
                word={word}
                targetVowel={targetVowel}
                selectedCorrectIndices={info.correct}
                selectedWrongIndices={info.wrong}
                onLetterClick={(letterIndex, isTarget) =>
                  handleLetterClick(i, letterIndex, isTarget)
                }
              />
            );
          })}
        </div>

        {/* indicador de progreso de la página (opcional) */}
        <div className="mt-6 flex justify-end items-center gap-4">
          <div className="text-sm text-gray-700">
            Seleccionadas: <strong>{correctAsSelectedCount}</strong> /{" "}
            <strong>{totalAsInPage}</strong> (a)
          </div>
        </div>
      </div>
    </div>
  );
}
