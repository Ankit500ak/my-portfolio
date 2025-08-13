"use client"

import { useEffect } from "react"

export default function ThinkstackLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const existing = document.getElementById("thinkstackai-loader-script")
    if (existing) return

    const script = document.createElement("script")
    script.id = "thinkstackai-loader-script"
    script.src = "https://app.thinkstack.ai/bot/thinkstackai-loader.min.js"
    script.async = true
    script.setAttribute("chatbot_id", "689b7c8c5db129ec5b2bf80f")
    script.setAttribute("data-type", "default")
    document.body.appendChild(script)

    // Expose a resilient global opener
    ;(window as any).openThinkstackChat = () => {
      const w = window as any
      if (w.ThinkStackAI?.openChat) {
        try { w.ThinkStackAI.openChat() } catch {}
        return
      }
      if (w.thinkstack?.open) {
        try { w.thinkstack.open() } catch {}
        return
      }
      // Fallback: try clicking a launcher element if it exists
      const launcher = document.querySelector('[data-thinkstack-launcher], .thinkstack-launcher, #thinkstack-launcher') as HTMLElement | null
      if (launcher) {
        launcher.click()
      }
    }
  }, [])

  return null
}


