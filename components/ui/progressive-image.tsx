"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ProgressiveImageProps {
  src: string
  alt: string
  className?: string
  placeholderColor?: string
  aspectRatio?: string
  objectPosition?: string
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholderColor = "hsl(var(--muted))",
  aspectRatio = "16/9",
  objectPosition = "center",
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false)
    setIsError(false)

    const img = new Image()
    img.src = src

    img.onload = () => {
      setIsLoaded(true)
    }

    img.onerror = () => {
      setIsError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder */}
      <div
        className="absolute inset-0 bg-muted"
        style={{
          backgroundColor: placeholderColor,
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Failed to load image
          </div>
        )}
      </div>

      {/* Actual image */}
      {!isError && (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
}
