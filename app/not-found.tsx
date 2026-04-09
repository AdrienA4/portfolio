"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Home, Ghost } from "lucide-react"
import { TransitionLink } from "@/components/transition-link"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Image from "next/image"

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1))
      },
      reverse ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className="inline-block min-h-[1.2em]">
      {words[index].substring(0, subIndex)}
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-foreground/40 align-middle" />
    </span>
  )
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-6 font-sans overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="absolute top-12 left-12 flex items-center gap-5">
        <TransitionLink
          href="/"
          className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/30 transition-all hover:text-foreground"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          <span>Go back home</span>
        </TransitionLink>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4"
      >
        <div className="w-full relative group">
          <div className="relative overflow-hidden rounded-[48px] border border-white/[0.08] bg-card/40 backdrop-blur-3xl p-12 md:px-16 md:py-24 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-12">
                <div className="absolute -inset-8 bg-foreground/[0.02] blur-3xl rounded-full" />
                <div className="relative h-48 w-48 md:h-64 md:w-64 rounded-full p-1.5 bg-linear-to-b from-border/50 to-transparent shadow-2xl">
                  <Image
                    src="/pfp.webp"
                    alt="Adrien"
                    fill
                    draggable={false}
                    className="rounded-full object-cover shadow-2xl"
                  />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border-2 border-dashed border-foreground/[0.05] pointer-events-none" 
                />
              </div>

              <div className="mb-8">
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter selection:bg-foreground selection:text-background leading-none">
                  <span className="bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-transparent italic">
                    404
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-6 mb-12">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground text-center">
                  <Typewriter words={["Not today g", "Where u going lil bro", "Not here g", "try again g", "off u go lil bro"]} />
                </h2>
                
                <p className="text-sm font-medium text-foreground/40 text-center">
                  The page you&apos;re looking for doesn&apos;t exist blud.
                </p>
              </div>

              <TransitionLink
                href="/"
                className={cn(
                  "inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl",
                  "bg-foreground text-background px-8 py-5 text-base font-bold",
                  "transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg shadow-black/10"
                )}
              >
                <Home size={18} />
                <span>Return Home</span>
              </TransitionLink>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-12 flex items-center gap-3 opacity-10">
          <div className="h-1 w-1 rounded-full bg-foreground" />
          <div className="h-1 w-1 rounded-full bg-foreground" />
          <div className="h-1 w-1 rounded-full bg-foreground" />
        </div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-20 right-20 pointer-events-none select-none hidden lg:block"
      >
        <Ghost size={120} className="text-foreground" />
      </motion.div>
    </div>
  )
}
