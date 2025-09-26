import { useState } from "react";
import SideBarIcon from "./SideBarIcon";
import { theme } from "../../../core/config/theme";
import logo from "../../../assets/images/logo.png";
import { ROUTER_CONFIG } from "../../../core/router/ui/config/router.config";
import { NavigationItem } from "../../../core/router/domain/entities";
import { useLocation } from "wouter";

function SideBar() {
  const navigationItems = ROUTER_CONFIG.routes.filter(
    (i) => i instanceof NavigationItem
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [_, setLocation] = useLocation();

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: NavigationItem
  ) => {
    e.preventDefault();
    navigationItems.map((navItem) => (navItem.isActive = false));
    item.isActive = true;
    setLocation(item.path);
  };

  return (
    <div
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
              item.isActive
                ? "bg-white/20 text-white shadow-lg"
                : "hover:bg-white/10 text-pink-100 hover:text-white"
            }`}
            onClick={(e) => onButtonClick(e, item)}
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
    </div>
  );
}

export default SideBar;
