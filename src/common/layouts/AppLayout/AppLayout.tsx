import type { ReactNode } from "react";
import SideBar from "../../components/SideBar/SideBar";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex h-screen bg-gray-50 py-4 px-5">
      <SideBar />
      <div className="w-full ml-32 bg-black rounded-xl">{children}</div>
    </main>
  );
}

export default AppLayout;
