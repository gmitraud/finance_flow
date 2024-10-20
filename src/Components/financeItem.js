import React from 'react';
import formatCurrency from './formatCurrency';
import formatDate from './formatDate';
import '../App.css';

const FinanceItem = ({ investment }) => {
  // Calculando finalValue e lastUpdateDate dentro do componente
  const finalValue = investment.history && investment.history.length > 0
    ? investment.history[investment.history.length - 1].value
    : investment.amount || 0; // Garantindo que seja um número

  const lastUpdateDate = investment.history && investment.history.length > 0
    ? investment.history[investment.history.length - 1].date
    : investment.date; // Usando a data do investimento se não houver histórico

  return (
    <li>
      <div>
        <h3>{investment.name}</h3>
        <p>
          Latest Value: {formatCurrency(finalValue)} on {formatDate(lastUpdateDate || new Date())}
        </p>
      </div>
      <button onClick={() => investment.onReview(investment.id)}>Review</button>
      <button onClick={() => investment.onDelete(investment.id)}>Delete</button>
    </li>
  );
};

export default FinanceItem;
