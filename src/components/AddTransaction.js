import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';

function AddTransaction({ addTransaction }) {
  const [transaction, setTransaction] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
    type: '',
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...transaction, amount: parseFloat(transaction.amount) });
    setTransaction({ name: '', amount: '', date: '', category: '', type: '' });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={transaction.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Amount (DZD)"
          name="amount"
          type="number"
          value={transaction.amount}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={transaction.date}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          select
          label="Category"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        >
          {['Groceries', 'Transportation', 'Entertainment', 'Housing', 'Income'].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit" fullWidth>
          Add Transaction
        </Button>
      </form>
    </Box>
  );
}

export default AddTransaction;
