require("dotenv").config();
const activities = require("./activities.json");
const categories = require("./categories.json");

const { Activity ,CategoryActivity } = require("../models");
//il faudrait require le schéma activities et categories pour faire l'insertion

// ACTIVITY OK 

// version sequelize

async function insertInto(tableName, data){
    switch(tableName){
        case "activity":
            for(let element of data){

                let object = {
                    code: element.code,
                    met: element.met,
                    category_activity_id: element.category_activity_id,
                    label: element.label
                }
                await Activity.create(object);
            }
        break;

        case "category_activity":
            for(let element of data){
                let object = {
                    label: element.label
                }

                await CategoryActivity.create(object);
            }
        break;
    }
}

insertInto("category_activity", categories)
insertInto("activity", activities);
// insertInto("category", categories);

// version pg

/*
async function insertInto(tableName, data){
    
    for(let element of data){

        let columns = [];
        let count = 1;
        let paramCount = [];
        let values = [];

        Object.entries(data).forEach(([key, value]) => {
            columns.push(key);
            values.push(value);
            paramCount.push(`$${count}`);
        })

        const preparedStatement = {
            query: `INSERT INTO ${tableName} ${columns} VALUES ${paramCount}`,
            values
        }
    }

    const preparedStatement = {
        query: ""
    }
}
*/
