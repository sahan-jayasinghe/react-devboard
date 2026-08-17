import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">DB</div>
        <div>
          <span className="header-title">DevBoard</span>
        </div>
      </div>
      <span className="header-subtitle">Developer Task &amp; Project Tracker</span>
    </header>
  );
};

export default Header;