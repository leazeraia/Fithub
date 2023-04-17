const error = require("debug")("error");
const { Article, CategoryArticle, User } = require("./../../models");

const articleController = {
    findAll: async (req, res) => {
        const result = await Article.findAll({
            include: ["UserAuthor", "CommentsArticle", "CategoriesArticle"]
        });

        if(result.length === 0){
            return res.status(404).json("Article cannot be found.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {
        const articleId = req.params.articleId;
        const result = await Article.findByPk(articleId, {
            include: ["UserAuthor", "CommentsArticle", "CategoriesArticle"]
        });

        if(!result){
            return res.status(404).json("Article cannot be found.");
        }

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {title, slug, description, content, category_article_id, user_id} = req.body;

        if(!title || !slug || !description || !content || !category_article_id){
            return res.status(400).json("Title, description, content and category are required.");
        }

        const findArticleTitle = await Article.findOne({
            where: {
                title
            }
        });

        if(findArticleTitle){
            return res.status(409).json("Title already exists.");
        };

        const findUser = await User.findByPk(user_id, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };
        
        // à réfléchir implémentation de plusieurs catégories

        const findCategory = await CategoryArticle.findByPk(category_article_id);
        
        if(!findCategory){
            return res.status(404).json("Category cannot be found.");
        };

        const newArticle = await Article.create({
            title,
            slug,
            description,
            content,
            user_id, 
        })

        await newArticle.addCategoriesArticle(findCategory);

        res.status(201).json("Article created !");
    },

    updateOne: async (req, res) => {
        const articleId = req.params.articleId;
        const {title, description, content, upvote} = req.body;
        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        // title and slug will always be together
        // but the user won't be able to change the slug directly

        if(title){

            const findArticleTitle = await Article.findOne({
            where: {
                    title
                }
            });

            if(findArticleTitle){
                return res.status(409).json("Title already exists.");
            };
            findArticle.title = title;
            findArticle.slug = title.replaceAll(" ", "-");
        };

        if(description){
            findArticle.description = description;
        };

        if(content){
            findArticle.content = content;
        };

        // TODO! Careful upvote value

        if(upvote){
            findArticle.upvote = upvote;
        };

        await findArticle.save();

        return res.status(200).json("Article updated !");

    },
    
    deleteOne: async (req, res) => {

        // Can a user without delete button make a delete request ?
        const articleId = req.params.articleId;

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        await findArticle.destroy();

        return res.status(200).json("Article deleted !");
    },

    likedArticle: async (req, res) => {
        const {userId, articleId} = req.body;

        const findUser = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });

        if(!findUser){
            return res.status(404).json("User cannot be found.");
        };

        const findArticle = await Article.findByPk(articleId);

        if(!findArticle){
            return res.status(404).json("Article cannot be found.");
        };

        const findUserLikedArticle = await User.findByPk(userId, {
            include: {
                association: "liked_article_user",
                where: {
                    article_id: articleId
                }
            }
        });

        if(findUserLikedArticle){

            // retire le like

            await findUser.removeArticle(findArticle);

            return res.status(200).json("Article unliked !");

        } 
        
            // ajoute le like

        await findUser.addArticle(findArticle);

        res.status(200).json("Article liked !");
        
    },

}

module.exports = articleController;