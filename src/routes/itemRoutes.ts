import express, { Request, Response } from "express";
import ItemModel from "../models/Item";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const item = new ItemModel(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: (error as Error).message || "Error creating item" });
  }
});

// Get all items
router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: (error as Error).message || "Error retrieving items" });
  }
});

// Update an item by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: (error as Error).message || "Error updating item" });
  }
});

// Delete an item by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: (error as Error).message || "Error deleting item" });
  }
});

export default router;
