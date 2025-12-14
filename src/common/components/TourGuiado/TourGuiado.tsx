import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../../core/config/theme";

interface TourStep {
  id: string;
  title: string;
  description: string;
  selector: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

interface TourGuiadoProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "sidebar",
    title: "Barra de Navegación",
    description:
      "Aquí encontrarás todas las secciones de la aplicación: Inicio, Perfil, Ejercicios, Progreso y Mochila. Haz clic en el logo para expandir o contraer el menú.",
    selector: '[data-tour="sidebar"]',
    position: "right",
  },
  {
    id: "header",
    title: "Encabezado",
    description:
      "Esta es la barra superior donde verás el logo y la información principal de la aplicación.",
    selector: '[data-tour="header"]',
    position: "bottom",
  },
  {
    id: "content",
    title: "Área de Contenido",
    description:
      "Aquí es donde verás los ejercicios y actividades. Navega entre ellos usando los botones de anterior y siguiente.",
    selector: '[data-tour="content"]',
    position: "top",
  },
];

export default function TourGuiado({ isActive, onComplete, onSkip }: TourGuiadoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [elementPosition, setElementPosition] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      setElementPosition(null);
      return;
    }

    const updateElementPosition = () => {
      const step = TOUR_STEPS[currentStep];
      if (!step) return;

      // Intentar encontrar el elemento con un pequeño retraso para asegurar que el DOM esté listo
      const element = document.querySelector(step.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Verificar que el elemento tenga dimensiones válidas
        if (rect.width > 0 && rect.height > 0) {
          setElementPosition(rect);

          // Calcular posición del tooltip según la posición especificada
          const tooltipOffset = 30;
          const tooltipWidth = 400;
          const tooltipHeight = 250;
          let top = 0;
          let left = 0;

          switch (step.position) {
            case "top":
              top = Math.max(20, rect.top - tooltipHeight - tooltipOffset);
              left = rect.left + rect.width / 2;
              break;
            case "bottom":
              top = rect.bottom + tooltipOffset;
              left = rect.left + rect.width / 2;
              break;
            case "left":
              top = rect.top + rect.height / 2;
              left = Math.max(20, rect.left - tooltipWidth - tooltipOffset);
              break;
            case "right":
              top = rect.top + rect.height / 2;
              left = Math.min(
                window.innerWidth - tooltipWidth - 20,
                rect.right + tooltipOffset
              );
              break;
            case "center":
              top = window.innerHeight / 2;
              left = window.innerWidth / 2;
              break;
          }

          setTooltipPosition({ top, left });
        } else {
          // Si no tiene dimensiones, intentar de nuevo en el siguiente frame
          requestAnimationFrame(updateElementPosition);
        }
      } else {
        // Si no se encuentra el elemento, intentar de nuevo después de un breve delay
        console.warn(`Elemento no encontrado: ${step.selector}`);
        setTimeout(updateElementPosition, 100);
      }
    };

    // Esperar un momento para que el DOM se renderice completamente
    const timer = setTimeout(updateElementPosition, 200);
    // También ejecutar inmediatamente
    updateElementPosition();

    window.addEventListener("resize", updateElementPosition);
    window.addEventListener("scroll", updateElementPosition, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateElementPosition);
      window.removeEventListener("scroll", updateElementPosition, true);
    };
  }, [currentStep, isActive]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("tour-completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem("tour-completed", "true");
    onSkip();
  };

  if (!isActive) return null;

  const currentStepData = TOUR_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Calcular el spotlight (agujero en el overlay) usando SVG
  const spotlightRadius = elementPosition
    ? Math.max(elementPosition.width, elementPosition.height) / 2 + 20
    : 0;
  const spotlightX = elementPosition
    ? elementPosition.left + elementPosition.width / 2
    : 0;
  const spotlightY = elementPosition
    ? elementPosition.top + elementPosition.height / 2
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] pointer-events-auto"
      >
        {/* Overlay oscuro con spotlight usando SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <mask id={`spotlight-mask-${currentStep}`}>
              <rect width="100%" height="100%" fill="black" />
              {elementPosition && spotlightRadius > 0 && (
                <circle
                  cx={spotlightX}
                  cy={spotlightY}
                  r={spotlightRadius}
                  fill="white"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask={`url(#spotlight-mask-${currentStep})`}
          />
        </svg>

        {/* Tooltip con información del paso */}
        {currentStepData && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="absolute z-[10000]"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              transform:
                currentStepData.position === "left" ||
                currentStepData.position === "right"
                  ? "translateY(-50%)"
                  : "translateX(-50%)",
              maxWidth: "400px",
              minWidth: "320px",
            }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-6 relative"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Indicador de paso */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: theme.colors.primary.pink }}
                  >
                    {currentStep + 1}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {currentStep + 1} de {TOUR_STEPS.length}
                  </span>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
                  aria-label="Cerrar tour"
                >
                  ×
                </button>
              </div>

              {/* Título y descripción */}
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: theme.colors.primary.pink }}
              >
                {currentStepData.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {currentStepData.description}
              </p>

              {/* Botones de navegación */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    isFirstStep
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Anterior
                </button>

                <div className="flex gap-2">
                  {TOUR_STEPS.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? "bg-pink-500 w-6"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.colors.primary.pink }}
                >
                  {isLastStep ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </div>

            {/* Flecha apuntando al elemento */}
            {elementPosition && (
              <motion.div
                className="absolute"
                style={{
                  top:
                    currentStepData.position === "bottom"
                      ? "-10px"
                      : currentStepData.position === "top"
                      ? "100%"
                      : "50%",
                  left:
                    currentStepData.position === "left" ||
                    currentStepData.position === "right"
                      ? currentStepData.position === "left"
                        ? "100%"
                        : "-10px"
                      : "50%",
                  transform:
                    currentStepData.position === "left" ||
                    currentStepData.position === "right"
                      ? "translateY(-50%)"
                      : "translateX(-50%)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft:
                      currentStepData.position === "right"
                        ? `10px solid white`
                        : "none",
                    borderRight:
                      currentStepData.position === "left"
                        ? `10px solid white`
                        : "none",
                    borderTop:
                      currentStepData.position === "bottom"
                        ? `10px solid white`
                        : "none",
                    borderBottom:
                      currentStepData.position === "top"
                        ? `10px solid white`
                        : "none",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
