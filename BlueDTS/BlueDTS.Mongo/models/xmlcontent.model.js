/* *****************************************************************************************************************
    Class       : Message
    Description : represents xml content
    Author      :
    Created On  : 14/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
class XMLContent {
    constructor() {
    }

    //setters
    setTo(to) {
        this.to = to;
    }

    setFrom(from) {
        this.from = from;
    }

    setType(type) {
        this.type = type;
    }

    setId(id) {
        this.id = id;
    }

    setBody(txt) {
        this.body = txt;
    }

    setSubject(txt) {
        this.subject = txt;
    }
    setUserAgent(txt) {
        this.useragent = txt;
    }


    setSubscriberId(id) {
        this.subscriberId = id;
    }

    setChatId(id) {
        this.chatId = id;
    }

    //getters
    getTo() {
        return this.to;
    }

    getFrom() {
        return this.from;
    }

    getType() {
        return this.type;
    }

    getId() {
        return this.id;
    }

    getBody() {
        return this.body;
    }

    getUserAgent() {
        return this.useragent;
    }

    getSubject() {
        return this.subject;
    }

    getSubscriberId() {
        return this.subscriberId;
    }

    getChatId() {
        return this.chatId;
    }
}
module.exports = XMLContent;