const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
} = require("./apiFunctions");

const app = express();
app.use(express.json());

// API Endpoints

// Get all articles
app.get("/articles", (req, res) => {
  try {
    const articles = getAllArticles();
    if (articles.length === 0) {
      return res.status(404).json({ error: "No articles found" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get article by ID
app.get("/articles/:id", (req, res) => {
  try {
    const article = getArticleById(parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all comments
app.get("/comments", (req, res) => {
  try {
    const comments = getAllComments();
    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found" });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get comment by ID
app.get("/comments/:id", (req, res) => {
  try {
    const comment = getCommentById(parseInt(req.params.id));
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  try {
    const user = getUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = { app };
