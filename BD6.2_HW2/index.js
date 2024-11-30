const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Mock database
let movieData = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

// Function to get all movies
const getMovies = () => movieData;

// Endpoint to get all movies
app.get("/movies", (req, res) => {
  res.json(getMovies());
});

// Function to get a movie by ID
const getMovieById = (id) => movieData.find((movie) => movie.id === id);

// Endpoint to get movie by ID
app.get("/movies/details/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Get ID from URL and parse as integer
  const movie = getMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Function to add a new movie
const addMovie = (newMovie) => {
  movieData.push(newMovie);
  return newMovie;
};

// Endpoint to add a new movie
app.post("/movies/new", (req, res) => {
  const { id, title, director } = req.body;
  if (id && title && director) {
    const newMovie = { id, title, director };
    addMovie(newMovie);
    res.json(newMovie);
  } else {
    res.status(400).json({ message: "Invalid movie data" });
  }
});

module.exports = {
  getMovieById,
  getMovies,
  addMovie,
  app,
};

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
