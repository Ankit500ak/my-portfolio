"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"
import { Briefcase, Award, Users } from "lucide-react"

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const experiences = [
    {
      id: 1,
      title: "Internship at E2 Solutions",
      company: "E2 Solutions",
      period: "06/2024 - 07/2024",
      description: [
        "Designed, developed, and deployed multiple web-based projects, ensuring user-friendly and responsive interfaces.",
        "Utilized modern web technologies, including HTML, CSS, JavaScript, and React, to create dynamic and interactive applications.",
        "Collaborated with cross-functional teams to streamline project execution and meet deadlines effectively.",
        "Gained hands-on experience in troubleshooting, performance optimization, and implementing best practices to enhance web efficiency.",
      ],
      icon: Briefcase,
      color: "primary",
    },
    {
      id: 2,
      title: "ACM-AIII Community Leader",
      company: "AIII Community",
      period: "Ongoing",
      description: [
        "Leading the AIII community and organizing various technical events.",
        "Facilitating knowledge sharing and skill development among community members.",
        "Coordinating workshops, hackathons, and technical sessions to promote learning.",
        "Building a collaborative environment for technology enthusiasts to grow together.",
      ],
      icon: Users,
      color: "secondary",
    },
    {
      id: 3,
      title: "Workshop Organizer",
      company: "Harmony House Orphanage",
      period: "2023",
      description: [
        "Organized a workshop at Harmony House orphanage teaching students about web development.",
        "Educated children on cyber crime awareness and prevention strategies.",
        "Created engaging learning materials suitable for young learners.",
        "Provided hands-on experience with basic coding and internet safety.",
      ],
      icon: Award,
      color: "accent",
    },
    {
      id: 4,
      title: "Freelancer",
      company: "Self-employed",
      period: "Ongoing",
      description: [
        "Working on various freelance projects for clients across different industries.",
        "Developing custom web solutions tailored to specific client requirements.",
        "Managing project timelines and client expectations independently.",
        "Building a diverse portfolio of work through independent projects.",
      ],
      icon: Briefcase,
      color: "primary",
    },
  ]

  const achievements = [
    {
      title: "IIT Jammu Bootcamp",
      description:
        "Secured 2nd place at the IIT Jammu Bootcamp for developing an innovative solution using full stack web development, showcasing problem-solving and teamwork skills.",
      icon: Award,
      color: "secondary",
    },
  ]

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            My Journey
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Experience & Achievements" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of my professional experience and notable achievements
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-primary" />
            Work Experience
          </h3>

          <div className="relative space-y-6">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {experience.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Award className="mr-2 h-5 w-5 text-secondary" />
            Achievements
          </h3>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`h-12 w-12 rounded-full bg-${achievement.color}/20 flex items-center justify-center border border-${achievement.color}/30`}
                      >
                        <achievement.icon className={`h-5 w-5 text-${achievement.color}`} />
                      </div>
                      <h4 className="text-lg font-bold">{achievement.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-4">Personality Traits</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">P</span>
                      </div>
                      <div>
                        <p className="font-medium">Problem-Solver</p>
                        <p className="text-xs text-muted-foreground">Innovative and analytical</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-secondary font-bold">T</span>
                      </div>
                      <div>
                        <p className="font-medium">Team Player</p>
                        <p className="text-xs text-muted-foreground">Strong collaboration</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold">A</span>
                      </div>
                      <div>
                        <p className="font-medium">Adaptable</p>
                        <p className="text-xs text-muted-foreground">Quick learner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">D</span>
                      </div>
                      <div>
                        <p className="font-medium">Detail-Oriented</p>
                        <p className="text-xs text-muted-foreground">Efficient coding</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
