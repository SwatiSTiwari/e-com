"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Header({ cartCount = 0 }) {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-primary hover:opacity-80 transition-opacity">
          Shop
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200">
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
