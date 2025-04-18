"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameActive) {
        setPosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [gameActive])

  const startGame = () => {
    setGameActive(true)
    setScore(0)

    // Create targets
    const createTarget = () => {
      if (!gameActive) return

      const target = document.createElement("div")
      target.className =
        "absolute w-8 h-8 bg-[hsl(var(--electric-cyan))] rounded-full cursor-pointer transition-transform"
      target.style.left = `${Math.random() * (window.innerWidth - 50)}px`
      target.style.top = `${Math.random() * (window.innerHeight - 50)}px`

      target.addEventListener("click", () => {
        setScore((prev) => prev + 1)
        target.remove()
      })

      document.getElementById("game-container")?.appendChild(target)

      // Remove target after 2 seconds
      setTimeout(() => {
        if (target.parentNode) {
          target.remove()
        }
      }, 2000)
    }

    // Create targets every second
    const interval = setInterval(createTarget, 1000)

    // End game after 30 seconds
    setTimeout(() => {
      setGameActive(false)
      clearInterval(interval)
    }, 30000)

    return () => clearInterval(interval)
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden"
      id="game-container"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid404" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid404)" />
        </svg>
      </div>

      {/* Cursor trail when game is active */}
      {gameActive && (
        <motion.div
          className="w-6 h-6 rounded-full bg-[hsl(var(--electric-cyan))] absolute pointer-events-none z-50"
          style={{ left: position.x - 12, top: position.y - 12 }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <div className="container max-w-md text-center z-10">
        <motion.h1
          className="text-9xl font-bold mb-4 text-[hsl(var(--electric-cyan))]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-3xl font-semibold mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {gameActive ? (
          <div className="mb-8">
            <div className="text-2xl font-bold mb-4">Score: {score}</div>
            <p className="text-sm text-muted-foreground">Click the circles before they disappear!</p>
          </div>
        ) : (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-4">While you're here, want to play a quick game?</p>
            <Button
              onClick={startGame}
              className="mb-8 bg-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))/90] text-[hsl(var(--deep-blue))]"
            >
              Start Mini-Game
            </Button>
          </motion.div>
        )}

        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="bg-[hsl(var(--deep-blue))] hover:bg-[hsl(var(--deep-blue))/90] text-white">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
