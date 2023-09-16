import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary-9 text-white-A12 shadow hover:bg-primary-10 active:bg-primary-10",
        destructive:
          "bg-danger-9 text-white-A12 shadow-sm hover:bg-danger-10 active:bg-danger-10",
        outline:
          "border border-neutral-6 bg-transparent shadow-sm hover:bg-neutral-4 text-neutral-11 hover:text-neutral-12",
        secondary:
          "bg-secondary-9 text-white-A12 shadow-sm hover:bg-secondary-10 active:bg-secondary-10",
        secondaryLight:
          "bg-secondary-3 text-secondary-11 shadow-sm hover:bg-secondary-4 active:bg-secondary-5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 text-lg rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
