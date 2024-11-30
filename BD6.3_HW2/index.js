const express = require("express");
const app = express();
app.use(express.json());

let employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
  },
];

// Exercise 1: Get All Employees
function getAllEmployees() {
  return employees;
}

app.get("/employees", (req, res) => {
  const result = getAllEmployees();
  res.json(result);
});

// Exercise 2: Get Employee by ID
function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

app.get("/employees/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = getEmployeeById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
});

// Exercise 3: Add a New Employee
function addNewEmployee(name, email, department) {
  const newEmployee = { id: employees.length + 1, name, email, department };
  employees.push(newEmployee);
  return newEmployee;
}

app.post("/employees/new", (req, res) => {
  const { name, email, department } = req.body;
  const result = addNewEmployee(name, email, department);
  res.json(result);
});

module.exports = {
  app,
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
};
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
