const request = require("supertest");
const server = require("../api/api-router");

describe("user auth router", () => {
    describe("POST to api/auth/register", () => {
        it("should return a 201 status when inserting a new user", async () => {
            const expected = 201;
            const user = {
                username: "test user",
                password: "pass",
                email: "testemail@email.com"
            };
            let res = await request(server)
                .post("/api/auth/register")
                .send(user);

            expect(res.status).toEqual(expected);
        });
    });
});