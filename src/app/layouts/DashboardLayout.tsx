import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import Topbar from "@/features/dashboard/components/Topbar";
import MobileSidebar from "@/features/dashboard/components/MobileSidebar";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F6F6F6] w-full overflow-x-hidden">
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="min-h-screen bg-white shadow-sm">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[270px_1fr]">
          <aside className="hidden border-r border-gray-100 lg:block">
            <Sidebar />
          </aside>

          <div className="relative">
            <div className="fixed top-0 left-0 right-0 z-40 lg:left-67.5">
              <Topbar onOpenSidebar={() => setMobileOpen(true)} />
              <div className="w-full h-px bg-gray-100" />
            </div>

            <div className="px-6 pb-6 pt-26 lg:pt-28">
              {children}
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
}