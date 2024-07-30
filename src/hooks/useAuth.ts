import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase.config";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (_user) => {
            setUser(_user);
            if (_user) {
                const staffData = collection(firestore, "staff");
                const q = query(staffData, where("email", "==", _user.email));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setUserData(querySnapshot.docs[0].data());
                    navigate("/dashboard");
                } else {
                    setUserData(null);
                    navigate("/login");
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return { user, userData };
};