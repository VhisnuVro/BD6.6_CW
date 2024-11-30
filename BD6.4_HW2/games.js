let games = [
  { id: 1, title: "The Legend of Zelda", genreId: 1 },
  { id: 2, title: "Super Mario Bros", genreId: 2 },
];

function getAllGames() {
  return games;
}

function getGameById(id) {
  return games.find((game) => game.id === id);
}

module.exports = { getAllGames, getGameById };
