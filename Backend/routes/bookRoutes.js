import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBook);

// Admin‑only routes
router.post("/", verifyToken, verifyAdmin, createBook);
router.put("/:id", verifyToken, verifyAdmin, updateBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

export default router;
