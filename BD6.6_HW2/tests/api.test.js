const request = require("supertest");
let http = require("http");
const { app } = require("../index");
const { getAllGames } = require("../controllers");
let server;

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllGames: jest.fn(),
}));

beforeAll(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(3001, resolve));
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
});
let mockGameData = [
    {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
    },
    {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
    },
    {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
    },
];
describe("Controller Fun Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return all the games", async () => {
        getAllGames.mockReturnValue(mockGameData);
        let result = await getAllGames();
        expect(result).toEqual(mockGameData);
        expect(result.length).toBe(3);
    });
});

describe("API Endpoint Tests", () => {
    it("Should return all the game in get Call", async () => {
        const res = await request(server).get("/games");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            games: [
                {
                    gameId: 1,
                    title: "The Legend of Zelda: Breath of the Wild",
                    genre: "Adventure",
                    platform: "Nintendo Switch",
                },
                {
                    gameId: 2,
                    title: "Red Dead Redemption 2",
                    genre: "Action",
                    platform: "PlayStation 4",
                },
                {
                    gameId: 3,
                    title: "The Witcher 3: Wild Hunt",
                    genre: "RPG",
                    platform: "PC",
                },
            ],
        });
        expect(res.body.games.length).toBe(3);
    });

    it("Get /game/details/:id should get game by Id", async () => {
        const res = await request(server).get("/games/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            game: {
                gameId: 1,
                title: "The Legend of Zelda: Breath of the Wild",
                genre: "Adventure",
                platform: "Nintendo Switch",
            },
        });
    });
});
