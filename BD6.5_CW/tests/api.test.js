const request = require("supertest");
const { app, validateBook, validateUser, validateReview } = require("../index");
let http = require("http");
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

beforeAll((done) => {
  server.close(done);
});

describe("Api enpoints to add data", () => {
  it("should add a new user with valid input", async () => {
    const res = await request(server).post("/api/users").send({
      name: "test",
      email: "test@gamil.com",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "test",
      email: "test@gamil.com",
    });
  });

  it("should send 400 when adding a new user with invalid input", async () => {
    const res = await request(server).post("/api/users").send({
      name: "test",
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual("Email is required and it should be a string.");
  });

  it("should add a new book with valid input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: "Test Book",
      author: "Test Author",
    });
  });

  it("should send 400 when adding a new book with invalid input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "Test Book",
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual("Author is required and it should be a string.");
  });

  it("should add a new review with valid input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "This is a test review.",
      userId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      content: "This is a test review.",
      userId: 1,
    });
  });

  it("should send 400 when adding a new review with invalid input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "This is a test review.",
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual("User Id is required and it should be a string.");
  });
});

describe("Test validation functions", () => {
  it("Should validate user input correctly", () => {
    expect(
      validateUser({
        name: "test",
        email: "test@gamil.com",
      }),
    ).toBeNull();

    expect(
      validateUser({
        name: "test",
      }),
    ).toBe("Email is required and it should be a string.");

    expect(
      validateUser({
        email: "test@gamil.com",
      }),
    ).toBe("Name is required and should be a string.");
  });

  it("Should validate book input correctly", () => {
    expect(
      validateBook({
        title: "Test Book",
        author: "Test Author",
      }),
    ).toBeNull();

    expect(
      validateBook({
        title: "Test Book",
      }),
    ).toBe("Author is required and it should be a string.");

    expect(
      validateBook({
        author: "Test Author",
      }),
    ).toBe("Title is required and should be a string.");
  });

  it("Should validate review input correctly", () => {
    expect(
      validateReview({
        content: "This is a test review.",
        userId: 1,
      }),
    ).toBeNull();

    expect(
      validateReview({
        content: "This is a test review.",
      }),
    ).toBe("User Id is required and it should be a string.");

    expect(
      validateReview({
        userId: 1,
      }),
    ).toBe("Content is required and should be a string.");
  });
});
