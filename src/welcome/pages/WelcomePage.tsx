import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import welcomeVideo from "../../assets/videos/welcome_video.mp4";
import AppLayout from "../../common/layouts/AppLayout/AppLayout";

export default function WelcomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Auto-play cuando el componente se monta
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Auto-play was prevented:", error);
      }
    };
    playVideo();

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume > 0 ? volume : 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(duration, video.currentTime + 10);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AppLayout>
      <div className="w-full flex justify-center">
        <div
          className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 p-6 rounded-3xl shadow-2xl"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl">
            <video
              ref={videoRef}
              loop={true}
              src={welcomeVideo}
              className="w-full h-auto max-h-[70vh] object-contain"
              onClick={togglePlay}
            />

            {/* Controles personalizados */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-300 ${
                showControls
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
            >
              {/* Barra de progreso */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${
                      (currentTime / duration) * 100
                    }%, #4b5563 ${
                      (currentTime / duration) * 100
                    }%, #4b5563 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controles principales */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Botón retroceder */}
                  <button
                    onClick={skipBackward}
                    className="text-white hover:text-pink-300 transition-colors p-2 hover:bg-white/10 hover:cursor-pointer rounded-full"
                    title="Retroceder 10s"
                  >
                    <SkipBack size={24} />
                  </button>

                  {/* Botón play/pause */}
                  <button
                    onClick={togglePlay}
                    className="bg-pink-500 hover:bg-pink-600 hover:cursor-pointer text-white p-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
                    title={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>

                  {/* Botón adelantar */}
                  <button
                    onClick={skipForward}
                    className="text-white hover:text-pink-300 hover:cursor-pointer transition-colors p-2 hover:bg-white/10 rounded-full"
                    title="Adelantar 10s"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Control de volumen */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-pink-300 hover:cursor-pointer transition-colors p-2 hover:bg-white/10 rounded-full"
                    title={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${
                        (isMuted ? 0 : volume) * 100
                      }%, #4b5563 ${
                        (isMuted ? 0 : volume) * 100
                      }%, #4b5563 100%)`,
                    }}
                  />

                  {/* Botón pantalla completa */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-pink-300 hover:cursor-pointer transition-colors p-2 hover:bg-white/10 rounded-full"
                    title="Pantalla completa"
                  >
                    <Maximize2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
