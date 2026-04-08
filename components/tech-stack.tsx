"use client"

import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { RiReactjsFill, RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import {
  SiTypescript,
  SiNodedotjs,
  SiFramer,
  SiMongodb,
  SiSqlite,
  SiElectron,
  SiFigma,
  SiExpress,
  SiDocker,
  SiGo,
  SiRust,
} from "react-icons/si"
import { IoLogoJavascript } from "react-icons/io5"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

export const techStack = [
  {
    name: "React",
    icon: "react",
    category: "Frontend",
    summary:
      "Component-driven UI architecture for interactive client surfaces.",
    usage: "Building app shells, reusable sections, and stateful interactions.",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    category: "Language",
    summary: "Type-safe JavaScript that keeps larger codebases predictable.",
    usage: "Protecting UI and backend contracts while moving fast.",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    category: "Framework",
    summary: "Full-stack React framework with routing, SSR, and app structure.",
    usage: "Shipping fast portfolio pages and server-rendered product work.",
  },
  {
    name: "Node.js",
    icon: "nodejs",
    category: "Runtime",
    summary: "JavaScript runtime for APIs, tooling, and backend services.",
    usage: "Powering servers, scripts, bots, and local automation.",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "Styling",
    summary: "Utility-first styling system for fast visual iteration.",
    usage: "Building custom interfaces without fighting CSS overhead.",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    category: "Database",
    summary: "Document database suited to flexible app data models.",
    usage: "Handling content-heavy and rapidly evolving schemas.",
  },
  {
    name: "SQLite",
    icon: "sqlite",
    category: "Database",
    summary: "Lightweight embedded SQL database with almost zero setup.",
    usage: "Using local-first storage, prototypes, and small app persistence.",
  },
  {
    name: "Docker",
    icon: "docker",
    category: "DevOps",
    summary:
      "Container tooling for reproducible local and deployment environments.",
    usage: "Keeping stacks portable across dev machines and servers.",
  },
  {
    name: "Framer Motion",
    icon: "framer",
    category: "Motion",
    summary: "Animation library for expressive, physics-based UI movement.",
    usage: "Adding transitions, reveals, and interaction polish.",
  },
  {
    name: "Discord.js",
    icon: "discordjs",
    category: "SDK",
    summary: "NPM package for building Discord bots and integrations.",
    usage: "Creating community tools, automation, and chat-driven workflows.",
  },
  {
    name: "Express",
    icon: "express",
    category: "Backend",
    summary: "Minimal web framework for APIs and server-side routing.",
    usage: "Standing up quick services and custom API layers.",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    category: "Language",
    summary: "Core web language behind browser logic and Node tooling.",
    usage: "Writing app logic, integrations, and rapid prototypes.",
  },
  {
    name: "Golang",
    icon: "go",
    category: "Language",
    summary:
      "Compiled backend language built for fast, reliable concurrent systems.",
    usage:
      "Building APIs, services, and tooling with strong performance characteristics.",
  },
  {
    name: "Electron",
    icon: "electron",
    category: "Desktop",
    summary: "Desktop app framework powered by web technologies.",
    usage: "Turning web stacks into installable desktop tools.",
  },
  {
    name: "Vercel",
    icon: "vercel",
    category: "Hosting",
    summary: "Deployment platform optimized for modern frontend frameworks.",
    usage: "Pushing previews and production builds with minimal friction.",
  },
  {
    name: "Rust",
    icon: "rust",
    category: "Language",
    summary:
      "Systems programming language with strong performance characteristics.",
    usage:
      "Building APIs, services, and tooling with strong performance characteristics.",
  },
]

type TechItemData = (typeof techStack)[number]

export const TechIcon = ({
  icon,
  className,
}: {
  name: string
  icon: string
  className?: string
}) => {
  const iconClass = cn("text-[24px]", className)

  switch (icon) {
    case "vercel":
      return (
        <Image
          src="/vercel.ico"
          alt="Vercel"
          width={40}
          height={40}
          draggable={false}
          className="h-[1.2em] w-[1.2em] object-contain dark:invert"
        />
      )
    case "react":
      return <RiReactjsFill className={`${iconClass} text-cyan-400`} />
    case "figma":
      return <SiFigma className={`${iconClass} text-purple-500`} />
    case "rust":
      return <SiRust className={`${iconClass} text-orange-500`} />
    case "go":
      return <SiGo className={cn(iconClass, "text-[1.2em] text-blue-400")} />
    case "typescript":
      return <SiTypescript className={`${iconClass} text-blue-500`} />
    case "nextjs":
      return <RiNextjsFill className={`${iconClass} text-foreground`} />
    case "nodejs":
      return <SiNodedotjs className={`${iconClass} text-green-500`} />

    case "tailwind":
      return <RiTailwindCssFill className={`${iconClass} text-cyan-400`} />
    case "mongodb":
      return <SiMongodb className={`${iconClass} text-green-600`} />
    case "sqlite":
      return <SiSqlite className={`${iconClass} text-blue-600`} />
    case "docker":
      return <SiDocker className={`${iconClass} text-blue-400`} />
    case "framer":
      return <SiFramer className={`${iconClass} text-purple-500`} />
    case "discordjs":
      return (
        <Image
          src="/Discord.js.svg"
          alt="Discord.js"
          width={40}
          height={40}
          draggable={false}
          className="h-[1.2em] w-[1.2em] object-contain"
        />
      )
    case "express":
      return <SiExpress className={`${iconClass} text-slate-300`} />
    case "javascript":
      return <IoLogoJavascript className={`${iconClass} text-yellow-400`} />
    case "electron":
      return <SiElectron className={`${iconClass} text-blue-300`} />
    default:
      return <div className={`${iconClass} rounded bg-gray-500`} />
  }
}

function TechItem({
  name,
  icon,
  category,
  summary,
  usage,
  itemId,
  isOpen,
  onOpenChange,
}: TechItemData & {
  itemId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const openDetails = () => {
    if (!isOpen) {
      onOpenChange(true)
    }
  }

  const toggleDetails = () => {
    onOpenChange(!isOpen)
  }

  return (
    <HoverCard open={isOpen} onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          data-tech-id={itemId}
          data-open={isOpen}
          className="tech-card mx-2 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-border/80 bg-foreground/[0.05] transition-all duration-300 hover:scale-110 hover:border-border hover:bg-foreground/[0.1] hover:shadow-lg"
          aria-label={`${name} details`}
          onClick={toggleDetails}
          onFocus={openDetails}
          onPointerEnter={openDetails}
          onPointerMove={openDetails}
        >
          <TechIcon name={name} icon={icon} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="tech-hover-card overflow-hidden border-border bg-accent/95 p-0 backdrop-blur-xl duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="space-y-3 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{summary}</p>
            </div>
            <TechIcon name={name} icon={icon} className="text-[40px]" />
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            <Badge variant="secondary" className="gap-1">
              In stack
              <ArrowUpRight className="size-3" />
            </Badge>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            {usage}
          </div>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  )
}

function TechSet({
  id,
  activeTech,
  onActiveTechChange,
}: {
  id: string
  activeTech: string | null
  onActiveTechChange: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <div className="flex" id={id}>
      {techStack.map((tech) => {
        const itemId = `${id}-${tech.name}`

        return (
          <TechItem
            key={itemId}
            {...tech}
            itemId={itemId}
            isOpen={activeTech === itemId}
            onOpenChange={(open) =>
              onActiveTechChange((currentActiveTech) =>
                open
                  ? itemId
                  : currentActiveTech === itemId
                    ? null
                    : currentActiveTech
              )
            }
          />
        )
      })}
    </div>
  )
}

export default function TechStackCarousel() {
  const [isClient, setIsClient] = useState(false)
  const [activeTech, setActiveTech] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div dir="ltr" className="w-full overflow-hidden bg-transparent py-16">
        <div className="flex gap-0">
          <TechSet
            id="init"
            activeTech={activeTech}
            onActiveTechChange={setActiveTech}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @keyframes carouselScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-track {
          display: flex;
          width: max-content;
          animation: carouselScroll 42s linear infinite;
          will-change: transform;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        .carousel-track.carousel-track-open {
          animation-play-state: paused;
        }

        .tech-hover-card {
          user-select: none;
        }

        .tech-carousel-shell {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 15%,
            black 85%,
            transparent 100%
          );
        }
      `}</style>

      <div
        dir="ltr"
        className="tech-carousel-shell relative w-full overflow-hidden bg-transparent py-2 select-none"
      >
        <div
          className={cn("carousel-track", activeTech && "carousel-track-open")}
        >
          <TechSet
            id="s1"
            activeTech={activeTech}
            onActiveTechChange={setActiveTech}
          />
          <TechSet
            id="s2"
            activeTech={activeTech}
            onActiveTechChange={setActiveTech}
          />
        </div>
      </div>
    </>
  )
}
