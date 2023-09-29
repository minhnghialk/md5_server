/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ProductsController } from './modules/products/products.controller';

// thay config thành config của bạn
const firebaseConfig = {
  apiKey: 'AIzaSyAzQbu_J0Csdajcv8nyYiaieoCLpvC0GCw',
  authDomain: 'md5db-38794.firebaseapp.com',
  projectId: 'md5db-38794',
  storageBucket: 'md5db-38794.appspot.com',
  messagingSenderId: '91220499436',
  appId: '1:91220499436:web:c8deed6b62a3fab8e1fec9',
  measurementId: 'G-VB050PND9S',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(
  file: any,
  folderName: any,
  bufferData: any = undefined,
) {
  // nếu file là null thì không làm gì hết
  if (!file) {
    return false;
  }

  const filename = Date.now();
  console.log('filename', filename);
  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + file.name);
  } else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + filename);
    metadata = {
      contentType: (file as any).mimetype,
    };
  }
  let url;
  if (bufferData) {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then(async (res) => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then((url) => url)
        .catch((err) => false);
    });
  } else {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, file).then(async (res) => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then((url) => url)
        .catch((err) => false);
    });
  }

  return url;
}
