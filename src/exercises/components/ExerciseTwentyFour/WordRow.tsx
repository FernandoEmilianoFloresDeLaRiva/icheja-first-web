import { Volume2 } from "lucide-react";
import { useSpeech } from "../../hooks/useSpeech";

interface WordCardProps {
  word: string;
  targetVowel: string;
  validated: boolean;
  onValidate: (correct: boolean) => void;
}

export default function WordCard({
  word,
  targetVowel,
  validated,
  onValidate,
}: WordCardProps) {
  const { speak } = useSpeech();

  const handleLetterClick = (letter: string, index: number) => {
    const isCorrect = letter.toLowerCase() === targetVowel.toLowerCase();
    onValidate(isCorrect);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white shadow-md rounded-xl">

      {/* Fila de letras */}
      <div className="flex flex-row gap-3">
        {word.split("").map((letter, i) => (
          <button
            key={i}
            onClick={() => handleLetterClick(letter, i)}
            className={`
              w-12 h-12 flex items-center justify-center text-xl font-semibold rounded-md border
              ${validated
                ? letter.toLowerCase() === targetVowel
                  ? "border-green-500 text-green-600"
                  : "border-red-500 text-red-500"
                : "border-gray-300"}
            `}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Audio + texto */}
      <button
        onClick={() => speak(word)}
        className="flex items-center gap-2 text-teal-700 hover:opacity-80 transition"
      >
        <Volume2 size={20} />
        <span className="font-medium">Escuchar palabra</span>
      </button>
    </div>
  );
}
