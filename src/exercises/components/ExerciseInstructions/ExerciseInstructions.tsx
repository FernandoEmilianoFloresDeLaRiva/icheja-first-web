import { NotebookText, Volume2, Square } from "lucide-react";
import { useCallback } from "react";
import { useSpeech } from "../../hooks/useSpeech";

interface ExerciseInstructionsProps {
  subtitle: string;
  content: string;
  voiceContent: string;
}

export default function ExerciseInstructions({
  subtitle,
  content,
  voiceContent,
}: ExerciseInstructionsProps) {
  const { speak, cancel, isSpeaking } = useSpeech();

  const handleSpeakClick = useCallback(() => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(voiceContent, { lang: "es-MX", rate: 0.9 });
    }
  }, [voiceContent, speak, cancel, isSpeaking]);

  return (
    <div className="mb-4">
      <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">
          <NotebookText size={32} />
        </span>{" "}
        {subtitle}
      </h3>
      <div className="text-gray-900 leading-6 space-y-2 text-balance">
        <div className="flex items-start gap-2">
          <button
            onClick={handleSpeakClick}
            className="flex items-center justify-center text-sm font-normal bg-[#009887] hover:bg-[#009887]/70 hover:cursor-pointer text-white px-3 py-1.5 rounded-lg transition-colors"
            aria-label={isSpeaking ? "Detener audio" : "Escuchar instrucciones"}
            title={isSpeaking ? "Detener audio" : "Escuchar instrucciones"}
          >
            {isSpeaking ? <Square size={24} /> : <Volume2 size={24} />}
          </button>
          <p className="font-medium pt-1 flex-1">{content}</p>
        </div>
      </div>
    </div>
  );
}
