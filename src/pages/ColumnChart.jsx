import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart from the 'chart.js/auto' module
import { studentsData } from '../data/data';

export const ColumnChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: studentsData.map(student => student.name),
        datasets: [{
          data: studentsData.map(student => student.point),
          backgroundColor: '#009172',
          borderWidth: 1,
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 140,
          },
          y: {
            beginAtZero: true,
          }
        },
        plugins: {
            legend: {
              display: false, // Hide the legend
            },
            datalabels: {
              anchor: 'end', // Position the label at the end of the bar
              align: 'end',
              color: '#fff', // Label color
              offset: 4, // Distance from the end of the bar
              formatter: (value) => value, // Display the value
            }
          }
      }
    });

    // Clean up the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div>
      <canvas id="myChart" ref={chartRef}></canvas>
    </div>
  );
};
