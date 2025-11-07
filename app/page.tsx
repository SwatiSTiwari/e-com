"use client"

import { useState, useEffect } from "react"
import ProductGrid from "@/components/product-grid"
import Header from "@/components/header"

export default function Home() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCart(parsedCart)
      setCartCount(parsedCart.reduce((sum, item) => sum + item.quantity, 0))
    }
  }, [])

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      let updatedCart

      if (existingItem) {
        updatedCart = prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }]
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart))
      setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
      return updatedCart
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Shop Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our curated selection of premium tech accessories and gadgets to enhance your digital lifestyle.
          </p>
        </div>
        <ProductGrid onAddToCart={handleAddToCart} />
      </main>
    </div>
  )
}
