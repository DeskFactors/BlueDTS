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

class Message {

    attachmentSize = null;
    chatType = null;
    subscriberId = null;
    datetime = null;
    linkType = null;
    linkedMessageId = null;
    messageAction = null;
    messageAlignment = null;
    messageHolderId = null;
    messageText = null;
    messageType = null;
    orgnizationId = null;
    overallMsgStatus = null;
    receiverXmppId = null;
    //senderXmppId = null;
    //xmppGroupId = null;
    //locationString = null;
    userAgent = null;
    xmppChatId = null;
    xmppMessageId = null;
    size = null;
    messageId = null;
    sender = new Sender();
    //attachment = new Attachment();
    reciever = [];
    //contacts = [];

    constructor() {
    }
    /**************************SETTERS******************************************************************/

    set setAttachmentSize(attachmentSize) {
        this.attachmentSize = attachmentSize;
    }

    set setChatType(chatType) {
        this.chatType = chatType;
    }

    set setDateTime(datetime) {
        this.datetime = datetime;
    }

    set setLinkType(linktype) {
        this.linkType = linktype;
    }

    set setLinkedMessageid(linkedMessageId) {
        this.linkedMessageId = linkedMessageId;
    }

    set setMessageAction(messageAction) {
        this.messageAction = messageAction;
    }

    set setMessageAlignment(messageAlignment) {
        this.messageAlignment = messageAlignment;
    }

    set setMessageHolderId(messageHolderId) {
        this.messageHolderId = messageHolderId;
    }

    set setMessageText(messageText) {
        this.messageText = messageText;
    }

    set setMessageType(messageType) {
        this.messageType = messageType;
    }

    set setOrgnizationId(orgnizationId) {
        this.orgnizationId = orgnizationId;
    }

    set setOverallMsgStatus(overallMsgStatus) {
        this.overallMsgStatus = overallMsgStatus;
    }

    set setReceiverXmppId(receiverXmppId) {
        this.receiverXmppId = receiverXmppId;
    }

    set setSenderXmppId(senderXmppId) {
        this.senderXmppId = senderXmppId;
    }

    set setXmppGroupId(xmppGroupId) {
        this.xmppGroupId = xmppGroupId;
    }

    set setSender(sender) {
        this.sender = sender;
    }

    set setSubscriberId(subscriberId) {
        this.subscriberId = subscriberId;
    }

    set setUserAgent(userAgent) {
        this.userAgent = userAgent;
    }

    set setXmppChatId(xmppChatId) {
        this.xmppChatId = xmppChatId;
    }

    set setXmppMessageId(xmppMessageId) {
        this.xmppMessageId = xmppMessageId;
    }

    set setSize(size) {
        this.size = size;
    }

    set setLocationString(locationString) {
        this.locationString = locationString;
    }

    set setMessageId(messageId) {
        this.messageId = messageId;
    }

    set setSender(sender) {
        this.sender = sender;
    }

    set setAttachment(attachment) {
        this.attachment = attachment;
    }
   

    /***************************************GETTER***************************************************************/
   
    get getAttachmentSize() {
        return this.size;
    }

    get getChatType() {
        return this.chatType;
    }

    get getDateTime() {
        return this.datetime;
    }

    get getLinkType() {
        return this.linkType;
    }

    get getLinkedMessageid() {
        return this.linkedMessageId;
    }

    get getMessageAction() {
        return this.messageAction ;
    }

    get getMessageAlignment() {
        return this.messageAlignment ;
    }

    get getMessageHolderId() {
        return this.messageHolderId;
    }

    get getMessageText() {
        return this.messageText;
    }

    get getMessageType() {
        return this.messageType;
    }

    get getOrgnizationId() {
        return this.orgnizationId;
    }

    get getOverallMsgStatus() {
        return this.overallMsgStatus;
    }

    get getReceiverXmppId() {
        return this.receiverXmppId ;
    }

    get getSenderXmppId() {
        return this.senderXmppId;
    }

    get getXmppGroupId() {
        return this.xmppGroupId;
    }

    get getSender() {
        return this.sender ;
    }

    get getSubscriberId() {
        return this.subscriberId;
    }

    get getUserAgent() {
        return this.userAgent ;
    }

    get getXmppChatId() {
        return this.xmppChatId ;
    }

    get getXmppMessageId() {
        return this.xmppMessageId ;
    }

    get getSize() {
        return this.size ;
    }

    get getlocationString() {
        return this.locationString;
    }

    get getContacts() {
        return this.contacts;
    }

    get getMessageId() {
        this.messageId;
    }

    get getSender() {
        return this.sender;
    }

    get getAttachment() {
        return this.attachment;
    }
}

class Sender {

    deletedFlag = null;
    forwardAllowedFlag = null;
    senderId = null;
    senderMsgStatus = null;
    sentDateTime = null;

    constructor() {
    }

    /**************************SETTERS******************************************************************/

    set setDeletedFlag(deletedFlag) {
        this.deletedFlag = deletedFlag;
    }

    set setForwardAllowedFlag(forwardAllowedFlag) {
        this.forwardAllowedFlag = forwardAllowedFlag;
    }

    set setSenderId(senderId) {
        this.senderId = senderId;
    }

    set setsenderMsgStatus(senderMsgStatus) {
        this.senderMsgStatus = senderMsgStatus;
    }

    set setSentDateTime(sentDateTime) {
        this.sentDateTime = sentDateTime;
    }

    /***************************************GETTER***************************************************************/

    get setDeletedFlag() {
        this.deletedFlag;
    }

    get setForwardAllowedFlag() {
        this.forwardAllowedFlag;
    }

    get setSenderId() {
        this.senderId;
    }

    get setsenderMsgStatus() {
        this.senderMsgStatus;
    }

    get setSentDateTime() {
        this.sentDateTime;
    }
}

class Reciever {

    deletedFlag = null;
    deliveredDateTime = null;
    receiverId = null;
    receiverMsgStatus = null;
    seenDateTime = null;
    tags = null;

    constructor() {
    }

    /**************************SETTERS******************************************************************/

    set setDeletedFlag(deletedFlag) {
        this.deletedFlag = deletedFlag;
    }

    set setDeliveredDateTime(deliveredDateTime) {
        this.deliveredDateTime = deliveredDateTime;
    }

    set setReceiverId(receiverId) {
        this.receiverId = receiverId;
    }

    set setReceiverMsgStatus(receiverMsgStatus) {
        this.receiverMsgStatus = receiverMsgStatus;
    }

    set setSeenDateTime(seenDateTime) {
        this.seenDateTime = seenDateTime;
    }

    set setTags(tags) {
        this.tags = tags;
    }

}

class Contacts {

    contactName = null;
    contactNumber = null;
    contactPic = null;
 
    constructor() {
    }

    /**************************SETTERS******************************************************************/

    set setcontactName(contactName) {
        this.contactName = contactName;
    }

    set setcontactNumber(contactNumber) {
        this.contactNumber = contactNumber;
    }

    set setcontactPic(contactPic) {
        this.contactPic = contactPic;
    }

    /**************************GETTERS******************************************************************/

    get getcontactName() {
        this.contactName;
    }

    get getcontactNumber() {
        this.contactNumber;
    }

    get getcontactPic() {
        this.contactPic;
    }
}

module.exports = {
    Message: Message,
    Reciever: Reciever,
    Contacts: Contacts
}