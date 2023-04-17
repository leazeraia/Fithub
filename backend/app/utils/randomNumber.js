const randomNumber = (max) => {
    // returns a random number between 0 and max
    return Math.round(Math.random() * max);
};

module.exports = randomNumber;