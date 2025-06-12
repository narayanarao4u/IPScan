import React, { useEffect, useState } from 'react';
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
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeSeriesData {
  Date: string;
  Time: string;
  PCs: number;
}

const LineChartComponent = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [] as string[],
    datasets: []
  });

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'PCs Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TimeSeriesData[]>('http://localhost:3000/api/scan/dateTime');
        const data = response.data;

        setChartData({
          labels: data.map(item => `${item.Date} ${item.Time}`),
          datasets: [
            {
              label: 'PCs Over Time',
              data: data.map(item => item.PCs),
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.1
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[400px] p-4">
      {chartData.labels && chartData.labels.length > 0 && (
        <Line options={options} data={chartData} />
      )}
    </div>
  );
};

export default LineChartComponent;