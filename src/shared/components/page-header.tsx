import * as React from "react";

import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/lib/utils";

export type Crumb = { label: string; current?: boolean };

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        {breadcrumbs?.length ? (
          <nav className="mb-2 flex items-center gap-2 text-on-surface-variant">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 ? <Icon name="chevron_right" size={14} /> : null}
                <span
                  className={cn(
                    "text-label-md",
                    crumb.current && "font-bold text-primary",
                  )}
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        ) : null}
        <h1 className="font-display text-headline-lg text-on-surface">{title}</h1>
        {description ? <p className="mt-1 text-body-md text-secondary">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}
