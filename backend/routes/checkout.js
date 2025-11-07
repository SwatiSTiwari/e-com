import express from "express"
import Order from "../models/Order.js"
import Cart from "../models/Cart.js"

const router = express.Router()

const getUserId = (req) => {
  return req.headers["user-id"] || "default-user"
}

// POST checkout
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body
    const userId = getUserId(req)

    if (!customerName || !customerEmail || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const order = new Order({
      customerName,
      customerEmail,
      items: cartItems,
      total: Number.parseFloat(total.toFixed(2)),
    })

    await order.save()

    // Clear cart after checkout
    await Cart.findOneAndUpdate({ userId }, { items: [] })

    res.json({
      success: true,
      receipt: {
        orderId: order._id,
        customerName,
        customerEmail,
        items: cartItems,
        total: Number.parseFloat(total.toFixed(2)),
        timestamp: order.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
