import Task from '../models/Task.js';

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const getAllTasks = async (filters = {}) => {
  return await Task.find(filters)
    .populate('created_by', 'username email')
    .populate('assigned_to', 'username email');
};

export const getTaskById = async (id) => {
  return await Task.findById(id)
    .populate('created_by', 'username email')
    .populate('assigned_to', 'username email');
};

export const updateTask = async (id, taskData) => {
  // Add updated_at timestamp
  taskData.updated_at = Date.now();
  
  return await Task.findByIdAndUpdate(id, taskData, {
    new: true,
    runValidators: true
  }).populate('created_by', 'username email')
    .populate('assigned_to', 'username email');
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export const getTasksByUser = async (userId, role) => {
  const filter = role === 'creator' 
    ? { created_by: userId } 
    : { assigned_to: userId };
    
  return await Task.find(filter)
    .populate('created_by', 'username email')
    .populate('assigned_to', 'username email');
};