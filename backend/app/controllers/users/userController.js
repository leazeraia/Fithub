const userError = require("debug")("controller:user");
const { User } = require("./../../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const passwordChecker = require("../../utils/userValidations/passwordChecker");

const userController = {
    findAll: async (req, res) => {
        // find all except password
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
        });
        // Must test result.length because findAll always returns [] if no users found
        if(result.length === 0){
            return res.status(404).json("User cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        
        const userId = req.params.userId;

        // Retrieve all infos except password
        const result = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            },
            include: [
                "ActivitiesUsers",
                "CommentsUser",
                "ChallengesUser",
                "ArticlesWritten",
                "LikedArticles"
            ]
        });
        // if user not found, return 404
        if(!result){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {firstname, lastname, nickname, phone, password, passwordConfirm, weight, email, gender} = req.body;

        // checks that every fields have been properly received
        if(!firstname || !lastname || !nickname || !password || !passwordConfirm || !weight || !email || !gender){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("firstname, lastname, nickname, password, passwordConfirm, weight, email, gender are required.");
        }
        // checks if nickname is already taken
        const findUserNickname = await User.findOne({
            where: {
                nickname
            }
        });
        // if taken, return 409 conflict
        if(findUserNickname){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Nickname already exists.");
        };

        // check email with email validator
        const checkEmail = emailValidator.validate(email);

        if(!checkEmail){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Email is incorrect.");
        };

        const findUserEmail = await User.findOne({
            where: {
                email
            }
        });

        if(findUserEmail){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Email already exists.");
        }

        if(phone){
            const findUserPhone = await User.findOne({
                where: {
                    phone
                }
            });

            if(findUserPhone){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Number already linked to an account.");
            }

            findUser.phone = phone;
        };

        
        if(password !== passwordConfirm){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Password and passwordConfirm do not match.");
        };

        // check function to make sure the password contains
        // 1capitalized letter, 1 symbol, 1 number and is between 1 - 50 characters.
        const checkPassword = passwordChecker(password);

        if(!checkPassword){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Secure your password with at least a capitalized letter, a symble and a number.");
        };

        // hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            firstname,
            lastname,
            nickname,
            password: hashedPassword,
            weight,
            email,
            gender
        };
        // store in the database
        await User.create(newUser);
        res.status(201).json("User created !");
    },

    updateOne: async (req, res) => {
        const userId = req.params.userId;

        isSameIdOrAdmin(req, res, userId);

        const {firstname, lastname, nickname, phone, password, passwordConfirm, role, weight, email, gender} = req.body;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        // update value only if value is retrieved
        if(firstname){
            findUser.firstname = firstname;
        };

        if(lastname){
            findUser.lastname = lastname;
        };

        if(phone){
            const findUserPhone = await User.findOne({
                where: {
                    phone
                }
            });

            if(findUserPhone){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Number already linked to an account.");
            }

            findUser.phone = phone;
        };

        if(nickname){
            const findUserNickname = await User.findOne({
                where: {
                    nickname
                }
            });

            if(findUserNickname){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Nickname already exists.");
            };

            findUser.nickname = nickname;
        };

        // if changing password, need to apply the same password verification process

        if(password){

            if(password !== passwordConfirm){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(400).json("Password and passwordConfirm do not match.");
            };

            const checkPassword = passwordChecker(password);
            if(!checkPassword){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(400).json("Secure your password with at least a capitalized letter, a symbol and a number.");
            };

            const hashedPasssword = bcrypt.hashSync(password, 10);

            findUser.password = hashedPasssword;
        };

        if(role){
            findUser.role = role;
        };

        if(weight){
            findUser.weight = weight;
        };

        if(email){

            const checkEmail = emailValidator.validate(email);
            
            if(!checkEmail){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Email is incorrect.");
            };
            
            const findUserEmail = await User.findOne({
                where: {
                    email
                }
            });
            
            if(findUserEmail){
                userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Email already exists.");
            };
            
            findUser.email = email;
        }

        if(gender){
            findUser.gender = gender;
        };

        // update the user data
        await findUser.save();

        res.status(200).json("User updated !");
    },
    
    deleteOne: async (req, res) => {
        const userId = req.params.userId;

        const findUser = await User.findByPk(userId);
        // make sure that user exists before deleting
        if(!findUser){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        await findUser.destroy();

        res.status(200).json("User deleted !");
    },

    login: async (req, res) => {
        // If user already logged in, then return 403 forbidden
        const findSession = req.session.user;
        if(findSession){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(403).json("Access denied, user is already logged in.");
        }

        const {email, password} = req.body;
        // make sure that both email & password have been sent
        if(!email || !password){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Email and password are both required.");
        };
        // make sure that user exists
        const findUser = await User.findOne({
            exclude: ["password"],
            where:{
                email
            }
        });
        
        // if user does not exist, return 404

        if(!findUser){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Email or password is incorrect.");
        };

        const isPasswordCorrect = bcrypt.compare(password, findUser.password);
        
        if(!isPasswordCorrect){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Email or password is incorrect.");
        };
        // creates a user session
        req.session.user = {
            id: findUser.id,
            role: findUser.role
        }

        // to discuss what info we want to transmit to the client
        res.status(200).json(findUser);
    },
    
    logout: async (req, res) => {
        
        const findSession = req.session.user;
        
        // make sure that user exists before logging out
        const findUser = await User.findByPk(findSession.id);
        if(!findUser){
            userError("Error", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        delete req.session.user;

        res.status(200).json("Logged out !");
        
    }
}

module.exports = userController;