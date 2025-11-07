"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"

export default function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setOrderComplete(true)
    localStorage.removeItem("cart")
    setIsSubmitting(false)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-primary mx-auto animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been received and will be shipped soon. A confirmation email
              has been sent to your inbox.
            </p>
            <Link href="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const shipping = cart.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.length} />
      <main className="container mx-auto px-4 py-12">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-primary mb-8 hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Billing Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                <Input
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input placeholder="City" name="city" value={formData.city} onChange={handleInputChange} required />
                  <Input
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  <Input placeholder="ZIP" name="zip" value={formData.zip} onChange={handleInputChange} required />
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Payment Information
                </h2>
                <Input
                  placeholder="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="CVC"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-8">
                  {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Order Summary</h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-6 pb-6 border-b border-border">
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
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
