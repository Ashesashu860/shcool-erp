import * as React from "react";

import { AppHeader } from "@/shared/components/app-header";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { MobileBottomNav } from "@/shared/components/mobile-bottom-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="min-h-screen lg:ml-[280px]">
        <AppHeader />
        <main className="p-4 pb-24 md:p-10 lg:pb-10">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
