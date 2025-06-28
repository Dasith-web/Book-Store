import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    categories: {
      type: [String],
      default: [],
    },
    coverImageUrl: String,      // store S3 / Cloudinary URL or local path
    description: String,
    publishedDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
