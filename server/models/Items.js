import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String },
    inStock: { type: Boolean, default: true },
    tags: [{ type: String }],
    trending: { type: Boolean, default: false },
    quickView: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
