import React, { useState, useEffect } from 'react';
import './App.css';
import FinanceList from './Components/financeList';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className="App">
      <h1>Finance Flow</h1>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>Welcome, {user.username}</h2>
          {user.role === 'ADMIN' && <p>Admin privileges enabled</p>}
          <FinanceList userRole={user.role} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
