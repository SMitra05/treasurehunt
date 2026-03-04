import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Treasure Hunt | TECTRIX 2026",
  description: "Official Treasure Hunt Platform for TECTRIX 2026"
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>

        {/* Sci-fi font used in Tectrix website */}

        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

      </head>

      <body>

        {/* Main page content */}

        {children}

      </body>
    </html>
  )
}
