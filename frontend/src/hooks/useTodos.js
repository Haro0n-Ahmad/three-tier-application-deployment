import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, high_priority: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ completed: '', priority: '', category: '', search: '' });

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
      const [todosRes, statsRes] = await Promise.all([
        todoService.getAll(params),
        todoService.getStats(),
      ]);
      setTodos(todosRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const createTodo = async (data) => {
    const res = await todoService.create(data);
    await fetchTodos();
    return res.data;
  };

  const updateTodo = async (id, data) => {
    const res = await todoService.update(id, data);
    await fetchTodos();
    return res.data;
  };

  const toggleTodo = async (id) => {
    await todoService.toggle(id);
    await fetchTodos();
  };

  const deleteTodo = async (id) => {
    await todoService.delete(id);
    await fetchTodos();
  };

  const deleteCompleted = async () => {
    await todoService.deleteCompleted();
    await fetchTodos();
  };

  return {
    todos, stats, loading, error, filters,
    setFilters, createTodo, updateTodo, toggleTodo, deleteTodo, deleteCompleted, refetch: fetchTodos,
  };
};
