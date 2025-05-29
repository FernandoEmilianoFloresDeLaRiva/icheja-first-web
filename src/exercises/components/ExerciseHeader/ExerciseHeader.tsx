import { theme } from "../../../core/config/theme";
import { parseTitleExercises } from "../../utils/parseTitleExercise";

interface ExerciseHeaderProps {
  title: string;
  chapter: string;
  subject: string;
}

export default function ExerciseHeader({
  title,
  chapter,
  subject,
}: ExerciseHeaderProps) {
  const { parsedTitle, number } = parseTitleExercises(title);
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-12">
        <h1 className="text-5xl font-bold text-gray-900 tracking-wide">
          {parsedTitle}
        </h1>
        {number && (
          <span
            className="text-white px-4 py-2 rounded-lg text-5xl font-bold"
            style={{ backgroundColor: theme.colors.primary.pink }}
          >
            {number}
          </span>
        )}
      </div>
      <div className="text-right">
        <h2 className="text-3xl font-bold text-gray-900">
          Libro de ejercicios
        </h2>
        <p className="text-gray-900 font-bold text-justify text-xl mt-2">
          {chapter} /{" "}
          <span style={{ color: theme.colors.primary.pink }}>{subject}</span>
        </p>
      </div>
    </div>
  );
}
