import mongoose, { Schema, Document } from "mongoose";

export interface Item extends Document {
  name: string;
  description: string;
  price: number;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<Item>("Item", ItemSchema);
