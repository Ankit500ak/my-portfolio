"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import AnimatedText from "@/components/animated-text"

// Updated project data with resume projects
const projects = [
  {
    id: 12,
    title: "Ure Posh",
    description: "Corporate POSH (Prevention of Sexual Harassment) solutions site with clean UI, fast performance, and accessibility",
    image: "/Ure%20Posh_img.png",
    tags: ["Next.js", "Tailwind CSS", "Corporate", "Compliance", "SEO"],
    category: "frontend",
    demoUrl: "https://ureposh-cjk2.vercel.app",
    githubUrl: "#",
    details:
      "UREPOSH provides POSH policy development, training, investigation support, and compliance audits with an accessible design and responsive experience across devices.",
  },
  {
    id: 1,
    title: "Task Master",
    description: "AI-powered roadmap generator using Flask and Gemini API",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Flask", "Gemini API", "AI", "Project Planning"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "Task Master is an innovative AI-powered roadmap generator built with Flask and the Gemini API. The platform streamlines development processes by providing automated project planning and code integration capabilities. It generates comprehensive development roadmaps, task breakdowns, and implementation strategies based on project requirements. The system uses advanced AI to predict development challenges and suggest solutions, making it an invaluable tool for project managers and development teams.",
  },
  {
    id: 8,
    title: "Code Weave",
    description: "AI-assisted collaborative coding platform with real-time guidance",
    image: "/Codeweave_img.png",
    tags: ["Next.js", "TypeScript", "AI", "Collaboration"],
    category: "fullstack",
    demoUrl: "https://codeweave-4d5h.onrender.com",
    githubUrl: "#",
    details:
      "Code Weave enables teams to build projects collaboratively with inline AI suggestions, code reviews, and live presence. Integrated tasks and snippets accelerate delivery.",
  },
  {
    id: 9,
    title: "NFT Vault",
    description: "Secure NFT portfolio tracker with on-chain metadata and analytics",
    image: "/NFT%20Vault_img.png",
    tags: ["Next.js", "Web3", "Ethers.js", "Design"],
    category: "frontend",
    demoUrl: "https://nft-valut-o5of.vercel.app/",
    githubUrl: "#",
    details:
      "NFT Vault displays wallet NFTs with trait analytics, floor tracking, and beautiful galleries. Uses on-chain reads and cached metadata for speed.",
  },
  {
    id: 10,
    title: "Shadow Mesh",
    description: "3D WebGL micro-interactions library and demo gallery",
    image: "/ShadowMesh.img.png",
    tags: ["Three.js", "WebGL", "Framer Motion", "UX"],
    category: "frontend",
    demoUrl: "https://shadowmesh.vercel.app",
    githubUrl: "#",
    details:
      "Shadow Mesh showcases performant 3D interactions, depth-based shadows, and post-processing effects packaged as reusable components.",
  },
  {
    id: 11,
    title: "Messaging App",
    description: "Real-time messaging with typing indicators, presence, and attachments",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "WebSockets", "Redis", "Prisma"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "A polished chat experience with optimistic updates, delivery receipts, and unread batching. Stores media efficiently and scales horizontally.",
  },
  
  {
    id: 2,
    title: "Voice Automation",
    description: "Python system that automates routine PC tasks through prompt engineering",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Voice Recognition", "Automation", "Prompt Engineering", "Desktop Assistant"],
    category: "ai",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "Voice Automation is a sophisticated Python system that significantly enhances productivity by automating routine PC tasks through advanced prompt engineering. This project won first place in the College Hackathon 2023, where it was developed as an AI-powered Desktop Assistant. The system features voice recognition capabilities, automated workflows for common tasks, and real-time data fetching using various APIs for weather, news, and productivity tools. The system can handle complex voice commands, manage system operations, and provide instant information retrieval.",
  },
  {
    id: 3,
    title: "CodeWeave",
    description: "AI-driven collaborative platform using Python and Google APIs for stepwise project building",
    image: "/Codeweave_img.png",
    tags: ["Python", "Google APIs", "AI", "Collaborative Platform", "Real-time Guidance"],
    category: "ai",
    demoUrl: "https://codeweave-4d5h.onrender.com",
    githubUrl: "#",
    details:
      "CodeWeave is an AI-driven collaborative platform developed using Python and Google APIs that provides stepwise project building with real-time guidance. The platform features an intuitive interface where developers can collaborate on coding projects while receiving intelligent suggestions and guidance from the AI system. It offers code analysis, bug detection, performance optimization recommendations, and learning resources tailored to the specific project context. The system supports multiple programming languages and integrates seamlessly with popular development environments.",
  },
  {
    id: 4,
    title: "Research Paper Generator",
    description: "Python tool that automatically fetches, paraphrases, and compiles academic content",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "NLP", "PDF Generation", "Data Scraping", "Academic Tools"],
    category: "ai",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "The Research Paper Generator is a powerful Python tool that revolutionizes academic content creation by automatically fetching, paraphrasing, and compiling academic content into structured PDFs with visual aids. The system uses advanced natural language processing to understand research topics, gather relevant information from credible sources, intelligently restructure and paraphrase content to avoid plagiarism, and organize findings into properly formatted research papers. It also generates appropriate visual aids, citations, and references according to various academic standards.",
  },
  {
    id: 5,
    title: "SheetlaMandir.in",
    description: "Live temple website providing event updates and visitor information with mobile-responsive design",
    image: "/SheetlaMandir_img.png",
    tags: ["Web Development", "Responsive Design", "Content Management", "Event Updates", "User Experience"],
    category: "frontend",
    demoUrl: "https://sheetlamandir.in",
    githubUrl: "#",
    details:
      "SheetlaMandir.in is a fully operational temple website that delivers real-time event updates and comprehensive visitor information through a mobile-responsive design. The website features an elegant, culturally appropriate user interface, dynamic calendar integration for religious events and ceremonies, visitor information including directions, hours, and guidelines, donation platform with secure payment processing, and a media gallery showcasing temple architecture and events. The platform is optimized for speed and accessibility across all devices.",
  },
  {
    id: 6,
    title: "Real-Time Book Management",
    description: "Python-based library system featuring live inventory tracking and automated processes",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Database Management", "Real-time Tracking", "Admin Portal", "Library System"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "The Real-Time Book Management system is a comprehensive Python-based library solution featuring live inventory tracking, a robust admin portal, and automated borrowing/return processes. The system provides real-time updates on book availability, user-friendly interfaces for both librarians and patrons, automated notifications for due dates and available holds, comprehensive search functionality with filters and recommendations, and detailed reporting tools for library management. The application supports multiple user roles with appropriate access controls and integrates with external databases for expanded book information.",
  },
  {
    id: 7,
    title: "Multiplayer Quiz Game",
    description: "Interactive real-time quiz application using socket programming and clean UI design",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Socket Programming", "Real-time", "Game Development", "UI Design"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    details:
      "The Multiplayer Quiz Game is an engaging, interactive real-time quiz application built using socket programming and featuring a clean, intuitive UI design in Python. The game supports multiple simultaneous players competing in real-time, with features including various question categories and difficulty levels, timed responses with visual countdowns, live leaderboards updating after each question, customizable game rooms and settings, and chat functionality for player interaction. The backend handles concurrent connections efficiently while maintaining synchronization across all players.",
  }
]

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
            My Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Featured Projects" />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest work in AI, automation, and web development
          </p>
        </motion.div>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="mx-auto flex justify-center bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-full">
          <TabsTrigger
            value="all"
            onClick={() => setFilter("all")}
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            onClick={() => setFilter("ai")}
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
          >
            AI/ML
          </TabsTrigger>
          <TabsTrigger
            value="frontend"
            onClick={() => setFilter("frontend")}
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
          >
            Frontend
          </TabsTrigger>
          <TabsTrigger
            value="fullstack"
            onClick={() => setFilter("fullstack")}
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
          >
            Full Stack
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Dialog key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group gradient-border h-full hover:border-primary/50 transition-all duration-500">
                <div className="overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="bg-muted/50">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group/btn">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Demo</span>
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-md border-primary/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                <DialogDescription>{project.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                  <p className="text-muted-foreground mb-4">{project.details}</p>
                  <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      className="rounded-full px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="rounded-full px-6 border-primary hover:bg-primary/10">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
