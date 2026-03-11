const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getStats,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
} = require('../controllers/todoController');

router.get('/stats', getStats);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/completed', deleteCompleted);
router.delete('/:id', deleteTodo);

module.exports = router;
