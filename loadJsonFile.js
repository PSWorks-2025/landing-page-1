import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js';
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAmq4XW20robCSRP8muEInvKhIP5xDoUb0',
  authDomain: 'landing-page-1-ee86d.firebaseapp.com',
  projectId: 'landing-page-1-ee86d',
  storageBucket: 'landing-page-1-ee86d.firebasestorage.app',
  messagingSenderId: '229283372291',
  appId: '1:229283372291:web:afa94d4b3792265fb2dd36',
  measurementId: 'G-VY4CFYYS5W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = 'SINLBrNU9nWSLUQet0m6YsAiGwU2';

async function getDataFromFiles(files) {
  let numberOfFilesLoaded = 0;
  let dataFetched = {};
  for (const file of files) {
    const response = await fetch(file);
    const data = await response.json();
    dataFetched[file] = data;
    numberOfFilesLoaded++;
    if (numberOfFilesLoaded === files.length) {
      return dataFetched;
    }
  }
}

async function getDataFromFirestore(files) {
  let numberOfFilesLoaded = 0;
  let dataFetched = {};
  for (const file of files) {
    const userDocRef = doc(db, 'admin', userId);
    const subDocRef = doc(userDocRef, 'data', file);
    const querySnapshot = await getDoc(subDocRef);
    try {
      dataFetched[file] = querySnapshot.data().data;
    } catch (error) {
      console.log(error);
    }
    numberOfFilesLoaded++;
    if (numberOfFilesLoaded === files.length) {
      return dataFetched;
    }
  }
}

async function fetchData(files, backupFiles) {
  const dataFromFirestore = await getDataFromFirestore(files);
  const dataFromLocal = await getDataFromFiles(backupFiles);
  const dataLoadedEvent = new CustomEvent('DataLoaded', {
    detail: { ...dataFromFirestore, ...dataFromLocal },
  });
  document.dispatchEvent(dataLoadedEvent);
}

export default fetchData;
