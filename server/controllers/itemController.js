import Item from "../models/Items.js";

// GET all items with filters
export const getItems = async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      trending,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (inStock) {
      filter.inStock = inStock === "true";
    }

    if (trending) {
      filter.trending = trending === "true";
    }

    const items = await Item.find(filter).sort({ createdAt: -1 }); // latest first
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err.message);
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};

// CREATE item (admin only)
export const createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating item:", err.message);
    res.status(400).json({ message: "Error creating item", error: err.message });
  }
};

// UPDATE item
export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating item", error: err.message });
  }
};

// DELETE item
// DELETE item (Admin only)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Ensure only admins can delete
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admin only" });
    }

    const deleted = await Item.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", deleted });
  } catch (err) {
    console.error("Error deleting item:", err.message);
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};

