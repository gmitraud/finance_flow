import React, { useState } from 'react';
import FinanceItem from './financeItem';
import InvestmentDetails from './InvestmentDetails';

const FinanceList = () => {
  const [investments, setInvestments] = useState([]);

  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '', date: '' });
  const [showAddInvestment, setShowAddInvestment] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      setInvestments(investments.filter((investment) => investment.id !== id));
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
        const finalValue = newHistory.length > 0
          ? newHistory[newHistory.length - 1].value
          : investment.amount;

        return {
          ...investment,
          history: newHistory,
          finalValue: finalValue,
        };
      }
      return investment;
    });
    setInvestments(updatedInvestments);
    const updatedInvestment = updatedInvestments.find((inv) => inv.id === id);
    setSelectedInvestment(updatedInvestment);
  };

  const handleAddInvestment = (newInvestment) => {
    if (!newInvestment.name || !newInvestment.amount || !newInvestment.date) {
      alert('Please fill all fields');
      return;
    }
  
    const id = investments.length ? investments[investments.length - 1].id + 1 : 1;
    const newInvestmentData = {
      id,
      name: newInvestment.name,
      amount: parseFloat(newInvestment.amount),
      date: newInvestment.date,
      history: [],
    };
  
    setInvestments([...investments, newInvestmentData]);
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
        />
      )}
    </div>
  );
};

export default FinanceList;
