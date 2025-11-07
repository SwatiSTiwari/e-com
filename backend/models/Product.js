import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Product", productSchema)
