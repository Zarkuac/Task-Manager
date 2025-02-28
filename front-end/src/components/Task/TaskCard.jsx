import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  review: 'bg-purple-100 text-purple-800',
  done: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-400 hover:text-red-500"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="flex flex-wrap gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Due: {new Date(task.due_date).toLocaleDateString()}
      </div>
    </div>
  );
}