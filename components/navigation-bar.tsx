"use client"

import { motion } from "framer-motion"
import { Home, Folder, Briefcase, Mail } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TransitionLink } from "@/components/transition-link"

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Folder, label: "Projects", href: "/projects" },
  { icon: Briefcase, label: "Experience", href: "/experience" },
  { icon: Mail, label: "Contact", href: "/contact" },
]

export default function NavigationBar() {
  return (
    <TooltipProvider delayDuration={200}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3,
        }}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-6 rounded-full border border-border/30 bg-foreground/[0.04] backdrop-blur-xl px-8 py-4 shadow-lg">
          {NAV_ITEMS.map(({ icon: Icon, label, href }, index) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TransitionLink
                    href={href}
                    className="group relative flex items-center justify-center rounded-full p-2.5 text-foreground/60 transition-all duration-300 hover:text-foreground"
                  >
                    <span className="relative z-10">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                  </TransitionLink>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={15}
                className="bg-foreground text-background text-[11px] font-medium border-0 shadow-lg"
              >
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.nav>
    </TooltipProvider>
  )
}
