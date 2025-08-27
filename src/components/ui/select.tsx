import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.ComponentProps<"select"> {
  options: { value: string; label: string; disabled?: boolean }[];
}

function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      data-slot="select"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-base md:text-sm outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground",
        "placeholder:text-muted-foreground file:text-foreground dark:bg-input/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export { Select };
