const randomNumber = require("./randomNumber");

describe("random number generator function", () => {
    it("should return a random number between 0 and max", () => {
        const max = 5;
        expect(randomNumber(max)).toBeGreaterThanOrEqual(0);
        expect(randomNumber(max)).toBeLessThanOrEqual(max);
    })
})