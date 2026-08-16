import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <>
              <h2>Welcome back</h2>
              <p>This is your task management dashboard.</p>
            </>
          )}
          {activeTab === 'tasks' && (
            <>
              <h2>Tasks</h2>
              <p>Your task list will appear here.</p>
            </>
          )}
          {activeTab === 'projects' && (
            <>
              <h2>Projects</h2>
              <p>Your projects will appear here.</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;