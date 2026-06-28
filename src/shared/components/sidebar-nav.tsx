"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/shared/components/icon";
import { primaryNav } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-4 hide-scrollbar">
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-label-md transition-colors active:scale-[0.98]",
              active
                ? "border-l-4 border-primary rounded-xl bg-secondary-container text-on-secondary-container"
                : "text-secondary hover:bg-surface-container-high",
            )}
          >
            <Icon name={item.icon} filled={active} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
