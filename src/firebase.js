import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

if (process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST !== undefined) {
  const auth = firebase.auth();
  console.log(
    "use Auth-emulator",
    process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST
  );
  auth.useEmulator(
    `http://${process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST}`
  );
}

if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST !== undefined) {
  const db = firebase.firestore();
  const [firestoreEmulatorHost, firestoreEmulatorPort] =
    process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(":");
  console.log(
    "use Firestore-emulator",
    firestoreEmulatorHost,
    firestoreEmulatorPort
  );
  db.useEmulator(firestoreEmulatorHost, parseInt(firestoreEmulatorPort));
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const githubProvider = new firebase.auth.GithubAuthProvider();
