"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToStorage = exports.storage = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const storage_2 = require("firebase/storage");
const firebaseConfig = {
    apiKey: 'AIzaSyAzQbu_J0Csdajcv8nyYiaieoCLpvC0GCw',
    authDomain: 'md5db-38794.firebaseapp.com',
    projectId: 'md5db-38794',
    storageBucket: 'md5db-38794.appspot.com',
    messagingSenderId: '91220499436',
    appId: '1:91220499436:web:c8deed6b62a3fab8e1fec9',
    measurementId: 'G-VB050PND9S',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
async function uploadFileToStorage(file, folderName, bufferData = undefined) {
    if (!file) {
        return false;
    }
    const filename = Date.now();
    console.log('filename', filename);
    let fileRef;
    let metadata;
    if (!bufferData) {
        fileRef = (0, storage_2.ref)(exports.storage, `${folderName}/` + file.name);
    }
    else {
        fileRef = (0, storage_2.ref)(exports.storage, `${folderName}/` + filename);
        metadata = {
            contentType: file.mimetype,
        };
    }
    let url;
    if (bufferData) {
        url = await (0, storage_2.uploadBytes)(fileRef, bufferData, metadata).then(async (res) => {
            return await (0, storage_2.getDownloadURL)(res.ref)
                .then((url) => url)
                .catch((err) => false);
        });
    }
    else {
        url = await (0, storage_2.uploadBytes)(fileRef, file).then(async (res) => {
            return await (0, storage_2.getDownloadURL)(res.ref)
                .then((url) => url)
                .catch((err) => false);
        });
    }
    return url;
}
exports.uploadFileToStorage = uploadFileToStorage;
//# sourceMappingURL=firebase.js.map