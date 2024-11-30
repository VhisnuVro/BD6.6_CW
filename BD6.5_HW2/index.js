const express = require("express");

const app = express();
app.use(express.json());

let employees = [];
let companies = [];

// Validate employee input
const validateEmployee = (employee) => {
  if (!employee.name || typeof employee.name !== "string") {
    return "Name is required and should be a string.";
  }
  if (
    !employee.companyId ||
    typeof employee.companyId !== "number" ||
    !companies.find((company) => company.id === employee.companyId)
  ) {
    return "A valid companyId is required.";
  }
  return null;
};

// Add a new employee
app.post("/api/employees", (req, res) => {
  const error = validateEmployee(req.body);
  if (error) return res.status(400).send(error);

  const employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

// Validate company input
const validateCompany = (company) => {
  if (!company.name || typeof company.name !== "string") {
    return "Name is required and should be a string.";
  }
  return null;
};

// Add a new company
app.post("/api/companies", (req, res) => {
  const error = validateCompany(req.body);
  if (error) return res.status(400).send(error);

  const company = { id: companies.length + 1, ...req.body };
  companies.push(company);
  res.status(201).json(company);
});

module.exports = { app, validateEmployee, validateCompany };
