import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; 
import "./BarChart.css"; 

const BarChart = () => {
  const [month, setMonth] = useState(3); 
  const [range, setRange] = useState({
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-more": 0,
  });

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

  const transformRanges = (data) => {
    const ranges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-more": 0,
    };

    data.forEach((item) => {
      const price = item._id;
      if (price >= 0 && price <= 100) ranges["0-100"] += item.count;
      else if (price >= 101 && price <= 200) ranges["101-200"] += item.count;
      else if (price >= 201 && price <= 300) ranges["201-300"] += item.count;
      else if (price >= 301 && price <= 400) ranges["301-400"] += item.count;
      else if (price >= 401 && price <= 500) ranges["401-500"] += item.count;
      else if (price >= 501 && price <= 600) ranges["501-600"] += item.count;
      else if (price >= 601 && price <= 700) ranges["601-700"] += item.count;
      else if (price >= 701 && price <= 800) ranges["701-800"] += item.count;
      else if (price >= 801 && price <= 900) ranges["801-900"] += item.count;
      else if (price >= 901) ranges["901-more"] += item.count;
    });

    setRange(ranges);
  };

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/bar-chart/${month}`
      );
      console.log(response.data);
      transformRanges(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  useEffect(() => {
    fetchData(month);
  }, [month]);

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: (value) =>
            Number.isInteger(value) ? value : null, // Show only integers
        },
      },
    },
  };

  const data = {
    labels: Object.keys(range),
    datasets: [
      {
        label: "Items per Price Range",
        data: Object.values(range),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h4>Price Ranges for</h4>
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
      <div className="chart-container">
        <div className="chart">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
