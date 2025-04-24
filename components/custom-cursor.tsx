"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseDown = () => setCursorVariant("click")
    const handleMouseUp = () => setCursorVariant("default")

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorVariant("hover")
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant("default")
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    document.querySelectorAll("a, button, [role='button']").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      document.querySelectorAll("a, button, [role='button']").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(var(--primary-rgb), 0.2)",
      border: "1px solid rgba(var(--primary-rgb), 0.5)",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 20,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(var(--primary-rgb), 0.3)",
      border: "1px solid rgba(var(--primary-rgb), 0.8)",
      mixBlendMode: "difference",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 20,
      },
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 24,
      width: 24,
      backgroundColor: "rgba(var(--primary-rgb), 0.5)",
      border: "1px solid rgba(var(--primary-rgb), 1)",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 20,
      },
    },
  }

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none backdrop-blur-sm mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
    />
  )
}
