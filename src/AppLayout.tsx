// src/AppLayout.tsx
import { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar"; // ensure this exists
import Navbar from "./components/Navbar";   // ensure this exists

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Mobile overlay + Sidebar (portal-like) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="md:hidden">
        <Sidebar variant="mobile" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Desktop layout row */}
      <div className="hidden md:flex">
        <Sidebar variant="desktop" />
      </div>

      {/* Right content */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Top bar with hamburger on mobile */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur z-30">
          <button
            aria-label="Open sidebar"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
        </div>

        {/* ✅ This is where your dashboard (or other page) renders */}
        <main className="flex-1 overflow-y-auto overflow-x-auto sm:overflow-x-visible p-0 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
