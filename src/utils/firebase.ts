import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const VAPID_KEY = process.env.REACT_APP_VAPID_KEY;

// @ts-ignore
const messaging = firebase.messaging();

export const getToken = async () => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: VAPID_KEY });
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload: unknown) => {
      resolve(payload);
    });
  });
