"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LanyardActivityAssets {
  large_image?: string
  large_text?: string
  small_image?: string
  small_text?: string
}

interface LanyardActivity {
  application_id?: string
  name: string
  state?: string
  details?: string
  assets?: LanyardActivityAssets
  type: number
}

interface LanyardUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
}

interface LanyardData {
  data?: {
    discord_user: LanyardUser
    discord_status: "online" | "idle" | "dnd" | "offline"
    activities: LanyardActivity[]
    active_on_discord_mobile: boolean
  }
}

export default function DiscordPresence() {
  const [presence, setPresence] = useState<LanyardData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await fetch(
          "https://api.lanyard.rest/v1/users/718185533460840450"
        )
        const json = await res.json()
        console.log("Discord Presence Data:", json)
        setPresence(json)
        setIsLoaded(true)
      } catch (err) {
        console.error("Failed to fetch Discord presence:", err)
      }
    }

    fetchPresence()
    const interval = setInterval(fetchPresence, 15000)
    return () => clearInterval(interval)
  }, [])

  const { discord_user, discord_status, activities, active_on_discord_mobile } = presence?.data || {}
  const activity = activities?.find((a) => a.type === 0 || a.type === 2) ?? null

  const statusColors = {
    online: "bg-[#479a6d]",
    idle: "bg-[#f5b358]",
    dnd: "bg-[#ce3853]",
    offline: "bg-[#817796]",
  }

  const statusDisplay = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline",
  }

  const avatarSrc = discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`
    : `/pfp.webp`

  return (
    <div className="group pointer-events-auto flex h-full w-full flex-col justify-start">
      <AnimatePresence mode="wait">
        {!isLoaded || !presence?.data ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full flex-col justify-start"
          >
            <div className="mb-2 flex items-center gap-4">
              <div className="h-[38px] w-[38px] shrink-0 rounded-full bg-foreground/10" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="h-3 w-20 rounded bg-foreground/10" />
                <div className="h-2 w-12 rounded bg-foreground/10" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 rounded-[18px] bg-foreground/[0.03] p-5">
              <div className="h-[42px] w-[42px] shrink-0 rounded-lg bg-foreground/10" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="h-2.5 w-24 rounded bg-foreground/10" />
                <div className="h-2 w-20 rounded bg-foreground/10" />
                <div className="h-2 w-16 rounded bg-foreground/10" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full flex-col justify-start"
          >
      <div className="mb-2 flex items-center gap-4">
        <div className="relative select-none">
          <Image
            src={avatarSrc}
            alt="Discord Avatar"
            width={38}
            height={38}
            draggable={false}
            className="rounded-full shadow-sm"
          />
          {active_on_discord_mobile ? (
            <div className="absolute -bottom-5 -right-4 z-12 h-11 w-11">
              <Image
                key={discord_status}
                src={
                  discord_status === "dnd" ? "/dnd.png" : "/online.png"
                }
                alt="Mobile Status"
                width={100}
                height={100}
                draggable={false}
                className="object-contain"
              />
            </div>
          ) : (
            <span
              className={cn(
                "absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-card ring-1 ring-foreground/10 flex items-center justify-center",
                statusColors[discord_status ?? "offline"]
              )}
            >
              {discord_status === "dnd" && (
                <div className="h-[2px] w-[5px] bg-black/40 rounded-full" />
              )}
              {discord_status === "offline" && (
                <div className="h-[3.5px] w-[3.5px] bg-card rounded-full" />
              )}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="truncate text-[13px] leading-tight font-semibold text-foreground/90">
            @{discord_user?.username}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-foreground/50 capitalize transition-colors duration-500 select-none group-hover:text-foreground/80">
            {statusDisplay[discord_status ?? "offline"]}
          </p>
        </div>
      </div>

      {activity ? (
        <div className="mt-3 flex items-center gap-4 rounded-[18px] bg-foreground/[0.03] p-5 transition-all duration-300 hover:bg-foreground/[0.05]">
          {activity.assets?.large_image ? (
            <Image
              src={
                activity.assets.large_image.startsWith("mp:external")
                  ? activity.assets.large_image.replace(
                      "mp:external/",
                      "https://media.discordapp.net/external/"
                    )
                  : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
              }
              alt={activity.assets.large_text || "Activity"}
              width={42}
              height={42}
              draggable={false}
              className="shrink-0 rounded-lg border border-border/10"
            />
          ) : (
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-foreground/10">
              <span className="text-[11px] text-foreground/50">?</span>
            </div>
          )}
          <div className="flex min-w-0 flex-col justify-center gap-0.5">
            <p className="truncate text-[11px] leading-tight font-bold text-foreground/80">
              {activity.name}
            </p>
            {activity.details && (
              <p className="truncate text-[10px] leading-tight text-foreground/50 transition-colors duration-500 group-hover:text-foreground/80">
                {activity.details}
              </p>
            )}
            {activity.state && (
              <p className="truncate text-[10px] leading-tight text-foreground/40 transition-colors duration-500 group-hover:text-foreground/70">
                {activity.state}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-center rounded-[18px] bg-foreground/[0.02] p-8 select-none">
          <p className="text-[10px] text-foreground/30 italic">
            Not doing anything...
          </p>
        </div>
      )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
