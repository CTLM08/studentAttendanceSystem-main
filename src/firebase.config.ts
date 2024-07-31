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

  apiKey: "AIzaSyDir-zvhrzJZgWElnUfjFTzL4Zo0zuH_pk",

  authDomain: "edu-system2.firebaseapp.com",

  projectId: "edu-system2",

  storageBucket: "edu-system2.appspot.com",

  messagingSenderId: "855741339000",

  appId: "1:855741339000:web:132230c985fa0b848c648d"

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
        console.log("sus")
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
