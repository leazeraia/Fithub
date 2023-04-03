const activityError = require("debug")("controller:activityController");
const { Activity, CategoryActivity } = require("./../../models");

const activityController = {
    findAll: async (req, res) => {
        const result = await Activity.findAll({
            include: ["CategoriesActivity"]
        });

        if(result.length === 0){
            activityError("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`)
            return res.status(404).json("Activity cannot be found.");
        };

        res.status(200).json(result);
    },

    createOne: async (req, res) => {
        const {code, label, met, category_activity_id} = req.body;

        if(!code || !label || !met || !category_activity_id){
            activityError("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(400).json("Code, label, MET and category are required.");
        };

        // verify that the code is not used already
        const findActivityCode = await Activity.findOne({
            where: {
                code
            }
        });

        if(findActivityCode){
            activityError("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Code already exists.");
        };

        // verify that the label does not exist
        const findActivityLabel = await Activity.findOne({
            where: {
                label
            }
        });

        if(findActivityLabel){
            activityError("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(409).json("Label already exists.");
        };

        const findCategoryActivity = await CategoryActivity.findByPk(category_activity_id);
        
        if(!findCategoryActivity){
            activityError("Error", `${req.protocol}://${req.get("host")}${req.originalUrl}`);
            return res.status(404).json("Category cannot be found.");
        };

        const newActivity = {
            code,
            label,
            met,
            category_activity_id
        };

        await Activity.create(newActivity);

        res.status(201).json("Activity created !");
    },
};

module.exports = activityController;