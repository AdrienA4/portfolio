  "use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertCircle, Info } from "lucide-react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "success" | "destructive" | "warning"
  open: boolean
  onOpenChange: (open: boolean) => void
}

const icons = {
  default: Info,
  success: Check,
  destructive: AlertCircle,
  warning: AlertCircle,
}

const colors = {
  default: "bg-card border-border",
  success: "bg-card border-border",
  destructive: "bg-destructive/10 border-destructive/20 text-destructive",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",
}

const iconColors = {
  default: "text-neutral-400",
  success: "text-foreground",
  destructive: "text-red-400",
  warning: "text-yellow-400",
}

const titleColors = {
  default: "text-foreground",
  success: "text-foreground",
  destructive: "text-foreground",
  warning: "text-foreground",
}

const descriptionColors = {
  default: "text-foreground/70",
  success: "text-foreground/70",
  destructive: "text-foreground/70",
  warning: "text-foreground/70",
}

const closeButtonColors = {
  default: "hover:bg-foreground/10 text-foreground/50",
  success:
    "text-foreground/55 hover:bg-black/5",
  destructive: "hover:bg-foreground/10 text-foreground/50",
  warning: "hover:bg-foreground/10 text-foreground/50",
}

const progressTrackColors = {
  default: "bg-foreground/10",
  success: "bg-black/10",
  destructive: "bg-foreground/10",
  warning: "bg-foreground/10",
}

const progressFillColors = {
  default: "bg-foreground/30",
  success: "bg-black/35",
  destructive: "bg-foreground/30",
  warning: "bg-foreground/30",
}

export function SonnerToast({
  title,
  description,
  variant = "default",
  open,
  onOpenChange,
}: ToastProps) {
  const Icon = icons[variant]
  const colorClass = colors[variant]
  const iconColorClass = iconColors[variant]
  const titleColorClass = titleColors[variant]
  const descriptionColorClass = descriptionColors[variant]
  const closeButtonColorClass = closeButtonColors[variant]
  const progressTrackColorClass = progressTrackColors[variant]
  const progressFillColorClass = progressFillColors[variant]

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.3 }}
          className={`fixed right-4 bottom-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-2xl select-none ${colorClass}`}
        >
          <Icon className={`mt-0.5 h-5 w-5 ${iconColorClass}`} />
          <div className="flex-1">
            {title && (
              <div className={`font-medium ${titleColorClass}`}>{title}</div>
            )}
            {description && (
              <div className={`mt-0.5 text-sm ${descriptionColorClass}`}>
                {description}
              </div>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className={`rounded-lg p-1 transition-colors ${closeButtonColorClass}`}
          >
            <X className="h-4 w-4" />
          </button>
          <div
            className={`absolute bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 overflow-hidden rounded-full ${progressTrackColorClass}`}
          >
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className={`h-full ${progressFillColorClass}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type ToastContextType = {
  toast: (props: Omit<ToastProps, "open" | "onOpenChange">) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [props, setProps] = React.useState<
    Omit<ToastProps, "open" | "onOpenChange">
  >({})

  const toast = React.useCallback(
    (newProps: Omit<ToastProps, "open" | "onOpenChange">) => {
      setProps(newProps)
      setOpen(true)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <SonnerToast {...props} open={open} onOpenChange={setOpen} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
