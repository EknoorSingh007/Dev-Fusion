import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TaskManagement = ({ tasks, onTaskUpdate, onTaskCreate }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'medium': return 'text-blue-700 bg-blue-100';
      case 'low': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };
  
  const getStatusClasses = (status) => {
    switch (status) {
      case 'done': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'review': return 'text-accent';
      case 'todo': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Task Board</h2>
          <Button size="sm" iconName="Plus" onClick={onTaskCreate}>
            New Task
          </Button>
        </div>
        <div className="flex space-x-2">
          {['all', 'todo', 'in-progress', 'review', 'done'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClasses(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`text-sm font-medium capitalize ${getStatusClasses(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {task.assignee && (
                    <Image
                      src={task.assignee.avatar}
                      alt={task.assignee.avatarAlt}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Icon name="MessageSquare" size={14} />
                  <span>{task.comments}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No tasks in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;