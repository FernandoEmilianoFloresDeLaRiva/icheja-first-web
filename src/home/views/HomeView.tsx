import AlfiImg from "../../assets/images/alfi.png";
import GobiernoLogo from "../../assets/images/gobierno_logo.png";
import AlfaLogo from "../../assets/images/alfa_logo.png";
import UPLogo from "../../assets/images/up_logo.png";
import dividerHome from "../../assets/images/divider_home.png";

import { theme } from "../../core/config/theme";
import { useLocation } from "wouter";
import { useSpeech } from "../../exercises/hooks/useSpeech";
import { Square, Volume2 } from "lucide-react";
import { UI_CONSTANTS } from "../../common/constants/UI_CONSTANTS";

export default function HomeView() {
  const [_, setLocation] = useLocation();
  const { speak, isSpeaking, cancel } = useSpeech();

  const handlePlayAudio = () => {
    if (isSpeaking) {
      cancel();
    } else {
      speak(UI_CONSTANTS.welcomeText);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header de bienvenida con fondo rosa */}
      <div
        className="w-full h-20"
        style={{ backgroundColor: theme.colors.primary.pink }}
      >
        <img src={dividerHome} alt="" />
      </div>
      <div className="text-left pl-16 mt-8">
        <h1
          className="text-8xl font-bold "
          style={{ color: theme.colors.primary.pink }}
        >
          ¡Hola soy Alfi!
        </h1>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-start px-16 mt-8">
        <div className="flex items-stretch justify-between w-full h-full max-w-7xl">
          {/* Sección izquierda con texto y botón de audio */}
          <div className="flex-2 pt-16 flex flex-col justify-between">
            {/* Botón de audio y texto principal */}
            <div className="flex-1 flex flex-row items-start space-x-9">
              <button
                className="w-40 h-32 mt-14 rounded-xl flex items-center justify-center shadow-lg hover:cursor-pointer"
                style={{ backgroundColor: theme.colors.primary.turquoise }}
                aria-label={
                  isSpeaking ? "Detener audio" : "Escuchar bienvenida"
                }
                onClick={handlePlayAudio}
              >
                {isSpeaking ? (
                  <Square size={60} className="text-white" />
                ) : (
                  <Volume2 size={80} className="text-white" />
                )}
              </button>

              {/* Texto principal */}
              <h2 className="text-4xl font-bold text-gray-800 leading-relaxed mb-4 ml-4">
                Bienvenido <br /> te estaré ayudando <br /> en tu proceso de
                alfabetización. <br /> Presiona el botón Iniciar
              </h2>
            </div>

            {/* Logos institucionales */}
            <div className="flex-1 flex items-end justify-center space-x-32 mt-auto">
              <div className="flex items-center">
                <img
                  src={GobiernoLogo}
                  alt="Gobierno Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>

              <div className="flex items-center">
                <img
                  src={AlfaLogo}
                  alt="Chiapas Puede Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>

              <div className="flex items-center">
                <img
                  src={UPLogo}
                  alt="Universidad Politécnica Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sección derecha con el personaje y botón */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Imagen de Alfi */}
            <div className="mb-12">
              <img
                src={AlfiImg}
                alt="Alfi"
                className="w-100 h-100 scale-150 object-contain"
              />
            </div>

            {/* Botón de iniciar */}
            <button
              onClick={() => setLocation("/units")}
              className="w-72 mt-5 px-16 py-4 text-white text-2xl font-bold rounded-4xl shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-105 hover:cursor-pointer"
              style={{ backgroundColor: theme.colors.primary.pink }}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
