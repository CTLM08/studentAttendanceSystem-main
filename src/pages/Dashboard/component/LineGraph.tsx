// src/LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceData {
  date: string;
  attendanceRate: number;
}

interface LineChartProps {
  data: AttendanceData[];
  width?: string;
  height?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const dates = data.map((item) => item.date);
  const attendanceRates = data.map((item) => item.attendanceRate * 100); // 将出席率转换为百分比

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "本月全校出席率情况",
        data: attendanceRates,
        borderColor: "rgba(22, 74, 97, 20)",
        backgroundColor: "rgba(22, 74, 97, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: dates,
        ticks: {
          callback: function (_: any, index: number) {
            // 只显示最后一天的标签
            if (index === dates.length - 1) {
              return dates[index];
            }
            return "";
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="w-full min-w-0 rounded-lg bg-zinc-800/50 col-span-2 flex justify-center items-center">
      <div className="w-full p-8 min-w-0 h-full">
        <Line
          className="w-full min-w-0"
          data={chartData}
          options={options as any}
        />
      </div>
    </div>
  );
};

export default LineChart;
