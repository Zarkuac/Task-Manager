import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'review', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  due_date: {
    type: Date,
    default: () => new Date(+new Date() + 7*24*60*60*1000) // Default to 7 days from now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assigned_to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Task', TaskSchema);