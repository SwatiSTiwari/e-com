import mongoose from "mongoose"
import Product from "../models/Product.js"
import dotenv from "dotenv"

dotenv.config()

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium wireless headphones with noise cancellation",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 12.99,
    description: "Fast charging USB-C cable, 2 meters",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 34.99,
    description: "Ergonomic aluminum laptop stand for all sizes",
    category: "Office",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 99.99,
    description: "RGB backlit mechanical keyboard with blue switches",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 29.99,
    description: "Smooth tracking wireless mouse with 2.4GHz",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
  {
    id: 6,
    name: "Monitor Lamp",
    price: 44.99,
    description: "LED monitor lamp reduces eye strain",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120b?w=500",
  },
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
    console.log("Connected to MongoDB")

    // Clear existing products
    await Product.deleteMany({})
    console.log("Cleared existing products")

    // Insert mock products
    await Product.insertMany(mockProducts)
    console.log("Seeded database with mock products")

    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
