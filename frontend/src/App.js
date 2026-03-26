import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import StatsBar from './components/StatsBar';
import TodoForm from './components/TodoForm';
import TodoCard from './components/TodoCard';
import './styles/App.css';

export default function App() {
  const {
    todos, stats, loading, error,
    filters, setFilters,
    createTodo, updateTodo, toggleTodo, deleteTodo, deleteCompleted,
    refetch,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    await createTodo(data);
    setShowForm(false);
  };

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>✦ TaskFlow</h1>
        <p>Stay organized. Stay productive.</p>
      </div>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Error */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button className="btn btn-sm btn-danger" onClick={refetch}>Retry</button>
        </div>
      )}

      {/* Add Form */}
      <div className="form-card">
        <h2>{showForm ? '✦ New Task' : ''}</h2>
        {!showForm ? (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add New Task</button>
        ) : (
          <TodoForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="search-input"
          placeholder="🔍 Search todos..."
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
        />
        <select value={filters.completed} onChange={e => setFilter('completed', e.target.value)}>
          <option value="">All Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
        <select value={filters.priority} onChange={e => setFilter('priority', e.target.value)}>
          <option value="">All Priority</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <select value={filters.category} onChange={e => setFilter('category', e.target.value)}>
          <option value="">All Categories</option>
          {['General','Work','Personal','Shopping','Health','Finance','Learning'].map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="list-header">
        <h2>{todos.length} task{todos.length !== 1 ? 's' : ''}</h2>
        {stats.completed > 0 && (
          <button className="btn btn-danger btn-sm" onClick={deleteCompleted}>
            🗑️ Clear Completed
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          Loading tasks...
        </div>
      ) : todos.length === 0 ? (
        <div className="empty">
          <div className="emoji">📭</div>
          <p>No tasks found. Add one above!</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
