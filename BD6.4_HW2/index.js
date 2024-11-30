const express = require("express");
const { getAllGames, getGameById } = require("./games");
const { getAllGenres, getGenreById } = require("./genres");

const app = express();
app.use(express.json());
// const PORT = 3000;

// Routes for Games
app.get("/api/games", (req, res) => {
  const games = getAllGames();
  if (games.length === 0) {
    return res.status(404).json({ error: "No games found" });
  }
  res.json(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = getGameById(parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  res.json(game);
});

// Routes for Genres
app.get("/api/genres", (req, res) => {
  const genres = getAllGenres();
  if (genres.length === 0) {
    return res.status(404).json({ error: "No genres found" });
  }
  res.json(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = getGenreById(parseInt(req.params.id));
  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }
  res.json(genre);
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = { app };
