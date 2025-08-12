"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code2, 
  Cpu, 
  Database, 
  GitBranch, 
  Globe, 
  Shield, 
  Zap,
  Layers,
  Workflow,
  Monitor
} from "lucide-react"
import AnimatedText from "@/components/animated-text"

const technicalData = {
  skills: [
    {
      category: "Frontend Development",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "WebGL"],
      icon: <Globe className="w-5 h-5" />
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Python", "Django", "Flask", "Express.js", "REST APIs", "GraphQL"],
      icon: <Database className="w-5 h-5" />
    },
    {
      category: "Data & AI",
      items: ["Machine Learning", "Data Analysis", "AI Integration", "NLP", "Gemini API", "TensorFlow", "Pandas"],
      icon: <Cpu className="w-5 h-5" />
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "GitHub", "Docker", "CI/CD", "AWS", "Vercel", "PostgreSQL", "MongoDB"],
      icon: <GitBranch className="w-5 h-5" />
    }
  ],
  architecture: [
    {
      title: "Microservices Architecture",
      description: "Designing scalable, maintainable systems with service-oriented architecture",
      patterns: ["API Gateway", "Service Discovery", "Load Balancing", "Circuit Breaker"]
    },
    {
      title: "Modern Frontend Patterns",
      description: "Implementing cutting-edge UI/UX patterns and state management",
      patterns: ["Component Composition", "Custom Hooks", "Context API", "State Machines"]
    },
    {
      title: "Data Architecture",
      description: "Building robust data pipelines and storage solutions",
      patterns: ["Event Sourcing", "CQRS", "Data Lakes", "Real-time Processing"]
    }
  ],
  methodologies: [
    {
      title: "Agile Development",
      description: "Iterative development with continuous feedback and adaptation",
      practices: ["Scrum", "Kanban", "Sprint Planning", "Retrospectives"]
    },
    {
      title: "Test-Driven Development",
      description: "Writing tests before code to ensure quality and maintainability",
      practices: ["Unit Testing", "Integration Testing", "E2E Testing", "Code Coverage"]
    },
    {
      title: "Continuous Integration",
      description: "Automated testing and deployment pipelines",
      practices: ["Automated Testing", "Code Quality Gates", "Deployment Automation", "Monitoring"]
    }
  ],
  tools: [
    {
      category: "Development",
      tools: ["VS Code", "IntelliJ", "Postman", "Insomnia", "Chrome DevTools"]
    },
    {
      category: "Design & Prototyping",
      tools: ["Figma", "Adobe Creative Suite", "Blender", "Sketch", "InVision"]
    },
    {
      category: "Analytics & Monitoring",
      tools: ["Google Analytics", "Sentry", "LogRocket", "Hotjar", "Mixpanel"]
    }
  ],
  performance: [
    {
      aspect: "Frontend Performance",
      metrics: ["Core Web Vitals", "Bundle Optimization", "Lazy Loading", "Image Optimization"]
    },
    {
      aspect: "Backend Performance",
      metrics: ["Database Optimization", "Caching Strategies", "API Response Time", "Scalability"]
    },
    {
      aspect: "User Experience",
      metrics: ["Accessibility", "Mobile Responsiveness", "Progressive Enhancement", "Performance Budgets"]
    }
  ],
  security: [
    {
      area: "Application Security",
      practices: ["Input Validation", "Authentication", "Authorization", "Data Encryption"]
    },
    {
      area: "Infrastructure Security",
      practices: ["HTTPS", "CORS", "Rate Limiting", "Security Headers"]
    },
    {
      area: "Data Protection",
      practices: ["GDPR Compliance", "Data Anonymization", "Secure Storage", "Audit Logging"]
    }
  ]
}

export default function TechnicalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="technical" className="py-20" ref={ref}>
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            Technical Excellence
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Technical Expertise" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, architectural knowledge, and development practices
          </p>
        </motion.div>
      </div>

      {/* Technical Skills */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Code2 className="w-6 h-6 mr-3 text-primary" />
            Core Technical Skills
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalData.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.1 }}
            >
              <Card className="h-full gradient-border overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 text-primary">
                      {skillGroup.icon}
                    </div>
                    <h4 className="text-lg font-bold">{skillGroup.category}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 + groupIndex * 0.1 }}
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
      </div>

      {/* Architecture & Patterns */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Layers className="w-6 h-6 mr-3 text-primary" />
            Architecture & Design Patterns
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalData.architecture.map((arch, index) => (
            <motion.div
              key={arch.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full gradient-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{arch.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{arch.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {arch.patterns.map((pattern) => (
                      <Badge key={pattern} variant="secondary" className="text-xs">
                        {pattern}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Development Methodologies */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Workflow className="w-6 h-6 mr-3 text-primary" />
            Development Methodologies
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalData.methodologies.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="h-full gradient-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {method.practices.map((practice) => (
                      <Badge key={practice} variant="secondary" className="text-xs">
                        {practice}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance & Optimization */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-primary" />
            Performance & Optimization
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalData.performance.map((perf, index) => (
            <motion.div
              key={perf.aspect}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <Card className="h-full gradient-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{perf.aspect}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {perf.metrics.map((metric) => (
                      <Badge key={metric} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security & Best Practices */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            Security & Best Practices
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalData.security.map((sec, index) => (
            <motion.div
              key={sec.area}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
            >
              <Card className="h-full gradient-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{sec.area}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sec.practices.map((practice) => (
                      <Badge key={practice} variant="outline" className="text-xs">
                        {practice}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Infrastructure */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Monitor className="w-6 h-6 mr-3 text-primary" />
            Tools & Infrastructure
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalData.tools.map((toolGroup, index) => (
            <motion.div
              key={toolGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            >
              <Card className="h-full gradient-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{toolGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {toolGroup.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
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
