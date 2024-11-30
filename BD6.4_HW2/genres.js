let genres = [
  { id: 1, name: "Action-Adventure" },
  { id: 2, name: "Platformer" },
];

function getAllGenres() {
  return genres;
}

function getGenreById(id) {
  return genres.find((genre) => genre.id === id);
}

module.exports = { getAllGenres, getGenreById };
