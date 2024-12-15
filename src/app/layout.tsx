import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Providers"
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
  navbar
}: Readonly<{
  children: React.ReactNode,
  navbar: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen ">
        <Providers>
          {navbar}
          {children}
        </Providers>
      </body>
    </html>
  )
}
