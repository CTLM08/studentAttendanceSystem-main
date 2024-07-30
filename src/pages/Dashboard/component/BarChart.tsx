import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const data = {
    labels: ["初一", "初二", "初三", "高一", "高二", "高三"],
    datasets: [
      {
        label: "缺席人数",
        data: [5, 3, 8, 2, 6, 4],
        backgroundColor: "rgba(22, 74, 97, 0.2)",
        borderColor: "rgba(22, 74, 97, 20)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "各年段缺席统计",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[90%] min-w-0">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
