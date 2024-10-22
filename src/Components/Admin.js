import React, { useState } from 'react';
import '../App.css';
import ConfirmationModal from './ConfirmationModal';

const UserManagement = ({ onCreateUser, onClose }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('USER');
  const [newStatus, setNewStatus] = useState('ATIVO');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCreateUser = () => {
    if (!newUsername || !newPassword) {
      setModalMessage('Please enter a username and password');
      setShowModal(true);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUsernameTaken = existingUsers.some(user => user.username === newUsername);

    if (isUsernameTaken) {
      setModalMessage('Username already exists. Please choose another one.');
      setShowModal(true);
      return;
    }

    const newUser = { username: newUsername, password: newPassword, role: newRole, status: newStatus };
    onCreateUser(newUser);
    setNewUsername('');
    setNewPassword('');
    setNewRole('USER');
    setNewStatus('ATIVO');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="ATIVO">ATIVO</option>
          <option value="INATIVO">INATIVO</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
        <button onClick={onClose}>Close</button>

        {showModal && (
          <ConfirmationModal
            message={modalMessage}
            isConfirmation={false}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
