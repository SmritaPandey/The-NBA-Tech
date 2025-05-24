import * as React from "react"
import { useEffect, useRef } from "react" // Added useEffect, useRef
import { gsap } from "gsap" // Added gsap
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] text-white hover:shadow-md hover:opacity-90",
        accent: "bg-[hsl(var(--accent-purple))] text-white hover:bg-[hsl(var(--accent-purple))/90] hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "button";
    const buttonRef = useRef<HTMLButtonElement>(null);
    // Use a combined ref if a forwardedRef is provided
    const ref = forwardedRef || buttonRef;

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const buttonElement = ref.current;
        gsap.set(buttonElement, { transformOrigin: "center center" });

        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({ paused: true });
          tl.to(buttonElement, {
            scale: 1.05, // Subtle scale effect
            duration: 0.2,
            ease: "power1.out",
          });

          const focusTl = gsap.timeline({ paused: true });
          focusTl.to(buttonElement, {
            scale: 1.02, // Slightly different scale for focus, or could be same
             // Example: add a ring-like effect via boxShadow if desired, though focus-visible handles ring
            // boxShadow: "0 0 0 2px hsl(var(--ring))", 
            duration: 0.2,
            ease: "power1.out",
          });

          buttonElement.addEventListener("mouseenter", () => tl.play());
          buttonElement.addEventListener("mouseleave", () => tl.reverse());
          buttonElement.addEventListener("focus", () => focusTl.play());
          buttonElement.addEventListener("blur", () => focusTl.reverse());
          
          return () => { // Cleanup for matchMedia
            tl.kill();
            focusTl.kill();
          };
        });
        
        return () => { // Main useEffect cleanup
          mm.revert(); 
        };
      }
    }, [ref]); // Rerun if ref changes

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }
