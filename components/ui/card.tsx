import * as React from "react"
import { useEffect, useRef } from "react" // Added useEffect, useRef
import { gsap } from "gsap" // Added gsap
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { enhancedHover?: boolean }
>(({ className, enhancedHover = false, ...props }, forwardedRef) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Use a combined ref if a forwardedRef is provided
  const ref = forwardedRef || cardRef;

  useEffect(() => {
    if (enhancedHover && ref && 'current' in ref && ref.current) {
      const cardElement = ref.current;
      gsap.set(cardElement, { transformOrigin: "center center" });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true });
        tl.to(cardElement, {
          y: -5,
          // scale: 1.01, // Optional: subtle scale
          boxShadow: "0px 10px 25px rgba(0,0,0,0.07)", // Softer, more modern shadow
          borderColor: "hsl(var(--electric-cyan)/0.5)", // Use a variable or direct value
          duration: 0.3,
          ease: "power2.out",
        });

        cardElement.addEventListener("mouseenter", () => tl.play());
        cardElement.addEventListener("mouseleave", () => tl.reverse());
        
        return () => { // Cleanup for this specific card's matchMedia
          tl.kill(); // Kill the timeline
          // cardElement.removeEventListener("mouseenter", ...); // Not strictly needed if tl.kill() suffices
          // cardElement.removeEventListener("mouseleave", ...);
        };
      });
      
      return () => { // Main useEffect cleanup
        mm.revert(); // Revert all matchMedia setups
      };
    }
  }, [enhancedHover, ref]); // Rerun if enhancedHover or ref changes

  return (
    <div
      ref={ref}
      // Removed "transition-all duration-300" and "enhanced-card" if GSAP handles all aspects
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm", 
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
