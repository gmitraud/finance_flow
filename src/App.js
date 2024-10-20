import React, { useState, useEffect } from 'react';
import './App.css';
import FinanceList from './Components/financeList';
import Login from './Components/Login';
import Header from './Components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (savedUser) {
      setUser(savedUser);
    }

    if (allUsers.length === 0) {
      const defaultAdmin = {
        username: 'admin',
        password: 'admin123',
        role: 'ADMIN',
        status: 'ATIVO'
      };
      const updatedUsers = [...allUsers, defaultAdmin];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } else {
      setUsers(allUsers);
    }
  }, []);

  const handleLogin = (userData) => {
    const activeUser = users.find(
      (u) => u.username === userData.username && u.status === 'ATIVO'
    );
    if (!activeUser) {
      alert('Your account is inactive, please contact an administrator');
      return;
    }
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const handleCreateUser = (newUser) => {
    const userWithStatus = { ...newUser, status: 'ATIVO' };
    const updatedUsers = [...users, userWithStatus];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`User ${userWithStatus.username} created with role ${userWithStatus.role}`);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Finance Flow</h1>
        {user ? (
          <>
            <Header user={user} onLogout={handleLogout} />
            {user.role === 'ADMIN' && <p>Admin privileges enabled</p>}
            <FinanceList userRole={user.role} />

            {user.role === 'ADMIN' && users.length > 0 && (
              <div>
                <h3>Registered Users:</h3>
                <button onClick={() => setShowUsers(!showUsers)}>
                  {showUsers ? 'Hide Users' : 'Show Users'}
                </button>
                <button onClick={handleCreateUser}>Create User</button>

                {showUsers && (
                  <ul>
                    {users.map((u, index) => (
                      <li key={index}>
                        {u.username} - {u.role} - {u.status}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
