import React from 'react';
import formatCurrency from './formatCurrency';
import formatDate from './formatDate';
import '../App.css';

const FinanceItem = ({ investment }) => {
  const { id, name, finalValue, lastUpdateDate, onDelete, onReview } = investment;

  return (
    <li>
      <div>
        <h3>{name}</h3>
        <p>
          Latest Value: {formatCurrency(finalValue)} on {formatDate(lastUpdateDate)}
        </p>
      </div>
      <button onClick={() => onReview(id)}>Review</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default FinanceItem;
