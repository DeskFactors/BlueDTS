/* *****************************************************************************************************************
    Name        : App Default Database
    Description : Entry Point to default mongo db database to the DTS

    Author      : Adarsh Dubey
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const AppDefaultDB = [{
    //"subscriberId": "default",
    //"db_option": "mongo",
    //"schema_less": true,
    //"primary_db": true,
    //"service_type": "server",
    //"db_name": "BlueSecuresDB_US",
    //"db_config": {
    //    "server": "pocejcall.bluesecures.com",
    //    "port": "27017",
    //    "pool_size": "4",
    //    "user": "Dev",
    //    "password": "BlueDF1234"
    //},
    //"region": "US"

    "subscriberId": "default",
    "db_option": "mongo",
    "schema_less": true,
    "primary_db": true,
    "service_type": "server",
    "db_name": "BlueDTS",
    "db_config": {
        "server": "localhost",
        "port": "27017",
        "pool_size": "4",
        "user": "",
        "password": ""
    },
    "region": "US"
},{
    "subscriberId": "",
    "db_option": "mongo",
    "schema_less": true,
    "primary_db": true,
    "service_type": "server",
    "db_name": "BlueChatsDB_CA",
    "db_config": {
        "server": "127.0.0.1",
        "port": "27017",
        "pool_size": "4",
        "user": "",
        "password": ""
    },
    "region": "CA"
    },

    //{
    //    "subscriberId": "default",
    //    "db_option": "sql",
    //    "schema_less": false,
    //    "primary_db": true,
    //    "service_type": "server",
    //    "db_name": "ejabberd",
    //    "db_config": {
    //        "server": "pocejcall.bluesecures.com",
    //        "port": "3306",
    //        "pool_size": "1",
    //        "user": "deskfactoradmin",
    //        "password": "Deskf@ctor?123"
    //    },
    //    "region": "US"
    //},
    {
        "subscriberId": "default",
        "db_option": "sql",
        "schema_less": false,
        "primary_db": true,
        "service_type": "server",
        "db_name": "dts",
        "db_config": {
            "server": "localhost",
            "port": "3306",
            "pool_size": "1",
            "user": "root",
            "password": "password"
        },
        "region": "US"
    }]

module.exports = AppDefaultDB;