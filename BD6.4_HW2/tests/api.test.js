const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getAllGames, getGameById } = require("../games");
const { getAllGenres, getGenreById } = require("../genres");

jest.mock("../games", () => ({
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

jest.mock("../genres", () => ({
  getAllGenres: jest.fn(),
  getGenreById: jest.fn(),
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

  // Games Tests
  describe("Games API Tests", () => {
    it("should return 404 when no games are found", async () => {
      getAllGames.mockReturnValue([]);
      const response = await request(server).get("/api/games");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No games found" });
    });

    it("should return all games", async () => {
      const mockGames = [
        { id: 1, title: "The Legend of Zelda", genreId: 1 },
        { id: 2, title: "Super Mario Bros", genreId: 2 },
      ];
      getAllGames.mockReturnValue(mockGames);
      const response = await request(server).get("/api/games");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockGames);
    });

    it("should return 404 when game is not found by ID", async () => {
      getGameById.mockReturnValue(undefined);
      const response = await request(server).get("/api/games/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Game not found" });
    });

    it("should return a game by ID", async () => {
      const mockGame = { id: 1, title: "The Legend of Zelda", genreId: 1 };
      getGameById.mockReturnValue(mockGame);
      const response = await request(server).get("/api/games/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockGame);
    });
  });

  // Genres Tests
  describe("Genres API Tests", () => {
    it("should return 404 when no genres are found", async () => {
      getAllGenres.mockReturnValue([]);
      const response = await request(server).get("/api/genres");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No genres found" });
    });

    it("should return all genres", async () => {
      const mockGenres = [
        { id: 1, name: "Action-Adventure" },
        { id: 2, name: "Platformer" },
      ];
      getAllGenres.mockReturnValue(mockGenres);
      const response = await request(server).get("/api/genres");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockGenres);
    });

    it("should return 404 when genre is not found by ID", async () => {
      getGenreById.mockReturnValue(undefined);
      const response = await request(server).get("/api/genres/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Genre not found" });
    });

    it("should return a genre by ID", async () => {
      const mockGenre = { id: 1, name: "Action-Adventure" };
      getGenreById.mockReturnValue(mockGenre);
      const response = await request(server).get("/api/genres/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockGenre);
    });
  });
});
