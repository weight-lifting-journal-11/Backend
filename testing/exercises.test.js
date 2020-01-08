const request = require("supertest");
const server = require("../api/server");

describe("exercise router", () => {
    describe("POST to api/exercises", () => {
        it("should return a 201 status", async () => {
            const expected = 201;
            const ex = {
                name: "Ball Sit Ups",
                weight: 25,
                reps: 6,
                sets: 4,
                userId: 4,
                journalId: 13
            };
            let res = await request(server)
                .post("/api/exercises")
                .send(ex);

            expect(res.status).toEqual(expected);
        });
    });
});