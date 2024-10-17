import React from 'react';
import formatCurrency from './formatCurrency';
import formatDate from './formatDate';
import '../App.css';

const FinanceItem = ({ investment }) => {
  const latestValue = investment.finalValue || investment.amount;

  return (
    <li className="finance-item">
      <strong>{investment.name}</strong> - 
      Latest Value: <strong>{formatCurrency(latestValue)}</strong>
      &nbsp;on {formatDate(investment.date)}
      <div>
        <button onClick={() => investment.onDelete(investment.id)}>Delete</button>
        <button onClick={() => investment.onReview(investment.id)}>Review</button>
      </div>
    </li>
  );
};

export default FinanceItem;
