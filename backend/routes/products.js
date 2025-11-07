import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    description: "High-quality sound",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 12.99,
    description: "Fast charging cable",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 34.99,
    description: "Ergonomic design",
    category: "Office",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 99.99,
    description: "RGB backlit",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 29.99,
    description: "Smooth tracking",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
  {
    id: 6,
    name: "Monitor Lamp",
    price: 44.99,
    description: "Reduces eye strain",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120b?w=500",
  },
]

// GET all products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find()

    // Seed database with mock products if empty
    if (products.length === 0) {
      await Product.insertMany(mockProducts)
      products = mockProducts
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
