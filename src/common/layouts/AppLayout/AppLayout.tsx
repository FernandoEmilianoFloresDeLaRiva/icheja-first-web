import type { ReactNode } from "react";
import SideBar from "../../components/SideBar/SideBar";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex h-screen bg-gray-50 py-4 px-5">
      <SideBar />
      <div className="w-full ml-32 rounded-xl pr-12">
        <HeaderLogo />
        {children}
      </div>
    </main>
  );
}

export default AppLayout;
