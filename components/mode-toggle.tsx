"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme === "dark")

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center gap-2 relative">
      <Sun className="h-[1.2rem] w-[1.2rem] text-[hsl(var(--accent-gold))] dark:text-muted-foreground transition-colors duration-300" />

      <div className="relative">
        <Switch
          checked={isDark}
          onCheckedChange={handleToggle}
          className="bg-[hsl(var(--toggle-bg))] data-[state=checked]:bg-[hsl(var(--toggle-bg))] transition-colors duration-300"
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isDark
              ? "0 0 8px 2px hsla(var(--toggle-thumb-highlight), 0.4)"
              : "none"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <Moon className="h-[1.2rem] w-[1.2rem] text-muted-foreground dark:text-[hsl(var(--electric-cyan))] transition-colors duration-300" />
    </div>
  )
}
