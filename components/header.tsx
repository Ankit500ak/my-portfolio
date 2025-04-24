"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Sparkles, CircleDot, Zap, Palette } from "lucide-react"
import MagneticButton from "@/components/magnetic-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-border/50" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold relative group">
            <span className="text-gradient font-bold text-2xl">ANKIT.DEV</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <MagneticButton key={item.name}>
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </MagneticButton>
            ))}

            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 rounded-full bg-muted/50 hover:bg-muted">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : theme === "light" ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : theme === "golden" ? (
                      <Sparkles className="h-5 w-5 text-amber-400" />
                    ) : theme === "black" ? (
                      <CircleDot className="h-5 w-5" />
                    ) : theme === "neon" ? (
                      <Zap className="h-5 w-5 text-fuchsia-400" />
                    ) : (
                      <Palette className="h-5 w-5 text-cyan-400" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4 text-yellow-400" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4 text-primary" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("golden")}>
                    <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                    <span>Golden</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("black")}>
                    <CircleDot className="mr-2 h-4 w-4" />
                    <span>Black</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("neon")}>
                    <Zap className="mr-2 h-4 w-4 text-fuchsia-400" />
                    <span>Neon</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
                    <Palette className="mr-2 h-4 w-4 text-cyan-400" />
                    <span>Cyberpunk</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 rounded-full bg-muted/50">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : theme === "light" ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : theme === "golden" ? (
                      <Sparkles className="h-5 w-5 text-amber-400" />
                    ) : theme === "black" ? (
                      <CircleDot className="h-5 w-5" />
                    ) : theme === "neon" ? (
                      <Zap className="h-5 w-5 text-fuchsia-400" />
                    ) : (
                      <Palette className="h-5 w-5 text-cyan-400" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4 text-yellow-400" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4 text-primary" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("golden")}>
                    <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                    <span>Golden</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("black")}>
                    <CircleDot className="mr-2 h-4 w-4" />
                    <span>Black</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("neon")}>
                    <Zap className="mr-2 h-4 w-4 text-fuchsia-400" />
                    <span>Neon</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
                    <Palette className="mr-2 h-4 w-4 text-cyan-400" />
                    <span>Cyberpunk</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full bg-muted/50">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 flex flex-col bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-2xl font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
