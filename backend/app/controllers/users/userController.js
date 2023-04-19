const userControllerError = require("debug")("controller:userControllerError");
const { User, ActivityUser } = require("./../../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const passwordChecker = require("../../utils/userValidations/passwordChecker");
const fs = require("fs");
const isSameIdAsUserSessionId = require("./../../utils/userValidations/isSameAsUserSessionId");
const sequelize = require("../../data/sequelize");

const userController = {
    findAll: async (req, res) => {
        // find all except password
        const result = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            order: [['xp', 'DESC']]
        });

        // Must test result.length because findAll always returns [] if no users found
        if(result.length === 0){
            userControllerError("Error, users cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);;
            return res.status(404).json("Users cannot be found.");
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
                {
                    association: "ActivityUserList",
                    include: "ActivityDescription"
                },
                {
                    association: "ChallengeUserList",
                    include: "ChallengeDescription",
                    limits: 7 
                }
            ]
        });

        // if user not found, return 404
        if(!result){
            userControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        // retrieves the total amount of calories burned during a specific day
        const userTotalActivityByDay = await ActivityUser.findAll({
            attributes: [
                "date_assigned",
                [sequelize.fn('sum', sequelize.col('calories')), 'total_calories_by_date'],
                [sequelize.fn('sum', sequelize.col('duration')), 'total_duration_by_date']
            ],
            where: {
                user_id: userId
            },
            group: ['date_assigned']
        });

        res.status(200).json({resultDataWithImage: result, userTotalActivityByDay});
    },

    createOne: async (req, res) => {
        const {firstname, lastname, nickname, phone, password, passwordConfirm, weight, age, email, gender} = req.body;
        // checks that every fields have been properly received
        
        if(!firstname || !lastname || !nickname || !password || !passwordConfirm || !weight || !email || !age){
            userControllerError("Error, missing required fields.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("firstname, lastname, nickname, password, passwordConfirm, weight, email, age are required.");
        }

        // checks if nickname is already taken
        const findUserNickname = await User.findOne({
            where: {
                nickname
            }
        });

        // if taken, return 409 conflict
        if(findUserNickname){
            userControllerError("Error, nickname already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Nickname already exists.");
        };

        // check email with email validator
        const checkEmail = emailValidator.validate(email.toLowerCase());

        if(!checkEmail){
            userControllerError("Error, invalid email.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Email is incorrect.");
        };

        const findUserEmail = await User.findOne({
            exclude: ["password"],
            where: {
                email: email.toLowerCase()
            }
        });

        if(findUserEmail){
            userControllerError("Error, email already used.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Email already exists.");
        }

        if(phone){
            const findUserPhone = await User.findOne({
                exclude: ["password"],
                where: {
                    phone
                }
            });

            if(findUserPhone){
                userControllerError("Error, phone number already linked to an account.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Number already linked to an account.");
            }

            findUser.phone = phone;
        };

        
        if(password !== passwordConfirm){
            userControllerError("Error, password and passwordConfirm do not match.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Password and passwordConfirm do not match.");
        };

        // check function to make sure the password contains
        // 1capitalized letter, 1 symbol, 1 number and is between 1 - 50 characters.
        const checkPassword = passwordChecker(password);

        if(!checkPassword){
            userControllerError("Error, unsafe password.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Secure your password with at least a capitalized letter, a symbole and a number.");
        };

        // hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // variables to store the file path & mimetype
        let filePath;
        let fileMimetype;
        // if there is a file, it will be stored in req.file
        if(req.file !== undefined){
            // retrieve the file path
            const sourceFile = req.file.path;
            // create the new path file because multer stores it in "temp/imageFileName"
            filePath = `${req.file.filename}`;
            // use fs module to copy the content of the file from temp to uploads
            fs.copyFileSync(sourceFile, `uploads/${filePath}`);
            // store the mimetype of the file
            fileMimetype = req.file.mimetype;
        }

        const newUser = {
            firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
            lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase(),
            nickname,
            password: hashedPassword,
            weight,
            age,
            email: email.toLowerCase(),
            gender,
            image_path: null || filePath,
            image_mimetype: null || fileMimetype
        };
        // store in the database
        await User.create(newUser);
        res.status(201).json("User created !");
    },

    updateOne: async (req, res) => {
        const userId = req.params.userId;

        isSameIdAsUserSessionId(req, res, userId);

        const {firstname, lastname, nickname, phone, password, passwordConfirm, role, age, weight, email, gender} = req.body;

        const findUser = await User.findByPk(userId);

        if(!findUser){
            userControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        // update value only if value is retrieved
        if(firstname){
            findUser.firstname = firstname;
        };

        if(lastname){
            findUser.lastname = lastname;
        };

        // make sure that the phone is not already used
        if(phone){
            const findUserPhone = await User.findOne({
                exclude: ["password"],
                where: {
                    phone
                }
            });

            if(findUserPhone){
                userControllerError("Error, phone number already linked to an account.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Number already linked to an account.");
            }

            findUser.phone = phone;
        };

        if(nickname){
            const findUserNickname = await User.findOne({
                exclude: ["password"],
                where: {
                    nickname
                }
            });

            if(findUserNickname){
                userControllerError("Error, nickname already taken.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Nickname already exists.");
            };

            findUser.nickname = nickname;
        };

        // if changing password, need to apply the same password verification process

        if(password){

            if(password !== passwordConfirm){
                userControllerError("Error, password and passwordConfirm do not match.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(400).json("Password and passwordConfirm do not match.");
            };

            const checkPassword = passwordChecker(password);
            if(!checkPassword){
                userControllerError("Error, unsafe password.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(400).json("Secure your password with at least a capitalized letter, a symbol and a number.");
            };

            const hashedPassword = bcrypt.hashSync(password, 10);

            findUser.password = hashedPassword;
        };

        if(role){
            findUser.role = role;
            // update the role of the current session as well
            if(req.session.user){
                req.session.user.role = role;
            };
        };

        if(weight){
            findUser.weight = weight;
        };

        if(email){

            const checkEmail = emailValidator.validate(email);
            
            if(!checkEmail){
                userControllerError("Error, invalid email.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Email is incorrect.");
            };
            
            const findUserEmail = await User.findOne({
                exclude: ["password"],
                where: {
                    email: email.toLowerCase()
                }
            });
            
            if(findUserEmail){
                userControllerError("Error, email already used.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Email already exists.");
            };
            
            findUser.email = email.toLowerCase();
        }

        if(gender){
            findUser.gender = gender;
        };

        if(age){
            findUser.age = age;
        };
        
        if(req.file){
            const sourceFile = req.file.path;
            let filePath = `${req.file.filename}`;
            fs.copyFileSync(sourceFile, `uploads/${filePath}`);
            findUser.image_path = filePath;
            findUser.image_mimetype = req.file.mimetype;
        }

        // update the user data
        await findUser.save();

        res.status(200).json("User updated !");
    },
    
    deleteOne: async (req, res) => {
        const userId = req.params.userId;

        isSameIdAsUserSessionId(req, res, userId);

        const findUser = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });
        // make sure that user exists before deleting
        if(!findUser){
            userControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        await findUser.destroy();
        delete req.session.user;

        res.status(200).json("User deleted !");
    },

    login: async (req, res) => {
        // If user already logged in, then return 403 forbidden
        const findSession = req.session.user;
        if(findSession){
            userControllerError("Error, already logged in.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(403).json("Access denied, user is already logged in.");
        };

        const {email, password} = req.body;
        // make sure that both email & password have been sent
        if(!email || !password){
            userControllerError("Error, email or password missing.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Email and password are both required.");
        };
        // make sure that user exists
        const findUser = await User.findOne({
            exclude: ["password"],
            where:{
                email: email.toLowerCase()
            }
        });
        
        // if user does not exist, return 404

        if(!findUser){
            userControllerError("Error, email or password is incorrect.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Email or password is incorrect.");
        };

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        
        if(!isPasswordCorrect){
            userControllerError("Error, email or password is incorrect.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Email or password is incorrect.");
        };
        // creates a user session storing only user id and role
        req.session.user = {
            id: findUser.id,
            role: findUser.role
        };

        res.status(200).json(findUser);
    },
    
    logout: async (req, res) => {
        
        const findSession = req.session.user;
        isSameIdAsUserSessionId(req, res, userId);
        
        // make sure that user exists before logging out
        const findUser = await User.findByPk(findSession.id, {
            attributes: {
                exclude: ["password"]
            }
        });
        if(!findUser){
            userControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        // Delete the user's session
        delete req.session.user;

        res.status(200).json("Logged out !");
        
    },
}

module.exports = userController;