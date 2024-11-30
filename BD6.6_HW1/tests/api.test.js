const request = require("supertest");
let http = require("http");
const { app } = require("../index");
const { getAllMovies } = require("../controllers");
let server;

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllMovies: jest.fn(),
}));

beforeAll(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(3001, resolve));
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
});
let mockMovieData = [
    {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
    },
    {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
    },
    {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
    },
];
describe("Controller Fun Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return all the movies", async () => {
        getAllMovies.mockReturnValue(mockMovieData);
        let result = await getAllMovies();
        expect(result).toEqual(mockMovieData);
        expect(result.length).toBe(3);
    });
});

describe("API Endpoint Tests", () => {
    it("Should return all the movies in get Call", async () => {
        const res = await request(server).get("/movies");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            movies: [
                {
                    movieId: 1,
                    title: "Inception",
                    genre: "Sci-Fi",
                    director: "Christopher Nolan",
                },
                {
                    movieId: 2,
                    title: "The Shawshank Redemption",
                    genre: "Drama",
                    director: "Frank Darabont",
                },
                {
                    movieId: 3,
                    title: "The Godfather",
                    genre: "Crime",
                    director: "Francis Ford Coppola",
                },
            ],
        });
        expect(res.body.movies.length).toBe(3);
    });

    it("Get /movies/details/:id should get movies by Id", async () => {
        const res = await request(server).get("/movies/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            movie: {
                movieId: 1,
                title: "Inception",
                genre: "Sci-Fi",
                director: "Christopher Nolan",
            },
        });
    });
});
