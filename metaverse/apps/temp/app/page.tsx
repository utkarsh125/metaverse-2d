"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const pixelVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0.8, 1],
      scale: [0, 1.2, 0.9, 1],
      transition: {
        delay: (i % 10) * 0.1 + Math.floor(i / 10) * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  // Generate pixel pattern for the right side
  const generatePixelPattern = () => {
    const pixels = []
    const rows = 20
    const cols = 16

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols

      // Create a pattern that resembles a connected network or orbital structure
      const centerX = cols / 2
      const centerY = rows / 2
      const distance = Math.sqrt((col - centerX) ** 2 + (row - centerY) ** 2)

      let intensity = 0
      if (distance < 3) intensity = 0.9
      else if (distance < 5) intensity = 0.7
      else if (distance < 7) intensity = 0.5
      else if (distance < 9) intensity = 0.3
      else intensity = Math.random() > 0.8 ? 0.2 : 0

      pixels.push({
        id: i,
        intensity,
        delay: i * 0.02,
      })
    }
    return pixels
  }

  const pixels = generatePixelPattern()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-7xl lg:text-8xl font-black text-black leading-none tracking-tighter font-mono">
              OrbitOne
            </h1>
            <div className="space-y-2">
              <p className="text-lg font-bold text-black font-mono tracking-wide">**</p>
              <p className="text-lg font-bold text-black font-mono tracking-wide">NEW METAVERSE PLATFORM</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 max-w-md">
            <p className="text-black font-mono text-sm leading-relaxed">
              Connect remote teams in immersive <span className="text-green-500">virtual workspaces</span> with full control over the collaboration experience.
            </p>

            {/* <p className="text-black font-mono text-sm leading-relaxed">
              Just sign up for early access, join our community, and watch your team productivity transform from
              distributed to unified.
            </p> */}

            <p className="text-black font-mono text-sm leading-relaxed">
              <span className="text-green-500">Coming soon</span>, crafting of this platform is inspired by the future of remote work.
            </p>
          </motion.div>

          {/* <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono text-sm border-2 border-black bg-white focus:ring-0 focus:border-black rounded-none h-12"
                required
              />
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-mono text-sm h-12 rounded-none border-2 border-black"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  "NOTIFICATION SENT"
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>GET EARLY ACCESS</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
            <p className="text-xs font-mono text-gray-600">Be the first to experience orbital collaboration.</p>
          </motion.form> */}
        </motion.div>

        {/* Right Pixel Art */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-80 h-96 relative">
            <div className="grid grid-cols-16 gap-1 w-full h-full">
              {pixels.map((pixel) => (
                <motion.div
                  key={pixel.id}
                  custom={pixel.id}
                  variants={pixelVariants}
                  initial="hidden"
                  animate="visible"
                  className="aspect-square"
                  style={{
                    backgroundColor: pixel.intensity > 0 ? `rgba(0, 0, 0, ${pixel.intensity})` : "transparent",
                  }}
                />
              ))}
            </div>

            {/* Overlay text effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
