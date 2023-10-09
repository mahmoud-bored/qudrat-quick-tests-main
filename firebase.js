import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC12O7g5MHCboxHxQBH3Z-tIAHGU9LuWec",
    authDomain: "qudrat-tests-banks.firebaseapp.com",
    projectId: "qudrat-tests-banks",
    storageBucket: "qudrat-tests-banks.appspot.com",
    messagingSenderId: "491274565005",
    appId: "1:491274565005:web:9af02058d407d8602239c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getExams(db) {
    let dataObj = { }
    await getDocs(collection(db, 'exams'))
        .then((docs) => {
            docs.forEach(doc => {
                dataObj[doc.id] = doc.data()
            })
        })
    return dataObj
}
const examCollection = await getExams(db)
const banksCollection = {
  bank1: examCollection.bank1,
  bank2: examCollection.bank2,
  bank3: examCollection.bank3,
}

const banksInfo = examCollection.banksInfo
export { banksCollection, banksInfo }