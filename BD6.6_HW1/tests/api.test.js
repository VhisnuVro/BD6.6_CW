const request = require("supertest");
let http = require("http");
const { app } = require("../index");
const { getAllMovies, getMovieById } = require("../controllers");
let server;

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllMovies: jest.fn(),
    getMovieById: jest.fn(),
}));

let mockMovieData = [
    {
        movieId: 1,
        title: "Inception",
        director: "Christopher Nolan",
        releaseYear: 2010,
        genre: "Sci-Fi",
    },
    {
        movieId: 2,
        title: "The Dark Knight",
        director: "Christopher Nolan",
        releaseYear: 2008,
        genre: "Action",
    },
    {
        movieId: 3,
        title: "Interstellar",
        director: "Christopher Nolan",
        releaseYear: 2014,
        genre: "Sci-Fi",
    },
];

beforeAll(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(3001, resolve));
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
});

describe("Controller Function Tests", () => {
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
    it("Should return all the movies on GET /movies", async () => {
        getAllMovies.mockReturnValue(mockMovieData);
        const res = await request(server).get("/movies");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            movies: [
                {
                    movieId: 1,
                    title: "Inception",
                    director: "Christopher Nolan",
                    releaseYear: 2010,
                    genre: "Sci-Fi",
                },
                {
                    movieId: 2,
                    title: "The Dark Knight",
                    director: "Christopher Nolan",
                    releaseYear: 2008,
                    genre: "Action",
                },
                {
                    movieId: 3,
                    title: "Interstellar",
                    director: "Christopher Nolan",
                    releaseYear: 2014,
                    genre: "Sci-Fi",
                },
            ],
        });
        expect(res.body.movies.length).toBe(3);
    });

    it("Should return a movie by ID on GET /movies/details/:id", async () => {
        getMovieById.mockReturnValue({
            movieId: 1,
            title: "Inception",
            director: "Christopher Nolan",
            releaseYear: 2010,
            genre: "Sci-Fi",
        });
        const res = await request(server).get("/movies/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employee: {
                movieId: 1,
                title: "Inception",
                director: "Christopher Nolan",
                releaseYear: 2010,
                genre: "Sci-Fi",
            },
        });
    });
});
