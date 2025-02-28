import express from 'express';
import {
  getTasks,
  getTask,
  createNewTask,
  updateTaskById,
  deleteTaskById
} from '../controllers/taskController.js';
import { mockProtect } from '../middleware/mockAuth.js';
import { check } from 'express-validator';

const router = express.Router();

router.route('/')
  .get(mockProtect, getTasks)
  .post(
    mockProtect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      // Removed assigned_to validation since we'll set it automatically
    ],
    createNewTask
  );

router.route('/:id')
  .get(mockProtect, getTask)
  .put(mockProtect, updateTaskById)
  .delete(mockProtect, deleteTaskById);

export default router;  