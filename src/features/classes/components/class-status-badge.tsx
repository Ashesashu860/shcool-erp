import type { ClassStatus } from "@/features/classes/types";
import { cn } from "@/shared/lib/utils";

const config: Record<ClassStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-success-container text-on-success-container border-success/20",
  },
  at_capacity: {
    label: "At Capacity",
    className: "bg-error-container text-on-error-container border-error/20",
  },
  waitlist: {
    label: "Waitlist",
    className: "bg-warning-container text-on-warning-container border-warning/20",
  },
  archived: {
    label: "Archived",
    className: "bg-surface-container-high text-on-surface-variant border-outline-variant",
  },
};

export function ClassStatusBadge({ status }: { status: ClassStatus }) {
  const { label, className } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {label}
    </span>
  );
}
