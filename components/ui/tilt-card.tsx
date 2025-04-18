"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  glareAmount?: number
  perspective?: number
  onClick?: () => void
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareAmount = 0.5,
  perspective = 1000,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate tilt based on mouse position relative to card center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Normalize values (-1 to 1)
    const normalizedX = mouseX / (rect.width / 2)
    const normalizedY = mouseY / (rect.height / 2)

    // Apply tilt (reversed for natural feel)
    setTilt({
      x: -normalizedY * tiltAmount,
      y: normalizedX * tiltAmount,
    })

    // Update glare position
    setGlarePosition({
      x: (e.clientX - rect.left) / rect.width * 100,
      y: (e.clientY - rect.top) / rect.height * 100,
    })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}

      {/* Glare effect */}
      {glareAmount > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareAmount}), transparent 50%)`
              : "none",
            mixBlendMode: "overlay",
            transition: "opacity 0.3s ease",
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  )
}
