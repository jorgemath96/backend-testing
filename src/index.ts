import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Import routers
import helloRouter from "./routes/hello.router";
import authRouter from "./routes/auth.router";
import booksRouter from "./routes/books.router";
import isAuth from "./middlewares/auth.middleware";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Information for development
app.use(morgan("dev"));
app.use(isAuth);
app.use("/", helloRouter);
app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
