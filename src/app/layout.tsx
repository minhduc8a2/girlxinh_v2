import type { Metadata } from "next"
import "./globals.css"
import 'react-photo-view/dist/react-photo-view.css';
import { Providers } from "@/components/Providers"
import NavbarWrapper from "@/components/Navbar/NavbarWrapper"
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen relative">
        <Providers>
          <NavbarWrapper />
          <main className="max-w-7xl container mx-auto px-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
