"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Html,
  useProgress,
  Preload,
  useGLTF,
} from "@react-three/drei"
import { DownloadIcon, ArrowDownIcon, Linkedin, Github, ExternalLink, MousePointer, Fingerprint } from "lucide-react"
import * as THREE from "three"

// Define proper types
interface ModelProps {
  hovered: boolean;
  clicked: boolean;
  isDark: boolean;
  onModelClick: () => void;
  activeSpot: number;
}

// Spotlight positions and colors configuration
const SPOTLIGHT_POSITIONS: [number, number, number][] = [
  [10, 10, 10],
  [-10, 10, 5],
  [0, 10, -10],
  [10, -5, 5],
]

// Theme-based spotlight colors
const getSpotlightColors = (isDark: boolean) => {
  const baseColors = [
    "#a855f7", // Purple
    "#8b5cf6", // Violet
    "#d946ef", // Fuchsia
    "#c026d3", // Pink
  ]
  
  return isDark
    ? baseColors
    : baseColors.map(color => color.replace('#', 'rgba(') + ', 0.8)')
}

// Loader component for 3D model
function Loader() {
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Html center>
      {mounted && (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mb-2"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-purple-500" role="status">
            {progress.toFixed(0)}% loaded
          </p>
        </div>
      )}
    </Html>
  )
}

