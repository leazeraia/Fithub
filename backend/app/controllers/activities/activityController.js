const activityControllerError = require("debug")("controller: activityControllerError");
const ActivityUser = require("../../models/schemas/activities/ActivityUser");
const totalDailyCaloriesCalculator = require("../../utils/calories/totalDailyCaloriesCalculator");
const isSameIdAsUserSessionId = require("./../../utils/userValidations/isSameAsUserSessionId");
const userWasActive = require("../../utils/userValidations/userWasActive");
const { Activity, CategoryActivity, User, ChallengeUser } = require("./../../models");
const caloriesCalculator = require("./../../utils/calories/caloriesCalculator");
const dayjs = require("dayjs");

const activityController = {
    findAll: async (req, res) => {
        const result = await Activity.findAll({
            include: ["CategoriesActivity"]
        });

        if(result.length === 0){
            activityControllerError("Error, no activities found", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Activities cannot be found.");
        };

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {code, label, met, category_activity_id} = req.body;

        if(!code || !label || !met || !category_activity_id){
            activityControllerError("Error, missing required fields.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Code, label, MET and category are required.");
        };

        // verify that the code is not used already
        const findActivityCode = await Activity.findOne({
            where: {
                code
            }
        });

        if(findActivityCode){
            activityControllerError("Error, code already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Code already exists.");
        };

        // verify that the label does not exist
        const findActivityLabel = await Activity.findOne({
            where: {
                label
            }
        });

        if(findActivityLabel){
            activityControllerError("Error, label already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Activity already exists.");
        };

        const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
        if(!findCategoryActivity){
            activityControllerError("Error, category cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Category cannot be found.");
        };

        const newActivity = {
            code,
            label,
            met,
            category_activity_id
        };

        await Activity.create(newActivity);

        res.status(201).json("Activity created !");
    },

    updateOne: async (req, res) => {
        const activityId = req.params.activityId;

        const {code, label, met, category_activity_id} = req.body;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            activityControllerError("Error, activity cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Activity cannot be found.");
        };

        // if there is a code
        // make sure the code is not already an existing one
        if(code){
            const findActivityCode = await Activity.findOne({
                where: {
                    code
                }
            });

            if(findActivityCode){
                activityControllerError("Error, code already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Code already exists.");
            };

            // else assign the new code
            findActivity.code = code;
        };

        // check the label is a unique one
        if(label){
            const findActivityLabel = await Activity.findOne({
                where: {
                    label
                }
            });

            if(findActivityLabel){
                activityControllerError("Error, label already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Label already exists.");
            };

            // else, assign the new label
            findActivity.label = label;
        };

        if(met){
            findActivity.met = met;
        };

        // check if the category exists
        if(category_activity_id){
            const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
            if(!findCategoryActivity){
                activityControllerError("Error, category cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(404).json("Category cannot be found.");
            };
            findActivity.category_activity_id = category_activity_id;
        };

        await findActivity.save();

        res.status(200).json("Activity updated !");
    },
    
    deleteOne: async (req, res) => {
        const activityId = req.params.activityId;

        const findActivity = await Activity.findByPk(activityId);

        if(!findActivity){
            activityControllerError("Error, activity cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Activity cannot be found.");
        };

        await findActivity.destroy();

        res.status(200).json("Activity deleted !");
    },

    assignActivityToUser: async (req, res) => {

        const {user_id, activity_id, duration} = req.body;

        if(!user_id || !activity_id || !duration){
            return res.status(400).json("The user's id, activity's id and the duration are required.");
        };
        // checks if the user's id is the same as the session's ID
        // otherwise return an error
        isSameIdAsUserSessionId(req, res, user_id);

        const findUser = await User.findByPk(user_id, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser) {
            activityControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };
        
        const findActivity = await Activity.findByPk(activity_id);
        
        if(!findActivity){
            activityControllerError("Error, activity cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Activity cannot be found.");
        };

        // checks if the user was active yesterday

        const wasUserActiveYesterday = userWasActive("yesterday", user_id, ChallengeUser, ActivityUser);
        
        // if yes, then add 1
        findUser.login_streak += 1;

        // if not, then reset to 0
        if(!wasUserActiveYesterday){
            findUser.login_streak = 0;
        };
        /*
        // gets current day's date
        const today = new Date();
        // formats the date to retrieve it in a YYYY MM DD format
        const formattedToday = today.toISOString().slice(0, 10);
        */

        const formattedToday = dayjs().format("YYYY-MM-DD");
        const findAllUserActivityByDate = await ActivityUser.findAll({
            where: {
                user_id,
                date_assigned: formattedToday
            }
        });

        //check total calories burned from this activity
        const caloriesFromActivity = caloriesCalculator(findActivity.met, duration, findUser.weight);

        // check total calories burned today
        const userDailyCaloriesTotal = totalDailyCaloriesCalculator(findAllUserActivityByDate);
        
        if(userDailyCaloriesTotal > 1000){
            // If user burned more than 1000 today
            // do nothing
        }else if(userDailyCaloriesTotal + caloriesFromActivity > 1000){
            // If the total calories burned today + calories burned from activty is more than 1000
            // then only add the required amount to reach 1000 cap
            // to the user exp
            findUser.xp += (1000 - findUser.xp);
            //save the changes
            await findUser.save();
        } else {
            // Default case add calories value to the user xp
            findUser.xp += caloriesFromActivity;
            await findUser.save();
        }

        const newActivity = {
            user_id,
            activity_id,
            duration,
            calories: caloriesFromActivity,
            date_assigned: formattedToday
        };

        await ActivityUser.create(newActivity);

        res.status(200).json({label: findActivity.label, calories: newActivity.calories, duration: newActivity.duration});
    },

    removeActivityFromUser: async (req, res) => {

        const userId = req.params.userId;

        isSameIdAsUserSessionId(req, res, userId);

        const activityUserId = req.params.activityUserId;
        
        const findUser = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser){
            activityControllerError("Error, user cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("User cannot be found.");
        };

        const findUserActivity = await ActivityUser.findByPk(activityUserId);

        if(!findUserActivity) {
            activityControllerError("Error, activity not assigned to user.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Activity already not assigned to user.");
        };
        /*
        // format today's date in a YYYY MM DD format
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10);
        */

        const formattedToday = dayjs().format("YYYY-MM-DD");
        // find all activities the user did today
        if(findUserActivity.date_assigned === formattedToday){
            const findAllUserActivityByDate = await ActivityUser.findAll({
                where: {
                    user_id: userId,
                    date_assigned: formattedToday
                }
            });

            //check total calories

            const caloriesFromActivity = findUserActivity.calories;
            // calculate total amount of calories burned on that day
            const userDailyCaloriesTotal = totalDailyCaloriesCalculator(findAllUserActivityByDate);
            // calculate total amount of calories burned before registering this activity
            const userDailyCaloriesTotalBeforeActivity = userDailyCaloriesTotal - caloriesFromActivity;

            if(userDailyCaloriesTotalBeforeActivity > 1000){
                // if calories before activity more than 1000, only delete entry
                await findUserActivity.destroy();
            } else if(userDailyCaloriesTotalBeforeActivity < 1000 && userDailyCaloriesTotalBeforeActivity + caloriesFromActivity > 1000) {
                // if calories less than 1000, but the sum before activity + calories burned is more than 1000
                // only substract by taking in account the extra that was not added
                // it will return a negative number
                const differenceFromMaxExp = userDailyCaloriesTotalBeforeActivity - 1000;
                findUser.xp += differenceFromMaxExp;
                // delete entry
                await findUserActivity.destroy();

                // check if the user had an activity today or challenge
                const findUserActivityByDateAfterUpdate = userWasActive("today", userId, ChallengeUser, ActivityUser);
                // otherwise substract 1 to the login streak because user was inactive today
                if(!findUserActivityByDateAfterUpdate){
                    findUser.login_streak -= 1
                }

                   // save modification
                await findUser.save();

            } else {
                // default case, substract the full calories value
                findUser.xp -= caloriesFromActivity;
                await findUserActivity.destroy();

                // check if user had an activity today
                const findUserActivityByDateAfterUpdate = userWasActive("today", userId, ChallengeUser, ActivityUser);

                // otherwise subtract 1 to the login streak, because user was inactive today
                if(!findUserActivityByDateAfterUpdate){
                    findUser.login_streak -= 1
                }

                   // save modification
                await findUser.save();
            }
            res.status(200).json("Activity removed from user !");

        } else {
            await findUserActivity.destroy();
            res.status(200).json("Activity removed from user !");
        };

    }
};

module.exports = activityController;