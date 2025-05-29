import { NotebookText } from "lucide-react";

interface ExerciseInstructionsProps {
  subtitle: string;
  content: string;
}

export default function ExerciseInstructions({
  subtitle,
  content,
}: ExerciseInstructionsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">
          <NotebookText size={32} />
        </span>{" "}
        {subtitle}
      </h3>
      <div className="text-gray-900 leading-6 space-y-2 text-balance">
        <p className="font-medium pt-1">{content}</p>
      </div>
    </div>
  );
}
