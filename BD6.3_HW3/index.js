const express = require("express");
const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

// Exercise 1: Get All Recipes
function getAllRecipes() {
  return recipes;
}

app.get("/recipes", (req, res) => {
  const result = getAllRecipes();
  res.json(result);
});

// Exercise 2: Get Recipe by ID
function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

app.get("/recipes/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getRecipeById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

// Exercise 3: Add a New Recipe
function addNewRecipe(name, cuisine, difficulty) {
  const newRecipe = { id: recipes.length + 1, name, cuisine, difficulty };
  recipes.push(newRecipe);
  return newRecipe;
}
app.post("/recipes/new", (req, res) => {
  const { name, cuisine, difficulty } = req.body;
  const result = addNewRecipe(name, cuisine, difficulty);
  res.json(result);
});

module.exports = {
  app,
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
};
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
