/* *****************************************************************************************************************
    Class       : RepositorySingleton
    Description : Implements Singleton
    Author      : Prasoon
    Created On  : 13/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

const Repository = require("./repository")

class RepositorySingleton {
    constructor() {
        if (!RepositorySingleton.instance) {
            console.log('creating repository singleton');
            RepositorySingleton.instance  = new Repository();
        }
    }
    getInstance() {
        return RepositorySingleton.instance;
    }
}
module.exports = RepositorySingleton
