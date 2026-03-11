import { useState } from 'react';

const CATEGORIES = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Learning'];

export default function TodoForm({ onSubmit, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    priority: initial.priority || 'medium',
    due_date: initial.due_date ? initial.due_date.slice(0, 10) : '',
    category: initial.category || 'General',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    setError('');
    try {
      await onSubmit(form);
      if (!initial.id) setForm({ title: '', description: '', priority: 'medium', due_date: '', category: 'General' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'var(--red)', fontSize: '0.85rem', marginBottom: 10 }}>{error}</div>}
      <div className="form-full">
        <div className="form-group">
          <label>Title *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="What needs to be done?" />
        </div>
      </div>
      <div className="form-full">
        <div className="form-group">
          <label>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Add details..." />
        </div>
      </div>
      <div className={`form-row three`}>
        <div className="form-group">
          <label>Priority</label>
          <select value={form.priority} onChange={e => set('priority', e.target.value)}>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" value={form.due_date} onChange={e => set('due_date', e.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? '...' : initial.id ? '✓ Save Changes' : '+ Add Todo'}
        </button>
        {onCancel && <button className="btn btn-danger" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
