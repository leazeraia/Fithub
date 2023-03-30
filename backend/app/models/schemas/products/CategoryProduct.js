const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class CategoryProduct extends Sequelize.Model{}

CategoryProduct.init({
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
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "category_product"
})

module.exports = CategoryProduct;