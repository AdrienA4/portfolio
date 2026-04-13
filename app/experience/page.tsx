"use client"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export default function ExperiencePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-5 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 text-center"
      >
        <Briefcase size={32} strokeWidth={1.5} className="text-foreground/60 shrink-0" />
        <h1 className="text-4xl font-extrabold">Coming soon</h1>
      </motion.div>
    </div>
  )
}