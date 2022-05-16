/* *****************************************************************************************************************
    Name        : startAppserver
    Description : Entry Point to the BlueDTS
    Author      : Adarsh Dubey
    Created On  : 02/02/2020
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var express = require('express');
var app = express();
var servEnv = require('./configServEnv');
var jobs_scheduler = require('../BlueDTS.Mongo/scheduler/schedule.mongo');
var http = require('http');
var https = require('https');
var debug = require('debug');
var app = express();
app.set('env', servEnv.environment);

process.env.NODE_ENV = process.env.NODE_ENV || servEnv.environment;
const httpPort = normalizePort(process.env.PORT || servEnv.httpPort);
const httpsPort = normalizePort(process.env.PORT || servEnv.httpsPort);


/* ***************************************** BEGIN: Server Setup common methods ***************************************** */
// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var port = null;
    if (servEnv.protocol === 'http') {
        port = httpPort;
    }
    else {
        port = httpsPort;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Event listener for HTTP server "listening" event.
function onHttpServerListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
function onHttpsServerListening() {
    var addr = httpsServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
/* ***************************************** END: Server Setup common methods ***************************************** */

/* ***************************************** BEGIN: HTTP Server Setup ***************************************** */
if ((servEnv.protocol === "http") || (servEnv.protocol === "both")) {
    
    app.set('httpPort', httpPort);
    var httpServer = http.createServer(app).listen(httpPort, function () {
        console.log(process.env.NODE_ENV + ' HTTP server running at http://' + servEnv.hostName + ':' + httpPort);
    });
    httpServer.keepAliveTimeout = 600000;
    httpServer.timeout = 600000;
    httpServer.on('error', onError);
    httpServer.on('listening', onHttpServerListening);

    // start the cron jobs
    //let jobs = new jobs_controller();
    //jobs.startJob();

}
/* ***************************************** END: HTTPS Server Setup ***************************************** */

/* ***************************************** BEGIN: MySQL Application DB initializtion ***************************************** */
const SQLAppDefaultBO = require('../BlueDTS.SQL/bo/config/appDefault.bo');
async function connectSqlDB() {
    var sqldbconn = new SQLAppDefaultBO();
    var dbconnobject = await sqldbconn.getAppDefaultMySQLDB();
    return dbconnobject;
};
connectSqlDB().then(() => {
    console.log('MySQL DB Connection is successfully initialized...\n');
});
/* ***************************************** END: MySQL DB initializtion ***************************************** */

/* ***************************************** BEGIN: Default MongoDB Application DB initializtion ***************************************** */
const AppDefaultBO = require('../BlueDTS.Mongo/bo/config/appDefault.bo');
async function connectMongoDefaultDB() {
    var appDefDB = new AppDefaultBO();
    var dbconnobject = await appDefDB.getAppDefaultMongoDB();
    return dbconnobject;
};
connectMongoDefaultDB().then(() => {
    console.log('Application Default MongoDB Connection is successfully initialized...\n');
});
/* ***************************************** END:Default MongoDB Application DB initializtion ***************************************** */

/* ***************************************** BEGIN: App Triggers initializtion ***************************************** */
const apptriggerinst = require('../BlueDTS.SQL/triggers/apptriggerevents');
async function startapptriggers() {
    var apptrig = new apptriggerinst();
    var trigconnobj = await apptrig.apptriggerinitialization();
    return trigconnobj;
};
startapptriggers().then(() => {
    console.log("Trigger has been configured ,connected and monitoring successfully....\n");
});
/* ***************************************** END:App Triggers initializtion ***************************************** */

/* ***************************************** BEGIN: To test any bo/dal/dao ***************************************** */
//const ctestBO = require('../BlueDTS.Mongo/bo/mongo.bo');
// //test logic and should be removed before the release
//async function testbo() {
//    var testmodulefunc = new ctestBO();
//    var subscriberId = "default";
//    var toId = "9676b680-a528-11ec-8067-4fd778debfb8@conference.dev.bluesecures.com";
//    var fromId = "918887779994@dev.bluesecures.com";
//    var ciphertext = "AzMIlIDJBhIhBVV5uUVz83nJKVngfR3jhmPjRH90zP2ojczuZKmjcExZGiEFXHiYHeFQoTJdiMkQEcXFK+kNlfzQvxMZhlx4AoWdqXQiQjMKIQWLiiqZKJs0sfrkYbnfiRDAb0bbDsnWT2VQWkeKlxQKChAAGAAiENybPxs4JFRj9vMn8Xl5ZjoKVHXhMmOVbCgAMNyQ4wE=";
//    //var plaintext = await testmodulefunc.decryptMessageBody(subscriberId, ciphertext, toId, fromId);
//    var plaintext = await testmodulefunc.processCacheData(subscriberId);
//    //var ciphertext = await testmodulefunc.encryptMessageBody("61b86caeae050d28a96f640d", "heloooo!!!");
//    //console.log(plaintext);
//};
//testbo().then(() => {
//    console.log('test function executed successfully...\n');
//});
/* ***************************************** END:To test any bo/dal/dao ***************************************** */

// start the cron jobs
let jobs = new jobs_scheduler();
jobs.startJob();

// TEST CASES Access the session as req.session
app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html')
        res.end('welcome to the DTS. refresh!')
    
});
module.exports = app;