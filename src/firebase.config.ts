import firebase from "firebase/compat/app";
import {
  doc,
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwYza4_4rqH_Xr0RrCtUwOnKqDAONCThU",
  authDomain: "educational-system-6d6a0.firebaseapp.com",
  projectId: "educational-system-6d6a0",
  storageBucket: "educational-system-6d6a0.appspot.com",
  messagingSenderId: "4807114175",
  appId: "1:4807114175:web:8342bba579041f2cc4f50a",
  measurementId: "G-GXG231BYQK",
};

export const app = firebase.initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signOut = () => {
  auth.signOut();
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(async ({ user, additionalUserInfo }) => {
    let staffData = collection(firestore, "staff");
    let q = query(staffData, where("email", "==", user?.email));
    let querySnapshot = await getDocs(q);
    if (!querySnapshot.empty && user?.uid) {
      if (additionalUserInfo?.isNewUser) {
        updateDoc(doc(firestore, "staff", querySnapshot.docs[0].id), {
          photoUrl: user.photoURL,
          accUid: user.uid,
        });
      }
    } else {
      signOut();
    }
  });
};
