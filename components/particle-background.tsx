"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Adjust particle count based on theme
      const baseCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)
      const particleCount = theme === "light" ? baseCount * 0.7 : theme === "black" ? baseCount * 1.5 : baseCount

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get primary color from CSS variables
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()
      const primaryRgb = getComputedStyle(document.documentElement).getPropertyValue("--primary-rgb").trim()

      // Parse the HSL values
      const [h, s, l] = primaryColor.split(" ").map((val) => Number.parseFloat(val.replace("%", "")))

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle - use RGB for light theme, HSL for others
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Use RGB or HSL based on available values
        if (primaryRgb) {
          ctx.fillStyle = `rgba(${primaryRgb}, ${particle.opacity})`
        } else {
          ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${particle.opacity})`
        }

        ctx.fill()

        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()

            if (primaryRgb) {
              ctx.strokeStyle = `rgba(${primaryRgb}, ${0.1 * (1 - distance / 100)})`
            } else {
              ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${0.1 * (1 - distance / 100)})`
            }

            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, isClient])

  // Don't render anything until client-side
  if (!isClient) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${
        theme === "light" ? "opacity-30" : theme === "black" ? "opacity-90" : "opacity-70"
      }`}
    />
  )
}
