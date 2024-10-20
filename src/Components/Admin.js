import React, { useState, useEffect } from 'react';
import '../App.css';

const UserManagement = ({ onCreateUser, onClose, user }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('USER');
  const [newStatus, setNewStatus] = useState('ATIVO');

  useEffect(() => {
    if (user.role !== 'ADMIN') {
      alert('Access denied: Only ADMIN users can create new users.');
      onClose();
    }
  }, [user, onClose]);

  const handleCreateUser = () => {
    if (!newUsername || !newPassword) {
      alert('Please enter a username and password');
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
      </div>
    </div>
  );
};

export default UserManagement;
