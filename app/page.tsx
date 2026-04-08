"use client"

import {
  motion,
  AnimatePresence,
  Variants,
  HTMLMotionProps,
} from "framer-motion"
import Image from "next/image"
import { SiGithub, SiDiscord, SiRoblox, SiLeetcode } from "react-icons/si"
import {
  ArrowLeft,
  ArrowUpRight,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSun,
  Droplets,
  MoonStar,
  Wind,
  Mail,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import TechStackCarousel from "@/components/tech-stack"
import { useToast } from "@/components/ui/sonner"
import Loader from "@/components/ui/spinner"
import { TransitionLink } from "@/components/transition-link"
import DiscordPresence from "@/components/discord-presence"
import { techStack, TechIcon } from "@/components/tech-stack"

const EMAIL = "adrien@sartawi.dev"

const SOCIALS = [
  {
    icon: SiGithub,
    href: "https://github.com",
    label: "GitHub",
    color: "#ffffff",
  },
  {
    icon: SiDiscord,
    href: "https://discord.com/users/718185533460840450",
    label: "Discord",
    color: "#ffffff",
  },
  {
    icon: SiRoblox,
    href: "https://www.roblox.com/users/479580010/profile",
    label: "Roblox",
    color: "#ffffff",
  },
  {
    icon: SiLeetcode,
    href: "https://leetcode.com/u/GFWlSYQMfz/",
    label: "LeetCode",
    color: "#ffffff",
  },
]

const blurIn: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(20px) saturate(0.3)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px) saturate(1)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const introContainerVars: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit: {
    opacity: 0,
    y: -30,
    scale: 1.04,
    filter: "blur(22px) saturate(0)",
    transition: { duration: 0.55, ease: [0.4, 0, 0.8, 0] },
  },
}

const gridVars: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } },
}

const cardVars: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.93,
    filter: "blur(24px) saturate(0.4)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px) saturate(1)",
    transition: { type: "tween", duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

function BentoCard({
  children,
  className,
  id,
  glow,
  style,
  ...props
}: React.PropsWithChildren<
  HTMLMotionProps<"div"> & {
    glow?: string
  }
>) {
  return (
    <motion.div
      id={id}
      variants={cardVars}
      style={{ willChange: "transform, filter, opacity", ...style }}
      className={cn(
        "group relative overflow-hidden rounded-[18px]",
        "border border-border bg-card",
        "p-5 transition-colors duration-500",
        "hover:border-border/80 hover:bg-foreground/[0.025]",
        className
      )}
      {...props}
    >
      {glow && glow !== "" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  )
}

type WeatherPayload = {
  current: {
    apparent_temperature: number
    is_day: number
    relative_humidity_2m: number
    temperature_2m: number
    time: number
    weather_code: number
    wind_speed_10m: number
  }
  current_units: {
    apparent_temperature: string
    temperature_2m: string
    wind_speed_10m: string
  }
}

type WeatherState = {
  apparentTemperature: number
  humidity: number
  isDay: boolean
  temperature: number
  temperatureUnit: string
  time: number
  weatherCode: number
  windSpeed: number
  windUnit: string
}

const RAS_AL_KHAIMAH_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=25.8007&longitude=55.9762&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=Asia%2FDubai&timeformat=unixtime&forecast_days=1"
const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000
const WEATHER_SESSION_CACHE_KEY = "rak-weather-cache"

function readSessionWeatherCache() {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(WEATHER_SESSION_CACHE_KEY)
    if (!raw) return null
    const cache = JSON.parse(raw)
    if (Date.now() - cache.fetchedAt >= WEATHER_CACHE_TTL_MS) {
      window.sessionStorage.removeItem(WEATHER_SESSION_CACHE_KEY)
      return null
    }
    return cache
  } catch {
    return null
  }
}

function writeSessionWeatherCache(weather: WeatherState) {
  if (typeof window === "undefined") return null
  try {
    const fetchedAt = Date.now()
    window.sessionStorage.setItem(
      WEATHER_SESSION_CACHE_KEY,
      JSON.stringify({ fetchedAt, weather })
    )
    return fetchedAt
  } catch {
    return null
  }
}

function getWeatherDescription(code: number) {
  const english: Record<number, string> = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Freezing fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Heavy rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  }
  return english[code] ?? "Unknown"
}

