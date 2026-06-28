"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/shared/components/icon";
import { mobileNav } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-surface px-4 py-2 shadow-lg lg:hidden">
      {mobileNav.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl px-4 py-1",
              active
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant",
            )}
          >
            <Icon name={item.icon} filled={active} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
