const { throwCustomError } = require('../errors/customErrorHandler');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Task = require('../models/Task');

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).send({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).send({ task });
});

const showTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(throwCustomError(`Task not exits with id "${taskId}"`, 404));
  }

  return res.status(201).send({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(throwCustomError(`Task not exits with id "${taskId}"`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(throwCustomError(`Task not exits with id "${taskId}"`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  createTask,
  showTask,
  updateTask,
  deleteTask,
};
