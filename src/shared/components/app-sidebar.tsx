"use client";

import { BrandLogo } from "@/shared/components/brand-logo";
import { Icon } from "@/shared/components/icon";
import { SidebarNav } from "@/shared/components/sidebar-nav";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet";
import { useMobileNavOpen, useSetMobileNavOpen } from "@/shared/stores/ui-store";

function SidebarUser() {
  return (
    <div className="mt-auto border-t border-outline-variant px-4 pt-6">
      <div className="mb-4 flex items-center gap-3 px-4">
        <Avatar className="size-10 border-2 border-primary-container">
          <AvatarFallback className="bg-primary-container text-on-primary-container">SJ</AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <p className="truncate text-label-md font-bold">Dr. Sarah Jenkins</p>
          <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Chief Admin</p>
        </div>
      </div>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-label-md text-error transition-colors hover:bg-error-container"
      >
        <Icon name="logout" />
        <span>Logout</span>
      </button>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="mb-10 px-6">
        <BrandLogo />
      </div>
      <SidebarNav onNavigate={onNavigate} />
      <SidebarUser />
    </>
  );
}

export function AppSidebar() {
  const mobileNavOpen = useMobileNavOpen();
  const setMobileNavOpen = useSetMobileNavOpen();

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] flex-col border-r border-outline-variant bg-surface py-6 lg:flex">
        <SidebarBody />
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="flex w-[280px] flex-col gap-0 bg-surface py-6 sm:max-w-[280px] lg:hidden"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBody onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
