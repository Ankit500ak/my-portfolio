"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"
import { GraduationCap, BookOpen } from "lucide-react"

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const education = [
    {
      id: 1,
      institution: "Dronacharya College of Engineering",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      period: "2022 - 2026",
      percentage: "Ongoing",
      icon: GraduationCap,
      color: "primary",
    },
    {
      id: 2,
      institution: "Euro International School",
      degree: "Higher Secondary Education",
      field: "",
      period: "2021 - 2022",
      percentage: "77%",
      icon: BookOpen,
      color: "secondary",
    },
    {
      id: 3,
      institution: "Atul Katarya Memorial School",
      degree: "Secondary Education",
      field: "",
      period: "2019 - 2020",
      percentage: "86%",
      icon: BookOpen,
      color: "accent",
    },
  ]

  return (
    <section id="education" className="py-20" ref={ref}>
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            My Education
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Academic Background" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My educational journey and academic achievements
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative space-y-8">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative pl-14"
            >
              <div
                className={`absolute left-0 top-0 h-12 w-12 rounded-full bg-${item.color}/20 flex items-center justify-center border border-${item.color}/30`}
              >
                <item.icon className={`h-5 w-5 text-${item.color}`} />
              </div>
              <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-1 flex justify-between items-center">
                    <h4 className="text-xl font-bold">{item.institution}</h4>
                    <Badge variant="outline" className="bg-muted/50">
                      {item.period}
                    </Badge>
                  </div>
                  <p className="text-primary mb-2">
                    {item.degree} {item.field && `in ${item.field}`}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="text-sm text-muted-foreground">Performance:</div>
                    <Badge className="ml-2 bg-primary/20 text-primary">{item.percentage}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
