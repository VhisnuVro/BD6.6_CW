const request = require("supertest");
const { app, validateArticle, validateAuthor } = require("../index");
let http = require("http");
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoints to add data", () => {
  it("should add a new article with valid input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  it("should send 400 when adding a new article with invalid input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Content is required and should be a string.");
  });

  it("should add a new author with valid input", async () => {
    await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });

    const res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  it("should send 400 when adding a new author with invalid articleId", async () => {
    const res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 99,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("A valid articleId is required.");
  });

  it("should send 400 when adding a new author with missing name", async () => {
    const res = await request(server).post("/authors").send({
      articleId: 3,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Name is required and should be a string.");
  });
});

describe("Test validation functions", () => {
  it("Should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();

    expect(
      validateArticle({
        title: "Mastering Node.js",
      }),
    ).toBe("Content is required and should be a string.");

    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBe("Title is required and should be a string.");
  });

  it("Should validate author input correctly", () => {
    const mockArticles = [
      { id: 1, title: "Mock Article", content: "Mock Content" },
    ];
    global.articles = mockArticles;

    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 1,
      }),
    ).toBeNull();

    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 99,
      }),
    ).toBe("A valid articleId is required.");

    expect(
      validateAuthor({
        articleId: 1,
      }),
    ).toBe("Name is required and should be a string.");
  });
});
