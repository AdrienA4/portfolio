"use client"

import { motion } from "framer-motion"
import { useToast } from "@/components/ui/sonner"
import { ArrowLeft, ExternalLink } from "lucide-react"
import {
  SiElectron,
  SiGin,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiRust,
  SiShadcnui,
} from "react-icons/si"
import { TransitionLink } from "@/components/transition-link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SiTailwindcss,
  SiSupabase,
  SiSqlite,
  SiFramer,
  SiTypescript,
} from "react-icons/si"
import { RiNextjsFill, RiVercelFill } from "react-icons/ri"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Touchgrass",
    description: "The fun way to expose your discord servers to your friends!",
    tech: [
      { name: "Next.js", icon: RiNextjsFill, color: "currentColor" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Framer", icon: SiFramer, color: "currentColor" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Shadcn/ui", icon: SiShadcnui, color: "currentColor" },
      { name: "Vercel", icon: RiVercelFill, color: "currentColor" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
    image: "/touchgrass.png",
    link: "https://touchgrass.giize.com",
    github: "https://github.com/AdrienA4/touchgrass",
  },
  {
    title: "QR Genius Pro",
    description:
      "a QR generator and scanner app with advanced features for professionals.",
    tech: [
      { name: "Next.js", icon: RiNextjsFill, color: "currentColor" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Vercel", icon: RiVercelFill, color: "currentColor" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    ],
    image: "https://qrgp.ids.onl/favicon.ico",
    logoMode: true,
    isPrivate: true,
    link: "https://qrgp.ids.onl/",
  },
  {
    title: "Touchscreen Manager",
    description:
      "An Electron-based app to manage your touchscreen and prevent input issues on games like Roblox.",
    tech: [
      { name: "Electron", icon: SiElectron, color: "#47848F" },
      { name: "HTML", icon: SiHtml5, color: "#E44D26" },
      { name: "CSS", icon: "/css.png", color: "#264DE4" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    ],
    image: "https://tchscreenapp.is-a.software/favicon.ico",
    logoMode: true,
    isPrivate: true,
    link: "https://tchscreenapp.is-a.software/",
  },
  {
    title: "Weather API",
    description:
      "A weather API that automatically detects user's location and returns the weather.",
    tech: [
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Gin", icon: SiGin, color: "#00838F" },
    ],
    image: "https://weather.sartawi.dev/favicon.ico",
    link: "https://weather.sartawi.dev",
    isPrivate: true,
    logoMode: true,
  },
  {
    title: "kash",
    description:
      "A multipurpose discord bot with fun, transfer and utility commands.",
    tech: [
      { name: "Next.js", icon: RiNextjsFill, color: "currentColor" },
      { name: "SQLite", icon: SiSqlite, color: "#0F80CC" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Vercel", icon: RiVercelFill, color: "currentColor" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    ],
    image: "https://kash.rweb.site/kash.png",
    rounded: "full",
    link: "https://kash.rweb.site",
    isPrivate: true,
    logoMode: true,
  },
  {
    title: "Hello, World!",
    description:
      "Repo with Hello, World! in almost every language I could find.",
    tech: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "C", icon: "/c.png" },
      { name: "C++", icon: "/c++.png" },
      { name: "C#", icon: "/csharp.png", color: "#00ADD8" },
      { name: "Java", icon: "/jav.png" },
      { name: "Python", icon: "/py.png" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Rust", icon: SiRust, color: "#FF9800" },
    ],
    image: "/helloworld.png",
    link: "https://github.com/AdrienA4/helloworld",
    github: "https://github.com/AdrienA4/helloworld",
    logoMode: true,
  },
]

export default function ProjectsPage() {
  const { toast } = useToast()

  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 lg:p-24">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:ml-12"
      >
        <TransitionLink
          href="/"
          className="group mb-6 flex items-center gap-2 text-sm font-medium text-foreground/40 transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to home
        </TransitionLink>
        <h1 className="text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl">
          Featured{" "}
          <span className="inline-block bg-linear-to-r from-foreground/40 to-foreground bg-clip-text pr-[0.1em] text-transparent italic">
            Projects
          </span>
        </h1>
      </motion.div>

      <div className="mx-auto grid max-w-[1400px] auto-rows-max grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Card className="group relative flex h-full flex-col overflow-hidden rounded-t-[32px] border-border bg-card shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-80 w-full overflow-hidden bg-card">
                <div
                  className={cn(
                    "h-full w-full transition-transform duration-700 group-hover:scale-110",
                    project.logoMode && "flex items-center justify-center"
                  )}
                >
                  <div
                    className={cn(
                      "relative",
                      project.rounded
                        ? "h-72 w-72 rounded-full"
                        : "h-full w-full",
                      project.title === "Hello, World!" && "rounded-b-3xl"
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized={project.logoMode}
                      className={cn(
                        "transition-all duration-700",
                        project.logoMode ? "object-contain" : "object-cover",
                        project.rounded && "rounded-full",
                        project.title === "Hello, World!" && "rounded-b-3xl"
                      )}
                    />
                  </div>
                </div>
              </div>

              <CardHeader className="pt-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {project.title}
                  </CardTitle>
                  <div className="flex gap-3">
                    <a
                      onClick={(e) => {
                        if (project.isPrivate) {
                          e.preventDefault()
                          toast({
                            title: "Sorry!",
                            description: "This is not Open Source.",
                            variant: "destructive",
                          })
                        }
                      }}
                      href={project.isPrivate ? "#" : project.github}
                      target={project.isPrivate ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="rounded-full bg-foreground/[0.03] p-2 text-foreground/40 transition-all hover:bg-foreground/10 hover:text-foreground"
                    >
                      <SiGithub size={20} />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-foreground/[0.03] p-2 text-foreground/40 transition-all hover:bg-foreground/10 hover:text-foreground"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 text-base text-foreground/60">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto pb-8">
                <div className="flex flex-wrap items-center gap-4">
                  {project.tech.map((t) => {
                    const isImageUrl = typeof t.icon === "string"
                    const Icon = t.icon
                    return (
                      <div key={t.name} className="flex items-center gap-2.5">
                        <div
                          className="group/tech relative flex items-center justify-center"
                          style={
                            {
                              "--brand-color": (t as any).color,
                            } as React.CSSProperties
                          }
                        >
                          {isImageUrl ? (
                            <div className="relative h-6 w-6 transition-all duration-300 group-hover/tech:scale-125">
                              <Image
                                src={t.icon as unknown as string}
                                alt={t.name}
                                fill
                                className="object-contain transition-all duration-300"
                              />
                            </div>
                          ) : (
                            <Icon
                              className="text-2xl transition-all duration-300 group-hover/tech:scale-125"
                              style={{ color: "var(--brand-color)" }}
                            />
                          )}
                          <span className="absolute -top-10 scale-0 rounded-md bg-foreground px-2 py-1 text-[10px] font-bold whitespace-nowrap text-background transition-all group-hover/tech:scale-100">
                            {t.name}
                          </span>
                        </div>
                        {project.title === "Hello, World!" && t.name === "Rust" && (
                          <span className="text-lg font-bold text-foreground/40 -ml-2">...</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
