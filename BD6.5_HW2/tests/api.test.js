const request = require("supertest");
const { app, validateEmployee, validateCompany } = require("../index");
let http = require("http");
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoints to add data", () => {
  it("should add a new company with valid input", async () => {
    const res = await request(server).post("/api/companies").send({
      name: "TechCorp",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });

  it("should send 400 when adding a new company with invalid input", async () => {
    const res = await request(server).post("/api/companies").send({});
    expect(res.status).toBe(400);
    expect(res.text).toBe("Name is required and should be a string.");
  });

  it("should add a new employee with valid input", async () => {
    await request(server).post("/api/companies").send({
      name: "TechCorp",
    });

    const res = await request(server).post("/api/employees").send({
      name: "John Doe",
      companyId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      companyId: 1,
    });
  });

  it("should send 400 when adding a new employee with invalid companyId", async () => {
    const res = await request(server).post("/api/employees").send({
      name: "Jane Doe",
      companyId: 99,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("A valid companyId is required.");
  });

  it("should send 400 when adding a new employee with missing name", async () => {
    const res = await request(server).post("/api/employees").send({
      companyId: 1,
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Name is required and should be a string.");
  });
});

describe("Test validation functions", () => {
  it("Should validate company input correctly", () => {
    expect(
      validateCompany({
        name: "TechCorp",
      }),
    ).toBeNull();

    expect(validateCompany({})).toBe(
      "Name is required and should be a string.",
    );
  });

  it("Should validate employee input correctly", () => {
    const mockCompanies = [{ id: 1, name: "Mock Company" }];
    global.companies = mockCompanies;

    expect(
      validateEmployee({
        name: "John Doe",
        companyId: 1,
      }),
    ).toBeNull();

    expect(
      validateEmployee({
        name: "John Doe",
        companyId: 99,
      }),
    ).toBe("A valid companyId is required.");

    expect(
      validateEmployee({
        companyId: 1,
      }),
    ).toBe("Name is required and should be a string.");
  });
});
