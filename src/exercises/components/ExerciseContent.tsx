import { ChevronLeft, ChevronRight } from "lucide-react";
import { theme } from "../../core/config/theme";
import ExerciseHeader from "./ExerciseHeader/ExerciseHeader";
import ExerciseInstructions from "./ExerciseInstructions/ExerciseInstructions";
import { useExercises } from "../hooks/useExercises";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import { parseTitleExercises } from "../utils/parseTitleExercise";

export default function ExerciseContent() {
  const {
    exercise,
    nextExercise,
    previousExercise,
    isFirstExercise,
    isLastExercise,
    chapter,
    subject,
  } = useExercises();
  const { parsedTitle, number } = parseTitleExercises(exercise.title);
  return (
    <div className="rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={exercise.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header del ejercicio */}
          <ExerciseHeader
            chapter={chapter}
            subject={subject}
            title={parsedTitle}
            number={number}
          />

          {/* Instrucciones */}
          <ExerciseInstructions
            voiceContent={`${exercise.title}. ${exercise.content.content}`}
            subtitle={exercise.content.subtitle}
            content={exercise.content.content}
          />

          {/* Imagen */}
          <div className="bg-[#EEE] shadow-2xs shadow-gray-300 rounded-xl p-8 mb-6 max-h-72 flex justify-center items-center">
            <img
              src={`/stub_images/${exercise.img}`}
              alt="dummy image"
              className="h-64 object-cover rounded-xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer con botones de navegación */}

      <Grid
        container
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <div className="flex items-center gap-1">
            <span className="text-3xl">🎉</span>
            <span
              className="font-semibold text-2xl"
              style={{ color: theme.colors.primary.pink }}
            >
              Revisa y Felicítalos por el avance
            </span>
          </div>
        </Grid>
        <Grid
          container
          spacing={2}
          size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
            <button className="w-full bg-[#C90104] hover:bg-red-600 hover:cursor-pointer text-white px-6 py-2 rounded-2xl font-semibold transition-colors lg:mr-[55px]">
              Terminar
            </button>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }}>
            <button
              className="w-36 hover:bg-teal-700 hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887]"
              disabled={isFirstExercise}
              onClick={previousExercise}
            >
              <ChevronLeft size={20} />
              Anterior
            </button>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }}>
            <button
              className="w-40 hover:bg-teal-700 hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887] justify-end"
              disabled={isLastExercise}
              onClick={nextExercise}
            >
              Siguiente
              <ChevronRight size={20} />
            </button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
