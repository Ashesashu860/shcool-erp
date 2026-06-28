import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/lib/utils";

export function BrandLogo({
  subtitle = "Academic Admin",
  className,
}: {
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-primary" aria-hidden="true">
        <Icon name="school" size={32} filled weight={600} />
      </span>
      <div className="flex flex-col">
        <span className="font-display text-headline-md font-bold leading-tight text-primary">
          ScholarSync
        </span>
        {subtitle ? (
          <span className="text-label-md text-on-surface-variant opacity-70">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}
