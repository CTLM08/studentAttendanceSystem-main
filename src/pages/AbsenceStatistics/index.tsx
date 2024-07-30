import { useCollection } from "react-firebase-hooks/firestore";

import StudentsHeader from "./components/StudentsHeader";
import { collection } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import StudentListItem from "./components/StudentListItem";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";

const AbsencesStatistics = () => {
  const [value, loading] = useCollection(collection(firestore, "students"));
  const [seniorOrJunior, setSeniorOrJunior] = useState("S");
  const { type } = useContext(AppContext);
  useEffect(() => {
    if (type === "初中") {
      setSeniorOrJunior("J");
    } else {
      setSeniorOrJunior("S");
    }
  }, [type]);

  return (
    <div>
      <StudentsHeader />
      <>
        {loading || !value ? (
          <div>Loading...</div>
        ) : (
          value.docs.map((doc) => (
            <>
              {doc.data().class[0] === seniorOrJunior && (
                <StudentListItem student={doc.data()} />
              )}
            </>
          ))
        )}
      </>
    </div>
  );
};

export default AbsencesStatistics;
