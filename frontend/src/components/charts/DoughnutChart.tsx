"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Categorias",
    },
  },
};

interface DoughnutChartProps {
  data: ChartData<"doughnut", number[], unknown>;
}

export function DoughnutChart({ data }: DoughnutChartProps) {
  return (
    <div className="w-full lg:w-1/2 border p-2 pb-6">
      <Doughnut data={data} options={options} className="m-auto" />
    </div>
  );
}
