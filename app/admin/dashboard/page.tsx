"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Users, FolderPlus, Edit, Trash2, ImageIcon, Save, X, Plus, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [projectsList, setProjectsList] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=600&width=800",
    tags: "",
    category: "frontend",
    demoUrl: "",
    githubUrl: "",
    details: "",
  })

  // Simulate loading projects
  useEffect(() => {
    const loadProjects = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sample project data
      const projects = [
        {
          id: 1,
          title: "Nebula E-commerce",
          description: "A futuristic e-commerce platform with 3D product visualization and AR try-on features.",
          image: "/placeholder.svg?height=600&width=800",
          tags: ["React", "Three.js", "Node.js", "MongoDB", "WebGL"],
          category: "fullstack",
          demoUrl: "#",
          githubUrl: "#",
          details:
            "Nebula is a cutting-edge e-commerce platform that revolutionizes online shopping with immersive 3D product visualization and AR try-on capabilities.",
        },
        {
          id: 2,
          title: "Quantum Portfolio",
          description: "An award-winning portfolio website with interactive 3D elements and particle effects.",
          image: "/placeholder.svg?height=600&width=800",
          tags: ["Next.js", "Three.js", "GSAP", "Framer Motion", "WebGL"],
          category: "frontend",
          demoUrl: "#",
          githubUrl: "#",
          details:
            "Quantum Portfolio is a visually stunning showcase of creative work featuring interactive 3D elements, particle systems, and smooth animations.",
        },
        {
          id: 3,
          title: "Synapse Task Manager",
          description: "A collaborative task management system with real-time updates and AI assistance.",
          image: "/placeholder.svg?height=600&width=800",
          tags: ["React", "Firebase", "TensorFlow.js", "WebSockets", "Redux"],
          category: "fullstack",
          demoUrl: "#",
          githubUrl: "#",
          details:
            "Synapse is a next-generation task management platform that combines real-time collaboration with AI-powered assistance.",
        },
      ]

      setProjectsList(projects)
      setIsLoading(false)
    }

    loadProjects()
  }, [])

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target
    setNewProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditProjectChange = (e) => {
    const { name, value } = e.target
    setEditingProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProject = (e) => {
    e.preventDefault()

    const newProjectWithId = {
      ...newProject,
      id: Date.now(),
      tags: newProject.tags.split(",").map((tag) => tag.trim()),
    }

    setProjectsList((prev) => [...prev, newProjectWithId])

    setNewProject({
      title: "",
      description: "",
      image: "/placeholder.svg?height=600&width=800",
      tags: "",
      category: "frontend",
      demoUrl: "",
      githubUrl: "",
      details: "",
    })

    toast({
      title: "Project added",
      description: "The project has been added successfully",
    })

    setActiveTab("projects")
  }

  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      tags: project.tags.join(", "),
    })
  }

  const handleSaveProject = () => {
    const updatedProject = {
      ...editingProject,
      tags: editingProject.tags.split(",").map((tag) => tag.trim()),
    }

    setProjectsList((prev) => prev.map((project) => (project.id === updatedProject.id ? updatedProject : project)))

    setEditingProject(null)

    toast({
      title: "Project updated",
      description: "The project has been updated successfully",
    })
  }

  const handleDeleteProject = (id) => {
    setProjectsList((prev) => prev.filter((project) => project.id !== id))

    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully",
    })
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="mr-4 rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to site</span>
            </Button>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Badge variant="outline" className="px-3 py-1 bg-primary/10 border-primary/30">
            Admin
          </Badge>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-full">
            <TabsTrigger
              value="overview"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="add-project"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
            >
              Add Project
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Total Projects</h3>
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <FolderPlus className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{projectsList.length}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Total Visitors</h3>
                      <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">1,234</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Engagement</h3>
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">42%</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-6"
            >
              <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3 text-primary border border-primary/30">
                        <FolderPlus className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Added new project</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-secondary/10 p-3 text-secondary border border-secondary/30">
                        <Edit className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Updated project details</p>
                        <p className="text-sm text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-accent/10 p-3 text-accent border border-accent/30">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">New contact form submission</p>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Manage Projects</h3>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="bg-muted/30 animate-pulse h-20"></Card>
                    ))}
                  </div>
                ) : editingProject ? (
                  <div className="rounded-lg border border-border p-6">
                    <h3 className="mb-6 text-xl font-medium">Edit Project</h3>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <label htmlFor="edit-title" className="text-sm font-medium">
                          Title
                        </label>
                        <Input
                          id="edit-title"
                          name="title"
                          value={editingProject.title}
                          onChange={handleEditProjectChange}
                          className="bg-muted/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-description" className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          id="edit-description"
                          name="description"
                          value={editingProject.description}
                          onChange={handleEditProjectChange}
                          className="bg-muted/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-category" className="text-sm font-medium">
                          Category
                        </label>
                        <select
                          id="edit-category"
                          name="category"
                          value={editingProject.category}
                          onChange={handleEditProjectChange}
                          className="rounded-md border border-primary/30 bg-muted/50 px-3 py-2 text-sm focus:border-primary"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="fullstack">Full Stack</option>
                          <option value="backend">Backend</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-tags" className="text-sm font-medium">
                          Tags (comma separated)
                        </label>
                        <Input
                          id="edit-tags"
                          name="tags"
                          value={editingProject.tags}
                          onChange={handleEditProjectChange}
                          className="bg-muted/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-details" className="text-sm font-medium">
                          Details
                        </label>
                        <Textarea
                          id="edit-details"
                          name="details"
                          value={editingProject.details}
                          onChange={handleEditProjectChange}
                          rows={4}
                          className="bg-muted/50 border-primary/30 focus:border-primary resize-none"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-demoUrl" className="text-sm font-medium">
                          Demo URL
                        </label>
                        <Input
                          id="edit-demoUrl"
                          name="demoUrl"
                          value={editingProject.demoUrl}
                          onChange={handleEditProjectChange}
                          className="bg-muted/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-githubUrl" className="text-sm font-medium">
                          GitHub URL
                        </label>
                        <Input
                          id="edit-githubUrl"
                          name="githubUrl"
                          value={editingProject.githubUrl}
                          onChange={handleEditProjectChange}
                          className="bg-muted/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveProject}
                          className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {projectsList.length === 0 ? (
                      <div className="text-center py-12">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                        <p className="text-muted-foreground mb-6">Get started by adding your first project</p>
                        <Button
                          onClick={() => setActiveTab("add-project")}
                          className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Project
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projectsList.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card className="overflow-hidden hover:border-primary/30 transition-all duration-300">
                              <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 overflow-hidden rounded-md bg-muted flex items-center justify-center">
                                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{project.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="bg-muted/50 text-xs">
                                        {project.category}
                                      </Badge>
                                      <p className="text-xs text-muted-foreground">{project.tags.length} tags</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEditProject(project)}
                                    className="rounded-full h-8 w-8 hover:bg-primary/10 hover:text-primary border-primary/30"
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="rounded-full h-8 w-8 hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-project">
            <Card className="gradient-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Add New Project</h3>
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={newProject.title}
                        onChange={handleNewProjectChange}
                        placeholder="Project title"
                        required
                        className="bg-muted/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={newProject.category}
                        onChange={handleNewProjectChange}
                        className="rounded-md border border-primary/30 bg-muted/50 px-3 py-2 text-sm focus:border-primary"
                      >
                        <option value="frontend">Frontend</option>
                        <option value="fullstack">Full Stack</option>
                        <option value="backend">Backend</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Input
                      id="description"
                      name="description"
                      value={newProject.description}
                      onChange={handleNewProjectChange}
                      placeholder="Short description"
                      required
                      className="bg-muted/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      value={newProject.tags}
                      onChange={handleNewProjectChange}
                      placeholder="React, TypeScript, TailwindCSS"
                      required
                      className="bg-muted/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="details" className="text-sm font-medium">
                      Details
                    </label>
                    <Textarea
                      id="details"
                      name="details"
                      value={newProject.details}
                      onChange={handleNewProjectChange}
                      placeholder="Detailed description of the project"
                      rows={4}
                      required
                      className="bg-muted/50 border-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="demoUrl" className="text-sm font-medium">
                        Demo URL
                      </label>
                      <Input
                        id="demoUrl"
                        name="demoUrl"
                        value={newProject.demoUrl}
                        onChange={handleNewProjectChange}
                        placeholder="https://example.com"
                        className="bg-muted/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="githubUrl" className="text-sm font-medium">
                        GitHub URL
                      </label>
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        value={newProject.githubUrl}
                        onChange={handleNewProjectChange}
                        placeholder="https://github.com/username/repo"
                        className="bg-muted/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
