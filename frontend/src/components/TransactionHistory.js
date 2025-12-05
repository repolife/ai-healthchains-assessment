import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';
import { apiService } from '../services/apiService';

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Current user doesn't have a patient id so can't fetch transactions unless fetching all transactions
       // const transactionsData = await apiService.getTransactions(account);
       const transactionsData = await apiService.getTransactions();
        console.log('transactionsData', transactionsData);
        setTransactions(transactionsData.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account]);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatDate = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleString([], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
  };

  if (loading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-history-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter">
            Filtering for: {formatAddress(account)}
          </div>
        )}
      </div>

      {/* TODO: Display transactions list */}
      <div className="transactions-list">
        {/* Your implementation here */}
        {transactions && transactions.length > 0 ? transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <p>Type: {transaction.type}</p>
            <p>From: {formatAddress(transaction.from)}</p>
            <p>To: {formatAddress(transaction.to)}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Currency: {transaction.currency}</p>
            <p>Status: {transaction.status}</p>
            <p>Timestamp: {formatDate(transaction.timestamp)}</p>
            <p>Blockchain Tx Hash: {transaction.blockchainTxHash}</p>
          </div>
        )) : (
          <div className="placeholder">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;


