"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartContainer } from "../chart-container/ChartContainer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Gráfico de Transações Mensais",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
};

interface StackedBarChartProps {
  data: ChartData<"bar", number[], string>;
}

export default function StackedBarChart({ data }: StackedBarChartProps) {
  const allDataPoints = data.datasets.flatMap((dataset) => dataset.data);
  const isDataEmpty = allDataPoints.length === 0 || allDataPoints.every((point) => point === 0);

  return (
    <ChartContainer title="Gráfico de Transações Mensais" isDataEmpty={isDataEmpty}>
      <Bar options={options} data={data} />
    </ChartContainer>
  );
}
