const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class ChallengeUser extends Sequelize.Model{}

ChallengeUser.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    challenge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    completed:{
        type: Sequelize.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    date_assigned: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "challenge_user"
})

module.exports = ChallengeUser;