const passwordChecker = (inputPassword) => {
    // checks that the password contains at least :
    // 1 symbol, 1 capitalized letter, 1 number and has more than 8 letters
    const regex = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{8,50}$/;
    return regex.test(inputPassword);
};

module.exports = passwordChecker;