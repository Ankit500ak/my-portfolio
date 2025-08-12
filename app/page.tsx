import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import TechnicalSection from "@/components/technical-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <div className="container mx-auto px-4">
        <TechnicalSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <AboutSection />
        <ContactSection />
      </div>
    </>
  )
}
