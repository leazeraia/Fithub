const userWasActive = async (todayOrYesterday, userId, ChallengeUserModel, ActivityUserModel) => {
    const today = new Date()

    switch(todayOrYesterday){
        case "today":

            const formattedToday = today.toISOString().slice(0, 10);

            const findChallengeUserToday = await ChallengeUserModel.findOne({
                where: {
                    user_id: userId,
                    completed: 'yes',
                    date_assigned: formattedToday
                }
            });

            if(findChallengeUserToday){
                return true;
            };

            const findActivityUserToday = await ActivityUserModel.findOne({
                where: {
                    user_id: userId,
                    date_assigned: formattedToday
                }
            });


            if(findActivityUserToday){
                return true;
            };

        return false;

            case "yesterday":
                const yesterday = new Date(today);

                yesterday.setDate(today.getDate() - 1);

                const formattedYesterday = yesterday.toISOString().slice(0, 10);

                const findChallengeUserYesterday = await ChallengeUserModel.findOne({
                    where: {
                        user_id: userId,
                        completed: 'yes',
                        date_assigned: formattedYesterday
                    }
                });

                if(findChallengeUserYesterday){
                    return true;
                };

                const findActivityUserYesterday = await ActivityUserModel.findOne({
                    where: {
                        user_id: userId,
                        date_assigned: formattedYesterday
                    }
                });

                if(findActivityUserYesterday){
                    return true;
                };
                
            return false;
    }

};

module.exports = userWasActive;