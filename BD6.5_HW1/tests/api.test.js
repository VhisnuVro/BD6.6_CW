const request = require("supertest");
const { app, validateGame, validateTournament } = require("../index");
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
  it("should add a new game with valid input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });

  it("should send 400 when adding a new game with invalid input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Genre is required and should be a string.");
  });

  it("should add a new tournament with valid input", async () => {
    await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });

    const res = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });

  it("should send 400 when adding a new tournament with invalid gameId", async () => {
    const res = await request(server).post("/api/tournaments").send({
      name: "Invalid Tournament",
      gameId: 99,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("A valid gameId is required.");
  });

  it("should send 400 when adding a new tournament with missing name", async () => {
    const res = await request(server).post("/api/tournaments").send({
      gameId: 1,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Name is required and should be a string.");
  });
});

describe("Test validation functions", () => {
  it("Should validate game input correctly", () => {
    expect(
      validateGame({
        title: "The Legend of Zelda",
        genre: "Adventure",
      }),
    ).toBeNull();

    expect(
      validateGame({
        title: "The Legend of Zelda",
      }),
    ).toBe("Genre is required and should be a string.");

    expect(
      validateGame({
        genre: "Adventure",
      }),
    ).toBe("Title is required and should be a string.");
  });

  it("Should validate tournament input correctly", () => {
    const mockGames = [{ id: 1, title: "Mock Game", genre: "Mock Genre" }];
    global.games = mockGames;

    expect(
      validateTournament({
        name: "Zelda Championship",
        gameId: 1,
      }),
    ).toBeNull();

    expect(
      validateTournament({
        name: "Zelda Championship",
        gameId: 99,
      }),
    ).toBe("A valid gameId is required.");

    expect(
      validateTournament({
        gameId: 1,
      }),
    ).toBe("Name is required and should be a string.");
  });
});
