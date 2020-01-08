const request = require("supertest");
const server = require("../api/server");

describe("user auth router", () => {
    describe("POST to api/auth/register", () => {
        it.skip("should return a 201 status", async () => {
            const expected = 201;
            const user = {
                username: "testing1",
                password: "password",
                email: "testing122@gmail.com"
            };
            let res = await request(server)
                .post("/api/auth/register")
                .send(user);

            expect(res.status).toEqual(expected);
        });
    });
});