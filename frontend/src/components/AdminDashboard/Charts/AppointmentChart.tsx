import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AppointmentChart: React.FC = () => {
  const data = {
    labels: ['Regular Checkup', 'Root Canal', 'Cleaning', 'Other'],
    datasets: [
      {
        data: [40, 20, 25, 15],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(107, 114, 128)'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    cutout: '70%'
  };

  return <Doughnut data={data} options={options} />;
};

export default AppointmentChart;
