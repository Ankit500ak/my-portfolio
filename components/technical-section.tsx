"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"

const technicalData = {
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
      color: "from-blue-500 to-cyan-500",
      icon: "⚛️"
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "Django", "Flask", "Express", "GraphQL"],
      color: "from-green-500 to-emerald-500",
      icon: "🔧"
    },
    {
      category: "Full Stack",
      items: ["MERN Stack", "Next.js Full Stack", "API Design", "Database Design", "Authentication", "Deployment"],
      color: "from-indigo-500 to-blue-500",
      icon: "🌐"
    },
    {
      category: "Python Developer",
      items: ["Python", "Django", "Flask", "FastAPI", "Pandas", "NumPy", "Scikit-learn"],
      color: "from-yellow-500 to-orange-500",
      icon: "🐍"
    },
    {
      category: "AI & Data",
      items: ["Machine Learning", "AI Integration", "NLP", "Gemini API", "TensorFlow"],
      color: "from-purple-500 to-pink-500",
      icon: "🤖"
    },
    {
      category: "DevOps",
      items: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "PostgreSQL"],
      color: "from-orange-500 to-red-500",
      icon: "🚀"
    }
  ],
  expertise: [
    { title: "Architecture", level: 95, color: "from-indigo-500 to-purple-500" },
    { title: "Performance", level: 88, color: "from-green-500 to-teal-500" },
    { title: "Security", level: 92, color: "from-red-500 to-pink-500" },
    { title: "Innovation", level: 96, color: "from-yellow-500 to-orange-500" }
  ]
}

export default function TechnicalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-medium text-primary">Technical Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            <AnimatedText text="Tech Mastery" />
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Crafting digital experiences with cutting-edge technologies
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
            Tech Arsenal
          </h3>
          <p className="text-muted-foreground">Technologies that power innovation</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {[
            "React", "Next.js", "TypeScript", "Python", "Node.js", "Django",
            "Flask", "FastAPI", "GraphQL", "PostgreSQL", "MongoDB", "Docker",
            "AWS", "Pandas", "NumPy", "Scikit-learn", "Express", "Vercel"
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
                  {tech === "Python" && "🐍"}
                  {tech === "Node.js" && "🟢"}
                  {tech === "Django" && "🎯"}
                  {tech === "Flask" && "🍶"}
                  {tech === "FastAPI" && "⚡"}
                  {tech === "GraphQL" && "🔷"}
                  {tech === "PostgreSQL" && "🐘"}
                  {tech === "MongoDB" && "🍃"}
                  {tech === "Docker" && "🐳"}
                  {tech === "AWS" && "☁️"}
                  {tech === "Pandas" && "🐼"}
                  {tech === "NumPy" && "🔢"}
                  {tech === "Scikit-learn" && "🧠"}
                  {tech === "Express" && "🚂"}
                  {tech === "Vercel" && "▲"}
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
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          ⚡
        </div>
      </motion.div>
    </section>
  )
}
