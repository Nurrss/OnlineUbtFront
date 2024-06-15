import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js with auto-registering components
import { MyResults } from "../data/data";

export const PointChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: MyResults.map((result) => result.name),
        datasets: [
          {
            label: "My Results",
            data: MyResults.map((result) => ({ x: result.name, y: result.point })),
            backgroundColor: "#009172",
            borderColor: "#009172",
            borderWidth: 2,
            showLine: false, // Disable the line connecting the points
            pointRadius: 10,
            pointBackgroundColor: "#009172",
            pointBorderColor: "#fff",
            pointHoverRadius: 15,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category", // Use 'category' scale for the x-axis
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            max: 140,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false, 
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myChart" ref={chartRef}></canvas>
    </div>
  );
};
