import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onBookmark, isBookmarked }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success';
      case 'Intermediate': return 'bg-warning/10 text-warning';
      case 'Advanced': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Starting Soon': return 'bg-primary text-white';
      case 'Recruiting': return 'bg-warning text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-brand-lg group">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-xl h-48">
        <Image
          src={project?.image}
          alt={project?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
            {project?.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project?.difficulty)}`}>
            {project?.difficulty}
          </span>
        </div>
        <button
          onClick={() => onBookmark(project?.id)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? "text-primary" : "text-gray-600"} 
          />
        </button>
      </div>
      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {project?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              by <span className="font-medium text-primary">{project?.creator}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {project?.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.skills?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
            >
              {skill}
            </span>
          ))}
          {project?.skills?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
              +{project?.skills?.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{project?.teamSize} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{project?.duration}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="font-medium">{project?.rating}</span>
          </div>
        </div>

        {/* Institution & Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={12} className="text-white" />
            </div>
            <span className="text-xs text-gray-600">{project?.institution}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Progress</div>
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                style={{ width: `${project?.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            className="flex-1"
          >
            Join Project
          </Button>
          <Link to={`/project/${project?.id}`}>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
            />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;