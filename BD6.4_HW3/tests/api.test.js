const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
} = require("../apiFunctions");

jest.mock("../apiFunctions", () => ({
  getAllArticles: jest.fn(),
  getArticleById: jest.fn(),
  getAllComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(3010, resolve));
}, 11000);

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe("API Endpoint Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Articles Tests
  describe("Articles API Tests", () => {
    it("should return 404 when no articles are found", async () => {
      getAllArticles.mockReturnValue([]);
      const response = await request(server).get("/articles");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No articles found" });
    });

    it("should return all articles", async () => {
      const mockArticles = [
        { id: 1, title: "Introduction to JavaScript", author: "Jane Smith" },
        { id: 2, title: "Advanced CSS Techniques", author: "Tom Brown" },
      ];
      getAllArticles.mockReturnValue(mockArticles);
      const response = await request(server).get("/articles");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockArticles);
    });

    it("should return 404 when an article is not found by ID", async () => {
      getArticleById.mockReturnValue(undefined);
      const response = await request(server).get("/articles/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Article not found" });
    });

    it("should return an article by ID", async () => {
      const mockArticle = {
        id: 1,
        title: "Introduction to JavaScript",
        author: "Jane Smith",
      };
      getArticleById.mockReturnValue(mockArticle);
      const response = await request(server).get("/articles/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockArticle);
    });
  });

  // Comments Tests
  describe("Comments API Tests", () => {
    it("should return 404 when no comments are found", async () => {
      getAllComments.mockReturnValue([]);
      const response = await request(server).get("/comments");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No comments found" });
    });

    it("should return all comments", async () => {
      const mockComments = [
        { id: 1, articleId: 1, content: "Very informative article!" },
        { id: 2, articleId: 2, content: "Great tips on CSS!" },
      ];
      getAllComments.mockReturnValue(mockComments);
      const response = await request(server).get("/comments");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockComments);
    });

    it("should return 404 when a comment is not found by ID", async () => {
      getCommentById.mockReturnValue(undefined);
      const response = await request(server).get("/comments/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Comment not found" });
    });

    it("should return a comment by ID", async () => {
      const mockComment = {
        id: 1,
        articleId: 1,
        content: "Very informative article!",
      };
      getCommentById.mockReturnValue(mockComment);
      const response = await request(server).get("/comments/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockComment);
    });
  });

  // Users Tests
  describe("Users API Tests", () => {
    it("should return 404 when a user is not found by ID", async () => {
      getUserById.mockReturnValue(undefined);
      const response = await request(server).get("/users/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "User not found" });
    });

    it("should return a user by ID", async () => {
      const mockUser = {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
      };
      getUserById.mockReturnValue(mockUser);
      const response = await request(server).get("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUser);
    });
  });
});
