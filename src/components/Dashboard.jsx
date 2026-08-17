import React from 'react';

const Dashboard = ({ tasks, projects }) => {
  // Task statistics
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === 'To Do').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const taskCompletionPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Project statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;

  // Recent tasks (5 most recent by id)
  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  // Recent projects (3 most recent by createdAt)
  const recentProjects = [...projects]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);

  return (
    <div className="tasks-page">
      {/* Page Header */}
      <header className="tasks-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <p className="header-description">Overview of your tasks and projects.</p>
        </div>
      </header>

      {/* Task Statistics */}
      <section className="task-stats">
        <h2>Task Statistics</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>Total Tasks</h3>
            <p className="card-value">{totalTasks}</p>
          </div>
          <div className="card">
            <h3>To Do</h3>
            <p className="card-value">{todoTasks}</p>
          </div>
          <div className="card">
            <h3>In Progress</h3>
            <p className="card-value">{inProgressTasks}</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p className="card-value">{completedTasks}</p>
          </div>
        </div>
      </section>

      {/* Project Statistics */}
      <section className="project-stats">
        <h2>Project Statistics</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>Total Projects</h3>
            <p className="card-value">{totalProjects}</p>
          </div>
          <div className="card">
            <h3>Active</h3>
            <p className="card-value">{activeProjects}</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p className="card-value">{completedProjectsCount}</p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="progress-section">
        <h2>Task Completion Progress</h2>
        <div className="progress-bar-container">
          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{ width: `${taskCompletionPercent}%` }}
            >
              {Math.round(taskCompletionPercent)}%
            </div>
          </div>
        </div>
        <p className="progress-text">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </section>

      {/* Recent Tasks */}
      {totalTasks > 0 && (
        <section className="recent-tasks">
          <h2>Recent Tasks</h2>
          <ul className="tasks-ul">
            {recentTasks.map(task => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  <div className="task-details">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-meta">
                      <span className={`status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                      <span className={`priority priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent Projects */}
      {totalProjects > 0 && (
        <section className="recent-projects">
          <h2>Recent Projects</h2>
          <ul className="tasks-ul">
            {recentProjects.map(project => (
              <li key={project.id} className="task-item">
                <div className="task-content">
                  <div className="task-details">
                    <h3 className="task-title">{project.name}</h3>
                    <p className="task-meta">
                      <span className={`status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                      <span className={`priority priority-${project.priority.toLowerCase()}`}>
                        {project.priority}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Dashboard;