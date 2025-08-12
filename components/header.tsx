"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Sparkles, CircleDot, Zap, Palette, Home, Code, Briefcase, GraduationCap, Mail, User } from "lucide-react"
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
    { name: "Home", href: "#", icon: Home },
    { name: "Technical", href: "#technical", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Experience", href: "#experience", icon: User },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-xl font-bold relative group">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent font-bold text-2xl tracking-wider">
                ANKIT.DEV
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-500 ease-out"></span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex md:items-center md:gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <MagneticButton>
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-500 group flex items-center gap-2 rounded-lg hover:bg-purple-500/10"
                  >
                    <item.icon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                </MagneticButton>
              </motion.div>
            ))}

            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-300 hover:scale-110">
                      {theme === "dark" ? (
                        <Moon className="h-5 w-5 text-purple-400" />
                      ) : theme === "light" ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      ) : theme === "golden" ? (
                        <Sparkles className="h-5 w-5 text-amber-500" />
                      ) : theme === "black" ? (
                        <CircleDot className="h-5 w-5 text-gray-400" />
                      ) : theme === "neon" ? (
                        <Zap className="h-5 w-5 text-fuchsia-500" />
                      ) : (
                        <Palette className="h-5 w-5 text-cyan-500" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-xl border border-purple-500/20 shadow-xl">
                    <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <Moon className="mr-2 h-4 w-4 text-purple-400" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("golden")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                      <span>Golden</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("black")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <CircleDot className="mr-2 h-4 w-4 text-gray-400" />
                      <span>Black</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("neon")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <Zap className="mr-2 h-4 w-4 text-fuchsia-500" />
                      <span>Neon</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("cyberpunk")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                      <Palette className="mr-2 h-4 w-4 text-cyan-500" />
                      <span>Cyberpunk</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div 
            className="flex items-center md:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-300 hover:scale-110">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-purple-400" />
                    ) : theme === "light" ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : theme === "golden" ? (
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    ) : theme === "black" ? (
                      <CircleDot className="h-5 w-5 text-gray-400" />
                    ) : theme === "neon" ? (
                      <Zap className="h-5 w-5 text-fuchsia-500" />
                    ) : (
                      <Palette className="h-5 w-5 text-cyan-500" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-xl border border-purple-500/20 shadow-xl">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <Moon className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("golden")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Golden</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("black")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <CircleDot className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Black</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("neon")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <Zap className="mr-2 h-4 w-4 text-fuchsia-500" />
                    <span>Neon</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("cyberpunk")} className="hover:bg-purple-500/10 focus:bg-purple-500/10">
                    <Palette className="mr-2 h-4 w-4 text-cyan-500" />
                    <span>Cyberpunk</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-300 hover:scale-110"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-30 flex flex-col bg-background/95 backdrop-blur-xl border-t border-purple-500/20 md:hidden"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 p-4 text-xl font-medium transition-all duration-300 hover:text-purple-500 hover:bg-purple-500/10 rounded-xl group"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
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
