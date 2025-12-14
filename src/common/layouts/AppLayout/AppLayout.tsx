import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SideBar from "../../components/SideBar/SideBar";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import TourGuiado from "../../components/TourGuiado/TourGuiado";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (location !== "/exercises") {
      setShowTour(false);
      return;
    }

    // Verificar si hay un parámetro de tour en la URL o en sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const shouldShowTour = urlParams.get("tour") === "true";
    
    // También verificar sessionStorage para tours iniciados desde splash
    const tourFromSplash = sessionStorage.getItem("start-tour") === "true";
    
    if (shouldShowTour || tourFromSplash) {
      // Esperar un momento para que el DOM se renderice completamente
      const timer = setTimeout(() => {
        // Limpiar sessionStorage después de leerlo
        if (tourFromSplash) {
          sessionStorage.removeItem("start-tour");
        }
        
        // Si el tour se inició desde el splash, mostrarlo siempre
        // Si viene de URL, verificar si ya se completó antes
        if (tourFromSplash) {
          // Tour iniciado desde splash: mostrar siempre
          setShowTour(true);
        } else {
          // Tour iniciado desde URL: verificar localStorage
          const tourCompleted = localStorage.getItem("tour-completed");
          if (!tourCompleted) {
            setShowTour(true);
          }
        }
      }, 300); // Pequeño delay para asegurar que el DOM esté listo

      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleTourComplete = () => {
    setShowTour(false);
    // Limpiar parámetros de URL si existen
    if (window.location.search.includes("tour=true")) {
      window.history.replaceState({}, "", "/exercises");
    }
  };

  const handleTourSkip = () => {
    setShowTour(false);
    if (window.location.search.includes("tour=true")) {
      window.history.replaceState({}, "", "/exercises");
    }
  };

  return (
    <main className="flex max-w-screen h-screen bg-gray-50 py-4 px-5">
      <SideBar />
      <div className="w-full ml-32 rounded-xl pr-12">
        <HeaderLogo />
        {children}
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
