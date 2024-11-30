let employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", departmentId: 1 },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    departmentId: 2,
  },
];

function getAllEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

module.exports = { getAllEmployees, getEmployeeById };
