/* *****************************************************************************************************************
    Name        : SQL Database Configuration
    Description : This config properties needs to be updated accordingly with the deployed environments

    Author      : Adarsh Dubey
    Created On  : 04/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */




const DefaultSQLDB = {
    //host: 'pocejcall.bluesecures.com',
    //user: 'deskfactoradmin',
    //password: 'Deskf@ctor?123',
    //database: 'ejabberd',
    //port: 3306,
    //apptriggertable: 'ejabberd' + '.' + 'archive',

    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dts',
    apptriggertable: 'dts' + '.' + 'archive',
    port: 3306
};

module.exports = DefaultSQLDB;