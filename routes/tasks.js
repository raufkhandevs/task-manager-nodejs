const express = require('express');
const {
  getTasks,
  createTask,
  showTask,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController');

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(showTask).patch(updateTask).delete(deleteTask);

module.exports = router;
