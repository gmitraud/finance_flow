// src/Components/financeItem.js

import React from 'react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

const FinanceItem = ({ investment }) => {
  return (
    <li>
      <strong>{investment.name}</strong> - 
      Original Value: {formatCurrency(investment.amount)} 
      {investment.updatedAmount && (
        <> (Updated Value: <strong>{formatCurrency(investment.updatedAmount)}</strong>) </>
      )} 
      on {investment.date}
      <button onClick={() => investment.onDelete(investment.id)}>Delete</button>
      <button onClick={() => investment.onReview(investment.id)}>Review</button>
    </li>
  );
};

export default FinanceItem;
