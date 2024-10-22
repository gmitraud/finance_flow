import React, { useState, useEffect } from 'react';
import FinanceItem from './financeItem';
import InvestmentDetails from './InvestmentDetails';

const FinanceList = ({ userRole, username }) => {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '', date: '' });
  const [showAddInvestment, setShowAddInvestment] = useState(false);

  useEffect(() => {
    const savedInvestments = JSON.parse(localStorage.getItem(`investments_${username}`)) || [];
    setInvestments(savedInvestments);
  }, [username]);

  const saveInvestments = (newInvestments) => {
    setInvestments(newInvestments);
    localStorage.setItem(`investments_${username}`, JSON.stringify(newInvestments));
  };

  const handleDelete = (id) => {
    if (userRole !== 'ADMIN') {
      alert('Only ADMIN can delete investments');
      return;
    }

    if (window.confirm('Are you sure you want to delete this investment?')) {
      const updatedInvestments = investments.filter((investment) => investment.id !== id);
      saveInvestments(updatedInvestments);
    }
  };

  const handleReview = (id) => {
    const investment = investments.find((inv) => inv.id === id);
    setSelectedInvestment(investment);
  };

  const handleCloseDetails = () => {
    setSelectedInvestment(null);
  };

  const handleUpdateInvestment = (id, newHistory) => {
    const updatedInvestments = investments.map((investment) => {
      if (investment.id === id) {
        const lastEntry = newHistory.length > 0
          ? newHistory[newHistory.length - 1]
          : { value: investment.amount, date: investment.date };

        return {
          ...investment,
          history: newHistory,
          finalValue: lastEntry.value,
          lastUpdateDate: lastEntry.date,
        };
      }
      return investment;
    });

    saveInvestments(updatedInvestments);
    setSelectedInvestment(null);
  };

  const handleAddInvestment = (newInvestment) => {
    const investmentToAdd = {
      ...newInvestment,
      id: investments.length > 0 ? investments[investments.length - 1].id + 1 : 1,
      history: [],
      amount: parseFloat(newInvestment.amount) || 0,
      date: newInvestment.date || new Date().toISOString().split('T')[0],
    };

    saveInvestments([...investments, investmentToAdd]);
    setNewInvestment({ name: '', amount: '', date: '' });
    setShowAddInvestment(false);
  };

  const handleOpenAddInvestment = () => {
    setShowAddInvestment(true);
    setNewInvestment({ name: '', amount: '', date: '' });
  };

  const handleCloseAddInvestment = () => {
    setShowAddInvestment(false);
  };

  return (
    <div>
      <h2>My Investments</h2>
      <button onClick={handleOpenAddInvestment}>Add Investment</button>

      {showAddInvestment && (
        <InvestmentDetails
          investment={newInvestment}
          onClose={handleCloseAddInvestment}
          onUpdateInvestment={handleAddInvestment}
          isReviewMode={false}
        />
      )}

      <ul>
        {investments.map((investment) => (
          <FinanceItem
            key={investment.id}
            investment={{ ...investment, onDelete: handleDelete, onReview: handleReview }}
          />
        ))}
      </ul>

      {selectedInvestment && (
        <InvestmentDetails
          investment={selectedInvestment}
          onClose={handleCloseDetails}
          onUpdateInvestment={handleUpdateInvestment}
          isReviewMode={true}
        />
      )}
    </div>
  );
};

export default FinanceList;
