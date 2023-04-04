const passwordChecker = (inputPassword) => {
    const regex = /^(?=.*[A-Z])(?=.*[&@!$#*])(?=.*[0-9]).{8,50}$/;
    return regex.test(inputPassword);
};

module.exports = passwordChecker;