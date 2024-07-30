import LineGraph from "./component/LineGraph";
import { AttendanceRateData } from "./component/attendance_data";
import BarChart from "./component/BarChart";
import Summary from "./component/Summary";

function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col min-w-0 gap-6 mb-12">
      <div className="flex gap-6 h-1/2 min-w-0 w-full">
        <Summary />
        <LineGraph data={AttendanceRateData} />
      </div>
      <div className="w-full h-1/2 shrink-0 rounded-lg bg-zinc-800/50 col-span-3 p-1">
        <BarChart />
      </div>
    </div>
  );
}

export default Dashboard;
