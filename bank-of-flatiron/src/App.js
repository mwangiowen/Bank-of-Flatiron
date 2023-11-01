import React, { useState } from "react";
import TransactionForm from "./Transactionform";
import Past from "./past";
import data from "./db.json";

function App() {
  const [transactionsData, setTransactionsData] = useState(data);

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [
      ...transactionsData.transactions,
      newTransaction,
    ];

    setTransactionsData({
      transactions: updatedTransactions,
    });
  };

  return (
    <div>
      <h1>💰 BANK OF FLATIRON 🏦</h1>
      <Past data={transactionsData} />
      <TransactionForm onTransactionSubmit={addTransaction} />
    </div>
  );
}

export default App;
