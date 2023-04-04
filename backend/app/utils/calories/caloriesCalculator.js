const caloriesCalculator = (MET, duration, weight, res) => {
    // calculates calories burned from one activity
    
    if(!MET || !duration || !weight){
        return res.status(400).json("MET, duration and weight are required.");
    };

    // duration in minutes

    const totalCalories = (duration * (3.5 * MET * weight)) / 200;

    return Math.round(totalCalories);

};

module.exports = caloriesCalculator;