const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class ActivityUser extends Sequelize.Model{}

ActivityUser.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    date_assigned: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    sequelize,
    tableName: "activity_user"
})

module.exports = ActivityUser;