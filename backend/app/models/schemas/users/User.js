const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class User extends Sequelize.Model{}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    nickname: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
        defaultValue: null
    },
    role: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    login_streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    gender: {
        type: Sequelize.ENUM('femme', 'homme', 'non-spécifié'),
        defaultValue: 'non-spécifié',
    },
    challenge_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    profile_visibility: {
        type: Sequelize.ENUM('publique', 'privé'),
        defaultValue: 'publique'
    },
    image_path: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    },
    image_mimetype: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "user"
})

module.exports = User;