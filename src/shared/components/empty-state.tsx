import * as React from "react";

import { Icon } from "@/shared/components/icon";

export function EmptyState({
  icon = "construction",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center">
      <div className="mb-4 rounded-2xl bg-surface-container p-4 text-primary">
        <Icon name={icon} size={32} />
      </div>
      <h2 className="font-display text-headline-md text-on-surface">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-body-md text-on-surface-variant">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
