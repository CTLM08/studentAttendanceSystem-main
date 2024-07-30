import React, { useEffect, useState } from "react";
import { StudentData } from "../../ManageAbsences/types";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../../firebase.config";

const StudentListItem: React.FC<{
  student: StudentData;
}> = ({ student }) => {
  const [value, loading] = useCollection(
    collection(firestore, "attendance_raw_record")
  );
  const [absences, setAbsences] = useState<boolean>(false);
  useEffect(() => {
    if (!loading) {
      value?.docs.forEach((doc) => {
        if (doc.data().studentId === student.id) {
          setAbsences(true);
        }
      });
    }
  }, [loading]);
  return (
    <div>
      {" "}
      <button className="flex w-full justify-between text-left p-4">
        <div className="w-2/12">{student.id}</div>
        <div className="w-5/12">
          {student.name_ch} {student.name_en}
        </div>
        <div className="w-1/12 text-center">{student.class}</div>
        <div className="w-2/12 text-center">{student.seat_no}</div>
        <div className="flex items-center gap-1.5 w-2/12">
          <div
            className={`shrink-0 size-2  rounded-full ${
              absences == true ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <div>{absences == true ? "出席" : "缺席"}</div>
        </div>
      </button>
    </div>
  );
};

export default StudentListItem;
