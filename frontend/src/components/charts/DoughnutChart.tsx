"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartContainer } from "../chart-container/ChartContainer";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Distribuição por Categorias",
    },
  },
};

interface DoughnutChartProps {
  data: ChartData<"doughnut", number[], unknown>;
}

export function DoughnutChart({ data }: DoughnutChartProps) {
  const isDataEmpty = !data.datasets[0] || data.datasets[0].data.length === 0;

  return (
    <ChartContainer title="Distribuição por Categorias" isDataEmpty={isDataEmpty}>
      <Doughnut data={data} options={options} className="m-auto" />
    </ChartContainer>
  );
}
