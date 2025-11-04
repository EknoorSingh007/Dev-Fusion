import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProjectOverview = ({ project, onEditProject }) => {
  const progressPercentage = (project?.completedTasks / project?.totalTasks) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Code" size={24} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{project?.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{project?.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>Due: {project?.dueDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{project?.teamSize} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="GitBranch" size={16} />
                <span>{project?.repository}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          onClick={onEditProject}
          className="flex-shrink-0"
        >
          Settings
        </Button>
      </div>
      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Project Progress</span>
          <span className="text-sm text-gray-500">{project?.completedTasks}/{project?.totalTasks} tasks</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% complete</div>
      </div>
      {/* Team Members */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Team Members</h3>
        <div className="flex items-center space-x-3">
          {project?.teamMembers?.map((member, index) => (
            <div key={member?.id} className="flex items-center space-x-2 group">
              <div className="relative">
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  member?.isOnline ? 'bg-success' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="hidden group-hover:block absolute bg-gray-900 text-white text-xs px-2 py-1 rounded mt-8 whitespace-nowrap z-10">
                {member?.name} - {member?.role}
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-primary hover:text-primary"
          />
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{project?.stats?.commits}</div>
          <div className="text-xs text-gray-500">Commits</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{project?.stats?.pullRequests}</div>
          <div className="text-xs text-gray-500">Pull Requests</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{project?.stats?.issues}</div>
          <div className="text-xs text-gray-500">Issues</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{project?.stats?.discussions}</div>
          <div className="text-xs text-gray-500">Discussions</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;