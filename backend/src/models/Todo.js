const { pool } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Todo {
  static async findAll({ completed, priority, category, search } = {}) {
    let query = 'SELECT * FROM todos WHERE 1=1';
    const params = [];
    if (completed !== undefined) { query += ' AND completed = ?'; params.push(completed === 'true' ? 1 : 0); }
    if (priority) { query += ' AND priority = ?'; params.push(priority); }
    if (category) { query += ' AND category = ?'; params.push(category); }
    if (search) { query += ' AND (title LIKE ? OR description LIKE ?)'; params.push('%'+search+'%', '%'+search+'%'); }
    query += ' ORDER BY created_at DESC';
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create({ title, description, priority, due_date, category }) {
    const id = uuidv4();
    await pool.execute('INSERT INTO todos (id, title, description, priority, due_date, category) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title, description || null, priority || 'medium', due_date || null, category || 'General']);
    return this.findById(id);
  }

  static async update(id, { title, description, completed, priority, due_date, category }) {
    const fields = [], params = [];
    if (title !== undefined) { fields.push('title = ?'); params.push(title); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description); }
    if (completed !== undefined) { fields.push('completed = ?'); params.push(completed ? 1 : 0); }
    if (priority !== undefined) { fields.push('priority = ?'); params.push(priority); }
    if (due_date !== undefined) { fields.push('due_date = ?'); params.push(due_date); }
    if (category !== undefined) { fields.push('category = ?'); params.push(category); }
    if (fields.length === 0) return this.findById(id);
    params.push(id);
    await pool.execute('UPDATE todos SET ' + fields.join(', ') + ' WHERE id = ?', params);
    return this.findById(id);
  }

  static async delete(id) {
    const todo = await this.findById(id);
    if (!todo) return null;
    await pool.execute('DELETE FROM todos WHERE id = ?', [id]);
    return todo;
  }

  static async deleteCompleted() {
    const [result] = await pool.execute('DELETE FROM todos WHERE completed = 1');
    return result.affectedRows;
  }

  static async getStats() {
    const [rows] = await pool.execute("SELECT COUNT(*) as total, SUM(completed = 1) as completed, SUM(completed = 0) as pending, SUM(CASE WHEN priority = 'high' AND completed = 0 THEN 1 ELSE 0 END) as urgent FROM todos");
    return rows[0];
  }
}

module.exports = Todo;