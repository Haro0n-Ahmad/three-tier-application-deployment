import { useState } from 'react';
import TodoForm from './TodoForm';

export default function TodoCard({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(todo.id); } catch { setDeleting(false); }
  };

  const handleUpdate = async (data) => {
    await onUpdate(todo.id, data);
    setEditing(false);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <button
        className={`todo-check ${todo.completed ? 'done' : ''}`}
        onClick={() => onToggle(todo.id)}
        title="Toggle complete"
      />
      <div className="todo-body">
        <div className="todo-title">{todo.title}</div>
        {todo.description && <div className="todo-desc">{todo.description}</div>}
        <div className="todo-meta">
          <span className={`badge badge-${todo.priority}`}>{todo.priority}</span>
          {todo.category && <span className="badge badge-cat">{todo.category}</span>}
          {todo.due_date && <span className="badge-date">📅 {formatDate(todo.due_date)}</span>}
        </div>
        {editing && (
          <div className="edit-form">
            <TodoForm initial={todo} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
          </div>
        )}
      </div>
      {!editing && (
        <div className="todo-actions">
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">✏️</button>
          <button className="icon-btn del" onClick={handleDelete} disabled={deleting} title="Delete">
            {deleting ? '…' : '🗑️'}
          </button>
        </div>
      )}
    </div>
  );
}
