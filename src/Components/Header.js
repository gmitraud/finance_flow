import React from 'react';

const Header = ({ user, onLogout, handleCreateUser  }) => {
  return (
    <div className='app-header'>
      <h2>Welcome, {user.username}!</h2>
      <div className='header-button'>
      {user.role === 'ADMIN' && 
          (<button onClick={handleCreateUser}>Create User</button>
        )}
        <button onClick={onLogout}>Logout</button>
      </div>  
    </div>
  );
};

export default Header;
