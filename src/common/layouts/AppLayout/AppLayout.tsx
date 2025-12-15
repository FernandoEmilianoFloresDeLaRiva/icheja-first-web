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
    // Aceptar /exercises o /exercise/:unitId
    const isExerciseRoute = location === "/exercises" || location.startsWith("/exercise/");
    
    if (!isExerciseRoute) {
      setShowTour(false);
      return;
    }

    // Verificar si hay un parámetro de tour en la URL o en sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const shouldShowTour = urlParams.get("tour") === "true";
    
    // También verificar sessionStorage para tours iniciados desde splash
    const tourFromSplash = sessionStorage.getItem("start-tour") === "true";
    
    if (shouldShowTour || tourFromSplash) {
      // Esperar más tiempo para que el DOM se renderice completamente
      // Especialmente importante después del merge con nuevos componentes
      const timer = setTimeout(() => {
        // Si viene del splash, mostrar siempre (ignorar localStorage)
        // Si viene de URL, verificar si ya se completó antes
        if (tourFromSplash) {
          // Tour iniciado desde splash: mostrar siempre
          // Limpiar sessionStorage después de leerlo
          sessionStorage.removeItem("start-tour");
          setShowTour(true);
        } else {
          // Tour iniciado desde URL: verificar localStorage
          const tourCompleted = localStorage.getItem("tour-completed");
          if (tourCompleted !== "true") {
            setShowTour(true);
          } else {
            setShowTour(false);
          }
        }
      }, 800); // Aumentado el delay para asegurar que todos los componentes estén renderizados

      return () => clearTimeout(timer);
    } else {
      // Si no hay indicador de tour, asegurarse de que esté desactivado
      setShowTour(false);
    }
  }, [location]);

  const handleTourComplete = () => {
    // Asegurarse de que el tour se marca como completado ANTES de ocultarlo
    localStorage.setItem("tour-completed", "true");
    setShowTour(false);
    // Limpiar sessionStorage si existe
    sessionStorage.removeItem("start-tour");
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
    <main className="flex max-w-screen min-h-screen bg-gray-50 py-4 px-5">
      <SideBar />
      <div className="w-full ml-32 rounded-xl pr-12">
        <HeaderLogo />
        <AnimatePresence mode="wait">
          <PageTransition ease="easeInOut">{children}</PageTransition>
        </AnimatePresence>
      </div>
      <TourGuiado
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </main>
  );
}

export default AppLayout;
