import { theme } from "../../../core/config/theme";
import { parseTitleExercises } from "../../utils/parseTitleExercise";
import Grid from '@mui/material/Grid';

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
      <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          marginBottom: "15px"
        }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg : 8 }}>
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
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg : 4 }}>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-900">
              Libro de ejercicios
            </h2>
            <p className="text-gray-900 font-bold text-xl mt-2">
              {chapter} /{" "}
              <span style={{ color: theme.colors.primary.pink }}>{subject}</span>
            </p>
          </div>
        </Grid>
      </Grid>
  );
}
