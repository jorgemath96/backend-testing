import { Router } from "express";
import {
  getBooks,
  getBookById,
  getAverage,
  addBook,
} from "../controllers/books.controller";

const router = Router();

// Routes /books /books?price=900 /books?phrase=oz
router.get("/", getBooks);

router.post("/", addBook);

// Routes /books/average
router.get("/average", getAverage);

// Routes /books/3f24cbda-dce7-499d-9b65-4ebd3bff4cd8
router.get("/:id", getBookById);

export default router;
