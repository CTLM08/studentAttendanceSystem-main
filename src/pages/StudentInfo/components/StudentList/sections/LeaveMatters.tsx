import { Icon } from "@iconify/react/dist/iconify.js";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { firestore } from "../../../../../firebase.config";
import moment from "moment";

const LeaveMatters: React.FC<{
  students: any;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ students, setExpanded }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [TypeOfLeave, setTypeOfLeave] = useState<string>("");
  const [dateChoose, setDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  const handleDateChange = (event: any) => {
    setDate(event.target.value);
    console.log("Selected Date:", event.target.value);
  };
  async function submit() {
    if (!dateChoose || !TypeOfLeave || !reason) {
      alert("请填写完整");
      setLoading(!loading);
    }
    setLoading(true);
    const Data = collection(firestore, "attendance");
    const q = query(
      Data,
      where("id", "==", students.id),
      where("date", "==", moment(dateChoose).format("DD/MM/YYYY"))
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("提交失败");
      setLoading(false);
    } else {
      updateDoc(querySnapshot.docs[0].ref, {
        approved: true,
        date: moment(dateChoose).format("DD/MM/YYYY"),
        type: TypeOfLeave,
        reason: reason,
      }).then(() => {
        setLoading(false);
        setExpanded(false);
        alert("提交成功");
        setTypeOfLeave("");
        setDate("");
        setReason("");
      });
    }
  }
  return (
    <div className="w-full p-2">
      <h1 className="text-xl font-semibold flex flex-row justify-between">
        <p>请假事宜</p>
        <button
          className="bg-blue-500/60 w-[30%] h-11 rounded-md text-base flex justify-center items-center "
          onClick={() => submit()}
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="text-white w-5 h-5" />
          ) : (
            "提交"
          )}
        </button>
      </h1>
      <div className="flex flex-row gap-3 mt-3">
        <button
          onClick={handleButtonClick}
          className="custom-button p-2 pl-6 pr-6 w-60  hover:gap-4 hover:font-semibold transition-all hover:bg-blue-500/60  bg-blue-500/40 rounded-md flex flex-row items-center justify-center gap-3"
        >
          <Icon icon="lets-icons:date-fill" className="text-white w-4 h-4" />
          {dateChoose ? <div>{dateChoose.toString()}</div> : "选择日期"}
        </button>

        <div className="dropdown dropdown-hover ">
          <button className="p-2 rounded-md flex justify-center items-center pl-6 w-60 hover:font-semibold transition-all hover:bg-blue-500/60 bg-blue-500/40">
            {TypeOfLeave ? <div>{TypeOfLeave.toString()}</div> : "选择请假类型"}
          </button>
          <ul className="dropdown-content menu bg-base-100 rounded-md z-[1] w-60 p-2 shadow overflow-auto flex h-28">
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("特假")}
            >
              <a className="w-full flex justify-center items-center">特假</a>
            </li>
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("事假")}
            >
              <a className="w-full flex justify-center items-center">事假</a>
            </li>
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("丧假")}
            >
              <a className="w-full flex justify-center items-center">丧假</a>
            </li>
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("病假")}
            >
              <a className="w-full flex justify-center items-center">病假</a>
            </li>
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("特别病假")}
            >
              <a className="w-full flex justify-center items-center">
                特别病假
              </a>
            </li>
            <li
              className="flex justify-center items-center w-full"
              onClick={() => setTypeOfLeave("旷课")}
            >
              <a className="w-full flex justify-center items-center">旷课</a>
            </li>
          </ul>
        </div>
      </div>
      <input
        ref={dateInputRef}
        type="date"
        onChange={handleDateChange}
        className="pointer-events-none invisible"
        // Hide the default date input
      />
      <input
        type="text"
        placeholder="请假事由"
        className="w-full    outline-none p-5 rounded-md bg-blue-500/20"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </div>
  );
};

export default LeaveMatters;
