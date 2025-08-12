"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { DownloadIcon, ArrowDownIcon, Linkedin, Github, ExternalLink } from "lucide-react"

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false })

// 3D Canvas is dynamically imported with SSR disabled to avoid server-side evaluation

// Animated text component
function AnimatedText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: index * 0.05,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Magnetic button component with improved touch support
function MagneticButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || isTouchDevice) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative"
    >
      <motion.div
        animate={{
          x: isTouchDevice ? 0 : position.x,
          y: isTouchDevice ? 0 : position.y,
          scale: isHovered ? 1.05 : 1,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Helper functions for deterministic random values
const seedRandom = (seed: number) => {
  return Math.sin(seed) * 10000
}

const getParticleStyle = (index: number) => {
  const seed = index * 100
  const random = () => (seedRandom(seed) * 100) / 100
  
  return {
    width: `${random() * 10 + 5}px`,
    height: `${random() * 10 + 5}px`,
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    animation: `float ${random() * 10 + 10}s linear infinite`,
    opacity: `${random() * 0.5 + 0.2}`,
  }
}

// Custom Canvas Section with improved mobile support
function CanvasSection({ isDark }: { isDark: boolean }) {
  return <HeroCanvas isDark={isDark} />
}


// Add custom CSS for grid patterns
const gridPatternStyles = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(128, 90, 213, 0.2) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(128, 90, 213, 0.2) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .bg-grid-small-pattern {
    background-image: linear-gradient(to right, rgba(128, 90, 213, 0.2) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(128, 90, 213, 0.2) 1px, transparent 1px);
    background-size: 12px 12px;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  /* Mobile-friendly animation adjustments */
  @media (max-width: 768px) {
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  }
`

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Listen for theme changes and handle mobile detection
  useEffect(() => {
    setIsMounted(true)
    
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Get initial theme
    const getTheme = () => {
      const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      setIsDark(theme === 'dark')
    }
    
    getTheme()
    
    // Setup theme change listener
    const handleThemeChange = () => {
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      setIsDark(theme === 'dark')
    }
    
    // Try different methods to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme') {
          handleThemeChange()
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    
    // Listen for storage changes (in case theme is changed in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark')
      }
    })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('storage', () => {})
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Parallax effect for mouse movement with optimized performance
  const parallaxRef = useRef<HTMLDivElement>(null)
  const mouseMoveTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // Skip parallax on mobile for better performance
    if (isMobile) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return

      // Clear existing timer
      if (mouseMoveTimerRef.current) {
        window.clearTimeout(mouseMoveTimerRef.current)
      }

      // Debounce the effect for performance
      mouseMoveTimerRef.current = window.setTimeout(() => {
        const { clientX, clientY } = e
        const { width, height, left, top } = parallaxRef.current!.getBoundingClientRect()

        // Calculate relative position with reduced intensity for laptop
        const isLaptop = window.innerWidth >= 1024 && window.innerWidth < 1440
        const intensity = isLaptop ? 0.3 : 0.6 // Reduce intensity for laptop
        const x = (clientX - left - width / 2) / (25 / intensity)
        const y = (clientY - top - height / 2) / (25 / intensity)

        const layers = parallaxRef.current!.querySelectorAll(".parallax-layer")

        layers.forEach((layer, index) => {
          const depth = index + 1
          const translateX = x * depth * intensity
          const translateY = y * depth * intensity
          const rotation = isLaptop ? x / 20 : x / 10 // Reduced rotation for laptop

          layer.setAttribute("style", `transform: translate(${translateX}px, ${translateY}px) scale(1.02) rotate(${rotation}deg)`)
        })
      }, 10)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (mouseMoveTimerRef.current) {
        window.clearTimeout(mouseMoveTimerRef.current)
      }
    }
  }, [isMobile])

  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: gridPatternStyles }} />
      
      <section
        ref={targetRef}
        className={`min-h-[95vh] flex items-center md:items-start pt-8 md:pt-0 pb-20 md:pb-32 overflow-hidden relative 
                  ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}
      >
        {/* Background 3D model on mobile only */}
        <div className="absolute inset-0 z-0 md:hidden">
          {isMounted && <CanvasSection isDark={isDark} />}
        </div>
        {/* Contrast overlay for mobile readability */}
        <div className="absolute inset-0 md:hidden z-0 bg-black/30" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        
        <motion.div
          style={{ y, opacity }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 w-full px-4 sm:px-6 lg:px-8"
          ref={parallaxRef}
        >
          <div className="flex flex-col justify-center parallax z-10 text-center md:text-left px-4 sm:px-6 md:pl-6 md:pr-0 lg:pl-8 md:-mt-10 lg:-mt-24 xl:-mt-32">
            <div className="parallax-layer">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-xl font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-2 md:mt-8 lg:mt-12`}>
                  Hello, I'm
                </h2>
                <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <AnimatedText text="Ankit Pal" />
                </h1>
                <h2 className={`text-xl md:text-3xl font-medium leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Python Developer
                  </span>{" "}
                  &{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Web Developer
                  </span>
                </h2>
                <p className={`text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-md mx-auto md:mx-0`}>
                  A skilled web developer with experience leading the AIII community and organizing technical events.
                  Proficient in building innovative web applications and sustainable tech solutions.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 parallax-layer">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20 w-full sm:w-auto justify-center"
                  asChild
                >
                  <a href="#projects">
                    View Projects
                    <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className={`rounded-full px-8 border-purple-500 ${isDark ? 'text-purple-400 hover:bg-purple-500/10' : 'text-purple-600 hover:bg-purple-500/10'} shadow-lg shadow-purple-500/10 w-full sm:w-auto justify-center`}
                  asChild
                >
                  <a href="/ankitresume.pdf-1.pdf" download="Ankit_Resume.pdf">
                    Download CV
                    <DownloadIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </MagneticButton>
            </div>

            <div className="flex gap-4 mt-6 parallax-layer justify-center md:justify-start">
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-10 w-10 border-purple-500/30 ${isDark ? 'text-purple-400 hover:bg-purple-500/10' : 'text-purple-600 hover:bg-purple-500/10'} shadow-lg shadow-purple-500/5`}
                  asChild
                >
                  <a
                    href="https://github.com/Ankit500ak"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-10 w-10 border-purple-500/30 ${isDark ? 'text-purple-400 hover:bg-purple-500/10' : 'text-purple-600 hover:bg-purple-500/10'} shadow-lg shadow-purple-500/5`}
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/ankit-pal-1572542a8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-10 w-10 border-purple-500/30 ${isDark ? 'text-purple-400 hover:bg-purple-500/10' : 'text-purple-600 hover:bg-purple-500/10'} shadow-lg shadow-purple-500/5`}
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Right column 3D model on md+ */}
          <motion.div
            className="parallax-layer relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hidden md:flex items-center justify-end">
              <div className="w-full md:translate-x-4 lg:translate-x-8">
                {isMounted && <CanvasSection isDark={isDark} />}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Particle effect background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'}`}
              style={getParticleStyle(i)}
            />
          ))}
        </div>

        {/* Social links */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <ArrowDownIcon className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        </div>
      </section>
    </div>
  )
}