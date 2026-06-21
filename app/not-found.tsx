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

    const timeout = setTimeout(
      () => {
        if (subIndex === 0 && reverse) {
          setReverse(false)
          setIndex((prev) => (prev + 1) % words.length)
        } else {
          setSubIndex((prev) => prev + (reverse ? -1 : 1))
        }
      },
      subIndex === 0 && reverse ? 80 : reverse ? 40 : 80
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-6 font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-foreground/3 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-foreground/2 blur-[120px]" />
      </div>

      <div className="absolute top-12 left-12 flex items-center gap-5">
        <TransitionLink
          href="/"
          className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-foreground/30 uppercase transition-all hover:text-foreground"
        >
          <ArrowLeft
            size={12}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Go back home</span>
        </TransitionLink>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center px-4"
      >
        <div className="group relative w-full">
          <div className="relative overflow-hidden rounded-[48px] border border-white/8 bg-card/40 p-12 shadow-2xl backdrop-blur-3xl md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/2 to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-12">
                <div className="absolute -inset-8 rounded-full bg-foreground/2 blur-3xl" />
                <div className="relative h-48 w-48 rounded-full bg-linear-to-b from-border/50 to-transparent p-1.5 shadow-2xl md:h-64 md:w-64">
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
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="pointer-events-none absolute -inset-6 rounded-full border-2 border-dashed border-foreground/5"
                />
              </div>

              <div className="mb-8">
                <h1 className="text-8xl leading-none font-black tracking-tighter selection:bg-foreground selection:text-background md:text-9xl">
                  <span className="bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-transparent italic">
                    404
                  </span>
                </h1>
              </div>

              <div className="mb-12 flex flex-col items-center gap-6">
                <h2 className="text-center text-2xl font-black tracking-tight text-foreground md:text-3xl">
                  <Typewriter
                    words={[
                      "Not today g",
                      "Where u going lil bro",
                      "Not here g",
                      "try again g",
                      "off u go lil bro",
                    ]}
                  />
                </h2>

                <p className="text-center text-sm font-medium text-foreground/40">
                  The page you&apos;re looking for doesn&apos;t exist blud.
                </p>
              </div>

              <TransitionLink
                href="/"
                className={cn(
                  "inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl",
                  "bg-foreground px-8 py-5 text-base font-bold text-background",
                  "shadow-lg shadow-black/10 transition-all duration-300 hover:opacity-90 active:scale-95"
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
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed right-20 bottom-20 hidden select-none lg:block"
      >
        <Ghost size={120} className="text-foreground" />
      </motion.div>
    </div>
  )
}
