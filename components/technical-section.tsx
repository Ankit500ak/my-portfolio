"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"

const technicalData = {
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      color: "from-blue-500 to-cyan-500",
      icon: "⚛️"
    },
    {
      category: "UI / UX",
      items: ["Design Systems", "Accessibility (a11y)", "Responsive Design", "Animations", "Micro-interactions", "Theming"],
      color: "from-purple-500 to-pink-500",
      icon: "🎨"
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "REST", "GraphQL", "WebSockets"],
      color: "from-teal-500 to-emerald-500",
      icon: "🔧"
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
      color: "from-orange-500 to-amber-500",
      icon: "🗄️"
    },
    {
      category: "Deployment",
      items: ["Vercel", "Docker", "CI/CD", "AWS"],
      color: "from-yellow-500 to-orange-500",
      icon: "🚀"
    },
    {
      category: "Tooling",
      items: ["Vite", "Webpack", "ESLint", "Prettier", "Storybook"],
      color: "from-green-500 to-emerald-500",
      icon: "🛠️"
    }
  ],
  expertise: [
    { title: "Performance", level: 95, color: "from-green-500 to-teal-500" },
    { title: "Accessibility", level: 92, color: "from-indigo-500 to-purple-500" },
    { title: "Animations", level: 90, color: "from-pink-500 to-rose-500" },
    { title: "Code Quality", level: 93, color: "from-blue-500 to-cyan-500" },
    
  ]
}

export default function TechnicalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!isChatOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsChatOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isChatOpen])

  return (
    <section id="technical" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-32 left-20 text-4xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚡
        </motion.div>
        <motion.div 
          className="absolute top-40 right-32 text-3xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🔮
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-32 text-3xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          💎
        </motion.div>
        <motion.div 
          className="absolute bottom-40 right-20 text-4xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🌟
        </motion.div>
      </div>

      {/* Header */}
      <div className="mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-medium text-primary">Frontend Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            <AnimatedText text="Frontend Mastery" />
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building fast, accessible, and beautiful web interfaces
          </p>
        </motion.div>
      </div>

      {/* Skills Grid */}
      <div className="mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {technicalData.skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <Card className="h-full group hover:scale-105 transition-all duration-500 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>

                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-center mb-4 group-hover:text-primary transition-colors duration-300">
                    {skill.category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skill.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + itemIndex * 0.05 }}
                      >
                        <Badge className="bg-muted/50 hover:bg-primary/20 text-foreground transition-all duration-300 hover:scale-105">
                          {item}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise Visualization */}
      <div className="mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Expertise Levels
          </h3>
          <p className="text-muted-foreground">Mastery across key technical domains</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {technicalData.expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{item.title}</span>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {item.level}%
                </span>
              </div>
              
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.7 + index * 0.2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Tech Stack */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Frontend Stack
          </h3>
          <p className="text-muted-foreground">Tools I use daily</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {[
            "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
            "Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "Redis",
            "Vercel", "Docker", "CI/CD", "AWS",
            "Radix UI", "shadcn/ui", "Vite", "Storybook", "ESLint", "Prettier"
          ].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="group"
            >
              <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-muted/50 to-muted hover:from-primary/10 hover:to-secondary/10">
                <motion.div 
                  className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                {tech === "React" && "⚛️"}
                {tech === "Next.js" && "▲"}
                {tech === "TypeScript" && "📘"}
                {tech === "Tailwind CSS" && "🌬️"}
                {tech === "Framer Motion" && "🎞️"}
                {tech === "Three.js" && "🧊"}
                {tech === "Node.js" && "🟢"}
                {tech === "Express" && "🚂"}
                {tech === "PostgreSQL" && "🐘"}
                {tech === "MongoDB" && "🍃"}
                {tech === "Prisma" && "🔷"}
                {tech === "Redis" && "🧠"}
                {tech === "Vercel" && "▲"}
                {tech === "Docker" && "🐳"}
                {tech === "CI/CD" && "🔁"}
                {tech === "AWS" && "☁️"}
                {tech === "Radix UI" && "🧩"}
                {tech === "shadcn/ui" && "✨"}
                {tech === "Vite" && "⚡"}
                {tech === "Storybook" && "📖"}
                {tech === "ESLint" && "🧹"}
                {tech === "Prettier" && "✨"}
                </motion.div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {tech}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          type="button"
          aria-label="Open chat"
          onClick={() => setIsChatOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60"
        >
          ⚡
        </button>
      </motion.div>

      {isChatOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsChatOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-0 sm:inset-auto sm:bottom-6 sm:right-6 ${isExpanded ? "sm:max-w-[900px] sm:h-[90vh]" : "sm:max-w-[420px] sm:h-[80vh]"} sm:w-[92vw] w-full h-full bg-background border border-border rounded-none sm:rounded-xl overflow-hidden shadow-2xl`}
          >
            <div className="flex h-full flex-col">
              <div className="relative z-10 flex items-center justify-between px-3 py-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <div>
                    <p className="text-sm font-semibold leading-none">Assistant</p>
                    <p className="text-xs text-muted-foreground">Ask me anything</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    onClick={() => setIsExpanded(v => !v)}
                    className="rounded-md px-2 py-1 text-xs border border-border bg-muted/50 hover:bg-muted transition"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                  <button
                    type="button"
                    aria-label="Close chat"
                    onClick={() => setIsChatOpen(false)}
                    className="rounded-md px-2 py-1 text-xs border border-border bg-muted/50 hover:bg-muted transition"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                <iframe
                  title="Thinkstack AI Chat"
                  src="https://app.thinkstack.ai/bot/index.html?chatbot_id=689b7c8c5db129ec5b2bf80f&type=inline"
                  loading="lazy"
                  frameBorder={0}
                  className="absolute inset-0 w-full h-full bg-background"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
