import { Request, Response } from "express";
import NodeCache from "node-cache";
import { Book, Query } from "../../types";
import {
  checkBook,
  checkPhrase,
  checkPrice,
  phraseSearch,
  pricesAverage,
} from "../lib/books.lib";
import books from "../database/MOCK_DATA";

const cacheStorage = new NodeCache({ stdTTL: 36000 });

export const getAverage = async (_: Request, res: Response) => {
  const pricesList = await books.map((item) => item.price);
  const average = await pricesAverage(pricesList);
  return res.status(200).json({ average: average });
};

export const getBooks = async (req: Request, res: Response) => {
  const { price, phrase }: Query = req.query;

  // If exists query "price", returns the books that are more expensive than "price"
  if (price) {
    const isNumber = await checkPrice(price);

    if (!isNumber) return res.status(400).json();
    const priceNumber = price.includes(".")
      ? parseFloat(price)
      : parseInt(price);
    const booksFound = books.filter((item) => item.price > priceNumber);

    if (booksFound.length === 0) return res.status(404).json();

    return res.json(booksFound);
  }

  // If exists query "phrase", returns the books wich author's name contains that "phrase"
  if (phrase) {
    const onlyLetters = await checkPhrase(phrase);

    // Phrase do not contains only letters
    if (!onlyLetters) return res.status(400).json();

    const booksFound = await phraseSearch(phrase);

    // Phrase was not found in author's name
    if (booksFound.length === 0) return res.status(404).json();

    // Return all the books wich author's name contains the "phrase"
    return res.status(200).json(booksFound);
  }

  return res.status(200).json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookFound = await books.filter((item) => item.id === id);

  if (bookFound.length !== 1) return res.status(400).json();

  return res.status(200).json(bookFound);
};

export const addBook = async (req: Request, res: Response) => {
  const book: Book = req.body;
  const aprovedBook = await checkBook(book);
  if (!aprovedBook) return res.status(400).json();

  await cacheStorage.set(book.id, JSON.stringify(book));
  const createdBook = cacheStorage.get(book.id);
  return res.status(201).json(createdBook);
};
