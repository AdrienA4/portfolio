"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react"
import { TransitionLink } from "@/components/transition-link"
import Image from "next/image"
import { SiGithub, SiDiscord, SiRoblox, SiLeetcode } from "react-icons/si"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-5 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-border bg-card p-8 shadow-2xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <TransitionLink
            href="/"
            className="group flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to home
          </TransitionLink>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04]">
            <Mail size={20} className="text-foreground/80" />
          </div>
        </div>
        <div className="flex items-center justify-center select-none rounded-full">
          <Image
            src="/pfp.webp"
            draggable={false}
            className="rounded-full border border-border"
            alt="Contact"
            width={200}
            height={200}
          />
        </div>
        <p className="text-center text-lg font-semibold translate-y-4 font-sans select-none text-foreground/80">Adrien</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          {[
            { icon: SiGithub, href: "https://github.com/AdrienA4", label: "GitHub" },
            { icon: SiDiscord, href: "https://discord.com/users/718185533460840450", label: "Discord" },
            { icon: SiRoblox, href: "https://www.roblox.com/users/479580010/profile", label: "Roblox" },
            { icon: SiLeetcode, href: "https://leetcode.com/u/GFWlSYQMfz/", label: "LeetCode" }
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-110 hover:border-foreground/30 hover:bg-foreground/[0.05]"
            >
              <Icon className="text-xl text-foreground/60 transition-colors group-hover:text-foreground" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
