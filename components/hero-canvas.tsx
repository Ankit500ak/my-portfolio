"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Html,
  useProgress,
  Preload,
  useGLTF,
  Float,
} from "@react-three/drei"
import * as THREE from "three"

interface ModelProps {
  hovered: boolean
  clicked: boolean
  isDark: boolean
  onModelClick: () => void
  activeSpot: number
  externalScale: number
  containerWidth: number
  containerHeight: number
  isBackground?: boolean
}

const SPOTLIGHT_POSITIONS: [number, number, number][] = [
  [12, 10, 10],
  [-12, 10, 6],
  [0, 12, -12],
  [12, -6, 6],
]

const getSpotlightColors = (isDark: boolean) => {
  const baseColors = ["#a855f7", "#8b5cf6", "#d946ef", "#c026d3"]
  return isDark ? baseColors : baseColors.map((color) => color.replace("#", "rgba(") + ", 0.8)")
}

function Loader() {
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

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

type FallbackProps = Pick<ModelProps, 'hovered' | 'clicked' | 'isDark' | 'onModelClick' | 'activeSpot'>
function FallbackObject({ hovered, clicked, isDark, onModelClick, activeSpot }: FallbackProps) {
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

function Model({ hovered, clicked, isDark, onModelClick, activeSpot, externalScale, containerWidth, containerHeight, isBackground = false }: ModelProps) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [loadModelError, setLoadModelError] = useState<string | null>(null)
  const MAX_RETRIES = 3
  const modelRef = useRef<THREE.Group>(null)
  const [loading, setLoading] = useState(true)
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
  const boundingRadiusRef = useRef<number | null>(null)

  const onError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    setLoadModelError(errorMessage)
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1)
      setModelLoaded(false)
    }
  }

  useEffect(() => {
    if (!hasAttemptedLoad) {
      const timeout = setTimeout(() => {
        if (!modelLoaded) {
          setLoadModelError("Model loading timed out")
          setLoading(false)
        }
      }, 10000)
      return () => clearTimeout(timeout)
    }
  }, [modelLoaded, hasAttemptedLoad])

  const { scene } = useGLTF("/models/scene.gltf", true, undefined, onError)

  useEffect(() => {
    if (scene && modelRef.current) {
      // Different scaling and positioning for background vs foreground
      if (isBackground) {
        scene.scale.set(0.8, 0.8, 0.8)
        scene.position.set(0, -0.2, 0)
        scene.rotation.y = Math.PI / 4
      } else {
        scene.scale.set(1.2, 1.2, 1.2)
        scene.position.set(0, -0.1, 0)
        scene.rotation.y = Math.PI / 6
      }
      
      modelRef.current.clear()
      modelRef.current.add(scene)

      // Compute bounding sphere radius for auto-fit scaling
      const box = new THREE.Box3().setFromObject(scene)
      const sphere = box.getBoundingSphere(new THREE.Sphere())
      boundingRadiusRef.current = sphere.radius

      setModelLoaded(true)
      setLoading(false)
      setHasAttemptedLoad(true)
    }
  }, [scene, isBackground])

  // Auto-fit model to container and apply external scale multiplier
  useEffect(() => {
    const radius = boundingRadiusRef.current
    if (!modelRef.current || !radius || containerWidth === 0 || containerHeight === 0) return

    // Different scaling logic for background vs foreground
    const shorterSide = Math.min(containerWidth, containerHeight)
    let desiredDiameter: number
    
    if (isBackground) {
      // Background model should be larger and more prominent
      desiredDiameter = shorterSide * 2.2
    } else {
      // Foreground model uses standard scaling
      desiredDiameter = shorterSide * 1.3
    }
    
    const fitScale = desiredDiameter / (2 * radius)
    const finalScale = fitScale * externalScale
    modelRef.current.scale.set(finalScale, finalScale, finalScale)
  }, [externalScale, containerWidth, containerHeight, isBackground])

  if (loadModelError) {
    return <FallbackObject {...{ hovered, clicked, isDark, onModelClick, activeSpot }} />
  }

  return (
    <group ref={modelRef} onClick={isBackground ? undefined : onModelClick}>
      {loading && <Loader />}
    </group>
  )
}

