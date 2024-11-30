const express = require("express");
const app = express();
app.use(express.json());

let games = [
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

let developers = [
  { id: 1, name: "Nintendo", country: "Japan" },
  { id: 2, name: "Valve", country: "USA" },
];

// Exercise 1: Get All Games
function getAllGames() {
  return games;
}

app.get("/games", (req, res) => {
  const result = getAllGames();
  res.json(result);
});

// Exercise 2: Get Game by ID
function getGameById(id) {
  return games.find((game) => game.id === id);
}

app.get("/games/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getGameById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Game not found" });
  }
});

// Exercise 3: Add a New Game
function addNewGame(title, genre, developer) {
  const newGame = { id: games.length + 1, title, genre, developer };
  games.push(newGame);
  return newGame;
}

app.post("/games/new", (req, res) => {
  const { title, genre, developer } = req.body;
  const result = addNewGame(title, genre, developer);
  res.json(result);
});

// Exercise 4: Get Developer by ID
function getDeveloperById(id) {
  return developers.find((developer) => developer.id === id);
}

app.get("/developers/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getDeveloperById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Developer not found" });
  }
});

// Exercise 5: Add a New Developer
function addNewDeveloper(name, country) {
  const newDeveloper = { id: developers.length + 1, name, country };
  developers.push(newDeveloper);
  return newDeveloper;
}

app.post("/developers/new", (req, res) => {
  const { name, country } = req.body;
  const result = addNewDeveloper(name, country);
  res.json(result);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
};

// Start server (uncomment if you want to run the server)
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
