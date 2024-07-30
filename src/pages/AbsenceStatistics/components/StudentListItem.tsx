import React from "react";
import { StudentData } from "../../ManageAbsences/types";

const StudentListItem: React.FC<{
  student: StudentData;
  absences: boolean;
}> = ({ student, absences }) => {
  return (
    <div>
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
              absences !== true ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <div>{absences !== true ? "出席" : "缺席"}</div>
        </div>
      </button>
    </div>
  );
};

export default StudentListItem;
