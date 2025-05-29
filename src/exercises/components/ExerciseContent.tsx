import { ChevronLeft, ChevronRight } from "lucide-react";
import { theme } from "../../core/config/theme";
import ExerciseHeader from "./ExerciseHeader/ExerciseHeader";
import ExerciseInstructions from "./ExerciseInstructions/ExerciseInstructions";
import { useExercises } from "../hooks/useExercises";
import { motion, AnimatePresence } from "framer-motion";

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
            title={exercise.title}
          />

          {/* Instrucciones */}
          <ExerciseInstructions
            subtitle={exercise.content.subtitle}
            content={exercise.content.content}
          />

          {/* Imagen */}
          <div className="bg-[#EEE] shadow-2xs shadow-gray-300 rounded-xl p-8 mb-6 max-h-72 flex justify-center items-center">
            <img
              src={`/src/assets/stub_images/${exercise.img}`}
              alt="dummy image"
              className="h-64 object-cover rounded-xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer con botones de navegación */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-1">
          <span className="text-3xl">🎉</span>
          <span
            className="font-semibold text-2xl"
            style={{ color: theme.colors.primary.pink }}
          >
            Revisa y Felicítalos por el avance
          </span>
        </div>

        <div className="flex gap-3">
          <button className="bg-[#C90104] hover:bg-red-600 hover:cursor-pointer text-white px-6 py-2 rounded-2xl font-semibold transition-colors">
            Terminar
          </button>
          <button
            className="hover:bg-teal-700 hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887]"
            disabled={isFirstExercise}
            onClick={previousExercise}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
          <button
            className=" hover:bg-teal-700 hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887]"
            disabled={isLastExercise}
            onClick={nextExercise}
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
