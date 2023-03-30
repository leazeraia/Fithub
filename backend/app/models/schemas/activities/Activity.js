const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class Activity extends Sequelize.Model{}

Activity.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    met: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    label: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    category_activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "activity"
})

module.exports = Activity;