import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VotosBarChart = ({ groupedData }: { groupedData: any }) => {
  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: 'Sí',
        data: Object.values(groupedData).map((data: any) => data.si),
        backgroundColor: 'rgba(34, 197, 94, 1.0)',
      },
      {
        label: 'No',
        data: Object.values(groupedData).map((data: any) => data.no),
        backgroundColor: 'rgba(239, 68, 68, 1.0)',
      },
      {
        label: 'Abstenciones',
        data: Object.values(groupedData).map((data: any) => data.abstenciones),
        backgroundColor: 'rgba(201, 203, 207, 1.0)',
      },
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
        text: 'Resultados por Grupo Parlamentario',
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

export default VotosBarChart;