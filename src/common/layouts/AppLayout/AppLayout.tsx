import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import SideBar from "../../components/SideBar/SideBar";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import TourGuiado from "../../components/TourGuiado/TourGuiado";
import PageTransition from "../PageTransition/PageTransition";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Verificar si estamos en una ruta que debe mostrar el tour
    // Aceptar /welcome, /exercises, /exercise/:unitId, o /units?unitId=X
    const currentUrlParams = new URLSearchParams(window.location.search);
    const currentHasUnitId = currentUrlParams.has("unitId");
    const isWelcomeRoute = location === "/welcome";
    const currentIsExerciseRoute = location === "/exercises" || location.startsWith("/exercise/") || (location === "/units" && currentHasUnitId);
    const isTourRoute = isWelcomeRoute || currentIsExerciseRoute;
    
    if (!isTourRoute) {
      setShowTour(false);
      return;
    }

    // Verificar si hay un parámetro de tour en la URL o en sessionStorage
    const shouldShowTour = currentUrlParams.get("tour") === "true";
    
    // También verificar sessionStorage para tours iniciados desde splash, desde Alfi, o desde unidad 1
    const tourFromStorage = sessionStorage.getItem("start-tour") === "true";
    const continueTourExercises = sessionStorage.getItem("continue-tour-exercises") === "true";
    
    // Para /welcome, verificar si el tour ya fue completado
    const tourCompleted = localStorage.getItem("tour-completed");
    
    // Determinar si debemos mostrar el tour
    // Solo se activa si:
    // 1. Viene del splash (tourFromStorage) - siempre mostrar
    // 2. Se hace clic en Alfi (tourFromStorage) - siempre mostrar
    // 3. Se hace clic en unidad 1 durante el tour (continueTourExercises) - siempre mostrar en ejercicios
    // 4. Hay ?tour=true en la URL - verificar si no está completado
    // NO se activa automáticamente solo por estar en /welcome
    let shouldActivateTour = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    if (tourFromStorage || continueTourExercises) {
      // Tour iniciado desde splash, Alfi, o continuando desde unidad 1: mostrar siempre (ignorar localStorage)
      shouldActivateTour = true;
    } else if (shouldShowTour) {
      // Tour iniciado desde URL: verificar localStorage
      shouldActivateTour = tourCompleted !== "true";
    }
    
    if (shouldActivateTour) {
      // Esperar más tiempo para que el DOM se renderice completamente
      timer = setTimeout(() => {
        if (tourFromStorage || continueTourExercises) {
          // Limpiar sessionStorage después de leerlo
          sessionStorage.removeItem("start-tour");
          sessionStorage.removeItem("continue-tour-exercises");
        }
        setShowTour(true);
      }, 800);
    } else {
      // Si no hay indicador de tour, solo desactivar si el tour no está activo
      // Esto evita que se desactive el tour si ya está activo y los flags fueron limpiados
      if (!showTour && !tourFromStorage && !continueTourExercises) {
        setShowTour(false);
      }
    }
  }, [location]); // Remover showTour de las dependencias para evitar re-ejecuciones innecesarias

  // Separar el listener del evento en un useEffect independiente
  useEffect(() => {
    const handleTourStart = () => {
      // Verificar inmediatamente después del evento
      // Recalcular la ruta actual porque puede haber cambiado
      const currentUrlParamsCheck = new URLSearchParams(window.location.search);
      const currentHasUnitIdCheck = currentUrlParamsCheck.has("unitId");
      const currentLocationCheck = window.location.pathname;
      const isWelcomeRouteCheck = currentLocationCheck === "/welcome";
      const isExerciseRouteCheck = currentLocationCheck === "/exercises" || currentLocationCheck.startsWith("/exercise/") || (currentLocationCheck === "/units" && currentHasUnitIdCheck);
      
      if (isWelcomeRouteCheck) {
        // Pequeño delay para asegurar que sessionStorage se haya actualizado
        setTimeout(() => {
          const hasTourFlag = sessionStorage.getItem("start-tour") === "true";
          if (hasTourFlag) {
            // Limpiar el flag y activar el tour
            sessionStorage.removeItem("start-tour");
            setTimeout(() => {
              setShowTour(true);
            }, 800);
          }
        }, 50);
      } else if (isExerciseRouteCheck) {
        // Si estamos en ejercicios, verificar si hay un flag de continuar tour o si Alfi fue clickeado
        setTimeout(() => {
          const hasContinueTour = sessionStorage.getItem("continue-tour-exercises") === "true";
          const hasTourFlag = sessionStorage.getItem("start-tour") === "true";
          if (hasContinueTour || hasTourFlag) {
            // Limpiar los flags y activar el tour
            sessionStorage.removeItem("continue-tour-exercises");
            sessionStorage.removeItem("start-tour");
            setTimeout(() => {
              setShowTour(true);
            }, 800);
          }
        }, 50);
      }
    };

    window.addEventListener("start-tour", handleTourStart);
    
    return () => {
      window.removeEventListener("start-tour", handleTourStart);
    };
  }, []); // Este useEffect solo se ejecuta una vez al montar

  // Separar el intervalo en un useEffect independiente
  useEffect(() => {
    const interval = setInterval(() => {
      const hasStartTour = sessionStorage.getItem("start-tour") === "true";
      const hasContinueTour = sessionStorage.getItem("continue-tour-exercises") === "true";
      
      // Recalcular la ruta actual en cada iteración
      const intervalUrlParams = new URLSearchParams(window.location.search);
      const intervalHasUnitId = intervalUrlParams.has("unitId");
      const intervalLocation = window.location.pathname;
      const intervalIsWelcomeRoute = intervalLocation === "/welcome";
      const intervalIsExerciseRoute = intervalLocation === "/exercises" || intervalLocation.startsWith("/exercise/") || (intervalLocation === "/units" && intervalHasUnitId);
      
      if (hasStartTour && intervalIsWelcomeRoute) {
        sessionStorage.removeItem("start-tour");
        setTimeout(() => {
          setShowTour(true);
        }, 800);
      } else if ((hasContinueTour || hasStartTour) && intervalIsExerciseRoute) {
        // Si viene de continuar el tour desde unidad 1 o si Alfi fue clickeado, activar en ejercicios
        sessionStorage.removeItem("continue-tour-exercises");
        sessionStorage.removeItem("start-tour");
        setTimeout(() => {
          setShowTour(true);
        }, 800);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []); // Este useEffect solo se ejecuta una vez al montar

  const handleTourComplete = () => {
    // Verificar si el tour debe continuar en ejercicios
    const continueTourExercises = sessionStorage.getItem("continue-tour-exercises") === "true";
    const urlParamsForComplete = new URLSearchParams(window.location.search);
    const hasUnitIdForComplete = urlParamsForComplete.has("unitId");
    const isExerciseRouteForComplete = location === "/exercises" || location.startsWith("/exercise/") || (location === "/units" && hasUnitIdForComplete);
    
    if (continueTourExercises && isExerciseRouteForComplete) {
      // Si estamos en la página de ejercicios y el tour debe continuar, NO marcar como completado todavía
      // El tour continuará en esta página - solo limpiar el flag de welcome
      sessionStorage.removeItem("start-tour");
      // Mantener continue-tour-exercises para que el tour se active
      return;
    }
    
    // Si no es el tour de ejercicios, marcar como completado normalmente
    // Asegurarse de que el tour se marca como completado ANTES de ocultarlo
    localStorage.setItem("tour-completed", "true");
    setShowTour(false);
    // Limpiar sessionStorage si existe
    sessionStorage.removeItem("start-tour");
    sessionStorage.removeItem("continue-tour-exercises");
    // Limpiar parámetros de URL si existen
    if (window.location.search.includes("tour=true")) {
      window.history.replaceState({}, "", "/exercises");
    }
  };

  const handleTourSkip = () => {
    // Asegurarse de que el tour se marca como completado ANTES de ocultarlo
    localStorage.setItem("tour-completed", "true");
    setShowTour(false);
    // Limpiar sessionStorage si existe
    sessionStorage.removeItem("start-tour");
    if (window.location.search.includes("tour=true")) {
      window.history.replaceState({}, "", "/exercises");
    }
  };

  return (
    <main className="flex max-w-screen h-screen bg-gray-50 py-1 px-2 overflow-hidden">
      <SideBar />
      <div className="w-full ml-32 rounded-xl pr-4 flex flex-col min-h-0 overflow-hidden">
        <HeaderLogo />
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <PageTransition ease="easeInOut">{children}</PageTransition>
          </AnimatePresence>
        </div>
      </div>
      <TourGuiado
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
        currentRoute={location}
      />
    </main>
  );
}

export default AppLayout;
