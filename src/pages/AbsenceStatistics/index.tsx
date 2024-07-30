import { useCollection } from "react-firebase-hooks/firestore";

import StudentsHeader from "./components/StudentsHeader";
import { collection } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import StudentListItem from "./components/StudentListItem";

const AbsencesStatistics = () => {
  const [value, loading] = useCollection(collection(firestore, "students"));
  const [filteredData, setFilteredData] = useState<StudentData[]>();
  const { userData } = useContext(AppContext);

  return (
    <div>
      <StudentsHeader />
      <StudentListItem students={value?.docs.map((doc) => doc.data) as any} />
    </div>
  );
};

export default AbsencesStatistics;
