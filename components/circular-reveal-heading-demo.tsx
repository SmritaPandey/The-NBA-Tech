"use client"

import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading"

// Items for the circular reveal heading
const items = [
  {
    text: "SECURITY",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    text: "INNOVATION",
    image: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    text: "SOLUTIONS",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop"
  },
  {
    text: "EXCELLENCE",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
  }
]

export function MediumCircularRevealHeadingDemo() {
  return (
    <div className="p-16 min-h-screen flex items-center justify-center">
      <CircularRevealHeading
        items={items}
        centerText={
          <div className="text-xl font-bold text-[hsl(var(--deep-blue))] dark:text-[hsl(var(--electric-cyan))]">
            NBA TECH
          </div>
        }
        size="md"
      />
    </div>
  )
}

export function LargeCircularRevealHeadingDemo() {
  return (
    <div className="p-16 min-h-screen flex items-center justify-center">
      <CircularRevealHeading
        items={items}
        centerText={
          <div className="text-2xl font-bold text-[hsl(var(--deep-blue))] dark:text-[hsl(var(--electric-cyan))]">
            NBA TECH
          </div>
        }
        size="lg"
      />
    </div>
  )
}

export function SmallCircularRevealHeadingDemo() {
  return (
    <div className="p-16 min-h-screen flex items-center justify-center">
      <CircularRevealHeading
        items={items}
        centerText={
          <div className="text-sm font-bold text-[hsl(var(--deep-blue))] dark:text-[hsl(var(--electric-cyan))]">
            NBA TECH
          </div>
        }
        size="sm"
      />
    </div>
  )
}
