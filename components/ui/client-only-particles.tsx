"use client"

import { useEffect, useState } from "react"

interface ParticleProps {
  count: number
}

export function ClientOnlyParticles({ count }: ParticleProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  )
}
