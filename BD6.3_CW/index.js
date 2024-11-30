const express = require("express");
const app = express();
app.use(express.json());

let reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

// Exercise 1: Get All Reviews
function getAllReviews() {
  return reviews;
}

app.get("/reviews", (req, res) => {
  const result = getAllReviews();
  res.json(result);
});

// Exercise 2: Get Review by ID
function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

app.get("/reviews/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getReviewById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

// Exercise 3: Add a New Review
function addNewReview(content, userId) {
  const newReview = { id: reviews.length + 1, content, userId };
  reviews.push(newReview);
  return newReview;
}

app.post("/reviews/new", (req, res) => {
  const { content, userId } = req.body;
  const result = addNewReview(content, userId);
  res.json(result);
});

// Exercise 4: Get User by ID
function getUserById(id) {
  return users.find((user) => user.id === id);
}

app.get("/users/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getUserById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Exercise 5: Add a New User
function addNewUser(name, email) {
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  return newUser;
}

app.post("/users/new", (req, res) => {
  const { name, email } = req.body;
  const result = addNewUser(name, email);
  res.json(result);
});

module.exports = {
  app,
  getAllReviews,
  getReviewById,
  addNewReview,
  getUserById,
  addNewUser,
};
// Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
