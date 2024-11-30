const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const {
  getAllBooks,
  getBookById,
  getAllReviews,
  getReviewById,
  getUserById,
} = require("../book");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  // Exercise 6: Test get all books with no books
  it("should return 404 when no books are found", async () => {
    getAllBooks.mockResolvedValue([]);
    const result = await request(server).get("/api/books");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "No books found" });
  });

  // Exercise 7: Test get book by non-existent ID
  it("should return 404 when book is not found by ID", async () => {
    getBookById.mockResolvedValue(null);
    const result = await request(server).get("/api/books/9999");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "Book not found" });
  });

  // Exercise 8: Test get all reviews with no reviews
  it("should return 404 when no reviews are found", async () => {
    getAllReviews.mockResolvedValue([]);
    const result = await request(server).get("/api/reviews");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "No reviews found" });
  });

  // Exercise 9: Test get review by non-existent ID
  it("should return 404 when review is not found by ID", async () => {
    getReviewById.mockResolvedValue(undefined);
    const result = await request(server).get("/api/reviews/9999");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "Review not found" });
  });

  // Exercise 10: Test get user by non-existent ID
  it("should return 404 when user is not found by ID", async () => {
    getUserById.mockResolvedValue(undefined);
    const result = await request(server).get("/api/users/9999");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "User not found" });
  });
});
