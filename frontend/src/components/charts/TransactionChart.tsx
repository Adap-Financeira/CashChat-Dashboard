"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gráfico de Transações",
    },
  },
};

export interface LineTransactionChartProps {
  data: ChartData<"line", number[], string>;
}

export default function LineTransactionChart({ data }: LineTransactionChartProps) {
  return (
    <div className="w-full lg:w-1/2 border p-2">
      <Line options={options} data={data} className="w-full h-full" />
    </div>
  );
}
