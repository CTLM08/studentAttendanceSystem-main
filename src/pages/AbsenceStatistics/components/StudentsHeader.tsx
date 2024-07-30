import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type Props = {};

const StudentsHeader = (props: Props) => {
  return (
    <div>
      <div className="flex justify-end">
        <div className="dropdown dropdown-bottom w-[20%]">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 flex flex-row text-white "
          >
            年段{" "}
            <Icon icon="gridicons:dropdown" className="text-white w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-ful p-2 shadow font-semibold"
          >
            <li>
              <a>高中</a>
            </li>
            <li>
              <a>初中</a>
            </li>
          </ul>
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