export default function HeroCanvas({ isDark }: { isDark: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [activeSpot, setActiveSpot] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [modelScale, setModelScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 5.5 : 6.0
    }
    return 6.0
  })
  const [backgroundScale, setBackgroundScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 5.5 : 1.0
    }
    return 1.0
  })
  const pinchStateRef = useRef<{ startDistance: number | null; baseScale: number }>({ startDistance: null, baseScale: 1 })
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Observe container size to auto-fit model
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }

    update()
    const RO = (window as any).ResizeObserver
    const ro = RO ? new RO(() => update()) : null
    if (ro) ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element || !isTouchDevice) return
    const handleTouchStart = () => setHovered(true)
    const handleTouchEnd = () => setHovered(false)
    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isTouchDevice])

  useEffect(() => {
    const element = containerRef.current
    if (!element || isTouchDevice) return
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isTouchDevice])

  const handleModelClick = () => {
    setClicked((prev) => !prev)
    setActiveSpot((prev) => (prev + 1) % SPOTLIGHT_POSITIONS.length)
  }

  const spotlightColors = getSpotlightColors(isDark)

  // Enhanced zoom behavior - for both mobile and desktop
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!hovered) return
    e.preventDefault()
    const zoomOut = e.deltaY > 0
    
    if (isMobile) {
      // Zoom the background model on mobile
      const minScale = 3.0
      const maxScale = 8.0
      setBackgroundScale((prev) => clamp(prev * (zoomOut ? 0.95 : 1.05), minScale, maxScale))
    } else {
      // Zoom the foreground model on desktop
      const minScale = 0.8
      const maxScale = 5.0
      setModelScale((prev) => clamp(prev * (zoomOut ? 0.95 : 1.05), minScale, maxScale))
    }
  }

  // Touch pinch - for both mobile and desktop
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const getDistance = (touches: TouchList) => {
      const [a, b] = [touches[0], touches[1]]
      const dx = a.clientX - b.clientX
      const dy = a.clientY - b.clientY
      return Math.hypot(dx, dy)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchStateRef.current.startDistance = getDistance(e.touches)
        if (isMobile) {
          pinchStateRef.current.baseScale = backgroundScale
        } else {
          pinchStateRef.current.baseScale = modelScale
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStateRef.current.startDistance) {
        e.preventDefault()
        const newDistance = getDistance(e.touches)
        const factor = newDistance / pinchStateRef.current.startDistance
        
        if (isMobile) {
          // Zoom background model on mobile
          const minScale = 3.0
          const maxScale = 8.0
          setBackgroundScale(clamp(pinchStateRef.current.baseScale * factor, minScale, maxScale))
        } else {
          // Zoom foreground model on desktop
          const minScale = 0.8
          const maxScale = 4.0
          setModelScale(clamp(pinchStateRef.current.baseScale * factor, minScale, maxScale))
        }
      }
    }

    const onTouchEnd = () => {
      pinchStateRef.current.startDistance = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [modelScale, backgroundScale, isMobile])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] md:h-[75vh] lg:h-[85vh] cursor-pointer"
      onWheel={handleWheel}
    >
      <Canvas
        camera={{ position: [isMobile ? 0.3 : 0.7, isMobile ? 0.05 : 0.3, isMobile ? 3.2 : 4.8], fov: isMobile ? 70 : 62 }}
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
          <ambientLight intensity={isDark ? 0.18 : 0.12} />
          <hemisphereLight color={isDark ? 0x6666ff : 0xffffff} groundColor={isDark ? 0x0a0a20 : 0x222222} intensity={0.2} />
          
          {/* Mobile Background Model - Interactive like desktop */}
          {isMobile && (
            <group position={[0, -0.2, -1.5]}>
              <Model
                hovered={hovered}
                clicked={clicked}
                isDark={isDark}
                onModelClick={handleModelClick}
                activeSpot={activeSpot}
                externalScale={backgroundScale}
                containerWidth={containerSize.width}
                containerHeight={containerSize.height}
                isBackground={true}
              />
            </group>
          )}
          
          {/* Desktop Foreground Model - Interactive */}
          {!isMobile && (
            <Model
              hovered={hovered}
              clicked={clicked}
              isDark={isDark}
              onModelClick={handleModelClick}
              activeSpot={activeSpot}
              externalScale={modelScale * 1.2}
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
            />
          )}
          
          <spotLight
            position={SPOTLIGHT_POSITIONS[activeSpot]}
            angle={0.15}
            penumbra={1}
            intensity={clicked ? (isDark ? 2 : 1.5) : isDark ? 1 : 0.8}
            castShadow
            color={clicked ? spotlightColors[activeSpot] : isDark ? "#a855f7" : "#9333ea"}
          />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.6 : 0.35} color={isDark ? "#d946ef" : "#c026d3"} />
          
          <ContactShadows
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
            opacity={isMobile ? 0.35 : 0}
            width={isMobile ? 25 : 15}
            height={isMobile ? 25 : 15}
            blur={isMobile ? 4.0 : 2}
            far={isMobile ? 16 : 12}
          />
          
          {/* OrbitControls for both mobile and desktop */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 0.8 : 1.8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={(Math.PI * 5) / 6}
            minDistance={2.0}
            maxDistance={9}
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={isTouchDevice ? 1.2 : 1}
            zoomSpeed={isTouchDevice ? 0.6 : 1}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
          />
          <Preload all />
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset={isDark ? "night" : "sunset"} />
        </Suspense>
      </Canvas>

      <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 dark:bg-black/80 px-4 py-2 rounded-full text-xs text-white transition-opacity duration-300 pointer-events-none ${hovered ? 'opacity-100' : 'opacity-0'}` }>
        {clicked ? (
          <span>{isTouchDevice ? "Use fingers to rotate and pinch to zoom" : "Use mouse to rotate and zoom"}. Tap to exit.</span>
        ) : (
          <span>{isTouchDevice ? "Tap" : "Click"} to enter interactive mode</span>
        )}
      </div>
    </div>
  )
}


