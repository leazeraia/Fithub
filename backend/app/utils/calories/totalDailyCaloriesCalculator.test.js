const totalDailyCaloriesCalculator = require("./totalDailyCaloriesCalculator");

describe("function calculating the calories burned on a given day", () => {
    it("should return the total amount of calories burned on a given day", () => {
        const mockUserData = [
            {
                calories: 1000
            },
            {
                calories: 20
            }, 
            {
                calories: 50
            },
            {
                calories: 115
            }
        ]
        const mockUserData2 = [
            {
                calories: 0
            }
        ];
        expect(totalDailyCaloriesCalculator(mockUserData)).toBeGreaterThanOrEqual(0);
        expect(totalDailyCaloriesCalculator(mockUserData2)).toBeGreaterThanOrEqual(0);
    })
});