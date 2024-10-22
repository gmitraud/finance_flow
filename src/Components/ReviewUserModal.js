import React, { useState } from 'react';
import '../App.css';

const ReviewUserModal = ({ user, onClose, setUsers, users }) => {
  const [newPassword, setNewPassword] = useState(user.password);
  const [newRole, setNewRole] = useState(user.role);
  const [newStatus, setNewStatus] = useState(user.status);

  const handleUpdateUser = () => {
    const updatedUser = {
      ...user,
      password: newPassword,
      role: newRole,
      status: newStatus,
    };

    const updatedUsers = users.map((u) => (u.username === user.username ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Review User: {user.username}</h3>
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
        <button onClick={handleUpdateUser}>Update User</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReviewUserModal;
