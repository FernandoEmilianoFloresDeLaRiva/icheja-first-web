import { theme } from "../../../core/config/theme";

interface ExerciseHeaderProps {
  title: string;
  number?: number | null;
  chapter: string;
  subject: string;
}

export default function ExerciseHeader({
  title,
  chapter,
  subject,
  number = null,
}: ExerciseHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 flex-wrap">
        <h1 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-tight flex-1 min-w-0">
          {title}
        </h1>
        {number && (
          <span
            className="inline-flex items-center justify-center text-white px-2 py-0.5 rounded-md text-base font-bold shadow-sm flex-shrink-0"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.primary.pink} 0%, #E91E63 100%)`
            }}
          >
            {number}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 text-[10px] md:text-xs">
        <span className="text-gray-600 font-medium">{chapter}</span>
        <span className="text-gray-400">/</span>
        <span 
          className="font-bold bg-gradient-to-r from-[#C90166] to-[#E91E63] bg-clip-text text-transparent"
        >
          {subject}
        </span>
      </div>
    </div>
  );
}
