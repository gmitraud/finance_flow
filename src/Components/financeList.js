// src/Components/financeList.js

import React, { useState } from 'react';
import FinanceItem from './financeItem.js';

const FinanceList = () => {
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Investment A', amount: 1000, date: '2023-01-15' },
    { id: 2, name: 'Investment B', amount: 2000, date: '2023-02-10' },
    { id: 3, name: 'Investment C', amount: 1500, date: '2023-03-22' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '', date: '' });
  const [reviewId, setReviewId] = useState(null);
  const [updatedValue, setUpdatedValue] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const handleChange = (e) => {
    setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = investments.length + 1; // Gera um ID simples
    setInvestments([...investments, { ...newInvestment, id, updatedAmount: null, amount: formatCurrency(newInvestment.amount) }]);
    setNewInvestment({ name: '', amount: '', date: '' }); // Reseta o formulário
    setShowForm(false); // Fecha o formulário
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      setInvestments(investments.filter((investment) => investment.id !== id));
    }
  };

  const handleReview = (id) => {
    setReviewId(id);
  };

  const handleUpdate = (id) => {
    const updatedInvestments = investments.map((investment) => {
      if (investment.id === id) {
        return { ...investment, updatedAmount: formatCurrency(updatedValue), date: updatedDate };
      }
      return investment;
    });
    setInvestments(updatedInvestments);
    setReviewId(null); // Fecha a revisão
    setUpdatedValue(''); // Reseta o valor
    setUpdatedDate(''); // Reseta a data
  };

  return (
    <div>
      <h2>My Investments</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Investment'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newInvestment.name}
            onChange={handleChange}
            placeholder="Investment Name"
            required
          />
          <input
            type="number"
            name="amount"
            value={newInvestment.amount}
            onChange={handleChange}
            placeholder="Investment Amount"
            required
          />
          <input
            type="date"
            name="date"
            value={newInvestment.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Save Investment</button>
        </form>
      )}

      <ul>
        {investments.map((investment) => (
          <FinanceItem
            key={investment.id}
            investment={{ ...investment, onDelete: handleDelete, onReview: handleReview, formatCurrency }}
          />
        ))}
      </ul>

      {reviewId && (
        <div>
          <h3>Review Investment</h3>
          <input
            type="number"
            placeholder="Updated Amount"
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
            required
          />
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            required
          />
          <button onClick={() => handleUpdate(reviewId)}>Update Investment</button>
          <button onClick={() => setReviewId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FinanceList;
