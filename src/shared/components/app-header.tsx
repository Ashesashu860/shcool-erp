"use client";

import { Icon } from "@/shared/components/icon";
import { Button } from "@/shared/ui/button";
import { useToggleMobileNav } from "@/shared/stores/ui-store";

export function AppHeader() {
  const toggleMobileNav = useToggleMobileNav();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface-bright px-4 md:px-10">
      <div className="flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={toggleMobileNav}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container lg:hidden"
        >
          <Icon name="menu" />
        </button>
        <div className="relative hidden w-full max-w-md sm:block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            <Icon name="search" size={20} />
          </span>
          <input
            type="search"
            placeholder="Search records, students, or staff..."
            className="w-full rounded-xl border-none bg-surface-container py-2 pl-10 pr-4 text-body-md outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button className="hidden rounded-xl sm:flex">
          <Icon name="add" size={18} />
          <span>Create</span>
        </Button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <Icon name="notifications" />
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-surface bg-error" />
          </button>
          <button
            type="button"
            aria-label="Help"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <Icon name="help_outline" />
          </button>
        </div>
      </div>
    </header>
  );
}
