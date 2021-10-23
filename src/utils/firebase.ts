import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAotMRzlFMLmN-2x5o7G4HWfrWkm7XSMIM",
  authDomain: "trooops.firebaseapp.com",
  projectId: "trooops",
  storageBucket: "trooops.appspot.com",
  messagingSenderId: "506977849517",
  appId: "1:506977849517:web:98d563a8e7bf2a6005f624",
  measurementId: "G-9HNMRY3CX8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const VAPID_KEY =
  "BH5TUY5mDK7oUvPrjC2X2m4IquP7owVbOZ4P4jYXl3rn-UFmILa-_EEwWtnIBwZjIAvKA0khK76ZGwpQYCKM8nE";

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
