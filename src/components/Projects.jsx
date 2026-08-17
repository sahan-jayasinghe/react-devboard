import React, { useState } from 'react';

const Projects = ({ projects, setProjects }) => {
  // State for adding new project
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium'
  });

  // State for editing project
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium'
  });

  // Calculate summary counts
  const totalProjects = projects.length;
  const activeProjects = projects.filter(project => project.status === 'Active').length;
  const completedProjects = projects.filter(project => project.status === 'Completed').length;

  // Handle input changes for new project
  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for editing project
  const handleEditProjectChange = (e) => {
    const { name, value } = e.target;
    setEditProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new project
  const addProject = (e) => {
    e.preventDefault();
    if (newProject.name.trim() === '') return;

    const project = {
      id: Date.now(), // Simple ID generation
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      priority: newProject.priority,
      createdAt: Date.now()
    };

    setProjects(prev => [...prev, project]);
    // Reset form
    setNewProject({
      name: '',
      description: '',
      status: 'Planning',
      priority: 'Medium'
    });
  };

  // Save edited project
  const saveProject = (e) => {
    e.preventDefault();
    if (editProject.name.trim() === '') return;

    setProjects(prev => prev.map(project => {
      if (project.id === editProjectId) {
        return {
          ...project,
          name: editProject.name,
          description: editProject.description,
          status: editProject.status,
          priority: editProject.priority
          // createdAt remains unchanged
        };
      }
      return project;
    }));

    // Reset edit state
    setEditProjectId(null);
    setEditProject({
      name: '',
      description: '',
      status: 'Planning',
      priority: 'Medium'
    });
  };

  // Delete project
  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Start editing project
  const startEditing = (id) => {
    const project = projects.find(p => p.id === id);
    setEditProjectId(id);
    setEditProject({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditProjectId(null);
    setEditProject({
      name: '',
      description: '',
      status: 'Planning',
      priority: 'Medium'
    });
  };

  return (
    <div className="tasks-page">
      {/* Page Header */}
      <header className="tasks-header">
        <div className="header-content">
          <h1>Projects</h1>
          <p className="header-description">Manage and track your projects.</p>
        </div>
        <button className="add-task-btn" onClick={() => setEditProjectId(-1)}>Add Project</button>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">
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
          <p className="card-value">{completedProjects}</p>
        </div>
      </section>

      {/* Add/Edit Project Form */}
      {editProjectId !== null && (
        <div className="task-form">
          <h3>{editProjectId === -1 ? 'Add New Project' : 'Edit Project'}</h3>
          <form onSubmit={editProjectId === -1 ? addProject : saveProject} className="task-form-content">
            <div className="form-group">
              <label htmlFor="project-name">Project Name:</label>
              <input
                type="text"
                id="project-name"
                name="name"
                value={editProjectId === -1 ? newProject.name : editProject.name}
                onChange={editProjectId === -1 ? handleNewProjectChange : handleEditProjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="project-description">Description:</label>
              <textarea
                id="project-description"
                name="description"
                value={editProjectId === -1 ? newProject.description : editProject.description}
                onChange={editProjectId === -1 ? handleNewProjectChange : handleEditProjectChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="project-status">Status:</label>
              <select
                id="project-status"
                name="status"
                value={editProjectId === -1 ? newProject.status : editProject.status}
                onChange={editProjectId === -1 ? handleNewProjectChange : handleEditProjectChange}
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="project-priority">Priority:</label>
              <select
                id="project-priority"
                name="priority"
                value={editProjectId === -1 ? newProject.priority : editProject.priority}
                onChange={editProjectId === -1 ? handleNewProjectChange : handleEditProjectChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editProjectId === -1 ? 'Add Project' : 'Save Project'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Project List */}
      <section className="task-list">
        <h2>Project List</h2>
        <ul className="tasks-ul">
          {projects.map(project => (
            <li key={project.id} className="task-item">
              <div className="task-content">
                <div className="task-details">
                  <h3 className="task-title">{project.name}</h3>
                  <p className="task-description">{project.description}</p>
                  <div className="task-meta">
                    <span className={`status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                    <span className={`priority priority-${project.priority.toLowerCase()}`}>
                      {project.priority}
                    </span>
                    <span className="created-date">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => startEditing(project.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Projects;