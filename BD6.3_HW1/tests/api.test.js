const request = require("supertest");
const {
  app,
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addNewGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addNewDeveloper: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all games", async () => {
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];
    getAllGames.mockResolvedValue(mockGames);

    const result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it("should retrieve a game by ID", async () => {
    const mockGame = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };
    getGameById.mockResolvedValue(mockGame);

    const result = await request(server).get("/games/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGame);
  });

  it("should return 404 if game not found by ID", async () => {
    getGameById.mockResolvedValue(undefined);

    const result = await request(server).get("/games/details/9999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new game", async () => {
    const newGame = { title: "Half-Life", genre: "FPS", developer: "Valve" };
    const mockGameResponse = { id: 3, ...newGame };
    addNewGame.mockResolvedValue(mockGameResponse);

    const result = await request(server).post("/games/new").send(newGame);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGameResponse);
  });

  it("should retrieve a developer by ID", async () => {
    const mockDeveloper = { id: 1, name: "Nintendo", country: "Japan" };
    getDeveloperById.mockResolvedValue(mockDeveloper);

    const result = await request(server).get("/developers/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloper);
  });

  it("should return 404 if developer not found by ID", async () => {
    getDeveloperById.mockResolvedValue(undefined);

    const result = await request(server).get("/developers/details/9999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new developer", async () => {
    const newDeveloper = { name: "Epic Games", country: "USA" };
    const mockDeveloperResponse = { id: 3, ...newDeveloper };
    addNewDeveloper.mockResolvedValue(mockDeveloperResponse);

    const result = await request(server)
      .post("/developers/new")
      .send(newDeveloper);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloperResponse);
  });
});
