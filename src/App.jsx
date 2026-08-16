import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Projects from './components/Projects';

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
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tasks' && <Tasks />}
          {activeTab === 'projects' && <Projects />}
        </main>
      </div>
    </div>
  );
};

export default App;