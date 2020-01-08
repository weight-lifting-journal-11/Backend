const request = require("supertest");
const server = require("../api/server");

describe("journal router", () => {
    describe("GET to /journals/", () => {
        it.skip("should return a 401 unauthorized when no token is provided but i took off restriction so it will return 200", async () => {
            const expected = 200;
            let res = await request(server).get("/api/journals/");

            expect(res.status).toEqual(expected);
        });
    });
});