function WeatherIcon({
  code,
  isDay,
  className,
}: {
  code: number
  isDay: boolean
  className?: string
}) {
  if (code === 0)
    return isDay ? (
      <CloudSun className={className} />
    ) : (
      <MoonStar className={className} />
    )
  if ([1, 2, 3].includes(code)) return <Cloud className={className} />
  if ([45, 48].includes(code)) return <CloudFog className={className} />
  if ([51, 53, 55, 56, 57].includes(code))
    return <CloudDrizzle className={className} />
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return <CloudRain className={className} />
  return <Cloud className={className} />
}

function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherState | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const loadWeather = async () => {
      const cached = readSessionWeatherCache()
      if (cached) {
        if (mounted) setWeather(cached.weather)
        return
      }
      try {
        const response = await fetch(RAS_AL_KHAIMAH_WEATHER_URL, {
          cache: "no-store",
        })
        if (!response.ok) throw new Error("Failed")
        const payload = (await response.json()) as WeatherPayload
        const next: WeatherState = {
          apparentTemperature: payload.current.apparent_temperature,
          humidity: payload.current.relative_humidity_2m,
          isDay: payload.current.is_day === 1,
          temperature: payload.current.temperature_2m,
          temperatureUnit: payload.current_units.temperature_2m,
          time: payload.current.time,
          weatherCode: payload.current.weather_code,
          windSpeed: payload.current.wind_speed_10m,
          windUnit: payload.current_units.wind_speed_10m,
        }
        writeSessionWeatherCache(next)
        if (mounted) setWeather(next)
      } catch {
        if (mounted) setError("Could not load weather")
      }
    }
    void loadWeather()
    return () => {
      mounted = false
    }
  }, [])

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-[10px] text-foreground/40">
        {error}
      </div>
    )
  }
  if (!weather) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="sm" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <WeatherIcon
            code={weather.weatherCode}
            isDay={weather.isDay}
            className="h-7 w-7 text-foreground/80 transition-colors duration-500 select-none group-hover:text-foreground"
          />
          <p className="text-[12px] font-medium text-foreground/70 transition-colors duration-500 group-hover:text-foreground/90">
            {getWeatherDescription(weather.weatherCode)}
          </p>
        </div>
        <p className="text-[28px] font-bold text-foreground select-none">
          {Math.round(weather.temperature)}°
        </p>
      </div>

      <div className="flex gap-4 border-t border-border/[0.06] pt-3 select-none">
        <div className="flex items-center gap-1.5">
          <Droplets className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-semibold text-foreground/60 transition-colors duration-500 group-hover:text-foreground/80">
            {weather.humidity}%
          </span>
        </div>
        <div className="flex items-center gap-1.5 select-none">
          <Wind className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-semibold text-foreground/60 transition-colors duration-500 group-hover:text-foreground/80">
            {Math.round(weather.windSpeed)} {weather.windUnit}
          </span>
        </div>
      </div>
    </div>
  )
}

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
    <span className="inline-block min-h-[1.5em]">
      {words[index].substring(0, subIndex)}
      <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-foreground/50 align-middle" />
    </span>
  )
}

