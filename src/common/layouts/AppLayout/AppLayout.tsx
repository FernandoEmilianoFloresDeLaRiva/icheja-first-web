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

    // Activar el tour automáticamente según la ruta
    // Siempre se activa al entrar en /welcome o en rutas de ejercicios
    const timer = setTimeout(() => {
      // Limpiar sessionStorage si existe (por si viene de navegación previa)
      sessionStorage.removeItem("start-tour");
      sessionStorage.removeItem("continue-tour-exercises");
      setShowTour(true);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);


  const handleTourComplete = () => {
    // Simplemente ocultar el tour cuando se completa
    setShowTour(false);
    // Limpiar sessionStorage si existe
    sessionStorage.removeItem("start-tour");
    sessionStorage.removeItem("continue-tour-exercises");
  };

  const handleTourSkip = () => {
    // Simplemente ocultar el tour cuando se omite
    setShowTour(false);
    // Limpiar sessionStorage si existe
    sessionStorage.removeItem("start-tour");
    sessionStorage.removeItem("continue-tour-exercises");
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
