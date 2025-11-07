"use client"
import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

interface ProductGridProps {
  onAddToCart: (product: Product) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from:", `${API_BASE_URL}/products`)
        const response = await fetch(`${API_BASE_URL}/products`)
        console.log("Response status:", response.status)
        const data = await response.json()
        console.log("Products received:", data.length, data)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden h-80 animate-pulse">
            <div className="w-full h-48 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-6 bg-muted rounded w-1/3" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col hover:translate-y-[-4px] duration-300"
        >
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                className="gap-2 hover:shadow-md transition-shadow duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
