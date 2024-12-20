let articles = [
  { id: 1, title: "Introduction to JavaScript", author: "Jane Smith" },
  { id: 2, title: "Advanced CSS Techniques", author: "Tom Brown" },
];

let comments = [{ id: 1, articleId: 1, content: "Very informative article!" }];

let users = [{ id: 1, name: "Alice Johnson", email: "alice@example.com" }];

const getAllArticles = () => articles;
const getArticleById = (id) => articles.find((article) => article.id === id);

const getAllComments = () => comments;
const getCommentById = (id) => comments.find((comment) => comment.id === id);

const getUserById = (id) => users.find((user) => user.id === id);

module.exports = {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
};
