import React, { useState } from 'react';
import FinanceItem from './financeItem';
import InvestmentDetails from './InvestmentDetails';

const FinanceList = ({ userRole }) => {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '', date: '' });
  const [showAddInvestment, setShowAddInvestment] = useState(false);

  const handleDelete = (id) => {
    if (userRole !== 'ADMIN') {
      alert('Only ADMIN can delete investments');
      return;
    }

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
        const lastEntry = newHistory.length > 0
          ? newHistory[newHistory.length - 1]
          : { value: investment.amount, date: investment.date }; // Verifique se investment.date é uma data válida
  
        return {
          ...investment,
          history: newHistory,
          finalValue: lastEntry.value,
          lastUpdateDate: lastEntry.date, // Certifique-se de que lastUpdateDate é atualizado aqui
        };
      }
      return investment;
    });
  
    setInvestments(updatedInvestments);
    setSelectedInvestment(null);
  };

  const handleAddInvestment = (newInvestment) => {
    const investmentToAdd = {
      ...newInvestment,
      id: investments.length + 1,
      history: [],
      amount: parseFloat(newInvestment.amount) || 0,
      date: newInvestment.date || new Date().toISOString().split('T')[0],
    };

    setInvestments([...investments, investmentToAdd]);
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
          isReviewMode={false} // O campo deve estar habilitado
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
          isReviewMode={true} // O campo deve estar desabilitado
        />
      )}
    </div>
  );
};

export default FinanceList;
