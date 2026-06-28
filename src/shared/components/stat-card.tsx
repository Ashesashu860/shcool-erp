import * as React from "react";

import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  meta,
  iconClassName,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon: string;
  meta?: React.ReactNode;
  iconClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex cursor-pointer flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-4 transition-colors hover:border-primary",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={cn("rounded-lg p-2 text-primary", iconClassName ?? "bg-primary-fixed")}>
          <Icon name={icon} />
        </div>
        {meta ? <span className="text-[12px] font-medium text-on-surface-variant">{meta}</span> : null}
      </div>
      <div>
        <p className="text-label-md uppercase tracking-tight text-on-surface-variant opacity-70">
          {label}
        </p>
        <p className="font-display text-headline-md font-bold text-on-surface">{value}</p>
      </div>
    </div>
  );
}
