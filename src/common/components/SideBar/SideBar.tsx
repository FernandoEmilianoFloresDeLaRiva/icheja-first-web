import { useState } from "react";
import SideBarIcon from "./SideBarIcon";
import { theme } from "../../../core/config/theme";
import logo from "../../../assets/images/logo.png";
import homeIcon from "../../../assets/images/home.png";
import bagIcon from "../../../assets/images/bag-icon.png";
import exerciseIcon from "../../../assets/images/exercise.png";
import statisticsIcon from "../../../assets/images/statistics.png";
import userIcon from "../../../assets/images/user-circle.png";
import settingsIcon from "../../../assets/images/settings.png";

function SideBar() {
  const navigationItems = [
    { iconName: "home", label: "Inicio", active: true, icon: homeIcon },
    { iconName: "user", label: "Perfil", active: false, icon: userIcon },
    {
      iconName: "book",
      label: "Ejercicios",
      active: false,
      icon: exerciseIcon,
    },
    {
      iconName: "file",
      label: "Progreso",
      active: false,
      icon: statisticsIcon,
    },
    { iconName: "settings", label: "Mochila", active: false, icon: bagIcon },
  ];
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div
      data-tour="sidebar"
      className={`fixed left-5 top-4 bottom-4 z-50 text-white transition-all duration-300 ease-in-out  ${
        isCollapsed ? "w-18" : "w-64"
      } flex flex-col shadow-2xl rounded-xl`}
      style={{ background: theme.colors.primary.pink }}
    >
      {/* Header/Logo */}
      <div className="flex justify-center pt-4 pb-18">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-pink-400/30 transition-colors hover:cursor-pointer"
        >
          <SideBarIcon
            altText="logo"
            size={50}
            logoSrc={logo}
            isCollapsed={isCollapsed}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:cursor-pointer ${
              item.active
                ? "bg-white/20 text-white shadow-lg"
                : "hover:bg-white/10 text-pink-100 hover:text-white"
            }`}
          >
            <SideBarIcon
              iconName={item.label}
              size={20}
              isCollapsed={isCollapsed}
              logoSrc={item.icon}
            />
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mb-4 flex items-center justify-center">
        <SideBarIcon
          altText="settings"
          size={20}
          logoSrc={settingsIcon}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}

export default SideBar;
