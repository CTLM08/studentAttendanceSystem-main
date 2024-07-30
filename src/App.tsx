/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./Routes";
import AppContext from "./AppContext";
import { useAuth } from "./hooks/useAuth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "./firebase.config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const location = useLocation();
  const { userData, ready } = useAuth();
  const [type, setType] = useState("高中");
  const [allStudents, allStudentsLoading] = useCollection(
    collection(firestore, "students")
  );
  const [rawAttendance, setRawAttendance] = useState<any>([]);
  const [totalAbsences, setTotalAbsences] = useState<any>();

  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/dashboard";
    }
  }, [location]);

  async function fetchRawAbsences() {
    const q = query(
      collection(firestore, "attendance_raw_record"),
      where("date", "==", new Date().toLocaleDateString())
    );

    const result = await getDocs(q);

    const absences = result.docs.map((doc) => doc.data());

    console.log(absences);

    setRawAttendance(absences);
  }

  useEffect(() => {
    fetchRawAbsences();
  }, []);

  async function settleAbsences() {
    if (!allStudentsLoading && allStudents && rawAttendance) {
      const allAbsentees = allStudents.docs.filter(
        (doc) =>
          rawAttendance.filter((absence) => absence.studentId === doc.id)
            .length === 0
      );

      for (const absentee of allAbsentees) {
        await addDoc(collection(firestore, "attendance"), {
          id: absentee.id,
          approved: false,
          date: new Date().toLocaleDateString(),
          period: Array(10)
            .fill(0)
            .map((_, i) => i + 1),
          type: "旷课",
          reason: "",
        });
      }

      alert("已处理所有缺席学生");
    }
  }

  return (
    <AppContext.Provider
      value={{ userData, type, setType, settleAbsences, totalAbsences }}
    >
      <main className="flex bg-zinc-900 h-screen text-zinc-100">
        {ready ? (
          <>
            {location.pathname !== "/login" && <Sidebar />}

            <div
              className={`flex flex-col mx-8 pt-12 w-9/12 min-w-0 h-screen ${
                location.pathname === "/login" && "w-full"
              } `}
            >
              {location.pathname !== "/login" && <Header />}
              <AppRoutes />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col items-center text-zinc-500">
              <Icon icon="svg-spinners:180-ring" className="w-9 h-9" />
            </div>
          </div>
        )}
      </main>
    </AppContext.Provider>
  );
}

export default App;
