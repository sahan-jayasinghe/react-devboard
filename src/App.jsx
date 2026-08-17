import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Projects from './components/Projects';

const initialTasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    description: "Create wireframes and high-fidelity designs for the new homepage",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 2,
    title: "Update dependencies",
    description: "Update all npm packages to their latest versions",
    status: "To Do",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document all endpoints for the new user management API",
    status: "Completed",
    priority: "Low"
  },
  {
    id: 4,
    title: "Fix mobile navigation bug",
    description: "Resolve issue with hamburger menu not closing on iOS",
    status: "To Do",
    priority: "High"
  }
];

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "Active",
    priority: "High",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Build iOS and Android apps for customer engagement",
    status: "Planning",
    priority: "Medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
  },
  {
    id: 3,
    name: "Database Migration",
    description: "Migrate legacy database to cloud-based solution",
    status: "Completed",
    priority: "Low",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20, // 20 days ago
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for product launch",
    status: "Active",
    priority: "Medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
      }
    }
    return initialTasks;
  });
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("taskflow-projects");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse projects from localStorage:", e);
      }
    }
    return initialProjects;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskflow-projects", JSON.stringify(projects));
  }, [projects]);

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
          {activeTab === 'dashboard' && <Dashboard tasks={tasks} projects={projects} />}
          {activeTab === 'tasks' && <Tasks tasks={tasks} setTasks={setTasks} />}
          {activeTab === 'projects' && <Projects projects={projects} setProjects={setProjects} />}
        </main>
      </div>
    </div>
  );
};

export default App;