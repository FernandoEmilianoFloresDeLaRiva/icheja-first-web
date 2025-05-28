import { ChevronLeft, ChevronRight } from "lucide-react";
import { theme } from "../../core/config/theme";
import ExerciseHeader from "./ExerciseHeader/ExerciseHeader";
import ExerciseInstructions from "./ExerciseInstructions/ExerciseInstructions";
import dummyImage from "../../assets/images/dummy_image.png";

export default function ExerciseContent() {
  return (
    <div className="rounded-xl">
      {/* Header del ejercicio */}
      <ExerciseHeader />

      {/* Instrucciones */}
      <ExerciseInstructions />

      {/* Contenido principal con las imágenes */}
      <div className="bg-[#EEE] shadow-2xs shadow-gray-300 rounded-xl p-8 mb-6 max-h-72 flex justify-center items-center">
        <img src={dummyImage} alt="dummy image" className="h-64 object-cover" />
      </div>

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
            className="hover:bg-teal-700 hover:cursor-pointer text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors"
            style={{ backgroundColor: theme.colors.primary.turquoise }}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
          <button
            className=" hover:bg-teal-700 hover:cursor-pointer text-white px-6 py-2 rounded-2xl font-semibold flex items-center gap-2 transition-colors"
            style={{ backgroundColor: theme.colors.primary.turquoise }}
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
