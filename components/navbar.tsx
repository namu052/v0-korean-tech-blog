'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent via-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white group-hover:shadow-lg transition-shadow">
              ⚡
            </div>
            <span className="font-bold text-xl hidden sm:block text-foreground">
              Tech Blog
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Blog
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
