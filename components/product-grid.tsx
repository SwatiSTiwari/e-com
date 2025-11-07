"use client"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/wireless-headphones.png",
    description: "Premium noise-cancelling headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "/smartwatch-lifestyle.png",
    description: "Advanced fitness tracking",
  },
  {
    id: 3,
    name: "USB-C Cable",
    price: 19.99,
    image: "/usb-c-cable.jpg",
    description: "Fast charging cable",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 49.99,
    image: "/portable-charger-power-bank.jpg",
    description: "20000mAh capacity",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/bluetooth-speaker.jpg",
    description: "Waterproof and portable",
  },
  {
    id: 6,
    name: "Screen Protector",
    price: 14.99,
    image: "/screen-protector-tempered-glass.jpg",
    description: "Anti-glare protection",
  },
  {
    id: 7,
    name: "Phone Stand",
    price: 24.99,
    image: "/phone-stand-holder.jpg",
    description: "Adjustable and sturdy",
  },
  {
    id: 8,
    name: "Wireless Charger",
    price: 39.99,
    image: "/wireless-charger.png",
    description: "Fast wireless charging",
  },
]

export default function ProductGrid({ onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRODUCTS.map((product) => (
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
