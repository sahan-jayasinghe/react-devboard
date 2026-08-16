import React from 'react';

const Sidebar = ({ activeTab, onTabClick }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a
              href="#dashboard"
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => onTabClick('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#tasks"
              className={activeTab === 'tasks' ? 'active' : ''}
              onClick={() => onTabClick('tasks')}
            >
              Tasks
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => onTabClick('projects')}
            >
              Projects
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;