"use client"

import { useState, useRef, forwardRef } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface RippleProps {
  x: number
  y: number
  size: number
}

interface ButtonWithRippleProps extends ButtonProps {
  rippleColor?: string
  rippleDuration?: number
}

export const ButtonWithRipple = forwardRef<HTMLButtonElement, ButtonWithRippleProps>(
  ({ className, rippleColor = "rgba(255, 255, 255, 0.7)", rippleDuration = 0.5, children, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleProps[]>([])
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Calculate ripple size based on button dimensions
      const size = Math.max(rect.width, rect.height) * 2
      
      // Add new ripple
      const newRipple = { x, y, size }
      setRipples([...ripples, newRipple])
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((r) => r !== newRipple))
      }, rippleDuration * 1000)
    }

    return (
      <Button
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          buttonRef.current = node
        }}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
                background: rippleColor,
              }}
              initial={{ transform: "scale(0)", opacity: 0.5 }}
              animate={{ transform: "scale(1)", opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: rippleDuration, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
        
        {/* Button content */}
        <span className="relative z-10">{children}</span>
      </Button>
    )
  }
)
