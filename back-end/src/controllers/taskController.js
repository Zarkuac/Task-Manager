import { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask,
  getTasksByUser
} from '../services/taskService.js';
import { validationResult } from 'express-validator';

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (but bypassed for testing)
export const createNewTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create task data with mock user as both creator and assignee
    const taskData = {
      ...req.body,
      created_by: req.user.id,
      assigned_to: req.user.id  // Automatically assign to the mock user
    };
    
    const task = await createTask(taskData);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private (but bypassed for testing)
export const getTasks = async (req, res, next) => {
  try {
    // For testing, just get all tasks
    const tasks = await getAllTasks();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private (but bypassed for testing)
export const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private (but bypassed for testing)
export const updateTaskById = async (req, res, next) => {
  try {
    let task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    // Skip authorization check for testing
    // In production, you would check if task.created_by.toString() === req.user.id

    task = await updateTask(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (but bypassed for testing)
export const deleteTaskById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    // Skip authorization check for testing
    // In production, you would check if task.created_by.toString() === req.user.id

    await deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};  