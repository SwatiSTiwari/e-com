"use client"

import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: number, quantity: number) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>

          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="qty-input"
            />
            <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">
              +
            </button>
          </div>
        </div>

        <button className={`btn btn-primary ${isAdded ? "added" : ""}`} onClick={handleAddToCart}>
          {isAdded ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
