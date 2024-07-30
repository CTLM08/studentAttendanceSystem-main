import { useRef, useState } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Icon } from "@iconify/react/dist/iconify.js";
const Cleanliness = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [NoApprove, setNoApprove] = useState<string[]>([]);
  const [dateChoose, setDate] = useState<Date | null>(null);
  const handleButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
    console.log("Selected Date:", event.target.value);
  };
  return (
    <div className="w-full p-2">
      <h1 className="text-xl font-semibold flex flex-row justify-between">
        <p>卫生检查</p>
        <button className="bg-blue-500/60 w-[30%] h-11 rounded-md text-base  ">
          提交
        </button>
      </h1>
      <button
        onClick={handleButtonClick}
        className="custom-button p-2 pl-6 pr-6 w-60 mt-3 hover:gap-4 hover:font-semibold transition-all hover:bg-blue-500/60  bg-blue-500/40 rounded-md flex flex-row items-center justify-center gap-3"
      >
        <Icon icon="lets-icons:date-fill" className="text-white w-4 h-4" />
        {dateChoose ? <div>{dateChoose.toString()}</div> : "选择日期"}
      </button>
      <input
        ref={dateInputRef}
        type="date"
        onChange={handleDateChange}
        className="pointer-events-none invisible"
        // Hide the default date input
      />
      <div className="bg-blue-500/10 w-full  rounded-md flex flex-col gap-3 justify-center items-center p-3">
        <button
          onClick={() => {
            NoApprove.includes("头发长度")
              ? setNoApprove(NoApprove.filter((item) => item !== "头发长度"))
              : setNoApprove([...NoApprove, "头发长度"]);
          }}
          className={`bg-blue-500/20 p-2 hover:font-semibold hover:bg-blue-500/50 transition-all rounded-md w-full ${
            NoApprove.includes("头发长度")
              ? "bg-red-500/40 hover:bg-red-500/70"
              : ""
          }`}
        >
          头发长度
        </button>
        <button
          onClick={() => {
            NoApprove.includes("指甲卫生")
              ? setNoApprove(NoApprove.filter((item) => item !== "指甲卫生"))
              : setNoApprove([...NoApprove, "指甲卫生"]);
          }}
          className={`bg-blue-500/20 p-2 hover:font-semibold ${
            NoApprove.includes("指甲卫生")
              ? "bg-red-500/40 hover:bg-red-500/70"
              : ""
          } hover:bg-blue-500/50 transition-all rounded-md w-full`}
        >
          指甲卫生
        </button>
        <button
          onClick={() => {
            NoApprove.includes("仪容整洁")
              ? setNoApprove(NoApprove.filter((item) => item !== "仪容整洁"))
              : setNoApprove([...NoApprove, "仪容整洁"]);
          }}
          className={`bg-blue-500/20 p-2 hover:font-semibold hover:bg-blue-500/50 transition-all rounded-md w-full ${
            NoApprove.includes("仪容整洁")
              ? "bg-red-500/40 hover:bg-red-500/70"
              : ""
          }`}
        >
          仪容整洁
        </button>
      </div>
    </div>
  );
};

export default Cleanliness;
