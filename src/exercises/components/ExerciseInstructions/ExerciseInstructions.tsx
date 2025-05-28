import { NotebookText } from "lucide-react";

export default function ExerciseInstructions() {
  return (
    <div className="mb-4">
      <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">
          <NotebookText size={32} />
        </span>{" "}
        Instrucciones
      </h3>
      <div className="text-gray-900 leading-6 space-y-2 text-balance">
        <p className="font-medium pt-1">
          Pide a los educandos que observen las imágenes, lee junto con ellos
          cada una de las palabras para que las relacionen con cada una de las
          imágenes. En cada una de las palabras, indícales que localicen la
          vocal “O”, “o” señalando la que aparece en color café y la consonante
          “L”, “l” que aparece en color negro fuerte. Pídeles que encierren con
          un círculo color naranja en cada palabra la vocal “O”, “o” y la
          consonante “S”, “s”.
        </p>
      </div>
    </div>
  );
}
