import React, { useState } from 'react';

/* ── Badge helpers ───────────────────────────────── */
const statusBadgeClass = (status) => {
  switch (status) {
    case 'To Do':       return 'badge badge-todo';
    case 'In Progress': return 'badge badge-inprogress';
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
const Tasks = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do', priority: 'Medium' });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', description: '', status: 'To Do', priority: 'Medium' });

  const totalTasks      = tasks.length;
  const todoTasks       = tasks.filter(t => t.status === 'To Do').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks  = tasks.filter(t => t.status === 'Completed').length;

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleEditTaskChange = (e) => {
    const { name, value } = e.target;
    setEditTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), ...newTask }]);
    setNewTask({ title: '', description: '', status: 'To Do', priority: 'Medium' });
    setEditTaskId(null);
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      const next = { 'To Do': 'In Progress', 'In Progress': 'Completed', 'Completed': 'To Do' };
      return { ...task, status: next[task.status] || 'To Do' };
    }));
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const startEditing = (id) => {
    const task = tasks.find(t => t.id === id);
    setEditTaskId(id);
    setEditTask({ title: task.title, description: task.description, status: task.status, priority: task.priority });
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (!editTask.title.trim()) return;
    setTasks(prev => prev.map(t => t.id === editTaskId ? { ...t, ...editTask } : t));
    setEditTaskId(null);
    setEditTask({ title: '', description: '', status: 'To Do', priority: 'Medium' });
  };

  const cancelEditing = () => {
    setEditTaskId(null);
    setEditTask({ title: '', description: '', status: 'To Do', priority: 'Medium' });
  };

  const isFormOpen = editTaskId !== null;
  const isAdding   = editTaskId === -1;

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Tasks</h1>
          <p>Manage and track your tasks</p>
        </div>
        {!isFormOpen && (
          <button
            id="add-task-btn"
            className="btn btn-primary"
            onClick={() => setEditTaskId(-1)}
          >
            ➕ Add Task
          </button>
        )}
      </div>

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="form-panel">
          <h2>
            {isAdding ? '➕ Add New Task' : '✏️ Edit Task'}
          </h2>
          <form onSubmit={isAdding ? addTask : saveTask}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="task-title">Title *</label>
                <input
                  id="task-title"
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Task title…"
                  value={isAdding ? newTask.title : editTask.title}
                  onChange={isAdding ? handleNewTaskChange : handleEditTaskChange}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                  id="task-description"
                  name="description"
                  className="form-control"
                  placeholder="Optional description…"
                  rows="3"
                  value={isAdding ? newTask.description : editTask.description}
                  onChange={isAdding ? handleNewTaskChange : handleEditTaskChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  name="status"
                  className="form-control"
                  value={isAdding ? newTask.status : editTask.status}
                  onChange={isAdding ? handleNewTaskChange : handleEditTaskChange}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  name="priority"
                  className="form-control"
                  value={isAdding ? newTask.priority : editTask.priority}
                  onChange={isAdding ? handleNewTaskChange : handleEditTaskChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isAdding ? '➕ Add Task' : '💾 Save Changes'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stat cards (only when tasks exist) */}
      {totalTasks > 0 && (
        <div className="stats-grid mb-6">
          <div className="stat-card">
            <div className="stat-card-info">
              <h3>Total</h3>
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
      )}

      {/* Empty state */}
      {totalTasks === 0 && !isFormOpen && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2>No tasks yet</h2>
          <p>Get started by adding your first task to stay organised and productive.</p>
          <button
            id="add-first-task-btn"
            className="btn btn-primary"
            onClick={() => setEditTaskId(-1)}
          >
            ➕ Add First Task
          </button>
        </div>
      )}

      {/* Task list */}
      {totalTasks > 0 && (
        <div>
          <p className="section-title">📋 All Tasks</p>
          <div className="list-container">
            {tasks.map(task => (
              <div
                key={task.id}
                id={`task-item-${task.id}`}
                className="list-item"
              >
                {/* Checkbox */}
                <div className="list-item-checkbox">
                  <input
                    type="checkbox"
                    id={`task-check-${task.id}`}
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                    title="Cycle task status"
                  />
                </div>

                {/* Body */}
                <div className="list-item-body">
                  <div className="list-item-header">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="list-item-title" style={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none', opacity: task.status === 'Completed' ? 0.6 : 1 }}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="list-item-desc">{task.description}</p>
                      )}
                    </div>
                    {/* Actions */}
                    <div className="list-item-actions">
                      <button
                        id={`edit-task-${task.id}`}
                        className="btn btn-secondary btn-sm"
                        onClick={() => startEditing(task.id)}
                        title="Edit task"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        id={`delete-task-${task.id}`}
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="list-item-meta">
                    <span className={statusBadgeClass(task.status)}>{task.status}</span>
                    <span className={priorityBadgeClass(task.priority)}>{task.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;