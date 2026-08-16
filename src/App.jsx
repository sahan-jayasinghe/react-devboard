import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <h2>Welcome back</h2>
          <p>This is your task management dashboard.</p>
        </main>
      </div>
    </div>
  );
};

export default App;