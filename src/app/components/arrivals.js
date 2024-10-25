'use client'; 

import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);


const ArrivalsTimeSeries = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [7, 7, 4, 8, 8, 3, 3] 
  };

  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Arrivals per day',
      data: data.values,
      fill: false,
      borderColor: '#36A2EB',
    }]
  };

  return <Line data={chartData} />;
};

export default ArrivalsTimeSeries;
