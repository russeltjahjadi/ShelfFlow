import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

import {protect} from "../middleware/authMiddleware.js" 

const router = express.Router();

router.post("/",protect, createProduct);
router.delete("/:id",protect, deleteProduct);
router.get("/", protect, getProducts);
router.put("/:id",protect, updateProduct);

export default router;
