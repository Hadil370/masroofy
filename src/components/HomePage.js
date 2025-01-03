import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome + totalExpenses;

  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        Masroofy: Budget Tracker
      </Typography>
      <Typography variant="h6">Total Income: {totalIncome} DZD</Typography>
      <Typography variant="h6">Total Expenses: {totalExpenses} DZD</Typography>
      <Typography variant="h6">Balance: {balance} DZD</Typography>
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" component={Link} to="/add" sx={{ marginRight: 2 }}>
          Add Transaction
        </Button>
        <Button variant="contained" component={Link} to="/list" sx={{ marginRight: 2 }}>
          Transaction List
        </Button>
        <Button variant="contained" component={Link} to="/reports">
          Visual Reports
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
