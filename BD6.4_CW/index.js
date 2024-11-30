const express = require("express");
const app = express();
app.use(express.json());
const {
  getAllBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} = require("./book");

// Exercise 1: Get All Books
app.get("/api/books", async (req, res) => {
  try {
    const result = await getAllBooks();
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "No books found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
});

// Exercise 2: Get Book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getBookById(id);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book" });
  }
});

// Exercise 3: Get All Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const result = await getAllReviews();
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ error: "No reviews found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching reviews" });
  }
});

// Exercise 4: Get Review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getReviewById(id);
    if (!result) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

// Exercise 5: Get User by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getUserById(id);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

module.exports = {
  app,
};
