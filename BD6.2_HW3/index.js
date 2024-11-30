const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let productData = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

// Function to get all products
const getProducts = () => productData;

// Endpoint to get all products
app.get("/products", (req, res) => {
  res.json(getProducts());
});

// Function to get a product by ID
const getProductById = (id) => productData.find((product) => product.id === id);

// Endpoint to get product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Parse ID as an integer
  const product = getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Function to add a new product
const addNewProduct = (newProduct) => {
  productData.push(newProduct);
  return newProduct;
};

// Endpoint to add a new product
app.post("/products/new", (req, res) => {
  const newProduct = req.body;
  if (newProduct.id && newProduct.name && newProduct.category) {
    const addedProduct = addNewProduct(newProduct);
    res.json(addedProduct);
  } else {
    res.status(400).json({ message: "Invalid product data" });
  }
});
module.exports = {
  app,
  getProducts,
  getProductById,
  addNewProduct,
};

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
