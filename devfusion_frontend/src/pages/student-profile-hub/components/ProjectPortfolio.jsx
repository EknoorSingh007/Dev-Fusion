import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
// 🟢 Removed 'Image' import
import Button from '../../../components/ui/Button';

const ProjectPortfolio = ({ projects, onViewProject, onAddProject }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filters = [
    { id: 'all', name: 'All Projects', count: projects?.length },
    { id: 'completed', name: 'Completed', count: projects?.filter(p => p?.status === 'completed')?.length },
    { id: 'ongoing', name: 'Ongoing', count: projects?.filter(p => p?.status === 'ongoing')?.length },
    { id: 'featured', name: 'Featured', count: projects?.filter(p => p?.featured)?.length }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : selectedFilter === 'featured'
    ? projects?.filter(p => p?.featured)
    : projects?.filter(p => p?.status === selectedFilter);

  // (This function is no longer needed since the status badge was on the image)
  // const getStatusColor = (status) => { ... };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Lead': return 'text-primary bg-primary/10';
      case 'Co-Lead': return 'text-secondary bg-secondary/10';
      case 'Contributor': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        {/* (Header and Filter/View buttons are unchanged) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Project Portfolio</h2>
            <p className="text-gray-600">
              Showcase your collaborative projects and contributions
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddProject}
            >
              Add Project
            </Button>
          </div>
        </div>

        {/* Filter Tabs (Unchanged) */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setSelectedFilter(filter?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter?.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filter?.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter?.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredProjects?.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" :"space-y-4"
          }>
            {filteredProjects?.map((project) => (
              <div
                key={project?.id}
                className={`group border border-gray-200 rounded-lg overflow-hidden hover:shadow-brand-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* 🟢 Project Image Block REMOVED 🟢 */}
                
                {/* Project Content */}
                <div className="p-4 flex-1 w-full"> {/* 🟢 Added w-full */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {project?.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(project?.role)}`}>
                      {project?.role || 'Contributor'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project?.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project?.technologies?.slice(0, 3)?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project?.technologies?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{project?.technologies?.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{project?.teamSize}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{project?.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} />
                      <span>{project?.rating || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {/* 🟢 Replaced <img> with placeholder <div> */}
                      {project?.teamMembers?.slice(0, 3)?.map((member, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center"
                          title={member?.name}
                        >
                          <Icon name="User" size={12} className="text-gray-500" />
                        </div>
                      ))}
                      {project?.teamMembers?.length > 3 && (
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{project?.teamMembers?.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => onViewProject(project?.id)}
                      className="text-primary hover:text-primary/80"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="FolderOpen" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {selectedFilter === 'all' 
                ? "Start building your portfolio by adding your first project"
                : `No ${selectedFilter} projects found`
              }
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddProject}
            >
              Add Your First Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPortfolio;