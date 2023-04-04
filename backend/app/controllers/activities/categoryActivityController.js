const categoryActivityControllerError = require("debug")("controller:categoryActivityControllerError");
const { CategoryActivity } = require("./../../models");

const categoryActivityController = {
    findAll: async (req, res) => {
        const result = await CategoryActivity.findAll({
            include: "ActivitiesCategory"
        });

        if(result.length === 0){
            categoryActivityControllerError("Error, categories cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Categories cannot be found.");
        }

        res.status(200).json(result);
    },

    findOne: async (req, res) => {

        const categoryActivityId = req.params.categoryActivityId;
        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId, {
            include: "ActivitiesCategory" 
        });
        
        if(!findCategoryActivity){
            activityControllerError("Error, category cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Category cannot be found.");
        }

        res.status(200).json(findCategoryActivity);
    },

    createOne: async (req, res) => {
        const {label} = req.body;

        if(!label){
            activityControllerError("Error, label is required.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Label is required.");
        };

        const findCategoryActivityLabel = await CategoryActivity.findOne({
            where: {
                label
            }
        });

        if(findCategoryActivityLabel){
            activityControllerError("Error, no activities found", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Label already exists.");
        };

        const newLabel = {
            label
        };

        await CategoryActivity.create(newLabel);

        res.status(201).json("Category created !");
    },

    updateOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;
        const {label} = req.body;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            activityControllerError("Error, category cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Category cannot be found.");
        };

        if(label){
            const findCategoryActivityLabel = await CategoryActivity.findOne({
                where: {
                    label
                }
            });
            
            if(findCategoryActivityLabel){
                activityControllerError("Error, label already exists.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
                return res.status(409).json("Category already exists.");
            };

            findCategoryActivity.label = label;
        }

        await findCategoryActivity.save();

        res.status(200).json("Category updated !");
    },
    
    deleteOne: async (req, res) => {
        const categoryActivityId = req.params.categoryActivityId;

        const findCategoryActivity = await CategoryActivity.findByPk(categoryActivityId);

        if(!findCategoryActivity){
            activityControllerError("Error, category cannot be found.", `path : ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Category cannot be found.");
        };

        await findCategoryActivity.destroy();

        res.status(200).json("Category deleted !");
    }
}

module.exports = categoryActivityController;