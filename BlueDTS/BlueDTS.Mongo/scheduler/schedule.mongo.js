/* *****************************************************************************************************************
    Name        : Cron Scheduler
    Description : configure the scheduler to process data

    Author      : Adarsh Dubey
    Created On  : 10/03/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA

    Purpose     :
***************************************************************************************************************** */


var CronJob = require('cron').CronJob;
const MongoBo = require('../bo/mongo.bo');
const servEnv = require("../../config/configServEnv");
var { cronRange } = require('../../config/constants/constants');


class Scheduler {

    constructor() {

    }


    startJob = async () => {

        var processdts = new CronJob(cronRange.ProcessDTSTick, async function () {
            var mongo_bo = new MongoBo();

            var jobresult = await mongo_bo.processCacheData("default");

            if (jobresult)
                console.log("dts job processed successfully");
            else
                console.log("dts job processed.");
        }, null, true, servEnv.timeZone);

        processdts.start();
    }
}
module.exports = Scheduler;