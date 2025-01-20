import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const Login = ({ onLogin, theme, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      if (foundUser.status !== 'ATIVO') {
        setModalMessage('Your account is inactive, please contact an administrator.');
        setShowModal(true);
        return;
      }
      onLogin(foundUser);
    } else {
      setModalMessage('Invalid credentials');
      setShowModal(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <header>
        {/* Botão de alternância de tema */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-button"
        >
          {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
      </header>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>

      {showModal && (
        <ConfirmationModal
          message={modalMessage}
          isConfirmation={false}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Login;
