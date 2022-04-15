"use strict";

/* *****************************************************************************************************************
    Name        : log Model
    Description : Entity to hold log data related to data transfer transactions.

    Author      : Adarsh Dubey
    Created On  : 20/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

class Attachment {

    caption = null;
    fileName = null;
    fileType = null;
    storageBlobURL = null;
    storageRefId = null;
    thumbnailUrl = null;

    constructor() {
    }

    /**************************SETTERS******************************************************************/

    set setCaption(caption) {
        this.caption = caption;
    }

    set setFileName(fileName) {
        this.fileName = fileName;
    }

    set setFileType(fileType) {
        this.fileType = fileType;
    }

    set setStorageBlobURL(storageBlobURL) {
        this.storageBlobURL = storageBlobURL;
    }

    set setStorageRefId(storageRefId) {
        this.storageRefId = storageRefId;
    }

    set setThumbnailUrl(thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }



    /**************************GETTERS******************************************************************/

    get setCaption() {
        this.caption;
    }

    get setFileName() {
        this.fileName;
    }

    get setFileType() {
        this.fileType;
    }

    get setStorageBlobURL() {
        this.storageBlobURL;
    }

    get setStorageRefId() {
        this.storageRefId;
    }

    get setThumbnailUrl() {
        this.thumbnailUrl;
    }
}
module.exports = Attachment;