import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const TaskManagement = ({ tasks, onTaskUpdate, onTaskCreate }) => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    dueDate: ''
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'done', label: 'Done' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'review': return 'text-purple-600 bg-purple-50';
      case 'todo': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleCreateTask = () => {
    if (newTask?.title?.trim()) {
      onTaskCreate({
        ...newTask,
        id: Date.now(),
        status: 'todo',
        createdAt: new Date()?.toISOString()
      });
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        priority: 'medium',
        dueDate: ''
      });
      setShowCreateTask(false);
    }
  };

  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc?.[task?.status]) {
      acc[task.status] = [];
    }
    acc?.[task?.status]?.push(task);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          onClick={() => setShowCreateTask(true)}
        >
          Add Task
        </Button>
      </div>
      {/* Create Task Form */}
      {showCreateTask && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Create New Task</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Task Title"
              type="text"
              placeholder="Enter task title"
              value={newTask?.title}
              onChange={(e) => setNewTask({ ...newTask, title: e?.target?.value })}
              required
            />
            <Select
              label="Priority"
              options={priorityOptions}
              value={newTask?.priority}
              onChange={(value) => setNewTask({ ...newTask, priority: value })}
            />
            <Input
              label="Due Date"
              type="date"
              value={newTask?.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e?.target?.value })}
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                type="text"
                placeholder="Task description (optional)"
                value={newTask?.description}
                onChange={(e) => setNewTask({ ...newTask, description: e?.target?.value })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="default"
              size="sm"
              onClick={handleCreateTask}
            >
              Create Task
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateTask(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Task Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions?.map((status) => (
          <div key={status?.value} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">{status?.label}</h4>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                {groupedTasks?.[status?.value]?.length || 0}
              </span>
            </div>
            
            <div className="space-y-3">
              {groupedTasks?.[status?.value]?.map((task) => (
                <div key={task?.id} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-sm font-medium text-gray-900 line-clamp-2">{task?.title}</h5>
                    <div className="flex items-center space-x-1 ml-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task?.priority)}`}>
                        {task?.priority}
                      </span>
                    </div>
                  </div>
                  
                  {task?.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task?.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {task?.assignee && (
                        <Image
                          src={task?.assignee?.avatar}
                          alt={task?.assignee?.avatarAlt}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      {task?.dueDate && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Icon name="Calendar" size={12} />
                          <span>{new Date(task.dueDate)?.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {task?.comments > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Icon name="MessageSquare" size={12} />
                          <span>{task?.comments}</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        className="w-6 h-6 p-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;