import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./PieChart.css";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const PieChart = () => {
  const [month, setMonth] = useState(3);
  const [pieData, setPieData] = useState(null);

  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/pie-chart/${month}`
        );
        const data = await response.json();

        const categories = data.map((item) => item.category);
        const items = data.map((item) => item.items);

        setPieData({
          labels: categories,
          datasets: [
            {
              data: items,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverOffset: 8,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();
  }, [month]);

  return (
    <div className="pie-container">
      <div className="chart-header">
        <h4>Select Month:</h4>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((month) => (
            <option key={month.number} value={month.number}>
              {month.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pie-chart">
        {pieData ? (
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default PieChart;
