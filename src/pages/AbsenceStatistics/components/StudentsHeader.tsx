import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useState } from "react";
import AppContext from "../../../AppContext";

const StudentsHeader = () => {
  const { type, setType, totalAbsences, settleAbsences } =
    useContext(AppContext);

  return (
    <div>
      <div className="flex justify-end gap-2 items-center">
        <div className="dropdown dropdown-bottom w-[20%]">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 flex flex-row text-white rounded-md"
          >
            {type}
            <Icon icon="gridicons:dropdown" className="text-white w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-md z-[1] w-full flex justify-center items-center p-2 shadow font-semibold"
          >
            <li className="w-full">
              <a
                className="w-full  flex justify-center items-center"
                onClick={() => setType("高中")}
              >
                高中
              </a>
            </li>
            <li className="w-full  ">
              <a
                className="w-full flex justify-center items-center"
                onClick={() => setType("初中")}
              >
                初中
              </a>
            </li>
          </ul>
        </div>
        <div className="w-[20%]">
          <button
            onClick={() => {
              settleAbsences();
            }}
            className="w-full flex justify-center items-center bg-blue-500 text-zinc-900 font-semibold p-2 h-full rounded-md"
          >
            直接结算
          </button>
        </div>
      </div>
      <div className="flex border-b-2 font-medium border-zinc-700 p-4">
        <div className="w-2/12">学号</div>
        <div className="w-5/12">姓名</div>
        <div className="w-1/12 text-center">班级</div>
        <div className="w-2/12 text-center">座号</div>
        <div className="w-2/12">状态</div>
      </div>
    </div>
  );
};

export default StudentsHeader;
