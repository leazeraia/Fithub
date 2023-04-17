const dayjs = require("dayjs");

const userWasActive = async (todayOrYesterday, userId, ChallengeUserModel, ActivityUserModel) => {
    // const today = new Date()

    switch(todayOrYesterday){
        case "today":
            // checking if user was active today
                //const formattedToday = today.toISOString().slice(0, 10);
                const formattedToday = dayjs().format("YYYY-MM-DD");
            // checking for at least one activity today where the challenge is completed
            const findChallengeUserToday = await ChallengeUserModel.findOne({
                where: {
                    user_id: userId,
                    completed: 'yes',
                    date_assigned: formattedToday
                }
            });
            // if yes, then return true
            if(findChallengeUserToday){
                return true;
            };

            // otherwise look for an activity
            const findActivityUserToday = await ActivityUserModel.findOne({
                where: {
                    user_id: userId,
                    date_assigned: formattedToday
                }
            });

            // if there is an activity today, then return true
            if(findActivityUserToday){
                return true;
            };

        // else user was not active, return false
        return false;

            case "yesterday":
                // checks if the user was active yesterday
                /*
                const yesterday = new Date(today);
                // set the date to yesterday's full date
                yesterday.setDate(today.getDate() - 1);
                // edit the date to have it in a YYYY-MM-DD format
                const formattedYesterday = yesterday.toISOString().slice(0, 10);
                */

                const formattedYesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
                // check if the user had completed a challenge yesterday
                const findChallengeUserYesterday = await ChallengeUserModel.findOne({
                    where: {
                        user_id: userId,
                        completed: 'yes',
                        date_assigned: formattedYesterday
                    }
                });
                // if yes, then return true
                if(findChallengeUserYesterday){
                    return true;
                };
                // otherwise check if he completed an activity yesterday
                const findActivityUserYesterday = await ActivityUserModel.findOne({
                    where: {
                        user_id: userId,
                        date_assigned: formattedYesterday
                    }
                });
                // if yes, then return true
                if(findActivityUserYesterday){
                    return true;
                };
                // else, user was inactive and return false
            return false;
    }

};

module.exports = userWasActive;