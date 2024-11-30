const express = require("express");
const cors = require("cors");
const { getAllEmployees, getEmployeesById } = require("./controllers");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/employees", async (req, res) => {
  const employees = getAllEmployees();
  res.json({ employees });
});

app.get("/employees/details/:id", async (req, res) => {
  const employee = getEmployeesById(req.params.id);
  res.json({ employee });
});

module.exports = { app };
