const request = require("supertest");
let http = require("http");
const { app } = require("../index");
const { getAllEmployees } = require("../controllers");
let server;

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllEmployees: jest.fn(),
}));

beforeAll(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(3001, resolve));
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
});
let mockEmployeeData = [
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
describe("Controller Fun Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return all the employees", async () => {
        getAllEmployees.mockReturnValue(mockEmployeeData);
        let result = await getAllEmployees();
        expect(result).toEqual(mockEmployeeData);
        expect(result.length).toBe(3);
    });
});

describe("API Endpoint Tests", () => {
    it("Should return all the employees in get Call", async () => {
        const res = await request(server).get("/employees");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employees: [
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
            ],
        });
        expect(res.body.employees.length).toBe(3);
    });

    it("Get /employees/details/:id should get employee by Id", async () => {
        const res = await request(server).get("/employees/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employee: {
                employeeId: 1,
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
        });
    });
});
