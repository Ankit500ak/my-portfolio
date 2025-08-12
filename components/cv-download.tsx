"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CVDownload() {
  const handleDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a')
    link.href = '/ankitresume.pdf-1.pdf'
    link.download = 'Ankit_Resume.pdf'
    link.click()
  }

  return (
    <Button
      onClick={handleDownload}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <Download className="w-5 h-5 mr-2" />
      Download CV
    </Button>
  )
}
