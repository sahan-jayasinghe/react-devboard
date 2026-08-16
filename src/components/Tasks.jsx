import React, { useState } from 'react';

const Tasks = () => {
  // State for tasks
  const [tasks, setTasks] = useState([
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
  ]);

  // State for adding new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium'
  });

  // State for editing task
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium'
  });

  // Calculate summary counts
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;

  // Handle input changes for new task
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for editing task
  const handleEditTaskChange = (e) => {
    const { name, value } = e.target;
    setEditTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;

    const task = {
      id: Date.now(), // Simple ID generation
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority
    };

    setTasks(prev => [...prev, task]);
    // Reset form
    setNewTask({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium'
    });
  };

  // Toggle task status
  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === 'Completed' ? 'To Do' : 'Completed'
        };
      }
      return task;
    }));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Start editing task
  const startEditing = (id) => {
    const task = tasks.find(t => t.id === id);
    setEditTaskId(id);
    setEditTask({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority
    });
  };

  // Save edited task
  const saveTask = (e) => {
    e.preventDefault();
    if (editTask.title.trim() === '') return;

    setTasks(prev => prev.map(task => {
      if (task.id === editTaskId) {
        return {
          ...task,
          title: editTask.title,
          description: editTask.description,
          status: editTask.status,
          priority: editTask.priority
        };
      }
      return task;
    }));

    // Reset edit state
    setEditTaskId(null);
    setEditTask({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium'
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditTaskId(null);
    setEditTask({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium'
    });
  };

  return (
    <div className="tasks-page">
      {/* Page Header */}
      <header className="tasks-header">
        <div className="header-content">
          <h1>Tasks</h1>
          <p className="header-description">Manage and track your tasks.</p>
        </div>
        <button className="add-task-btn" onClick={() => setEditTaskId(-1)}>Add Task</button>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="card">
          <h3>Total Tasks</h3>
          <p className="card-value">{totalTasks}</p>
        </div>
        <div className="card">
          <h3>In Progress</h3>
          <p className="card-value">{inProgressTasks}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p className="card-value">{completedTasks}</p>
        </div>
      </section>

      {/* Add/Edit Task Form */}
      {editTaskId !== null && (
        <div className="task-form">
          <h3>{editTaskId === -1 ? 'Add New Task' : 'Edit Task'}</h3>
          <form onSubmit={editTaskId === -1 ? addTask : saveTask} className="task-form-content">
            <div className="form-group">
              <label htmlFor="task-title">Title:</label>
              <input
                type="text"
                id="task-title"
                name="title"
                value={editTaskId === -1 ? newTask.title : editTask.title}
                onChange={editTaskId === -1 ? handleNewTaskChange : handleEditTaskChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-description">Description:</label>
              <textarea
                id="task-description"
                name="description"
                value={editTaskId === -1 ? newTask.description : editTask.description}
                onChange={editTaskId === -1 ? handleNewTaskChange : handleEditTaskChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-status">Status:</label>
              <select
                id="task-status"
                name="status"
                value={editTaskId === -1 ? newTask.status : editTask.status}
                onChange={editTaskId === -1 ? handleNewTaskChange : handleEditTaskChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="task-priority">Priority:</label>
              <select
                id="task-priority"
                name="priority"
                value={editTaskId === -1 ? newTask.priority : editTask.priority}
                onChange={editTaskId === -1 ? handleNewTaskChange : handleEditTaskChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editTaskId === -1 ? 'Add Task' : 'Save Task'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task List */}
      <section className="task-list">
        <h2>Task List</h2>
        <ul className="tasks-ul">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-content">
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                </div>
                <div className="task-details">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span className={`status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                    <span className={`priority priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => startEditing(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => deleteTask(task.id)}
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

export default Tasks;