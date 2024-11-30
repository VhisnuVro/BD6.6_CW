const request = require("supertest");
const {
  app,
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addNewEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
}, 11000);

afterAll((done) => {
  server.close(done);
});

describe("Employee API endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all employees", async () => {
    const mockEmployees = [
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
    getAllEmployees.mockResolvedValue(mockEmployees);

    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should retrieve an employee by ID", async () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };
    getEmployeeById.mockResolvedValue(mockEmployee);

    const result = await request(server).get("/employees/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployee);
  });

  it("should return 404 if employee not found by ID", async () => {
    getEmployeeById.mockResolvedValue(undefined);

    const result = await request(server).get("/employees/details/9999");
    expect(result.statusCode).toEqual(404);
  });

  it("should add a new employee", async () => {
    const newEmployee = {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };
    const mockEmployeeResponse = { id: 3, ...newEmployee };
    addNewEmployee.mockResolvedValue(mockEmployeeResponse);

    const result = await request(server)
      .post("/employees/new")
      .send(newEmployee);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployeeResponse);
  });
});
