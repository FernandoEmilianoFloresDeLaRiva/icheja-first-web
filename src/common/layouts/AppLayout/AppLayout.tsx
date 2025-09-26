import type { ReactNode } from "react";
import SideBar from "../../components/SideBar/SideBar";
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../PageTransition/PageTransition";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex max-w-screen h-screen bg-gray-50 py-4 px-5">
      <SideBar />
      <div className="w-full ml-32 rounded-xl pr-12">
        <HeaderLogo />
        <AnimatePresence mode="wait">
          <PageTransition ease="easeInOut">{children}</PageTransition>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default AppLayout;
