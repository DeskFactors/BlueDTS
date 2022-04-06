/* *****************************************************************************************************************
    Name        : Cryptographic
    Description : package to handle all the cryptographic activities in dts
    Author      : Adarsh Dubey
    Created On  : 25/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */


var cryptLib = require('@skavinvarnan/cryptlib');
var protocol_store = require("../crypto/protocol_store");
var base64buffer = require('base64-arraybuffer');
var store = new protocol_store();

class CryptoLib {

   
    constructor() {
        
    }

    encryptToHash(message, key) {

        var result = null;
        try {
            result = cryptLib.encryptPlainTextWithRandomIV(message, key);
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }

        return result;
    }

    decryptToMessage(message, key) {

        var result = null;
        try {
            result = cryptLib.decryptCipherTextWithRandomIV(message, key);
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
        if (!result) result = message;
        return result;

    }

    base64ToArrayBuffer = (base64) => {
        return base64buffer.decode(base64);
    }

    generatePreKeyBundleEncrypt(ownerPrekey) {

        if (ownerPrekey) {
            var result = store.getIdentityKeyPair()

            let identity = result[0];

            let registrationId = '';
            let deviceId = '';

            let preKeyId = ownerPrekey.preKeyRecords[0].preKeyId;
            let signedPreKeyId = ownerPrekey.signedPrekeyId;

            // let preKeyIdApi = "";
            let preKeyIdpubKey = "";
            let preKeyIdprivKey = "";

            let signedpubKey = "";
            let signedprivKey = "";
            let signatures = ""

            {

                registrationId = ownerPrekey.registrationId;
                deviceId = ownerPrekey.deviceId;

                
                preKeyIdpubKey = ownerPrekey.preKeyRecords[0].publicKey;
                preKeyIdpubKey = this.base64ToArrayBuffer(preKeyIdpubKey);
                preKeyIdprivKey = ownerPrekey.preKeyRecords[0].privateKey;
                preKeyIdprivKey = this.base64ToArrayBuffer(preKeyIdprivKey);

                signedprivKey = ownerPrekey.privateKey;
                signedprivKey = this.base64ToArrayBuffer(signedprivKey);
                signedpubKey = ownerPrekey.publicKey;
                signedpubKey = this.base64ToArrayBuffer(signedpubKey);
                signatures = ownerPrekey.signature;
                signatures = this.base64ToArrayBuffer(signatures);
            }


            let preKey = { "keyId": preKeyId, "keyPair": { "privKey": preKeyIdprivKey, "pubKey": preKeyIdpubKey } };

            let signedPreKey = { "keyId": signedPreKeyId, "keyPair": { "privKey": signedprivKey, "pubKey": signedpubKey }, "signature": signatures };

            store.storePreKey(preKeyId, preKey.keyPair);
            store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);
        }

        return store;
    }

    generateStoreIdentityEncrypt(ownerPrekey,selfPreKey) {

        if (ownerPrekey) {

            let identityPrivateKey = ownerPrekey.identityPrivateKey;
            let identityPublicKey = ownerPrekey.identityPublicKey;
            identityPrivateKey = this.base64ToArrayBuffer(identityPrivateKey);
            identityPublicKey = this.base64ToArrayBuffer(identityPublicKey);

            let actIdentityKey = { "privKey": identityPrivateKey, "pubKey": identityPublicKey };

            let para = actIdentityKey;

            if (identityPublicKey.byteLength === 32) {
                para = this.processKeys(actIdentityKey);
            }

            store.put('identityKey', para);
            store.put('registrationId', ownerPrekey.registrationId);

            
        }

        if (selfPreKey) {

            let identityPrivateKeySelf = selfPreKey.identityPrivateKey;
            let identityPublicKeySelf = selfPreKey.identityPublicKey;
            identityPrivateKeySelf = this.base64ToArrayBuffer(identityPrivateKeySelf);
            identityPublicKeySelf = this.base64ToArrayBuffer(identityPublicKeySelf);

            let actIdentityKeySelf = { "privKey": identityPrivateKeySelf, "pubKey": identityPublicKeySelf };

            let para = actIdentityKeySelf;

            if (identityPublicKeySelf.byteLength === 32) {
                para = this.processKeys(actIdentityKeySelf);
            }

            store.put('localIdentityKey', para);
            store.put('localRegistrationId', selfPreKey.registrationId);
        }

        return store;
    }

    processKeys = (raw_keys) => {
        var origPub = new Uint8Array(raw_keys.pubKey);
        var pub = new Uint8Array(33);
        pub.set(origPub, 1);
        pub[0] = 5;

        return { pubKey: pub.buffer, privKey: raw_keys.privKey };
    }

    registerNewPreKeyBundle(userId, preKeyBundle) {

        store[userId] = preKeyBundle;
    }

    getPreKeyBundle(userId) {
        store[userId];
    }
}

module.exports = CryptoLib;


