"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ProductGrid from "./components/ProductGrid"
import CartView from "./components/CartView"
import Header from "./components/Header"
import "./App.css"

const API_BASE_URL = "http://localhost:5000/api"

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`)
      const data = await response.json()
      setCartItems(data.items)
      setCartTotal(data.total)
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: quantity }),
      })
      const data = await response.json()
      setCartItems(data.items)
      setCartTotal(data.total)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      setCartItems(data.items)
      setCartTotal(data.total)
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const handleCheckout = async (customerName: string, customerEmail: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          cartItems: cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId)
            return {
              ...item,
              name: product?.name || "Unknown Product",
            }
          }),
        }),
      })
      const data = await response.json()
      if (data.success) {
        setCartItems([])
        setCartTotal(0)
        setShowCheckout(false)
        setShowCart(false)
        return data.receipt
      }
    } catch (error) {
      console.error("Error during checkout:", error)
    }
  }

  return (
    <div className="app">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} isCartOpen={showCart} />

      <main className="main-content">
        {showCart ? (
          <CartView
            cartItems={cartItems}
            products={products}
            total={cartTotal}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={() => setShowCheckout(true)}
            onBackToShop={() => setShowCart(false)}
          />
        ) : showCheckout ? (
          <CheckoutForm
            cartItems={cartItems}
            total={cartTotal}
            products={products}
            onCheckout={handleCheckout}
            onBack={() => setShowCheckout(false)}
          />
        ) : loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </main>
    </div>
  )
}

function CheckoutForm({ cartItems, total, products, onCheckout, onBack }: any) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const receiptData = await onCheckout(name, email)
    setReceipt(receiptData)
    setLoading(false)
  }

  if (receipt) {
    return (
      <div className="checkout-container">
        <div className="receipt-modal">
          <h2>Order Confirmation</h2>
          <div className="receipt-content">
            <p>
              <strong>Order ID:</strong> {receipt.orderId}
            </p>
            <p>
              <strong>Customer:</strong> {receipt.customerName}
            </p>
            <p>
              <strong>Email:</strong> {receipt.customerEmail}
            </p>
            <p>
              <strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}
            </p>

            <div className="receipt-items">
              <h3>Items</h3>
              {receipt.items.map((item: any) => (
                <div key={item.productId} className="receipt-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="receipt-total">
              <strong>Total:</strong>
              <strong>${receipt.total.toFixed(2)}</strong>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <button className="btn btn-secondary" onClick={onBack}>
        Back to Cart
      </button>

      <div className="checkout-form">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item: any) => {
              const product = products.find((p: any) => p.id === item.productId)
              return (
                <div key={item.productId} className="summary-item">
                  <span>
                    {product?.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            })}
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
