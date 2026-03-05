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
      <body>

        {children}

      </body>
    </html>
  )
}
