const totalDailyCaloriesCalculator = (userDailyActivitiesData) => {
    // calculates total calories burned on that day
    let totalCalories = 0;

    for(let element of userDailyActivitiesData){
        totalCalories += element.calories;
    }

    return totalCalories;
};

module.exports = totalDailyCaloriesCalculator;