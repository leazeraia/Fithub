const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class Product extends Sequelize.Model{}

Product.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    label: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    availability: {
        type: Sequelize.ENUM("disponible", "indisponible", "bientôt"),
        defaultValue: "disponible"
    },
    category_product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    delivery_company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "product"
})

module.exports = Product;