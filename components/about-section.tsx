"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"
import AnimatedText from "@/components/animated-text"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const experiences = [
    {
      id: 1,
      title: "Internship at E2 Solutions",
      company: "E2 Solutions",
      period: "06/2024 - 07/2024",
      description:
        "Designed, developed, and deployed multiple web-based projects, ensuring user-friendly and responsive interfaces.",
      icon: Briefcase,
      color: "primary",
    },
    {
      id: 2,
      title: "ACM-AIII Community Leader",
      company: "AIII Community",
      period: "Ongoing",
      description:
        "Leading the AIII community and organizing various technical events to promote learning and collaboration.",
      icon: Briefcase,
      color: "secondary",
    },
    {
      id: 3,
      title: "Workshop Organizer",
      company: "Harmony House Orphanage",
      period: "2023",
      description:
        "Organized a workshop at Harmony House orphanage teaching students about web development and cyber crime prevention.",
      icon: Award,
      color: "accent",
    },
    {
      id: 4,
      title: "Computer Science Student",
      company: "Dronacharya College of Engineering",
      period: "2022 - 2026",
      description:
        "Pursuing a degree in Computer Science with focus on web development, Python programming, and machine learning.",
      icon: GraduationCap,
      color: "primary",
    },
  ]

  const achievements = [
    { title: "Projects Completed", value: "10+" },
    { title: "Technical Events", value: "5+" },
    { title: "Workshops Conducted", value: "3+" },
    { title: "Competitions Won", value: "2+" },
  ]

  return (
    <section id="about" className="py-20 overflow-hidden" ref={ref}>
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="My Journey" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse into my background, experience, and professional journey
          </p>
        </motion.div>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          style={{ y }}
        >
          <div className="relative mx-auto mb-8 h-80 w-80 overflow-hidden rounded-2xl border border-primary/20 bg-muted/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-0"></div>
            <Image src="/placeholder.svg?height=320&width=320" alt="Profile" fill className="object-cover z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20"></div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1">Ankit Pal</h3>
            <p className="text-gradient font-medium mb-4">Python Developer & Web Developer</p>
            <Button className="rounded-full px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-2 text-3xl md:text-4xl font-bold text-gradient">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.title}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="gradient-border hover:border-primary/50 transition-all duration-300 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                About Me
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a skilled web developer with experience leading the AIII community and organizing technical
                  events. Proficient in building innovative web applications, real-time systems, and sustainable tech
                  solutions.
                </p>
                <p>
                  My expertise includes Python development, full-stack web development, and creating user-focused
                  projects. I'm passionate about solving real-world challenges through collaboration and leveraging
                  modern technologies.
                </p>
                <p>
                  I've successfully completed projects ranging from voice automation systems to real-time book
                  management platforms, always focusing on creating efficient and intuitive user experiences.
                </p>
                <p>
                  When I'm not coding, I enjoy sharing my knowledge through workshops and community events, helping
                  others learn and grow in the tech field.
                </p>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-primary" />
            Experience & Education
          </h3>

          <div className="relative space-y-6">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative pl-14"
              >
                <div
                  className={`absolute left-0 top-0 h-12 w-12 rounded-full bg-${experience.color}/20 flex items-center justify-center border border-${experience.color}/30`}
                >
                  <experience.icon className={`h-5 w-5 text-${experience.color}`} />
                </div>
                <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="mb-1 flex justify-between items-center">
                      <h4 className="font-bold">{experience.title}</h4>
                      <Badge variant="outline" className="bg-muted/50">
                        {experience.period}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary mb-2">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">{experience.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
