"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Gráfico de Transações",
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

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const receitas = [200, 100, 160, 170, 210, 220, 230, 240, 250, 260, 270];
const despesas = [120, 150, 100, 130, 140, 560, 170, 180, 190, 200, 210, 220];
const saldo = receitas.map((r, i) => r - despesas[i]);


export default function StackedBarChart() {
  const data = {
    labels,
    datasets: [
      {
        label: "Despesas",
        data: despesas,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Receitas",
        data: receitas,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Saldo",
        data: saldo,
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  return (
    <div className="w-full lg:w-1/2 border p-2">
      <Bar options={options} data={data} />
    </div>
  );
}
