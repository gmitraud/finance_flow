import React, { useState } from 'react';
import '../App.css';

const UserManagement = ({ onCreateUser, role }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('USER');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleCreateUser = () => {
    if (!newUsername) {
      alert('Please enter a username');
      return;
    }

    const newUser = { username: newUsername, role: newRole };
    onCreateUser(newUser);
    setNewUsername('');
    setNewRole('USER');
    setIsModalOpen(false);
  };

  // Renderiza apenas se o usuário for ADMIN
  if (role !== 'ADMIN') {
    return null; // Retorna null para não renderizar nada
  }

  return (
    <div>
      <h3>User Management</h3>
      <button onClick={() => setIsModalOpen(true)}>Create User</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create New User</h3>
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
