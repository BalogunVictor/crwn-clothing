import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBv14MdyOBdQYUND_6IOWyojeV11SwPA2U",
  authDomain: "crwn-clothing-db-3e1ce.firebaseapp.com",
  projectId: "crwn-clothing-db-3e1ce",
  storageBucket: "crwn-clothing-db-3e1ce.appspot.com",
  messagingSenderId: "768894149226",
  appId: "1:768894149226:web:0e275bf9186e152212a013",
  measurementId: "G-BSGYKXQ1Z2",
  // apiKey: process.env.API_KEY
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
  if(!userAuth) return;

  const UserRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await UserRef.get();
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await UserRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user',error.message);

    }
  }

  return UserRef;
};

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);



export default firebase;

