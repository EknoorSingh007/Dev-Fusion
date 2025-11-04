import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// 🟢 This component now receives the REAL project object from your backend
const ProjectOverview = ({ project, onEditProject }) => {
  const {
    title,
    description,
    teamMembers,
  } = project;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-brand border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 max-w-2xl">{description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={onEditProject}
            className="mt-4 sm:mt-0"
          >
            Edit Project
          </Button>
        </div>

        {/* 🟢 REMOVED Progress Bar (we don't have this data from the backend yet) */}
      </div>

      {/* 🟢 REMOVED Stats Panel (we don't have this data yet) */}

      {/* Team Members */}
      {/* 🟢 Updated to span the full width and use real teamMembers data */}
      <div className="bg-white rounded-xl shadow-brand border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
        <div className="space-y-4">
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=4F46E5&color=fff`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* 🟢 Removed 'isOnline' status for now
                    {member.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></span>
                    )} 
                    */}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MessageSquare">
                  Message
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No team members listed for this project yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;