export default function Page() {
  const [phase, setPhase] = useState<"intro" | "bento">("intro")
  const [isTechModalOpen, setIsTechModalOpen] = useState(false)
  const [isStackHovered, setIsStackHovered] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTechModalOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setPhase("bento"), 800)
    return () => clearTimeout(t)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    toast({
      title: "Email copied",
      description: "Successfully copied to clipboard!",
      variant: "success",
    })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-5 lg:p-8">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            variants={introContainerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex -translate-y-5 items-center gap-6"
          >
            <motion.div variants={blurIn}>
              <Image
                src="/pfp.webp"
                alt="Adrien"
                width={200}
                height={200}
                draggable={false}
                className="rounded-full border-4 border-border/10 shadow-2xl duration-300 select-none hover:scale-105"
              />
            </motion.div>

            <motion.div variants={blurIn}>
              <h1 className="flex items-center gap-3 font-sans text-4xl font-extrabold text-foreground">
                Hello, I&apos;m Adrien
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                  className="inline-block origin-bottom-right select-none"
                >
                  👋
                </motion.span>
              </h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="bento"
            variants={gridVars}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "192px 192px 158px",
              gap: "16px",
              width: "100%",
              maxWidth: "1100px",
            }}
          >
            <BentoCard
              id="bento-hero"
              style={{ gridColumn: "1 / 3", gridRow: "1" }}
              className="justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" />
                  <span className="text-[10px] font-semibold tracking-widest text-foreground/30 uppercase"></span>
                </div>
                <h1 className="flex items-center text-[28px] leading-tight font-bold tracking-tight text-foreground select-none">
                  Hi, I&apos;m Adrien
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                    className="inline-block origin-bottom-right translate-x-1 -translate-y-1 select-none"
                  >
                    👋
                  </motion.span>
                </h1>
                <div className="min-h-[20px] max-w-[260px] text-sm leading-relaxed text-foreground/45 transition-colors duration-500 group-hover:text-foreground/80">
                  <Typewriter
                    words={[
                      "Full-stack Developer",
                      "Next.js Expert",
                      "Javascript Wizard",
                      "Discord Bot Developer",
                    ]}
                  />
                </div>
              </div>
              <TransitionLink
                href="/projects"
                className="group/btn inline-flex w-fit items-center gap-1.5 text-xs text-foreground/35 transition-colors duration-200 hover:text-foreground/65"
              >
                <span>See my work</span>
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </TransitionLink>
            </BentoCard>

            <BentoCard
              id="bento-phone"
              style={{ gridColumn: "3", gridRow: "1" }}
            >
              <DiscordPresence />
            </BentoCard>

            <BentoCard
              id="bento-social"
              style={{ gridColumn: "4", gridRow: "1 / 3" }}
              className="flex flex-col"
            >
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-foreground/25 uppercase transition-colors duration-500 group-hover:text-foreground/50">
                Find me on
              </p>
              <div className="flex flex-1 flex-col justify-start gap-3">
                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative flex w-full items-center justify-between rounded-xl border border-border bg-foreground/[0.02] p-2.5 transition-all duration-300 hover:border-border hover:bg-foreground/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.04]">
                        <Icon className="text-[15px] text-foreground" />
                      </div>
                      <span className="text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                        {label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="mr-1 text-foreground/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/60"
                    />
                  </a>
                ))}
              </div>
            </BentoCard>

            <BentoCard
              id="bento-photo"
              style={{ gridColumn: "1", gridRow: "2" }}
              className="p-0"
            >
              <Image
                src="/pfp.webp"
                alt="Adrien"
                fill
                draggable={false}
                className="object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </BentoCard>

            <BentoCard
              id="bento-projects"
              style={{ gridColumn: "2 / 4", gridRow: "2" }}
              className="flex flex-col"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-widest text-foreground/25 uppercase transition-colors duration-500 group-hover:text-foreground/50">
                  Featured Projects
                </p>
                <TransitionLink
                  href="/projects"
                  className="group/btn inline-flex w-fit items-center gap-1.5 text-[11px] text-foreground/30 transition-colors hover:text-foreground/60"
                >
                  <span>View all</span>
                  <ArrowUpRight
                    size={11}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </TransitionLink>
              </div>

              <div className="relative z-10 mt-3 flex flex-1 flex-col gap-2">
                <a
                  href="https://touchgrass.giize.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-foreground/[0.02] p-2 transition-colors hover:border-border/[0.1] hover:bg-foreground/[0.04]"
                >
                  <div className="flex aspect-square h-full shrink-0 items-center justify-center rounded-lg bg-black transition-colors group-hover:bg-black/80">
                    <span className="text-[8px] text-foreground/20 uppercase">
                      <Image
                        src="/touchgrass.png"
                        alt="Touchgrass"
                        width={40}
                        height={40}
                        className="object-cover select-none"
                      />
                    </span>
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden">
                    <h3 className="truncate text-[11px] font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
                      Touchgrass
                    </h3>
                    <p className="truncate text-[9px] text-foreground/40 transition-colors duration-500 group-hover:text-foreground/70">
                      A fun way to expose your discord servers to your friends!
                    </p>
                  </div>
                </a>

                <a
                  href="https://tchscreenapp.is-a.software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-foreground/[0.02] p-2 transition-colors hover:border-border/[0.1] hover:bg-foreground/[0.04]"
                >
                  <div className="flex aspect-square h-full shrink-0 items-center justify-center rounded-lg bg-foreground/[0.08] transition-colors group-hover:bg-foreground/[0.12]">
                    <span className="text-[8px] text-foreground/20 uppercase">
                      <Image
                        src="https://tchscreenapp.is-a.software/favicon.ico"
                        alt="Touchscreen Manager"
                        width={40}
                        height={40}
                        className="object-cover select-none"
                      />
                    </span>
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden">
                    <h3 className="truncate text-[11px] font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
                      Touchscreen Manager
                    </h3>
                    <p className="truncate text-[9px] text-foreground/40 transition-colors duration-500 group-hover:text-foreground/70">
                      An electron based app to manage touchscreens and prevent
                      input issues on games like Roblox.
                    </p>
                  </div>
                </a>
              </div>
            </BentoCard>

            <BentoCard
              id="bento-weather"
              style={{ gridColumn: "1", gridRow: "3" }}
              className="flex flex-col"
            >
              <p className="text-[10px] font-semibold tracking-widest text-foreground/25 uppercase transition-colors duration-500 select-none group-hover:text-foreground/50">
                Ras Al Khaimah
              </p>
              <div className="mt-3 flex-1">
                <WeatherWidget />
              </div>
            </BentoCard>

            <BentoCard
              id="bento-stack"
              style={{ gridColumn: "2 / 4", gridRow: "3" }}
              className="flex flex-col overflow-hidden"
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => setIsStackHovered(false)}
            >
              <button
                onClick={() => setIsTechModalOpen(true)}
                className={cn(
                  "mb-3 flex w-fit cursor-pointer items-center gap-0 text-[10px] font-semibold tracking-widest uppercase transition-all",
                  isStackHovered ? "text-foreground" : "text-foreground/25"
                )}
              >
                <span>Tech Stack</span>
                <motion.div
                  initial={{ width: 0, opacity: 0, x: -2 }}
                  animate={
                    isStackHovered
                      ? { width: "auto", opacity: 1, x: 2 }
                      : { width: 0, opacity: 0, x: 10 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center overflow-hidden"
                >
                  <ArrowLeft size={10} className="ml-1" />
                </motion.div>
              </button>
              <div className="relative flex w-full flex-1 items-center overflow-hidden">
                <TechStackCarousel />
              </div>
            </BentoCard>

            <BentoCard
              id="bento-cta"
              style={{ gridColumn: "4", gridRow: "3" }}
              className="justify-between"
            >
              <p className="text-sm leading-snug font-medium text-foreground/75 transition-colors duration-500 group-hover:text-foreground">
                Have a project in mind?
              </p>
              <TransitionLink
                id="contact-nav-btn"
                href="/contact"
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-[10px]",
                  "border border-border bg-foreground/[0.06] px-3 py-2.5",
                  "translate-y-9 text-[11px] font-semibold text-foreground/60",
                  "transition-all duration-150 hover:border-border hover:bg-foreground/[0.11] hover:text-foreground/85 active:scale-95"
                )}
              >
                <>
                  <Mail size={12} className="shrink-0" />
                  <span>Contact me</span>
                </>
              </TransitionLink>
            </BentoCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTechModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTechModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border bg-accent/30 p-4 px-6">
                <h2 className="text-sm font-bold tracking-widest text-foreground/70 uppercase">
                  Technology Directory
                </h2>
                <button
                  onClick={() => setIsTechModalOpen(false)}
                  className="rounded-full p-1 text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="no-scrollbar grid max-h-[75vh] grid-cols-1 gap-4 overflow-y-auto p-8 md:grid-cols-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: (index % 3) * 0.05,
                    }}
                    className="group flex h-full flex-col items-start justify-between gap-4 rounded-2xl border border-border/50 bg-foreground/[0.02] p-5 transition-all hover:border-border hover:bg-foreground/[0.05]"
                  >
                    <div className="flex w-full items-center gap-4">
                      <TechIcon
                        name={tech.name}
                        icon={tech.icon}
                        className="text-[30px]"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-foreground">
                          {tech.name}
                        </h3>
                        <p className="text-[10px] tracking-tight text-foreground/50">
                          {tech.category}
                        </p>
                      </div>
                    </div>
                    <p className="w-full border-t border-border/5 pt-3 text-xs leading-relaxed text-foreground/60">
                      {tech.summary}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-border/20 bg-accent/20 p-4 px-6 text-center">
                <p className="text-[10px] text-foreground/30 italic">
                  A collection of tools and frameworks I use to build robust
                  digital experiences.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
