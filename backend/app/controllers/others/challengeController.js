const challengeControllerError = require("debug")("controller: challengeControllerError");
const ActivityUser = require("../../models/schemas/activities/ActivityUser");
const isSameIdAsUserSessionId = require("../../utils/userValidations/isSameAsUserSessionId");
const randomNumber = require("../../utils/randomNumber");
const userWasActive = require("../../utils/userValidations/userWasActive");
const { Challenge, User, ChallengeUser } = require("./../../models");
const dayjs = require("dayjs");

const challengeController = {
    findAll: async (req, res) => {
        const result = await Challenge.findAll();

        if(result.length === 0){
            challengeControllerError("Error, no challenges found", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("No challenges found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            challengeControllerError("Error, no challenge found", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Challenge cannot be found.");
        };

        res.status(200).json(findChallenge);
    },

    createOne: async (req, res) => {
        const {label} = req.body;
        // error if not label provided
        if(!label){
            challengeControllerError("Error, label missing.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Label is required.");
        };

        const findChallengeLabel = await Challenge.findOne({
            where:{
                label
            }
        });
        // if label does not exist, error 404
        if(findChallengeLabel){
            challengeControllerError("Error, label exists already.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Challenge already exists.");
        };

        const newChallenge = {
            label
        };

        await Challenge.create(newChallenge);

        res.status(201).json("Challenge created !");
    },

    updateOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const {label} = req.body;

        const findChallenge = await Challenge.findByPk(challengeId);
        // if no challenge, error 404
        if(!findChallenge){
            challengeControllerError("Error, no challenge found", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Challenge cannot be found.");
        };
        // if label provided, make sure it is not already existing
        if(label){
            const findChallengeLabel = await Challenge.findOne({
                where:{
                    label
                }
            });

            if(findChallengeLabel){
                challengeControllerError("Error, label exists already.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Challenge already exists.");
            };
        
            findChallenge.label = label;
        }
        // save the changes
        await findChallenge.save();

        res.status(200).json("Challenge updated !");
    },

    assignChallenge: async (req, res) => {

        const {userId} = req.body;

        const findUser = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });
        // if no user, error 404
        if(!findUser){
            challengeControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        const formattedToday = dayjs().format("YYYY-MM-DD");

        // check if user received a daily challenge today already
        const findChallengeUserByDate = await ChallengeUser.findOne({
            where: {
                user_id: userId,
                date_assigned: formattedToday
            }
        });
        // check if the user already received a challenge
        // if yes, then error
        // else proceed
        if(findChallengeUserByDate){
            challengeControllerError("Error, user received a daily challenge already.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("User already received a daily challenge.");
        };
        
        const allChallenges = await Challenge.findAll();
        // if no challenges, then return an error
        // checking length because findAll always returns [], even when nothing is found
        if(allChallenges.length === 0){
            challengeControllerError("Error, challenge cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Challenge cannot be found.");
        };
        /*
        // formate date to retrieve a YYYY-MM-DD date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0,10);
        */
        const randomChallengeNumber = randomNumber(allChallenges.length);
        // assign the challenge to the user 
        const newUserChallenge = {
            user_id: userId,
            challenge_id: allChallenges[randomChallengeNumber].id,
            date_assigned: formattedToday
        };

        // Assign challenge to user
        // and update challenge_id Foreign Key in user
        findUser.challenge_id = allChallenges[randomChallengeNumber].id;
        await findUser.save();
        await ChallengeUser.create(newUserChallenge);

        res.status(200).json(allChallenges[randomChallengeNumber]);
    
    },

    challengeChecker: async (req, res) => {

        const userId = req.params.userId;
        // check if the userId and the session user's id is the same
        // if not, it will return an error
        isSameIdAsUserSessionId(req, res, userId);

        const {challengeId} = req.body;

        const findUser = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser){
            challengeControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        }
        /*
        const currentDate = new Date();

        const formattedDate = currentDate.toISOString().slice(0, 10);
        */

        const formattedToday = dayjs().format("YYYY-MM-DD");

        const findChallengeUserByDate = await ChallengeUser.findOne({
            where: {
                user_id: userId,
                challenge_id: challengeId,
                date_assigned: formattedToday
            }
        });

        if(!findChallengeUserByDate){
            challengeControllerError("Error, only current day's challenge can be completed.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Only current day's challenge can be completed.");
        };

        // if challenge not yet completed
        // set to yes

        switch(findChallengeUserByDate.completed){
            case 'no':
                findChallengeUserByDate.completed = 'yes';
                await findChallengeUserByDate.save();
                // check if the user was active yesterday
                const wasUserActiveYesterday = userWasActive("yesterday", userId, ChallengeUser, ActivityUser, findUser);
                
                findUser.login_streak += 1;
                // if not active, then reset the streak
                if(!wasUserActiveYesterday){
                    findUser.login_streak = 0;
                };

                await findUser.save();
                break;
            case 'yes':

            // If challenge completed already
            // set to no
                findChallengeUserByDate.completed = 'no';
                await findChallengeUserByDate.save();

                const checkWasUserActiveYesterday = userWasActive("yesterday", userId, ChallengeUser, ActivityUser, findUser);
                
                findUser.login_streak -= 1;

                if(!checkWasUserActiveYesterday){
                    findUser.login_streak = 0;
                };

                await findUser.save();
                break;
        }
        res.status(200).json("Challenge completion updated !");
    },
    
    deleteOne: async (req, res) => {
        const challengeId = req.params.challengeId;

        const findChallenge = await Challenge.findByPk(challengeId);
        
        if(!findChallenge){
            challengeControllerError("Error, challenge cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Challenge cannot be found.");
        };

        await findChallenge.destroy();

        res.status(200).json("Challenge deleted !");
    }
}

module.exports = challengeController;