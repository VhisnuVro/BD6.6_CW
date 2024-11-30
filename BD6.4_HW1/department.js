let departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
];

function getAllDepartments() {
  return departments;
}

function getDepartmentById(id) {
  return departments.find((department) => department.id === id);
}

module.exports = { getAllDepartments, getDepartmentById };
