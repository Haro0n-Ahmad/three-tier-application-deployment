const Todo = require('../models/Todo');

// GET /api/todos
const getAllTodos = async (req, res) => {
  try {
    const { completed, priority, category, search } = req.query;
    const todos = await Todo.findAll({ completed, priority, category, search });
    res.json({ success: true, data: todos, count: todos.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch todos', error: error.message });
  }
};

// GET /api/todos/stats
const getStats = async (req, res) => {
  try {
    const stats = await Todo.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: error.message });
  }
};

// GET /api/todos/:id
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch todo', error: error.message });
  }
};

// POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title, description, priority, due_date, category } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const todo = await Todo.create({ title: title.trim(), description, priority, due_date, category });
    res.status(201).json({ success: true, data: todo, message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create todo', error: error.message });
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });

    const updated = await Todo.update(req.params.id, req.body);
    res.json({ success: true, data: updated, message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update todo', error: error.message });
  }
};

// PATCH /api/todos/:id/toggle
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });

    const updated = await Todo.update(req.params.id, { completed: !todo.completed });
    res.json({ success: true, data: updated, message: 'Todo toggled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to toggle todo', error: error.message });
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.delete(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete todo', error: error.message });
  }
};

// DELETE /api/todos/completed
const deleteCompleted = async (req, res) => {
  try {
    const count = await Todo.deleteCompleted();
    res.json({ success: true, message: `${count} completed todo(s) deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete completed todos', error: error.message });
  }
};

module.exports = { getAllTodos, getStats, getTodoById, createTodo, updateTodo, toggleTodo, deleteTodo, deleteCompleted };
