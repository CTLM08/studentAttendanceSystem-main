import React from "react";

const Information: React.FC<{
  student: {
    name: string;
    enName: string;
    status: string;
    statusColor: string;
    hasSettled?: boolean;
    className: string;
    seatNumber: number;
    id: string;
  };
}> = ({ student }) => {
  return (
    <div className="w-full p-2">
      <h1 className="text-xl font-semibold flex flex-row justify-between">
        <p>基本资料</p>
      </h1>
      <div className="flex flex-col gap-2 mt-3 text-slate-300">
        <div className="flex flex-row gap-3 font-semibold ">
          姓名：
          <p className="font-medium">{student.name}</p>
        </div>
        <div className="flex flex-row gap-3 font-semibold">
          性别：
          <p className="font-medium">男</p>
        </div>
        <div className="flex flex-row gap-3 font-semibold">
          班级：
          <p className="font-medium">{student.className}</p>
        </div>
        <div className="flex flex-row gap-3 font-semibold">
          座号：
          <p className="font-medium">{student.seatNumber}</p>
        </div>
        <div className="flex flex-row gap-3 font-semibold">
          学号：
          <p className="font-medium">{student.id}</p>
        </div>
        <div className="flex flex-row gap-3 font-semibold">
          职位：
          <p className="font-medium">电脑干事</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
