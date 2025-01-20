import React from 'react';

const Header = ({ user, onLogout, handleCreateUser, theme, toggleTheme }) => {
  return (
    <div className='app-header'>
      <h2>Welcome, {user.username}!</h2>
      <div className='header-button'>
        {user.role === 'ADMIN' && 
          (<button onClick={handleCreateUser}>Create User</button>
        )}
        <button onClick={onLogout}>Logout</button>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-button"
        >
          {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
      </div>  
    </div>
  );
};

export default Header;
