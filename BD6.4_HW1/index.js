const express = require("express");
const app = express();
const { getAllEmployees, getEmployeeById } = require("./employee");
const { getAllDepartments, getDepartmentById } = require("./department");

app.use(express.json());

// Exercise 1: Get All Employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = getAllEmployees();
    if (employees.length > 0) {
      res.json(employees);
    } else {
      res.status(404).json({ error: "No employees found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees" });
  }
});

// Exercise 2: Get Employee by ID
app.get("/api/employees/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the employee" });
  }
});

// Exercise 3: Get All Departments
app.get("/api/departments", async (req, res) => {
  try {
    const departments = getAllDepartments();
    if (departments.length > 0) {
      res.json(departments);
    } else {
      res.status(404).json({ error: "No departments found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching departments" });
  }
});

// Exercise 4: Get Department by ID
app.get("/api/departments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const department = getDepartmentById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the department" });
  }
});

// Start the server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = { app };
