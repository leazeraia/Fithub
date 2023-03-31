const passwordChecker = (inputPassword) => {
    // short regex to check user password contains
    // 1 capitalized letter, 1 symbol, 1 number
    const regex = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{1,50}$/;
    // tests the password
    // returns true or false
    return regex.test(inputPassword);
}

module.exports = passwordChecker;