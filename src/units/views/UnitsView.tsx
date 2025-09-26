import { BookOpen } from "lucide-react";
import AppLayout from "../../common/layouts/AppLayout/AppLayout";
import { useUnits } from "../hooks/useUnits";

export default function UnitsView() {
  const { units } = useUnits();
  return (
    <AppLayout>
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Unidades de Aprendizaje
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-2 py-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className=" bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#009887]/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#009887]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Unidad {unit.id + 1}
                </h2>
              </div>
              <p className="text-gray-600">{unit.title}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {unit.exerciseCount || 0} ejercicios
                </span>
                <button className="text-sm font-medium text-[#009887] hover:text-[#009887]/70 transition-colors hover:cursor-pointer">
                  Ver más →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
