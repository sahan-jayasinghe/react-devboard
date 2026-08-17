import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'tasks',     label: 'Tasks',     icon: '✓' },
  { id: 'projects',  label: 'Projects',  icon: '◈' },
];

const Sidebar = ({ activeTab, onTabClick }) => {
  return (
    <aside className="sidebar">
      <span className="sidebar-section-label">Navigation</span>
      <ul className="sidebar-nav">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              className={`sidebar-link${activeTab === item.id ? ' active' : ''}`}
              onClick={() => onTabClick(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        v1.0.0
      </div>
    </aside>
  );
};

export default Sidebar;