const request = require("supertest");
const {
  app,
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
} = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addNewRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("Recipe API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all recipes", async () => {
    const mockRecipes = [
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

    getAllRecipes.mockResolvedValue(mockRecipes);
    const result = await request(server).get("/recipes");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("should retrieve a recipe by ID", async () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };

    getRecipeById.mockResolvedValue(mockRecipe);
    const result = await request(server).get("/recipes/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it("should return 404 if recipe not found by ID", async () => {
    getRecipeById.mockResolvedValue(undefined);

    const result = await request(server).get("/recipes/details/9999");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ error: "Recipe not found" });
  });

  it("should add a new recipe", async () => {
    const newRecipe = {
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };
    const mockRecipeResponse = { id: 3, ...newRecipe };

    addNewRecipe.mockResolvedValue(mockRecipeResponse);

    const result = await request(server).post("/recipes/new").send(newRecipe);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipeResponse);
  });
});
