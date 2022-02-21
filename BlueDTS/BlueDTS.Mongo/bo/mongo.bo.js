/* *****************************************************************************************************************
    Name        : Mongo BO
    Description : Business Object to handle mongo data crud interactions

    Author      : Adarsh
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var Mongo_DAL = require("../dal/mongo.dal");

class MongoBO {

    constructor()
    { }

    async storeData(subscriberId, data) {

        try {
            //todo
        } catch (err) {
            result = null;
        }
    }


    async PushCacheData(subscriberId, rowData) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.saveCacheRowData(subscriberId, rowData);
        return result;
    }
}
module.exports = MongoBO;