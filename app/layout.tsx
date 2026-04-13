import { Geist_Mono, Inter } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { MainContextMenu } from "@/components/main-context-menu"
import { Analytics } from "@vercel/analytics/next"
import NavigationBar from "@/components/navigation-bar"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Adrien's Portfolio",
  description: "Portfolio",
  openGraph: {
    title: "Adrien's Portfolio",
    description: "Showcasing my work and projects",
    images: [
      {
        url: "/pfp.webp",
        width: 600,
        height: 600,
        alt: "Yazeed",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <ToastProvider>
            <MainContextMenu>
              <NavigationBar />
              <main className="transition-all duration-500">{children}</main>
            </MainContextMenu>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
