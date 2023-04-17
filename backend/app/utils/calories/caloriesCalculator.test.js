const caloriesCalculator = require("./caloriesCalculator");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("function calculating calories burned from an activity", () => {
    test("should return the calories burned after doing an activity", () => {
        const res = mockResponse();
        expect(caloriesCalculator(5,60,55, res)).toBeGreaterThanOrEqual(0);
    })
})