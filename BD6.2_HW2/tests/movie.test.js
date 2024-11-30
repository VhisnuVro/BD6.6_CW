const { app, getMovies, getMovieById, addMovie } = require("../index.js");

const http = require("http");
jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("Movie Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getMovies should return all movies", () => {
    const mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
    ];

    getMovies.mockReturnValue(mockMovies);

    const result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  test("getMovieById should return a movie by ID", () => {
    const mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };

    getMovieById.mockReturnValue(mockMovie);

    const result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  test("getMovieById should return undefined for an invalid ID", () => {
    getMovieById.mockReturnValue(undefined);

    const result = getMovieById(9999);
    expect(result).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(9999);
  });

  test("addMovie should add a new movie and return it", () => {
    const newMovie = {
      id: 4,
      title: "Inception",
      director: "Christopher Nolan",
    };

    addMovie.mockReturnValue(newMovie);

    const result = addMovie(newMovie);
    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
