"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default function HeroCanvas({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Camera setup - proper 3D perspective
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1, // Near plane
      1000 // Far plane
    )
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup with proper 3D settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff, 0)
    renderer.shadowMap.enabled = false
    renderer.outputColorSpace = THREE.SRGBColorSpace
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Light theme lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xfff7ed, 0.6)
    directionalLight2.position.set(-5, -5, 5)
    scene.add(directionalLight2)

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 5, 5)
    scene.add(pointLight)

    // Load 3D model with proper error handling
    const loader = new GLTFLoader()
    loader.load(
      '/models/scene.gltf',
      (gltf) => {
        const model = gltf.scene
        
        // Ensure all meshes are visible
        model.traverse((child) => {
          if (child.type === 'Mesh') {
            child.visible = true
          }
        })

        // Proper model scaling and positioning
        model.scale.setScalar(2.0)
        
        // Center the model properly
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        
        // Position for optimal 3D viewing
        model.position.set(0, 0, 0)
        
        // Set up animations properly
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model)
          mixerRef.current = mixer
          
          // Play all animations with proper settings
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopRepeat, Infinity)
            action.clampWhenFinished = false
            action.play()
            
            // Log animation details
            console.log(`🎬 Playing animation: ${clip.name}`)
            console.log(`  ⏱️ Duration: ${clip.duration}s`)
            console.log(`  📍 Tracks: ${clip.tracks.length}`)
          })
          
          console.log(`🎬 Loaded ${gltf.animations.length} animations - Spin animations will play automatically!`)
        }
        
        // Add model to scene
        scene.add(model)
        modelRef.current = model
        
        // Log model info for debugging
        console.log('📦 Model loaded successfully')
        console.log('📍 Position:', model.position)
        console.log('🎯 Scale:', model.scale)
        console.log('🔍 Bounding box:', box.min, 'to', box.max)
        
        setIsLoading(false)
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0)
        console.log(`📥 Loading: ${percent}%`)
      },
      (error) => {
        console.error('❌ Error loading 3D model:', error)
        setIsLoading(false)
      }
    )

    // Animation loop - GLTF handles spinning automatically
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Update GLTF animations with proper timing
      if (mixerRef.current) {
        const deltaTime = clockRef.current.getDelta()
        mixerRef.current.update(deltaTime)
      }
      
      // GLTF animations handle all spinning automatically
      
      // Render the scene
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize properly
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
      }
      
      renderer?.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] md:h-[75vh] lg:h-[85vh]"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 dark:bg-black/20">
          <div className="text-white text-lg">Loading 3D Model...</div>
        </div>
      )}
    </div>
  )
}


