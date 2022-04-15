/* *****************************************************************************************************************
    Name        : Mongo BO
    Description : Business Object to handle mongo data crud interactions

    Author      : Adarsh Dubey
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var Mongo_DAL = require("../dal/mongo.dal");
var Crypto_LIB = require("../../BlueDTS.Library/crypto/crypto");
var servEnv = require('../../config/configServEnv');
var Signal_BO = require("./signal.bo");
var Log_Model = require("../models/log.model");
const Iterator = require('../helper/iterator');
const MessageModelBuilder = require('../helper/model.builder')

class MongoBO {

    constructor() { }

    async pushCacheData(subscriberId, rowData) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.saveCacheRowData(subscriberId, rowData);
        return result;
    }

    async deleteCacheData(subscriberId, rowData) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.deleteCacheRowData(subscriberId, rowData);
        return result;
    }

    async getCacheData(subscriberId, to , from) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.fetchCacheRows(subscriberId, to, from);
        return result;
    }

    async getCacheData(subscriberId) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.fetchCacheRows(subscriberId);
        return result;
    }

    async decryptSubKey(subKey) {

        var encryptionkey = servEnv.encryptMessageKey
        var crypto_lib = new Crypto_LIB();
        var hash = crypto_lib.decryptToMessage(subKey, encryptionkey);
        return hash;
    }

    async encryptwithBuisnessKey(message, encryptionkey) {

        var crypto_lib = new Crypto_LIB();
        var hash = crypto_lib.encryptToHash(message, encryptionkey);
        return hash;
    }

    async decryptMessageBody(subscriberId ,cipherText, toId, FromId) {

        var plainText = "";
        var mongo_dal = new Mongo_DAL();
        if (cipherText !== "") {
            var ownerPrekeyResult = await mongo_dal.fetchPreKeys(subscriberId, toId);

            if (ownerPrekeyResult.status) {
                var ownerPrekey = ownerPrekeyResult.result;

                var selfPrekeyResult = await mongo_dal.fetchPreKeys(subscriberId, FromId);
                if (selfPrekeyResult.status) {

                    var selfPrekey = selfPrekeyResult.result;
                    plainText = await this.decryptSignalCipherText(cipherText, ownerPrekey, selfPrekey);
                    return plainText;
                }
            }
            else {
                return plainText;
            }
        }
        else {
            return plainText;
        }
    }

    async decryptSignalCipherText(cipherText, ownerPrekey, selfPrekey) {

        var signal_bo = new Signal_BO();        
        var messageobj = await signal_bo.decryptMessage(cipherText, ownerPrekey, selfPrekey);
        return messageobj.result;    
    }

    async getLatestTimestampsToProcess(subscriberId) {

        var result = {};
        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.fetchLastTimestamp(subscriberId);

        if (result) {
            var from = result.timestamp;
            var fromDate = new Date(from);
            var toDate = this.add_minutes(fromDate, servEnv.timestampInterval);
            var to = toDate.getTime();
            result = { status: true, to: to, from: from };
            return result;
        };
    }

    async saveJobLog(subscriberId , timestamp) {

        var log = new Log_Model();

        log.status = 'S';
        log.latest = true;
        log.timestamp = timestamp
        log.createdAt = Date.now()

        var mongo_dal = new Mongo_DAL();
        await mongo_dal.saveTimestampLog(subscriberId , log);
    }

    async saveFailedRowLog(subscriberId, row) {

        var mongo_dal = new Mongo_DAL();
        await mongo_dal.saveFailureLog(subscriberId, row);
    }

    async saveArchivalRow(subscriberId, row) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.saveArchivalRowData(subscriberId, row);
        return result;
    }

    dataProcessValidation(rows, timestamp) {

        //logic to prevalidate date before processing
        const arr = []

        if (rows.every(e => e.timestamp === timestamp))
            return rows = arr; //these data are already processed in last batch
        else {

            return rows;
        }
       
    }

    async processCacheDataOnTimestamp(subscriberId) {

        var timestamps = await this.getLatestTimestampsToProcess(subscriberId);

        if (timestamps.status) {

            var cachedRows = await this.getCacheData(subscriberId, timestamps.to, timestamps.from);

            if (cachedRows.status && cachedRows.rows.length > 0) {

                let iterator = new Iterator();
                iterator.setDataSource(cachedRows.rows);
                let result = [];

                //cache rows processing
                while (iterator.hasNext()) {
                    let data = iterator.next();
                    let msgbuilder = new MessageModelBuilder();
                    try {

                        // complete rowobj formation based on different message type
                        let txtmodelObj = await msgbuilder.createMessageModel(data);

                        //body extraction and processing
                        var body = txtmodelObj.messageText;
                        if (txtmodelObj.messageType === "text" || txtmodelObj.messageType === "url") {
                            if (body != null || body !== undefined || body !== "") {

                                //cryptographic activities
                                body = body.replace(/\s/g, '');
                                body = await this.decryptMessageBody(txtmodelObj.subscriberId, body, txtmodelObj.receiverXmppId, txtmodelObj.senderXmppId);
                                body = await this.encryptMessageBody(txtmodelObj.subscriberId, body);

                                txtmodelObj.messageText = body;                               
                            }
                        }

                        const size = new TextEncoder().encode(JSON.stringify(txtmodelObj)).length;
                        txtmodelObj.size = size;

                        // here we save the finally processed row to mongo collection.
                        await this.saveArchivalRow(txtmodelObj.subscriberId, txtmodelObj);
                    }
                    catch (err) {
                        console.log(err);
                        continue;//log the error and continue processing the next row.
                    }
                }           
            }

            // here we update the timestamp when all rows are processed successfully.
            await this.saveJobLog(subscriberId, timestamps.to);
        }
        return true;
    }

    async processCacheData(subscriberId) {

        //fetching cached rows
        var cachedRows = await this.getCacheData(subscriberId);

        if (cachedRows.status && cachedRows.rows.length > 0) {

            let iterator = new Iterator();
            iterator.setDataSource(cachedRows.rows);
          
            //cache rows processing
            while (iterator.hasNext()) {
                let row = iterator.next();
                let msgbuilder = new MessageModelBuilder();
                try {

                    // complete rowobj formation based on different message type
                    let txtmodelObj = await msgbuilder.createMessageModel(row);

                    //body extraction and processing
                    var body = txtmodelObj.messageText;
                    if (txtmodelObj.messageType !== 'contact' || txtmodelObj.messageType !=='location') {
                        if (body != null || body !== undefined || body !== "") {

                            //cryptographic activities
                            body = body.replace(/\s/g, '');
                            body = await this.decryptMessageBody(txtmodelObj.subscriberId, body, txtmodelObj.receiverXmppId, txtmodelObj.sender.senderId);
                            body = await this.encryptMessageBody(txtmodelObj.subscriberId, body);

                            txtmodelObj.messageText = body;

                            //extra settings for model types having attachments included
                            if (txtmodelObj.attachment !== null && txtmodelObj.attachment !== undefined) {
                                txtmodelObj.attachment.storageRefId = body;
                                txtmodelObj.attachment.storageBlobURL = body;
                            }
                        }
                    }

                    const size = new TextEncoder().encode(JSON.stringify(txtmodelObj)).length;
                    txtmodelObj.size = size;

                    // here we save the finally processed row to mongo collection.
                    await this.saveArchivalRow(txtmodelObj.subscriberId, txtmodelObj);
                    row.retryCount = 0;
                }
                catch (err) {
                    console.log(err);

                    if (row.retryCount > 0) {

                        row.retryCount = row.retryCount - 1;
                        iterator.curr_pos = iterator.curr_pos - 1;
                        continue;
                    }
                    else {

                        row.error_message = err.message;
                        row.error_stack = err.stack;
                        //saving the row in failure log
                        await this.saveFailedRowLog(subscriberId, row);
                    }
                }
                //clearing the row in cache
                if (row.retryCount === 0) {
                    await this.deleteCacheData(subscriberId, row);
                }
            }
        }
        else {

            console.log("No rows to process in this batch.");
        }
        return true;
    }

    async encryptMessageBody(subscriberId, plaintext) {

        var result = "";
        var mongo_dal = new Mongo_DAL();
        var subkeyresult = await mongo_dal.fetchSubscriberKey(subscriberId);

        if (subkeyresult.status) {

            var decryptedSubkey = await this.decryptSubKey(subkeyresult.subscriberKey);
            var ciphertext = await this.encryptwithBuisnessKey(plaintext, decryptedSubkey);
            return ciphertext;
        }
        return result;
    }

    add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
}

}
module.exports = MongoBO;