"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"
import { skills } from "@/data/skills"

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            My Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Technical Skills" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive collection of technologies and tools I've mastered throughout my career
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skillGroup, groupIndex) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          >
            <Card className="h-full gradient-border overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">{skillGroup.category.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 + groupIndex * 0.1 }}
                    >
                      <Badge className="bg-muted hover:bg-primary/20 text-foreground transition-all duration-300">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
