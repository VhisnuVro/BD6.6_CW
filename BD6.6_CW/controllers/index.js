let employees = [
    {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
    },
    {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
    },
    {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
    },
];

//getAllEmployees, getEmployeesById

let getAllEmployees = () => {
    return employees;
};

let getEmployeesById = (id) =>
    employees.find((item) => item.employeeId === parseInt(id));

module.exports = { getAllEmployees, getEmployeesById };
