import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const Login = ({ onLogin }) => {
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

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
