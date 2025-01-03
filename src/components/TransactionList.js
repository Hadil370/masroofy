import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TransactionList({ transactions, setTransactions }) {
  const [editingId, setEditingId] = useState(null); // Holds the id of the transaction being edited
  const [editedTransaction, setEditedTransaction] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Delete transaction
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((txn) => txn.id !== id);
    setTransactions(updatedTransactions);
  };

  // Start editing a transaction
  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditedTransaction({ ...transaction });
  };

  // Save edited transaction
  const handleSave = () => {
    const updatedTransactions = transactions.map((txn) =>
      txn.id === editingId ? editedTransaction : txn
    );
    setTransactions(updatedTransactions);
    setEditingId(null); // Exit edit mode
    setEditedTransaction({});
  };

  // Filter transactions by category and date
  const filteredTransactions = transactions.filter((txn) => {
    const matchesCategory = filterCategory
      ? txn.category === filterCategory
      : true;
    const matchesDate = filterDate ? txn.date === filterDate : true;
    return matchesCategory && matchesDate;
  });

  return (
    <Box className="transaction-list">
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {[
              ...new Set(transactions.map((txn) => txn.category)),
            ].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Filter by Date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setFilterCategory("");
            setFilterDate("");
          }}
        >
          Clear Filters
        </Button>
      </Box>

      <List>
        {filteredTransactions.map((transaction) => (
          <ListItem key={transaction.id} divider>
            {editingId === transaction.id ? (
              <>
                <TextField
                  label="Name"
                  value={editedTransaction.name}
                  onChange={(e) =>
                    setEditedTransaction({
                      ...editedTransaction,
                      name: e.target.value,
                    })
                  }
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Amount"
                  type="number"
                  value={editedTransaction.amount}
                  onChange={(e) =>
                    setEditedTransaction({
                      ...editedTransaction,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  sx={{ marginRight: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ marginRight: 2 }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`${transaction.name}: ${transaction.amount} DZD`}
                  secondary={`${transaction.date} - ${transaction.category}`}
                />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(transaction)}
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
      <Button variant="contained" href="/" sx={{ marginTop: 2 }}>
        Go Back
      </Button>
    </Box>
  );
}

export default TransactionList;
