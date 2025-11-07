import express from "express"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

const router = express.Router()

const getUserId = (req) => {
  return req.headers["user-id"] || "default-user"
}

// GET cart items
router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req)
    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.json({ userId, items: [], total: 0 })
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    res.json({ userId, items: cart.items, total: Number.parseFloat(total.toFixed(2)) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body
    const userId = getUserId(req)

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ error: "Invalid product or quantity" })
    }

    const product = await Product.findOne({ id: productId })
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: qty, price: product.price }],
      })
    } else {
      const existingItem = cart.items.find((item) => item.productId === productId)
      if (existingItem) {
        existingItem.quantity += qty
      } else {
        cart.items.push({ productId, quantity: qty, price: product.price })
      }
    }

    cart.updatedAt = new Date()
    await cart.save()

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    res.json({ userId, items: cart.items, total: Number.parseFloat(total.toFixed(2)) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const userId = getUserId(req)

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId !== Number.parseInt(id))
    cart.updatedAt = new Date()
    await cart.save()

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    res.json({ userId, items: cart.items, total: Number.parseFloat(total.toFixed(2)) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
