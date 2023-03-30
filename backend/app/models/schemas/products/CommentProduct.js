const Sequelize = require("sequelize");
const sequelize = require("./../../../data/sequelize");

class CommentProduct extends Sequelize.Model{}

CommentProduct.init({
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, {
    sequelize,
    tableName: "comment_product"
})

module.exports = CommentProduct;