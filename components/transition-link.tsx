"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, MouseEvent } from "react"

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  id?: string
}

export function TransitionLink({
  href,
  children,
  className,
  id,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()

  const handleTransition = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const main = document.querySelector("main") || document.body
    
    // Start exit animation
    main.style.transition = "opacity 0.5s ease, filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    main.style.opacity = "0"
    main.style.filter = "blur(20px)"

    // Wait for the exit animation to complete
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Perform navigation
    router.push(href.toString())

    // We don't reset the opacity here because template.tsx 
    // will handle the entrance animation for the new page.
    // However, we reset it after a delay just in case the navigation is cancelled 
    // or we are navigating to the same page.
    setTimeout(() => {
        main.style.opacity = "1"
        main.style.filter = "blur(0px)"
    }, 1000)
  }

  // Prefetch the route on hover to make the transition instant
  const handlePrefetch = () => {
    router.prefetch(href.toString())
  }

  return (
    <Link
      href={href}
      onClick={handleTransition}
      onMouseEnter={handlePrefetch}
      className={className}
      id={id}
      {...props}
    >
      {children}
    </Link>
  )
}
