import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api';
import { TaskCard } from './';
import { TaskForm } from './';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      fetchTasks();
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      fetchTasks();
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchTasks();
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
        >
          <FiPlus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(task) => {
              setEditingTask(task);
              setIsFormOpen(true);
            }}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialData={editingTask}
      />
    </div>
  );
}