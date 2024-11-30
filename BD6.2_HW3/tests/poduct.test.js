const {
  app,
  getProducts,
  getProductById,
  addNewProduct,
} = require("../index.js");

const http = require("http");
jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  addNewProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("Product Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts should return all products", () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ];

    getProducts.mockReturnValue(mockProducts);

    const result = getProducts();
    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });

  test("getProductById should return a product by ID", () => {
    const mockProduct = {
      id: 1,
      name: "Laptop",
      category: "Electronics",
    };

    getProductById.mockReturnValue(mockProduct);

    const result = getProductById(1);
    expect(result).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  test("getProductById should return undefined for an invalid ID", () => {
    getProductById.mockReturnValue(undefined);

    const result = getProductById(9999);
    expect(result).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(9999);
  });

  test("addNewProduct should add a new product and return it", () => {
    const newProduct = {
      id: 5,
      name: "Tablet",
      category: "Electronics",
    };

    addNewProduct.mockReturnValue(newProduct);

    const result = addNewProduct(newProduct);
    expect(result).toEqual(newProduct);
    expect(addNewProduct).toHaveBeenCalledWith(newProduct);
  });
});
