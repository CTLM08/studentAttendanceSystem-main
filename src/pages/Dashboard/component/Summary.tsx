import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <div className="w-[32rem] flex flex-col rounded-lg bg-blue-400 p-4 tracking-widest ">
      <div className="flex justify-center items-center flex-col p-5 h-[65%]">
        <div className="flex flex-row justify-between w-full flex-1">
          <p className="text-zinc-900 font-bold text-xl">缺席人数</p>
          <Link to="/attendance-statistics">
            <p className="text-zinc-700 font-semibold hover:text-zinc-800 hover:text-lg transition-all">
              更多
            </p>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center ">
          <p className=" text-6xl text-zinc-800 font-bold">
            50<span className="text-base font-semibold ">人</span>
          </p>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="flex flex-col gap-4 ">
          <div className="border-b-2 border-zinc-900 p-1 flex flex-row justify-between">
            <div className="flex flex-row  gap-3 items-center ">
              <p className="h-5 w-5 rounded-md bg-zinc-800"></p>
              <p className="text-lg text-zinc-800 font-semibold">高中</p>
            </div>
            <div>
              <p className="text-lg text-zinc-800 font-semibold">20人</p>
            </div>
          </div>
          <div className="border-b-2 border-zinc-700 p-1 flex-row flex justify-between">
            <div className="flex flex-row  gap-3 items-center ">
              <p className="h-5 w-5 rounded-md bg-zinc-700"></p>
              <p className="text-lg text-zinc-700 font-semibold">初中</p>
            </div>
            <div>
              <p className="text-lg text-zinc-800 font-semibold">30人</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
