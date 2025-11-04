import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MilestoneTracker = ({ milestones, onMilestoneUpdate, onMilestoneCreate }) => {
  const [showCreateMilestone, setShowCreateMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical' }
  ];

  const getMilestoneStatus = (milestone) => {
    const now = new Date();
    const dueDate = new Date(milestone.dueDate);
    
    if (milestone?.completed) return 'completed';
    if (dueDate < now) return 'overdue';
    if (dueDate - now < 7 * 24 * 60 * 60 * 1000) return 'upcoming';
    return 'on-track';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'upcoming': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'on-track': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'overdue': return 'AlertCircle';
      case 'upcoming': return 'Clock';
      case 'on-track': return 'Target';
      default: return 'Circle';
    }
  };

  const handleCreateMilestone = () => {
    if (newMilestone?.title?.trim() && newMilestone?.dueDate) {
      onMilestoneCreate({
        ...newMilestone,
        id: Date.now(),
        completed: false,
        progress: 0,
        createdAt: new Date()?.toISOString()
      });
      setNewMilestone({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      });
      setShowCreateMilestone(false);
    }
  };

  const sortedMilestones = [...milestones]?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Milestone Tracker</h3>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          onClick={() => setShowCreateMilestone(true)}
        >
          Add Milestone
        </Button>
      </div>
      {/* Create Milestone Form */}
      {showCreateMilestone && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Create New Milestone</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Milestone Title"
              type="text"
              placeholder="Enter milestone title"
              value={newMilestone?.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e?.target?.value })}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={newMilestone?.dueDate}
              onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e?.target?.value })}
              required
            />
            <Select
              label="Priority"
              options={priorityOptions}
              value={newMilestone?.priority}
              onChange={(value) => setNewMilestone({ ...newMilestone, priority: value })}
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                type="text"
                placeholder="Milestone description (optional)"
                value={newMilestone?.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e?.target?.value })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="default"
              size="sm"
              onClick={handleCreateMilestone}
            >
              Create Milestone
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateMilestone(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Milestone Timeline */}
      <div className="space-y-4">
        {sortedMilestones?.map((milestone, index) => {
          const status = getMilestoneStatus(milestone);
          const isLast = index === sortedMilestones?.length - 1;
          
          return (
            <div key={milestone?.id} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getStatusColor(status)}`}>
                  <Icon name={getStatusIcon(status)} size={20} />
                </div>
                
                {/* Milestone Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">{milestone?.title}</h4>
                        {milestone?.description && (
                          <p className="text-sm text-gray-600 mb-2">{milestone?.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          milestone?.priority === 'critical' ? 'text-red-600 bg-red-50' :
                          milestone?.priority === 'high' ? 'text-orange-600 bg-orange-50' :
                          milestone?.priority === 'medium'? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'
                        }`}>
                          {milestone?.priority}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MoreHorizontal"
                          className="text-gray-500 hover:text-gray-700"
                        />
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{milestone?.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            milestone?.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${milestone?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Milestone Details */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Due: {new Date(milestone.dueDate)?.toLocaleDateString()}</span>
                        </div>
                        {milestone?.assignedTo && (
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={14} />
                            <span>{milestone?.assignedTo}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!milestone?.completed && (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="CheckCircle"
                            onClick={() => onMilestoneUpdate(milestone?.id, { completed: true, progress: 100 })}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Empty State */}
      {milestones?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h4>
          <p className="text-gray-500 mb-6">Create your first milestone to start tracking project progress.</p>
          <Button
            variant="default"
            iconName="Plus"
            onClick={() => setShowCreateMilestone(true)}
          >
            Create First Milestone
          </Button>
        </div>
      )}
      {/* Summary Stats */}
      {milestones?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {milestones?.filter(m => m?.completed)?.length}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {milestones?.filter(m => !m?.completed && getMilestoneStatus(m) === 'on-track')?.length}
              </div>
              <div className="text-xs text-gray-500">On Track</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                {milestones?.filter(m => getMilestoneStatus(m) === 'upcoming')?.length}
              </div>
              <div className="text-xs text-gray-500">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                {milestones?.filter(m => getMilestoneStatus(m) === 'overdue')?.length}
              </div>
              <div className="text-xs text-gray-500">Overdue</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneTracker;