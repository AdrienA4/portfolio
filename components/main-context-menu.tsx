"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Image from "next/image"
export function MainContextMenu({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 p-0 overflow-hidden border-none bg-transparent shadow-none">
        <ContextMenuItem className="p-0 focus:bg-transparent">
          <Image 
            src="/rimukl4i.gif" 
            alt="gif" 
            width={500} 
            height={500} 
            className="w-full h-auto rounded-3xl"
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
