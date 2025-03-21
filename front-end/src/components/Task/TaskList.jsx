import { useState, useEffect } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api';
import { TaskCard } from './';
import { TaskForm } from './';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterType, setFilterType] = useState('newest');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      console.log('Fetched tasks:', response.data);
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

  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    
    switch (filterType) {
      case 'todo':
        return filteredTasks.filter(task => task.status === 'todo');
      case 'inprogress':
        return filteredTasks.filter(task => task.status === 'inprogress');
      case 'review':
        return filteredTasks.filter(task => task.status === 'review');
      case 'done':
        return filteredTasks.filter(task => task.status === 'done');
      default:
        return filteredTasks;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Current Tasks</h2>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 hover:border-primary-500 transition-colors">
              <div className="px-3 py-2 border-r border-gray-300">
                <FiFilter className="h-5 w-5 text-gray-500" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-transparent px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none"
              >
                <option value="all" className="font-medium">All Tasks</option>
                <option value="todo" className="text-blue-600">To Do</option>
                <option value="inprogress" className="text-yellow-600">In Progress</option>
                <option value="review" className="text-purple-600">In Review</option>
                <option value="done" className="text-green-600">Done</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            New Task
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getFilteredTasks().map((task) => (
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