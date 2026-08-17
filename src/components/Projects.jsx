import React, { useState } from 'react';

/* ── Badge helpers ───────────────────────────────── */
const statusBadgeClass = (status) => {
  switch (status) {
    case 'Planning':    return 'badge badge-planning';
    case 'Active':      return 'badge badge-active';
    case 'Completed':   return 'badge badge-completed';
    default:            return 'badge badge-low';
  }
};

const priorityBadgeClass = (priority) => {
  switch (priority) {
    case 'Low':    return 'badge badge-low';
    case 'Medium': return 'badge badge-medium';
    case 'High':   return 'badge badge-high';
    default:       return 'badge badge-low';
  }
};

/* ─────────────────────────────────────────────────── */
const Projects = ({ projects, setProjects }) => {
  const [newProject, setNewProject] = useState({ name: '', description: '', status: 'Planning', priority: 'Medium' });
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState({ name: '', description: '', status: 'Planning', priority: 'Medium' });

  const totalProjects     = projects.length;
  const activeProjects    = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleEditProjectChange = (e) => {
    const { name, value } = e.target;
    setEditProject(prev => ({ ...prev, [name]: value }));
  };

  const addProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    setProjects(prev => [...prev, { id: Date.now(), ...newProject, createdAt: Date.now() }]);
    setNewProject({ name: '', description: '', status: 'Planning', priority: 'Medium' });
    setEditProjectId(null);
  };

  const saveProject = (e) => {
    e.preventDefault();
    if (!editProject.name.trim()) return;
    setProjects(prev => prev.map(p => p.id === editProjectId ? { ...p, ...editProject } : p));
    setEditProjectId(null);
    setEditProject({ name: '', description: '', status: 'Planning', priority: 'Medium' });
  };

  const deleteProject = (id) => setProjects(prev => prev.filter(p => p.id !== id));

  const startEditing = (id) => {
    const project = projects.find(p => p.id === id);
    setEditProjectId(id);
    setEditProject({ name: project.name, description: project.description, status: project.status, priority: project.priority });
  };

  const cancelEditing = () => {
    setEditProjectId(null);
    setEditProject({ name: '', description: '', status: 'Planning', priority: 'Medium' });
  };

  const isFormOpen = editProjectId !== null;
  const isAdding   = editProjectId === -1;

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Projects</h1>
          <p>Manage and track your projects</p>
        </div>
        {!isFormOpen && (
          <button
            id="add-project-btn"
            className="btn btn-primary"
            onClick={() => setEditProjectId(-1)}
          >
            ➕ Add Project
          </button>
        )}
      </div>

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="form-panel">
          <h2>
            {isAdding ? '➕ Add New Project' : '✏️ Edit Project'}
          </h2>
          <form onSubmit={isAdding ? addProject : saveProject}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="project-name">Project Name *</label>
                <input
                  id="project-name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Project name…"
                  value={isAdding ? newProject.name : editProject.name}
                  onChange={isAdding ? handleNewProjectChange : handleEditProjectChange}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-description">Description</label>
                <textarea
                  id="project-description"
                  name="description"
                  className="form-control"
                  placeholder="Optional description…"
                  rows="3"
                  value={isAdding ? newProject.description : editProject.description}
                  onChange={isAdding ? handleNewProjectChange : handleEditProjectChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-status">Status</label>
                <select
                  id="project-status"
                  name="status"
                  className="form-control"
                  value={isAdding ? newProject.status : editProject.status}
                  onChange={isAdding ? handleNewProjectChange : handleEditProjectChange}
                >
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="project-priority">Priority</label>
                <select
                  id="project-priority"
                  name="priority"
                  className="form-control"
                  value={isAdding ? newProject.priority : editProject.priority}
                  onChange={isAdding ? handleNewProjectChange : handleEditProjectChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isAdding ? '➕ Add Project' : '💾 Save Changes'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stat cards */}
      {totalProjects > 0 && (
        <div className="stats-grid stats-grid-3 mb-6">
          <div className="stat-card">
            <div className="stat-card-info">
              <h3>Total</h3>
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
      )}

      {/* Empty state */}
      {totalProjects === 0 && !isFormOpen && (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h2>No projects yet</h2>
          <p>Get started by adding your first project to organise your work and achieve your goals.</p>
          <button
            id="add-first-project-btn"
            className="btn btn-primary"
            onClick={() => setEditProjectId(-1)}
          >
            ➕ Add First Project
          </button>
        </div>
      )}

      {/* Project cards grid */}
      {totalProjects > 0 && (
        <div>
          <p className="section-title">📁 All Projects</p>
          <div className="projects-grid">
            {projects.map(project => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="project-card"
              >
                {/* Card header */}
                <div>
                  <p className="project-card-name">{project.name}</p>
                  {project.description && (
                    <p className="project-card-desc">{project.description}</p>
                  )}
                </div>

                {/* Badges + date */}
                <div className="project-card-meta">
                  <span className={statusBadgeClass(project.status)}>{project.status}</span>
                  <span className={priorityBadgeClass(project.priority)}>{project.priority}</span>
                  {project.createdAt && (
                    <span className="project-card-date">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="project-card-actions">
                  <button
                    id={`edit-project-${project.id}`}
                    className="btn btn-secondary btn-sm"
                    onClick={() => startEditing(project.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    id={`delete-project-${project.id}`}
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProject(project.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;