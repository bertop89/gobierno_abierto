import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryBarChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: Object.values(data).map((data: any) => data.nombre),
    datasets: [
      {
        label: 'Proposiciones',
        data: Object.values(data).map((data: any) => data.total_proposiciones),
        backgroundColor: 'gray',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Proposiciones por Grupo Parlamentario',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} style={{  maxHeight: '400px' }}  />;
};

export default CategoryBarChart;