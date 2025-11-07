import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Fetch products from Fake Store API
const fetchFakeStoreProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10")
    if (!response.ok) {
      throw new Error("Failed to fetch from Fake Store API")
    }
    const products = await response.json()
    
    // Transform Fake Store API format to our schema
    return products.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    }))
  } catch (error) {
    console.error("Error fetching from Fake Store API:", error)
    // Fallback to mock data if API fails
    return [
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
    ]
  }
}

// GET all products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find()

    // Seed database with products from Fake Store API if empty
    if (products.length === 0) {
      const fakeStoreProducts = await fetchFakeStoreProducts()
      await Product.insertMany(fakeStoreProducts)
      products = fakeStoreProducts
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
