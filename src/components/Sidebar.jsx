import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#projects">Projects</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;