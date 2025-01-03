import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function VisualReports({ transactions }) {
  const chartRef = useRef(null); // Reference for the chart

  // Process data for charts
  const categories = [...new Set(transactions.map((txn) => txn.category))];
  const categoryTotals = categories.map((category) =>
    transactions
      .filter((txn) => txn.category === category)
      .reduce((sum, txn) => sum + txn.amount, 0)
  );

  const months = ["January", "February", "March", "April", "May"];
  const incomeData = months.map((month) =>
    transactions
      .filter((txn) => txn.amount > 0 && txn.date.startsWith(`2025-${String(months.indexOf(month) + 1).padStart(2, "0")}`))
      .reduce((sum, txn) => sum + txn.amount, 0)
  );
  const expenseData = months.map((month) =>
    transactions
      .filter((txn) => txn.amount < 0 && txn.date.startsWith(`2025-${String(months.indexOf(month) + 1).padStart(2, "0")}`))
      .reduce((sum, txn) => sum + Math.abs(txn.amount), 0)
  );

  // Data for the pie chart
  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Data for the bar chart
  const barData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "red",
      },
    ],
  };

  // Data for the line chart
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <Box className="reports-page">
      <Typography variant="h4" gutterBottom>
        Visual Reports
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Category-wise Expense Distribution (Pie Chart)
        </Typography>
        <Pie ref={chartRef} data={pieData} />
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Monthly Income vs Expenses (Bar Chart)
        </Typography>
        <Bar ref={chartRef} data={barData} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Monthly Income and Expenses Over Time (Line Chart)
        </Typography>
        <Line ref={chartRef} data={lineData} />
      </Box>

      <Button variant="contained" href="/" sx={{ marginTop: 4 }}>
        Go Back
      </Button>
    </Box>
  );
}

export default VisualReports;
