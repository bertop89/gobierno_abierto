import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(TimeScale, LinearScale, BarElement, Title, Tooltip, Legend );

const TimeSeriesBarChart = ({ data, color }: { data: Record<string, number>; color: string }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Proposiciones',
        data: Object.values(data),
        backgroundColor: color || 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          round: 'month'
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          callback: function (tickValue: string | number) {
            return tickValue.toString();
          },
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Bar 
      data={chartData} 
      options={chartOptions}
      style={{  maxHeight: '400px' }}  />
    </div>
  );
};

export default TimeSeriesBarChart;