// Fallback object with better visual appeal and theme compatibility
function FallbackObject({ hovered, clicked, isDark, onModelClick, activeSpot }: ModelProps) {
  const baseColor = isDark ? "#6D28D9" : "#7C3AED" 
  const hoverColor = isDark ? "#8B5CF6" : "#A78BFA"
  
  return (
    <mesh 
      onClick={(e) => {
        e.stopPropagation()
        onModelClick()
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered && !clicked ? hoverColor : baseColor}
        roughness={0.4}
        metalness={0.9}
        envMapIntensity={isDark ? 2.0 : 1.5}
      />
    </mesh>
  )
}

// Model component with theme integration
function Model({ hovered, clicked, isDark, onModelClick, activeSpot }: ModelProps) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [loadModelError, setLoadModelError] = useState<string | null>(null)
  const MAX_RETRIES = 3
  const modelRef = useRef<THREE.Group>(null)
  const [loading, setLoading] = useState(true)
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
  
  // Enhanced error handling for model loading
  const onError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error("Error loading 3D model:", {
      errorObject: error,
      errorType: typeof error,
      errorMessage,
      errorStack: error instanceof Error ? error.stack : 'Network error or file not found'
    })

    setLoadModelError(errorMessage)
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1)
      setModelLoaded(false)
    } else {
      console.warn(`Failed to load model after ${MAX_RETRIES} retries. Using fallback.`)
    }
  }

  // Debugging: Log the model path and check if files exist
  console.log('Attempting to load model from:', '/models/scene.gltf')
  console.log('Files in models directory:', {
    gltf: window.location.origin + '/models/scene.gltf',
    bin: window.location.origin + '/models/scene.bin'
  })

  useEffect(() => {
    if (!hasAttemptedLoad) {
      const timeout = setTimeout(() => {
        if (!modelLoaded) {
          console.warn('Model loading timed out after 10 seconds')
          setLoadModelError('Model loading timed out')
          setLoading(false)
        }
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [modelLoaded, hasAttemptedLoad])

  const { scene } = useGLTF('/models/scene.gltf', true, undefined, onError)
  
  useEffect(() => {
    if (scene && modelRef.current) {
      console.log('Model loaded successfully', scene)
      
      // Scale down the model to fit the scene
      scene.scale.set(0.5, 0.5, 0.5)
      
      // Center the model
      scene.position.set(0, 0, 0)
      
      // Rotate the model for better viewing
      scene.rotation.y = Math.PI / 4
      
      // Clear any existing content
      modelRef.current.clear()
      
      // Add the model to the scene
      modelRef.current.add(scene)
      setModelLoaded(true)
      setLoading(false)
      setHasAttemptedLoad(true)
    }
  }, [scene])

  if (loadModelError) {
    console.error('Using fallback object due to model loading error:', loadModelError)
    return <FallbackObject {...{ hovered, clicked, isDark, onModelClick, activeSpot }} />
  }

  return (
    <group ref={modelRef} onClick={onModelClick}>
      {loading && <Loader />}
    </group>
  )
}

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
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [activeSpot, setActiveSpot] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // Detect touch device and set appropriate interactions
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  
  const handleModelClick = () => {
    setClicked(!clicked)
    // Cycle through spotlight positions when clicked
    setActiveSpot((prev) => (prev + 1) % SPOTLIGHT_POSITIONS.length)
  }
  
  // Set up touch interactions
  useEffect(() => {
    const element = canvasRef.current
    if (!element || !isTouchDevice) return
    
    const handleTouchStart = () => setHovered(true)
    const handleTouchEnd = () => setHovered(false)
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isTouchDevice])
  
  // Set up mouse interactions
  useEffect(() => {
    const element = canvasRef.current
    if (!element || isTouchDevice) return
    
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice])
  
  // Get theme-specific spotlight colors
  const spotlightColors = getSpotlightColors(isDark)

  return (
    <div 
      ref={canvasRef}
      className="h-[400px] w-full max-w-[500px] rounded-2xl bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40 border border-purple-500/20 backdrop-blur-sm transition-all duration-500 shadow-xl relative group cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.5 : 1.2,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Model 
            hovered={hovered} 
            clicked={clicked} 
            isDark={isDark}
            onModelClick={handleModelClick}
            activeSpot={activeSpot}
          />

          {/* Enhanced lighting setup with theme awareness */}
          <spotLight
            position={SPOTLIGHT_POSITIONS[activeSpot]}
            angle={0.15}
            penumbra={1}
            intensity={clicked ? (isDark ? 2 : 1.5) : (isDark ? 1 : 0.8)}
            castShadow
            color={clicked ? spotlightColors[activeSpot] : (isDark ? "#a855f7" : "#9333ea")}
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={isDark ? 0.5 : 0.3} 
            color={isDark ? "#d946ef" : "#c026d3"} 
          />

          {/* Improved ambient environment */}
          <Environment preset={isDark ? "night" : "sunset"} />
          <ContactShadows
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
            opacity={isDark ? 0.3 : 0.2}
            width={10}
            height={10}
            blur={2}
            far={10}
            color={clicked ? spotlightColors[activeSpot] : "#000000"}
          />

          {/* Enhanced orbit controls optimized for touch */}
          <OrbitControls
            enableZoom={clicked}
            enablePan={clicked}
            enableRotate={clicked}
            autoRotate={!isTouchDevice && clicked}
            autoRotateSpeed={clicked ? 4 : 2}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
            minDistance={4}
            maxDistance={10}
            // Touch settings for mobile
            enableDamping={true}
            dampingFactor={0.1}
            rotateSpeed={isTouchDevice ? 0.7 : 1}
            zoomSpeed={isTouchDevice ? 0.7 : 1}
          />

          <Preload all />
        </Suspense>
      </Canvas>

      {/* Interactive tooltips with improved accessibility */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 dark:bg-black/80 px-4 py-2 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {clicked ? (
          <span>{isTouchDevice ? "Use fingers to rotate and pinch to zoom" : "Use mouse to rotate and zoom"}. Tap to exit.</span>
        ) : (
          <span>{isTouchDevice ? "Tap" : "Click"} to enter interactive mode</span>
        )}
      </div>

      {/* Interaction hint */}
      {hovered && !clicked && (
        <div className="absolute top-4 right-4 text-xs bg-black/80 dark:bg-black/80 px-3 py-1 rounded-full text-white animate-pulse flex items-center gap-1">
          {isTouchDevice ? (
            <>
              <Fingerprint className="h-3 w-3" />
              <span>Try tapping!</span>
            </>
          ) : (
            <>
              <MousePointer className="h-3 w-3" />
              <span>Try clicking!</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Custom Cursor Effect Component
function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="cursor-wrapper">
      <div
        className={`cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`
        }}
      />
    </div>
  )
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

        // Calculate relative position
        const x = (clientX - left - width / 2) / 25
        const y = (clientY - top - height / 2) / 25

        const layers = parallaxRef.current!.querySelectorAll(".parallax-layer")

        layers.forEach((layer, index) => {
          const depth = index + 1
          const translateX = x * depth
          const translateY = y * depth

          layer.setAttribute("style", `transform: translate(${translateX}px, ${translateY}px) scale(1.05) rotate(${x/10}deg)`)
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
      <CustomCursor />
      <style dangerouslySetInnerHTML={{ __html: gridPatternStyles }} />
      
      <section
        ref={targetRef}
        className={`min-h-[90vh] flex items-center py-20 md:py-32 overflow-hidden relative 
                  ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <motion.div
          style={{ y, opacity }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ref={parallaxRef}
        >
          <div className="flex flex-col justify-center parallax">
            <div className="parallax-layer">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-xl font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-2`}>
                  Hello, I'm
                </h2>
                <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <AnimatedText text="Ankit Pal" />
                </h1>
                <h2 className={`text-2xl md:text-3xl font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Python Developer
                  </span>{" "}
                  &{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Web Developer
                  </span>
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-md`}>
                  A skilled web developer with experience leading the AIII community and organizing technical events.
                  Proficient in building innovative web applications and sustainable tech solutions.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4 parallax-layer">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20"
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
                  className={`rounded-full px-8 border-purple-500 ${isDark ? 'text-purple-400 hover:bg-purple-500/10' : 'text-purple-600 hover:bg-purple-500/10'} shadow-lg shadow-purple-500/10`}
                  asChild
                >
                  <a href="/resume.pdf" download>
                    Download CV
                    <DownloadIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </MagneticButton>
            </div>

            <div className="flex gap-4 mt-6 parallax-layer">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center parallax-layer"
          >
            {/* Only render Canvas if component is mounted (prevents SSR issues) */}
            {isMounted && <CanvasSection isDark={isDark} />}
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