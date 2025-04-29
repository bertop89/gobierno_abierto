import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ categoriasCount }: { categoriasCount: Record<string, { count: number; color: string }> }) => {
  const sortedCategorias = Object.entries(categoriasCount)
    .sort(([, a], [, b]) => b.count - a.count)
    .reduce((acc: Record<string, { count: number; color: string }>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(sortedCategorias),
    datasets: [
      {
        data: Object.values(sortedCategorias).map((item) => item.count),
        backgroundColor: Object.values(sortedCategorias).map((item) => item.color),
        hoverBackgroundColor: Object.values(sortedCategorias).map((item) => item.color),
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <Pie 
        data={chartData} 
        options={{ maintainAspectRatio: false }} 
        style={{ maxHeight: '400px' }} 
      />
    </div>
  );
};

export default PieChart;