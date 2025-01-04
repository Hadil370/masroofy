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
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { jsPDF } from "jspdf";

function TransactionList({ transactions, setTransactions }) {
  const [editingId, setEditingId] = useState(null); // Holds the id of the transaction being edited
  const [editedTransaction, setEditedTransaction] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For login status
  const [username, setUsername] = useState(""); // For storing inputted username
  const [password, setPassword] = useState(""); // For storing inputted password
  const [showLogin, setShowLogin] = useState(false); // To toggle login form visibility
  const [errorMessage, setErrorMessage] = useState(""); // For error message display
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar for error

  // Hardcoded login credentials
  const validUsername = "hadil";
  const validPassword = "manar";

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

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true); // Set login status to true
      setShowLogin(false); // Hide login form
      setErrorMessage(""); // Reset error message
    } else {
      setErrorMessage("Invalid credentials! Please try again.");
      setOpenSnackbar(true);
    }
  };

  // Export transactions to PDF
  const exportToPDF = () => {
    if (isLoggedIn) {
      const doc = new jsPDF();
      doc.text("Transaction List", 20, 10);

      filteredTransactions.forEach((txn, index) => {
        doc.text(
          `${txn.name}: ${txn.amount} DZD - ${txn.date} - ${txn.category}`,
          20,
          20 + index * 10
        );
      });

      doc.save("transactions.pdf");
    } else {
      setShowLogin(true); // Show login form if not logged in
    }
  };

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
            {[...new Set(transactions.map((txn) => txn.category))].map(
              (category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              )
            )}
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

      {/* Export to PDF Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={exportToPDF}
        sx={{ marginTop: 2 }}
      >
        Export to PDF
      </Button>

      {/* Login Form */}
      {showLogin && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Please login to export PDF</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </form>
          {errorMessage && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      )}

      {/* Snackbar for login error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error">Invalid credentials! Please try again.</Alert>
      </Snackbar>
    </Box>
  );
}

export default TransactionList;
