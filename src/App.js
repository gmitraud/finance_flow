import React, { useState, useEffect } from 'react';
import './App.css';
import FinanceList from './Components/financeList';
import Login from './Components/Login';
import Header from './Components/Header';
import UserManagement from './Components/Admin';
import ReviewUserModal from './Components/ReviewUserModal';
import ConfirmationModal from './Components/ConfirmationModal';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState('light'); // Estado para controlar o tema
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [userToActOn, setUserToActOn] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'light'; // Recupera o tema salvo
    setTheme(savedTheme); // Define o tema salvo (se existir)
    document.body.className = savedTheme; // Aplica a classe do tema ao body

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

  // Alternar entre os temas
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; // Alterna entre "light" e "dark"
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme); // Salva o tema no localStorage
    document.body.className = newTheme; // Aplica a classe do tema ao body
  };

  const handleLogin = (userData) => {
    const activeUser = users.find(
      (u) => u.username === userData.username && u.status === 'ATIVO'
    );
    if (!activeUser) {
      setAlertMessage('Your account is inactive, please contact an administrator');
      setShowAlert(true);
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
    
    setAlertMessage(`User ${userWithStatus.username} created with role ${userWithStatus.role}`);
    setShowAlert(true);
  };

  const confirmAction = (action, user) => {
    setActionToConfirm(action);
    setUserToActOn(user);
    setShowConfirmation(true);
  };

  const handleDeleteUser = (username) => {
    const updatedUsers = users.filter((u) => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleReviewUser = (userToReview) => {
    setSelectedUser(userToReview);
  };

  const executeConfirmedAction = () => {
    if (actionToConfirm === 'delete') {
      handleDeleteUser(userToActOn.username);
    } else if (actionToConfirm === 'review') {
      handleReviewUser(userToActOn);
    }
    setShowConfirmation(false);
    setUserToActOn(null);
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setUserToActOn(null);
  };

  return (
    <BrowserRouter>
      <div className={`App ${theme}`}> {/* Aplica a classe correspondente ao tema */}
        <h1>Finance Flow</h1>
        {user ? (
          <>
            <Header 
              user={user} 
              onLogout={handleLogout} 
              handleCreateUser={() => setShowUserManagement(true)} 
              theme={theme} // Passa o estado do tema para o Header
              toggleTheme={toggleTheme} // Passa a função de alternância de tema para o Header
            />
            {user.role === 'ADMIN' && <p className="admin-privileges">Admin privileges enabled</p>}
            
            <FinanceList 
              userRole={user.role} 
              username={user.username} 
              investments={investments}
              setInvestments={setInvestments}
            />

            {user.role === 'ADMIN' && users.length > 0 && (
              <div>
                <h3>Registered Users:</h3>
                <button onClick={() => setShowUsers(!showUsers)}>
                  {showUsers ? 'Hide Users' : 'Show Users'}
                </button>

                {showUsers && (
                  <ul>
                    {users.map((u, index) => (
                      <li key={index}>
                        {u.username} - {u.role} - {u.status}
                        <button onClick={() => confirmAction('delete', u)} style={{ marginLeft: '10px' }}>
                          Delete
                        </button>
                        <button onClick={() => confirmAction('review', u)} style={{ marginLeft: '10px' }}>
                          Review
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {showUserManagement && (
              <UserManagement
                onCreateUser={handleCreateUser}
                onClose={() => setShowUserManagement(false)}
                user={user}
              />
            )}

            {selectedUser && (
              <ReviewUserModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                setUsers={setUsers}
                users={users}
              />
            )}

            {showConfirmation && (
              <ConfirmationModal
                message={`Are you sure you want to ${actionToConfirm} the user ${userToActOn.username}?`}
                onConfirm={executeConfirmedAction}
                onCancel={cancelAction}
              />
            )}

            {showAlert && (
              <ConfirmationModal
                message={alertMessage}
                onClose={() => setShowAlert(false)}
                isConfirmation={false}
              />
            )}
          </>
        ) : (
          <Login onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
