import React from 'react';

/* ── Badge helpers ───────────────────────────────── */
const statusBadgeClass = (status) => {
  switch (status) {
    case 'To Do':      return 'badge badge-todo';
    case 'In Progress':return 'badge badge-inprogress';
    case 'Completed':  return 'badge badge-completed';
    case 'Active':     return 'badge badge-active';
    case 'Planning':   return 'badge badge-planning';
    default:           return 'badge badge-low';
  }
};

const Dashboard = ({ tasks, projects }) => {
  /* ── Statistics ──────────────────────────────────── */
  const totalTasks        = tasks.length;
  const todoTasks         = tasks.filter(t => t.status === 'To Do').length;
  const inProgressTasks   = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks    = tasks.filter(t => t.status === 'Completed').length;
  const completionPct     = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const totalProjects     = projects.length;
  const activeProjects    = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  /* ── Recent data ─────────────────────────────────── */
  const recentTasks    = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);
  const recentProjects = [...projects].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Dashboard</h1>
          <p>Overview of your tasks and projects</p>
        </div>
      </div>

      {/* Welcome banner */}
      <div className="welcome-banner mb-6">
        <h2>Welcome back! 👋</h2>
        <p>Here's what's happening with your work today.</p>
      </div>

      {/* Task stat cards */}
      <div className="stats-grid mb-6">
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Total Tasks</h3>
            <p className="stat-card-value primary">{totalTasks}</p>
          </div>
          <div className="stat-card-icon primary">📋</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>To Do</h3>
            <p className="stat-card-value warning">{todoTasks}</p>
          </div>
          <div className="stat-card-icon warning">⏳</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>In Progress</h3>
            <p className="stat-card-value info">{inProgressTasks}</p>
          </div>
          <div className="stat-card-icon info">🔄</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Completed</h3>
            <p className="stat-card-value success">{completedTasks}</p>
          </div>
          <div className="stat-card-icon success">✅</div>
        </div>
      </div>

      {/* Task completion progress */}
      <div className="card mb-6">
        <div className="card-header">
          <h2>📊 Task Completion</h2>
          <span className="badge badge-inprogress">{completionPct.toFixed(0)}%</span>
        </div>
        <div className="card-body">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              role="progressbar"
              aria-valuenow={completionPct}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <div className="progress-labels">
            <span>{completedTasks} of {totalTasks} tasks completed</span>
            <span>{completionPct.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Project stat cards */}
      <div className="stats-grid stats-grid-3 mb-6">
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Total Projects</h3>
            <p className="stat-card-value primary">{totalProjects}</p>
          </div>
          <div className="stat-card-icon primary">📁</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Active</h3>
            <p className="stat-card-value info">{activeProjects}</p>
          </div>
          <div className="stat-card-icon info">🚀</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-info">
            <h3>Completed</h3>
            <p className="stat-card-value success">{completedProjects}</p>
          </div>
          <div className="stat-card-icon success">🏁</div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="activity-grid">
        {/* Recent Tasks */}
        <div className="card">
          <div className="card-header">
            <h2>📋 Recent Tasks</h2>
          </div>
          <div className="card-body">
            {recentTasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                No tasks yet. Add your first task!
              </div>
            ) : (
              recentTasks.map(task => (
                <div key={task.id} className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-info" style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="truncate">{task.title}</h3>
                    <p className="truncate">{task.description || '—'}</p>
                  </div>
                  <span className={statusBadgeClass(task.status)}>{task.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="card">
          <div className="card-header">
            <h2>📁 Recent Projects</h2>
          </div>
          <div className="card-body">
            {recentProjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                No projects yet. Add your first project!
              </div>
            ) : (
              recentProjects.map(project => (
                <div key={project.id} className="activity-item">
                  <div className="activity-icon">📁</div>
                  <div className="activity-info" style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="truncate">{project.name}</h3>
                    <p className="truncate">{project.description || '—'}</p>
                  </div>
                  <span className={statusBadgeClass(project.status)}>{project.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;