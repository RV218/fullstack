import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (newTask.title.trim() === '') {
      alert('Task title cannot be empty, Please Enter Title!');
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const updateStatus = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div className="app">
      <header>
        <h1>Task Management</h1>
      </header>
      <main>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button type="button" onClick={addTask}>Add Task</button>
        </form>

        <label htmlFor="filter">Filter by Status:</label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <span>{task.title} - {task.description}</span>
              <select
                value={task.status}
                onChange={(e) => updateStatus(index, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
