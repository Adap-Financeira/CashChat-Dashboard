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
import { ChartContainer } from "../chart-container/ChartContainer";

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
  const isDataEmpty =
    !data || data.datasets.length === 0 || data.datasets.every((dataset) => dataset.data.length === 0);

  return (
    <ChartContainer title="Gráfico de Transações" isDataEmpty={isDataEmpty}>
      <Line options={options} data={data} className="w-full h-full" />
    </ChartContainer>
  );
}
