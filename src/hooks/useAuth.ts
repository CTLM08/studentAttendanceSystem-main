import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase.config";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const staffData = collection(firestore, "staff");
        const q = query(staffData, where("email", "==", _user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUser(_user);
          setUserData(querySnapshot.docs[0].data());
          if (location.pathname === "/login") {
            navigate("/dashboard");
          }
        } else {
          signOut(auth);
          setUserData(null);
          navigate("/login");
          alert("You are not authorized to access this page");
        }
      } else {
        navigate("/login");
      }
      setReady(true);
    });

    return () => unsubscribe();
  }, []);

  return { user, userData, ready };
};
