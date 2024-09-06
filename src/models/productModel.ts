import { ProductInterface } from "@/interfaces/ProductInterface";
import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: true,
  },
  coverPhoto: String,
  category: {
    type: String,
    require: true,
  },
});

export default mongoose.model<ProductInterface | mongoose.Document>(
  "Product",
  product
);
