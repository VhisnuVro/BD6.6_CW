const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getAllEmployees, getEmployeeById } = require("../employee");
const { getAllDepartments, getDepartmentById } = require("../department");

jest.mock("../employee.js", () => ({
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

jest.mock("../department.js", () => ({
  getAllDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(3010, resolve));
}, 11000);

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe("API Endpoint Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Employee API Tests
  describe("Employee API Tests", () => {
    it("should return 404 when no employees are found", async () => {
      getAllEmployees.mockReturnValue([]);
      const response = await request(server).get("/api/employees");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No employees found" });
    });

    it("should return all employees", async () => {
      const mockEmployees = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          departmentId: 1,
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          departmentId: 2,
        },
      ];
      getAllEmployees.mockReturnValue(mockEmployees);
      const response = await request(server).get("/api/employees");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEmployees);
    });

    it("should return 404 when employee is not found by ID", async () => {
      getEmployeeById.mockReturnValue(undefined);
      const response = await request(server).get("/api/employees/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Employee not found" });
    });

    it("should return an employee by ID", async () => {
      const mockEmployee = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        departmentId: 1,
      };
      getEmployeeById.mockReturnValue(mockEmployee);
      const response = await request(server).get("/api/employees/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockEmployee);
    });
  });

  // Department API Tests
  describe("Department API Tests", () => {
    it("should return 404 when no departments are found", async () => {
      getAllDepartments.mockReturnValue([]);
      const response = await request(server).get("/api/departments");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "No departments found" });
    });

    it("should return all departments", async () => {
      const mockDepartments = [
        { id: 1, name: "Engineering" },
        { id: 2, name: "Marketing" },
      ];
      getAllDepartments.mockReturnValue(mockDepartments);
      const response = await request(server).get("/api/departments");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDepartments);
    });

    it("should return 404 when department is not found by ID", async () => {
      getDepartmentById.mockReturnValue(undefined);
      const response = await request(server).get("/api/departments/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Department not found" });
    });

    it("should return a department by ID", async () => {
      const mockDepartment = { id: 1, name: "Engineering" };
      getDepartmentById.mockReturnValue(mockDepartment);
      const response = await request(server).get("/api/departments/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDepartment);
    });
  });
});
