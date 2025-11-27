import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Square,
  Volume2,
} from "lucide-react";
import ExerciseSelectImageO from "./ExcerciseSelectImageO/ExerciseSelectImageO";
import { theme } from "../../core/config/theme";
import ExerciseHeader from "./ExerciseHeader/ExerciseHeader";
import ExerciseInstructions from "./ExerciseInstructions/ExerciseInstructions";
import { useExercises } from "../hooks/useExercises";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import { parseTitleExercises } from "../utils/parseTitleExercise";
import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";
import { useState } from "react";
import { useSpeech } from "../hooks/useSpeech";
import VowelCarouselGame from "./ExerciseTwentyFour/VowelCarouselGame";
import LetterIdentificationGame from "./LetterIdentificationGame/LetterIdentificationGame";

interface ExerciseContentProps {
  unitId: number;
}

export default function ExerciseContent({ unitId }: ExerciseContentProps) {
  const {
    exercise,
    nextExercise,
    previousExercise,
    isFirstExercise,
    isLastExercise,
    chapter,
    subject,
    currentIndex,
  } = useExercises(unitId);
  console.log(currentIndex);

  const { speak, cancel, isSpeaking } = useSpeech();

  const { parsedTitle, number } = parseTitleExercises(exercise?.title);

  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const handleSaveDrawing = (imageData: string) => {
    console.log("Dibujo guardado:", imageData);
  };

  const handleSpeakClick = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(exercise?.content?.audioContent ?? "", {
        lang: "es-MX",
        rate: 0.5,
      });
    }
  };

  return (
    <div className="rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={exercise?.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header del ejercicio */}
          <ExerciseHeader
            chapter={chapter}
            subject={subject}
            title={parsedTitle || ""}
            number={number}
          />

          {/* Instrucciones */}
          <ExerciseInstructions
            voiceContent={`${exercise?.title}. ${exercise?.content.content}`}
            subtitle={exercise?.content.subtitle}
            content={exercise?.content.content}
          />

          {/* Imagen con canvas de dibujo */}
          <div className="relative bg-[#EEE] shadow-2xs shadow-gray-300 rounded-xl p-8 mb-6 max-h-72 flex justify-center items-center">
            {/*SWICH CASE POR EJERCICIOS COPIADOS DE LA APP MOVIL*/}
            {(() => {
              const caseNumber = exercise?.case ?? null;

              switch (caseNumber) {
                case 24:
                  return (
                    <VowelCarouselGame/>
                  );

                case 25:
                  return <h1>Caso 25 activado</h1>;

                case 26:
                  return <LetterIdentificationGame />;

                case 27:
                  return <h1>Caso 27 activado</h1>;

                case 46:
                  return <ExerciseSelectImageO />;

                case 47:
                  return <h1>Caso 47 activado</h1>;

                default:
                  return (
                    <>
                      {/* Botón para activar/desactivar modo dibujo */}
                      {!exercise?.isAudioExercise && (
                        <button
                          onClick={() => setIsDrawingMode(!isDrawingMode)}
                          className={`absolute top-2 left-2 p-2 rounded-full transition-all z-50 ${
                            isDrawingMode
                              ? "bg-red-500 text-white shadow-lg"
                              : "bg-white text-gray-600 hover:bg-gray-100"
                          } hover:cursor-pointer`}
                          style={{ zIndex: 100 }}
                          title={
                            isDrawingMode
                              ? "Desactivar modo dibujo"
                              : "Activar modo dibujo"
                          }
                        >
                          <Edit3 size={20} />
                        </button>
                      )}

                      <img
                        src={`/stub_images/${exercise?.img}`}
                        alt="ejercicio"
                        className="h-64 w-full object-contain rounded-xl"
                      />

                      {!exercise?.isAudioExercise ? (
                        <DrawingCanvas
                          isActive={isDrawingMode}
                          backgroundImage={`/stub_images/${exercise?.img}`}
                          exerciseId={exercise?.title || ""}
                          exerciseTitle={parsedTitle || ""}
                          chapter={chapter}
                          subject={subject}
                          exerciseNumber={number || undefined}
                          onSave={handleSaveDrawing}
                        />
                      ) : (
                        <button
                          onClick={handleSpeakClick}
                          className="bg-white text-gray-600 hover:bg-gray-100 hover:cursor-pointer absolute top-2 left-2 p-2 rounded-full transition-all z-50"
                        >
                          {isSpeaking ? (
                            <Square size={24} />
                          ) : (
                            <Volume2 size={24} />
                          )}
                        </button>
                      )}
                    </>
                  );
              }
            })()}
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
              ¡Estás haciendo un gran trabajo!
            </span>
          </div>
        </Grid>
        <Grid
          container
          spacing={2}
          size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
          sx={{
            justifyContent: "end",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
            <button className="w-full bg-[#C90104] hover:bg-red-600 hover:cursor-pointer text-white px-6 py-2 rounded-2xl font-semibold transition-colors lg:mr-[55px]">
              Terminar
            </button>
          </Grid> */}
          <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }}>
            <button
              className="w-full hover:bg-teal-700 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887]"
              disabled={isFirstExercise}
              onClick={previousExercise}
            >
              <ChevronLeft size={20} />
              Anterior
            </button>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }}>
            <button
              className="w-full hover:bg-teal-700 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors bg-[#009887] justify-end"
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
