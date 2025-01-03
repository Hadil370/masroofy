import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import VisualReports from "./components/VisualReports";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Groceries", amount: -200, date: "2025-01-01", category: "Groceries" },
    { id: 2, name: "Salary", amount: 1500, date: "2025-01-02", category: "Income" },
    { id: 3, name: "Rent", amount: -500, date: "2025-01-03", category: "Housing" },
  ]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage transactions={transactions} />} />
        <Route
          path="/add"
          element={<AddTransaction addTransaction={addTransaction} />}
        />
        <Route
          path="/list"
          element={
            <TransactionList
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route
          path="/reports"
          element={<VisualReports transactions={transactions} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
