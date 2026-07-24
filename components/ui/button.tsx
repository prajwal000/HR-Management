import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  secondary:
    "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50",
  ghost: "text-neutral-600 hover:bg-neutral-100",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
