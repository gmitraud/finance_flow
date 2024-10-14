// src/Components/financeItem.js

import React from 'react';

const FinanceItem = ({ investment }) => {
  return (
    <li>
      <strong>{investment.name}</strong> - 
      Original Value: R${investment.amount} 
      {investment.updatedAmount && (
        <> (Updated Value: <strong>{investment.updatedAmount}</strong>) </>
      )} 
      on {investment.date}
      <button onClick={() => investment.onDelete(investment.id)}>Delete</button>
      <button onClick={() => investment.onReview(investment.id)}>Review</button>
    </li>
  );
};

export default FinanceItem;
