const express = require("express");
const cors = require("cors");
const { getAllBooks, getBooksById } = require("./controllers");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/books", async (req, res) => {
  const books = getAllBooks();
  res.json(books);
});

app.get("/books/details/:id", async (req, res) => {
  const book = getBooksById(req.params.id);
  res.json({ book });
});

module.exports = { app };
