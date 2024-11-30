const request = require("supertest");
let http = require("http");
const { app } = require("../index");
const { getAllBooks } = require("../controllers");
let server;

jest.mock("../controllers", () => ({
    ...jest.requireActual("../controllers"),
    getAllBooks: jest.fn(),
}));

beforeAll(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(3001, resolve));
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
});
let mockBookData = [
    {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
    },
    {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
    },
    {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
    },
];
describe("Controller Fun Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return all the books", async () => {
        getAllBooks.mockReturnValue({ books: mockBookData });
        let result = await getAllBooks();
        expect(result.books).toEqual(mockBookData);
        expect(result.books.length).toBe(3);
    });
});

describe("API Endpoint Tests", () => {
    it("Should return all the book in get Call", async () => {
        const res = await request(server).get("/books");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            books: [
                {
                    bookId: 1,
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    genre: "Fiction",
                },
                {
                    bookId: 2,
                    title: "1984",
                    author: "George Orwell",
                    genre: "Dystopian",
                },
                {
                    bookId: 3,
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    genre: "Classic",
                },
            ],
        });
        expect(res.body.books.length).toBe(3);
    });

    it("Get /book/details/:id should get book by Id", async () => {
        const res = await request(server).get("/books/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            book: {
                bookId: 1,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
            },
        });
    });
});
