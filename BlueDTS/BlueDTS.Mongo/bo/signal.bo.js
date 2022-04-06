var libsignal = require("../../Signal/index")
var Crypto_LIB = require("../../BlueDTS.Library/crypto/crypto");
const BaseKeyType = require('../../Signal/src/base_key_type');
var base64buffer = require('base64-arraybuffer');
var store = null;


class SignalBO {

    constructor() {
       
    }

    initializeMethod(ownerPrekey, selfPrekey) {
        var crypto_lib = new Crypto_LIB();
        store = crypto_lib.generateStoreIdentityEncrypt(ownerPrekey, selfPrekey);
        store = crypto_lib.generatePreKeyBundleEncrypt(ownerPrekey);
    }

    uploadSession(address) {
        var registrationId = store.getRegistrationId();
        var record = new libsignal.SessionRecord(registrationId);
        var session = {
            registrationId: registrationId,
            currentRatchet: {
                rootKey: new ArrayBuffer(32),
                lastRemoteEphemeralKey: new ArrayBuffer(32),
                previousCounter: 0
            },
            indexInfo: {
                baseKey: new ArrayBuffer(32),
                baseKeyType: BaseKeyType.OURS,
                remoteIdentityKey: new ArrayBuffer(32),
                closed: -1
            },
            oldRatchetList: []
        };
        record.updateSessionState(session);
        store.storeSession(address.toString(), record);
    }

    uploadIdentity(identifier, identityKey) {

        store.saveIdentity(identifier, identityKey)
    }

    async decryptMessage(cipherText, ownerPrekey, selfPrekey ) {
        try {
           
            this.initializeMethod(ownerPrekey, selfPrekey);

            var bufferctext64 = this.base64ToArrayBuffer(cipherText);
            var bufferctext = Buffer.from(bufferctext64, "binary");

            bufferctext = bufferctext.slice(1);

            var address = new libsignal.ProtocolAddress(ownerPrekey.xmppUserId, ownerPrekey.deviceId);
            var sessionCipher = new libsignal.SessionCipher(store, address);

            // Decrypt a PreKeyWhisperMessage by first establishing a new session.
            // Returns a promise that resolves when the message is decrypted or
            // rejects if the identityKey differs from a previously seen identity for this
            // address.
            var plaintextbuffer = await sessionCipher.decryptPreKeyWhisperMessage(bufferctext);
           
            // level 1 decoding
            var plaintext = Buffer.from(plaintextbuffer, "base64").toString("utf8");
            // level 2 decoding
            plaintext = Buffer.from(plaintext, "base64").toString("utf8");

            return { "status": true, result: plaintext};
            
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    base64ToArrayBuffer = (base64) => {
        return base64buffer.decode(base64);
    }

}
module.exports = SignalBO;