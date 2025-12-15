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
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-1.5 mb-1 flex-shrink-0">
        <div className="p-1 bg-gradient-to-br from-[#009887] to-[#00B8A9] rounded-md shadow-sm">
          <NotebookText size={14} className="text-white" />
        </div>
        <h3 className="text-sm md:text-base font-bold text-gray-900">
          {subtitle}
        </h3>
      </div>
      <div className="flex items-start gap-1.5 flex-1 min-h-0 overflow-y-auto">
        <button
          onClick={handleSpeakClick}
          className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md transition-all shadow-sm hover:shadow-md ${
            isSpeaking
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gradient-to-br from-[#009887] to-[#00B8A9] hover:from-[#008577] hover:to-[#009887] text-white"
          }`}
          aria-label={isSpeaking ? "Detener audio" : "Escuchar instrucciones"}
          title={isSpeaking ? "Detener audio" : "Escuchar instrucciones"}
        >
          {isSpeaking ? <Square size={14} /> : <Volume2 size={14} />}
        </button>
        <p className="text-gray-800 font-medium text-xs leading-snug flex-1">
          {content}
        </p>
      </div>
    </div>
  );
}
