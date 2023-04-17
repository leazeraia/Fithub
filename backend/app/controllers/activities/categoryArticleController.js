const error = require("debug")("error");
const { CategoryArticle, Article } = require("./../../models");

const categoryArticleController = {
    findAll: async (req, res) => {
        //double check
        const result = await CategoryArticle.findAll();

        if(result.length === 0){
            return res.status(404).json("Category cannot be found.");
        };

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;
        
        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId, {
            include: {
                association: "ArticlesCategory",
                include: "UserAuthor"
            }
        });
        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        res.status(200).json(findCategoryArticle);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            return res.status(400).json("Label is required.");
        };

        const findCategoryArticleLabel = await CategoryArticle.findOne({
            where: {
                label
            }
        });

        if(findCategoryArticleLabel){
            return res.status(409).json("Category already exists.");
        };

        await CategoryArticle.create({label});

        res.status(201).json("Category created !");
    },

    updateOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;
        const {label} = req.body;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        if(label){
            const findCategoryArticleLabel = await CategoryArticle.findOne({
                where: {
                    label
                }
            });

            if(findCategoryArticleLabel){
                return res.status(409).json("Category already exists.");
            };
            findCategoryArticle.label = label;
        };

        await findCategoryArticle.save();

        res.status(200).json("Category updated !");
    },
    
    deleteOne: async (req, res) => {
        const categoryArticleId = req.params.categoryArticleId;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        }

        await findCategoryArticle.destroy();

        res.status(200).json("Category deleted !");
    },

    assignCategoryToArticle: async (req, res) => {
        const articleId = req.params.articleId;

        const {category_article_id} = req.body;

        const findCategoryArticle = await CategoryArticle.findByPk(category_article_id);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        };

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        const findArticleByCategoryAmount = await CategoryArticle.findByPk(articleId, {
            include: {
                association: "CategoriesArticles"
            }
        });

        if(findArticleByCategoryAmount.CategoriesArticles.length > 3){
            return res.status(409).json("Article already reached the maximum amount of categories.");
        };

        const findArticleByCategory = await Article.findByPk(articleId, {
            include: {
                association: "CategoriesArticles",
                where: {
                    category_article_id
                }
            }
        });

        if(findArticleByCategory){
            return res.status(409).json("Article already possess this category.");
        };

        await findArticle.addCategoriesArticle(findCategory);

        res.status(200).json("Category assigned to article !");
    },

    removeCategoryFromArticle: async (req, res) => {
        const articleId = req.params.articleId;
        const {categoryArticleId} = req.params.categoryArticleId;

        const findCategoryArticle = await CategoryArticle.findByPk(categoryArticleId);

        if(!findCategoryArticle){
            return res.status(404).json("Category cannot be found.");
        };

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        const findArticleByCategory = await Article.findByPk(articleId, {
            include: {
                association: "CategoriesArticles",
                where: {
                    categoryArticleId
                }
            }
        });

        if(!findArticleByCategory){
            return res.status(409).json("Article already possess this category.");
        };

        await findArticle.removeCategoriesArticle(findCategory);

        res.status(200).json("Category removed from article !");

    }
}

module.exports = categoryArticleController;