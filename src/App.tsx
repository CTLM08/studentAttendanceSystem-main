import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./Routes";
import AppContext from "./AppContext";
import { useAuth } from "./hooks/useAuth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "./firebase.config";
import { collection, updateDoc } from "firebase/firestore";

function App() {
  const location = useLocation();
  const { userData } = useAuth();
  const [type, setType] = useState("高中");
  const [value, loading] = useCollection(collection(firestore, "students"));
  const [absences, loading_] = useCollection(
    collection(firestore, "attendance_raw_record")
  );
  const [totalAbsences, setTotalAbsences] = useState<any>();

  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/dashboard";
    }
  }, [location]);
  useEffect(() => {
    setTotalAbsences(value?.docs.filter((e) => e?.current_attendance == false));
  }, [absences, value]);
  function settleAbsences() {
    if (!loading_) {
      absences?.docs.forEach((doc) => {
        value?.docs.forEach((student) => {
          if (doc.data().studentId == student.data().id) {
            updateDoc(doc.ref, {
              ...doc.data(),
              current_attendance: true,
            });
          }
        });
      });
    }
  }
  return (
    <AppContext.Provider
      value={{ userData, type, setType, settleAbsences, totalAbsences }}
    >
      <main className="flex bg-zinc-900 h-screen text-zinc-100">
        {location.pathname !== "/login" && <Sidebar />}
        <div
          className={`flex flex-col mx-8 pt-12 w-9/12 min-w-0 h-screen ${
            location.pathname === "/login" && "w-full"
          } `}
        >
          <Header />
          <AppRoutes />
        </div>
      </main>
    </AppContext.Provider>
  );
}

export default App;
