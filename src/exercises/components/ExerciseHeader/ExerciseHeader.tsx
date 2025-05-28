import { theme } from "../../../core/config/theme";

export default function ExerciseHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-12">
        <h1 className="text-5xl font-bold text-gray-900 tracking-wide">
          Ejercicio número
        </h1>
        <span
          className="text-white px-4 py-2 rounded-lg text-5xl font-bold"
          style={{ backgroundColor: theme.colors.primary.pink }}
        >
          77
        </span>
      </div>
      <div className="text-right">
        <h2 className="text-3xl font-bold text-gray-900">
          Libro de ejercicios
        </h2>
        <p className="text-gray-900 font-bold text-justify text-xl mt-2">
          Cuaderno 2 /{" "}
          <span style={{ color: theme.colors.primary.pink }}>
            Apropiación de la palabra
          </span>
        </p>
      </div>
    </div>
  );
}
