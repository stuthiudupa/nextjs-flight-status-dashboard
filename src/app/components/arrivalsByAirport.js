'use client'; 

import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const arrivalsPerAirport = {'EDDF': 21, 'LIML': 2, 'LFPG': 2, 'LFLL': 2, 'EGCC': 1, 'LFMN': 1, 'EDDB': 1, 'EHAM': 1, 'EDDP': 1, 'EDDM': 1, 'EVRA': 1, 'LWSK': 1, 'ENGM': 1, 'LBSF': 1, 'EBBR': 1, 'LIPZ': 1, 'LFBO': 1};
const airports = Object.keys(arrivalsPerAirport); 
const arrivals = Object.values(arrivalsPerAirport);

const CurrentTraffic = () => {
  const data = {
    labels: airports,
    datasets: [
      {
        data: arrivals,
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#F44336', '#9C27B0', '#00BCD4', '#E91E63', '#FFEB3B', '#8BC34A', '#795548', '#607D8B', '#FF5722', '#3F51B5'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default CurrentTraffic;
