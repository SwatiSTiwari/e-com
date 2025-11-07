"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCart(parsedCart)
      calculateSubtotal(parsedCart)
    }
    setLoading(false)
  }, [])

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total)
  }

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    calculateSubtotal(updatedCart)
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
      return
    }

    const updatedCart = cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    calculateSubtotal(updatedCart)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const shipping = cart.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.length} />
      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary mb-8 hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Shopping Cart</h1>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="divide-y overflow-hidden">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex gap-4 items-start justify-between hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex gap-4 flex-1">
                      <div className="relative w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                        <p className="text-muted-foreground mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border border-border rounded">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 border border-border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-foreground mb-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive/80 p-2 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-6 text-foreground">Order Summary</h2>
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold mb-6 text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
