import { useCollection } from "react-firebase-hooks/firestore";

import StudentsHeader from "./components/StudentsHeader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import StudentListItem from "./components/StudentListItem";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";

const AbsencesStatistics = () => {
  const [value, loading] = useCollection(collection(firestore, "students"));
  const [absences, setAbsences] = useState<any[]>();
  const [seniorOrJunior, setSeniorOrJunior] = useState("S");
  const { type } = useContext(AppContext);
  useEffect(() => {
    if (type === "初中") {
      setSeniorOrJunior("J");
    } else {
      setSeniorOrJunior("S");
    }
  }, [type]);

  useEffect(() => {
    const q = query(
      collection(firestore, "attendance"),
      where("date", "==", new Date().toLocaleDateString())
    );
    const fetchAbsences = async () => {
      const result = await getDocs(q);
      const absences = result.docs.map((doc) => doc.data());

      setAbsences(absences);
    };
    fetchAbsences();
  }, []);

  return (
    <div>
      <StudentsHeader />
      <>
        {loading || !value || !absences ? (
          <div>Loading...</div>
        ) : (
          value.docs.map((doc) => (
            <>
              {doc.data().class[0] === seniorOrJunior && (
                <StudentListItem
                  student={doc.data()}
                  absences={absences.some((absence) => absence.id == doc.id)}
                />
              )}
            </>
          ))
        )}
      </>
    </div>
  );
};

export default AbsencesStatistics;
