const request = require("supertest");
const {
  app,
  getAllReviews,
  getReviewById,
  addNewReview,
  getUserById,
  addNewUser,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addNewReview: jest.fn(),
  getUserById: jest.fn(),
  addNewUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];
    getAllReviews.mockResolvedValue(mockReviews);

    const result = await request(server).get("/reviews");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviews);
  });

  it("should retrieve a review by ID", async () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };
    getReviewById.mockResolvedValue(mockReview);

    const result = await request(server).get("/reviews/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });
  it("should return 404 if review not found by ID", async () => {
    getReviewById.mockResolvedValue(undefined);

    const result = await request(server).get("/reviews/details/9999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new review", async () => {
    const newReview = { content: "Awesome!", userId: 1 };
    const mockReviewResponse = { id: 3, ...newReview };
    addNewReview.mockResolvedValue(mockReviewResponse);

    const result = await request(server).post("/reviews/new").send(newReview);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviewResponse);
  });

  it("should retrieve a user by ID", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
    getUserById.mockResolvedValue(mockUser);

    const result = await request(server).get("/users/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockUser);
  });

  it("should return 404 if user not found by ID", async () => {
    getUserById.mockResolvedValue(undefined);

    const result = await request(server).get("/users/details/9999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new user", async () => {
    const newUser = { name: "Alice Brown", email: "alice.brown@example.com" };
    const mockUserResponse = { id: 3, ...newUser };
    addNewUser.mockResolvedValue(mockUserResponse);

    const result = await request(server).post("/users/new").send(newUser);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockUserResponse);
  });
});
