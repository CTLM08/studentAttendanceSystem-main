import React from "react";

type Props = {};

const StudentListItem: React.FC<StudentData> = ({
  id,
  name_ch: name,
  name_en: enName,
  class: className,
  seat_no: seatNumber,
  status,
  statusColor,
  hasSettled,
}) => {
  return (
    <div>
      {" "}
      <button className="flex w-full justify-between text-left p-4">
        <div className="w-2/12">{id}</div>
        <div className="w-5/12">
          {name} {enName}
        </div>
        <div className="w-1/12 text-center">{className}</div>
        <div className="w-2/12 text-center">{seatNumber}</div>
        <div className="flex items-center gap-1.5 w-2/12">
          <div className={`shrink-0 size-2 ${statusColor} rounded-full`} />
          <div>
            {STATUS[status as keyof typeof STATUS]}
            {status === "absent" && !hasSettled && (
              <span className="text-red-600"> (未处理)</span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default StudentListItem;
