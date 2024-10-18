import React, { useState } from 'react';
import '../App.css';
import formatCurrency from './formatCurrency';
import formatDate from './formatDate';

const InvestmentDetails = ({ investment, onClose, onUpdateInvestment }) => {
  const [newName, setNewName] = useState(investment.name || ''); 
  const [newAmount, setNewAmount] = useState(investment.amount || '');
  const [newDate, setNewDate] = useState(investment.date || '');
  const [showErrorModal, setShowErrorModal] = useState(false); // controls error msg box
  const [errorMessage, setErrorMessage] = useState(''); // Defines error msg

  const handleUpdate = () => {
    if (!newName || !newAmount || !newDate) {
      setErrorMessage('Please enter all fields: Name, Amount, and Date');
      setShowErrorModal(true);
      return;
    }

    if (investment.id) {
      const updatedHistory = investment.history ? [...investment.history] : [];
      updatedHistory.push({ value: parseFloat(newAmount), date: newDate });

      onUpdateInvestment(investment.id, updatedHistory);
    } else {
      onUpdateInvestment({
        name: newName,
        amount: parseFloat(newAmount),
        date: newDate,
      });
    }

    setNewName('');
    setNewAmount('');
    setNewDate('');
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const finalValue = investment.history && investment.history.length > 0
    ? investment.history[investment.history.length - 1].value
    : investment.amount;

  return (
    <div className="details-overlay">
      <div className="details-box">
        <h2>{investment.name ? investment.name + ' Details' : 'Add New Investment'}</h2>
        {investment.name && (
          <>
            <h3>History:</h3>
            <ul>
              <li>
                Original Amount: {formatCurrency(investment.amount)}
              </li>
              {investment.history
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((entry, index) => (
                <li key={index}>
                  Value: {formatCurrency(entry.value)} on {formatDate(entry.date)}
                </li>
              ))}
            </ul>

            <h3>
              Final Value: 
              <span className="final-value" style={{
                color: finalValue > investment.amount ? 'green' : finalValue < investment.amount ? 'red' : 'blue'
              }}>
                {formatCurrency(finalValue)}
                &nbsp;
                ({finalValue > investment.amount ? '+' : ''}{formatCurrency((finalValue - investment.amount).toFixed(2))})
              </span>
            </h3>

            <h4>Update Value</h4>
          </>
        )}

        <input
          type="text"
          placeholder="Investment Name"
          value={investment.name}
          disabled
        />

        <input
          type="number"
          placeholder="New Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />

        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <div>
          <button onClick={handleUpdate}>{investment.id ? 'Submit Update' : 'Submit New Investment'}</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>

      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentDetails;
