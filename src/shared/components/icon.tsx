import * as React from "react";

import { cn } from "@/shared/lib/utils";

type IconProps = {
  /** Material Symbols Outlined glyph name, e.g. "dashboard". */
  name: string;
  /** Render the filled variant. */
  filled?: boolean;
  /** Optical size / font-size in px. */
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children">;

/** Thin wrapper around Google Material Symbols (loaded in the root layout). */
export function Icon({ name, filled, size, weight, className, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined", className)}
      style={{
        fontSize: size ? `${size}px` : undefined,
        fontVariationSettings:
          filled || weight
            ? `'FILL' ${filled ? 1 : 0}, 'wght' ${weight ?? 400}, 'GRAD' 0, 'opsz' ${size ?? 24}`
            : undefined,
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
}
