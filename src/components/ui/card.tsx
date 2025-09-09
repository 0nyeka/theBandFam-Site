import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center gap-4 py-6 sm:py-8 px-4 sm:px-8 bg-[linear-gradient(175deg,rgb(40,60,90)_0%,rgba(30,50,80,0.7)_85%)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] rounded-md sm:rounded-lg ring-default ring-0 h-full",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
