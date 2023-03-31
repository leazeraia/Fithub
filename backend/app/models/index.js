// activities

const Activity = require("./schemas/activities/Activity");
const CategoryActivity = require("./schemas/activities/CategoryActivity");
const ActivityUser = require("./schemas/activities/ActivityUser");

// articles

const Article = require("./schemas/articles/Article");
const CommentArticle = require("./schemas/articles/CommentArticle");
const CategoryArticle = require("./schemas/articles/CategoryArticle");

// products 

const Product = require("./schemas/products/Product");
const CommentProduct = require("./schemas/products/CommentProduct");
const CategoryProduct = require("./schemas/products/CategoryProduct");

// others
const ChallengeUser = require("./schemas/others/ChallengeUser");
const Company = require("./schemas/others/Company");
const Challenge = require("./schemas/others/Challenge");

// users

const User = require("./schemas/users/User");


// liked_article_user

User.belongsToMany(Article, {
    as: "LikedArticles",
    through: "liked_article_user",
    foreignKey: "user_id",
    otherKey: "article_id"
});

Article.belongsToMany(User, {
    as: "UserLiked",
    through: "liked_article_user",
    foreignKey: "article_id",
    otherKey: "user_id"
});

// post

Article.belongsTo(User, {
    as: "UserAuthor",
    foreignKey: "user_id"
});

User.hasMany(Article, {
    as: "ArticlesWritten",
    foreignKey: "user_id"
});


// have

CategoryArticle.belongsToMany(Article, {
    as: "ArticlesCategory",
    through: "assigned_category_article",
    foreignKey: "category_article_id",
    otherKey: "article_id"
});

Article.belongsToMany(CategoryArticle, {
    as: "CategoriesArticle",
    through: "assigned_category_article",
    foreignKey: "article_id",
    otherKey: "category_article_id"
});

// own

Article.hasMany(CommentArticle, {
    as: "CommentsArticle",
    foreignKey: "article_id",
});

CommentArticle.belongsTo(Article, {
    as: "ArticleComments",
    foreignKey: "article_id"
});

// comment_article_user

User.hasMany(CommentArticle, {
    as: "CommentsUser",
    foreignKey: "user_id",
});

CommentArticle.belongsTo(User, {
    as: "UserComments",
    foreignKey: "user_id"
});

// TOP PART DONE

// challenge_user

User.belongsToMany(Challenge, {
    as: "ChallengesUser",
    through: {
        model: ChallengeUser
    },
    foreignKey: "user_id",
    otherKey: "challenge_id"
});

Challenge.belongsToMany(User, {
    as: "UsersChallenges",
    through: {
        model: ChallengeUser,
    },
    foreignKey: "challenge_id",
    otherKey: "user_id"
});

User.belongsTo(Challenge, {
    as: "DailyChallenge",
    foreignKey: "challenge_id",
});

Challenge.hasMany(User, {
    as: "ChallengesDaily",
    foreignKey: "challenge_id"
});

// activity_user

User.belongsToMany(Activity, {
    as: "ActivitiesUsers",
    through: {
        model: ActivityUser,
    },
    foreignKey: "user_id",
    otherKey: "activity_id"
});

Activity.belongsToMany(User, {
    as: "UsersActivities",
    through: {
        model: ActivityUser,
    },
    foreignKey: "activity_id",
    otherKey: "user_id"
});

// possess

Activity.belongsTo(CategoryActivity, {
    as: "CategoriesActivity",
    foreignKey: "category_activity_id"
});

CategoryActivity.hasMany(Activity, {
    as: "ActivitiesCategory",
    foreignKey: "category_activity_id"
});

/*
// comment_product_user

User.belongsToMany(CommentProduct, {
    as: "comments_product",
    through: "comment_product_user",
    foreignKey: "user_id",
    otherKey: "comment_product_id"
})

CommentProduct.belongsToMany(User, {
    as: "users",
    through: "comment_product_user",
    foreignKey: "comment_product_id",
    otherKey: "user_id"
})

// bought_product_user

User.belongsToMany(Product, {
    as: "products",
    through: "bought_product_user",
    foreignKey: "user_id",
    otherKey: "product_id"
})

Product.belongsToMany(User, {
    as: "users",
    through: "bought_product_user",
    foreignKey: "product_id",
    otherKey: "user_id"
})

// assign

Product.hasMany(CommentProduct, {
    as: "comments_product",
    foreignKey: "product_id"
})

CommentProduct.belongsTo(Product, {
    as: "product",
    foreignKey: "product_id"
})
*/
// belong 

Product.belongsTo(CategoryProduct, {
    as: "CategoryProduct",
    foreignKey: "category_product_id"
});

CategoryProduct.hasMany(Product, {
    as: "ProductCategories",
    foreignKey: "category_product_id"
});

// sell

Product.belongsTo(Company, {
    as: "CompanySelling",
    foreignKey: "company_id"
});

Company.hasMany(Product, {
    as: "ProductSold",
    foreignKey: "company_id"
});

// deliver

Product.belongsTo(Company, {
    as: "CompanyDelivering",
    foreignKey: "delivery_company_id"
});

Company.hasMany(Product, {
    as: "ProductDelivered",
    foreignKey: "delivery_company_id"
});

module.exports = {
    Activity,
    CategoryActivity,
    Article,
    CommentArticle,
    CategoryArticle,
    Product,
    CommentProduct,
    CategoryProduct,
    Company,
    Challenge,
    ChallengeUser,
    User
}