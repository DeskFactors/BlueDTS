/* *****************************************************************************************************************
    Name        : Mongo db connection
    Description : mongo db connection intialization

    Author      : Adarsh Dubey
    Created On  : 09/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA

    Purpose     :
***************************************************************************************************************** */
const { MongoClient } = require("mongodb");

class DatabaseConnPool {

    constructor() {
    }

    async initializeDefaultMongoDB(dbConfig, dbName) {
        var server = dbConfig.server;
        var dbPort = dbConfig.port;
        var dbUser = dbConfig.user;
        var dbPwd = dbConfig.password;
        var poolSize = dbConfig.pool_size;
        var database = dbName;

        var mongoURI = null;
        var mongoClient = null;
        var mongoDB = null;

        if (poolSize === null || poolSize === "" || poolSize === undefined) { poolSize = 5; }

        try {
            if (!dbUser || !dbPwd) {
                mongoURI = `mongodb://${server}:${dbPort}/${database}?retryWrites=true&w=majority`;
            }
            else {
                mongoURI = `mongodb://${dbUser}:${dbPwd}@${server}:${dbPort}/${database}?retryWrites=true&w=majority`;
            }

            mongoClient = await new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: poolSize });
            await mongoClient.connect();

            mongoDB = await mongoClient.db(database);

            console.log('Mongo DB connection is successful!!!');
            return ({ success: true, result: mongoDB });
        }
        catch (err) {
            console.log('Mongose DB connection is Failed !!!');
            return ({ success: false, result: err });
        }
    }

    async initializeDBConnection(AppConfig) {
        var result = {};
        result = await this.initializeDefaultMongoDB(AppConfig.db_config, AppConfig.db_name);
        return result;
    }

    async getSubscriberDB(dbConfig) {
        var dbObj = null;
        var result = null;

        //initializing with mongodb connection
        result = await this.initializeDefaultMongoDB(dbConfig.db_config, dbConfig.db_name);
        dbObj = result.result;

        return dbObj;

    }

};
module.exports = new DatabaseConnPool;
