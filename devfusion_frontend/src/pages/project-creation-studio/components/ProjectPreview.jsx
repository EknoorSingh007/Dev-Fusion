import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectPreview = ({ formData, onEdit, onPublish, isPublishing, creator }) => {
  
  const getComplexityColor = (complexity) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors?.[complexity] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'web-app': 'Globe',
      'mobile-app': 'Smartphone',
      'ai-ml': 'Brain',
      'blockchain': 'Link',
      'iot': 'Wifi',
      'game-dev': 'Gamepad2',
      'data-science': 'BarChart3',
      'cybersecurity': 'Shield',
      'research': 'BookOpen',
      'other': 'Code'
    };
    return icons?.[type] || 'Code';
  };
  
  const formatTechnologies = (techArray) => {
    if (!techArray || techArray?.length === 0) return 'Not specified';
    return techArray?.slice(0, 3)?.join(', ') + (techArray?.length > 3 ? ` +${techArray?.length - 3} more` : '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Eye" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Project Preview</h3>
          <p className="text-sm text-gray-600">How your project will appear to potential collaborators</p>
        </div>
      </div>
      
      {/* Project Card Preview */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-brand p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getComplexityColor(formData?.complexity)}`}>
              <Icon name={getTypeIcon(formData?.type)} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{formData?.title || 'Untitled Project'}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(formData?.complexity)}`}>
                  {formData?.complexity || 'Not specified'}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-600">{formData?.duration || 'Duration not specified'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {formData?.isOpenForCollaboration &&
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Open for Collaboration
              </span>
            }
            {formData?.seekingMentorship &&
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Seeking Mentorship
              </span>
            }
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {formData?.description || 'No description provided yet. Add a compelling description to attract the right collaborators.'}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Technology Stack</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Frontend:</span>
              <p className="text-gray-800">{formatTechnologies(formData?.frontendTech)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Backend:</span>
              <p className="text-gray-800">{formatTechnologies(formData?.backendTech)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Database:</span>
              <p className="text-gray-800">{formatTechnologies(formData?.database)}</p>
            </div>
          </div>
        </div>

        {/* Team Requirements */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Team Requirements</h4>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-gray-500" />
              <span>{formData?.teamSize || 'Not specified'} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-gray-500" />
              <span>{formData?.timeCommitment || 'Not specified'}</span>
            </div>
            {formData?.crossInstitutional &&
            <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-gray-500" />
                <span>Cross-institutional</span>
              </div>
            }
          </div>
        </div>

        {/* Skills Needed */}
        {formData?.skillRequirements && formData?.skillRequirements?.length > 0 &&
        <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills Needed</h4>
            <div className="flex flex-wrap gap-2">
              {formData?.skillRequirements?.slice(0, 6)?.map((skill, index) =>
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
              skill?.required ?
              'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`
              }>

                  {skill?.skill} ({skill?.experience})
                  {skill?.required && ' *'}
                </span>
            )}
              {formData?.skillRequirements?.length > 6 &&
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{formData?.skillRequirements?.length - 6} more
                </span>
            }
            </div>
          </div>
        }

        {/* Collaboration Tools */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Collaboration Setup</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} className="text-gray-500" />
              <span>{formData?.communicationTool || 'Not specified'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Trello" size={16} className="text-gray-500" />
              <span>{formData?.projectManagementTool || 'Not specified'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-gray-500" />
              <span>{formData?.meetingFrequency || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Project Creator (NOW USES REAL DATA) */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Project Creator</h4>
          {creator ? (
            <div className="flex items-center space-x-4">
              <Image
                src={creator?.avatar || `https://ui-avatars.com/api/?name=${creator?.name}&background=4F46E5&color=fff`}
                alt={creator?.name || 'Creator Avatar'}
                className="w-12 h-12 rounded-full object-cover" />

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium text-gray-900">{creator?.name}</h5>
                </div>
                {/* 🟢 SYNTAX ERROR FIXED HERE */}
                <p className="text-sm text-gray-600">
                  {creator?.title || 'Student'} • {creator?.university || 'DevFusion Member'}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/student-profile-hub">View Profile</Link>
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading creator details...</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>0 views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={16} />
                <span>0 interested</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={16} />
                <span>0 applications</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Edit" onClick={() => onEdit(0)}>
                Edit Project
              </Button>
              <Button variant="default" iconName="Send" onClick={onPublish} loading={isPublishing}>
                Publish Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Publishing Tips */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Ready to Publish?</h4>
            <p className="text-sm text-gray-700 mt-1">
              Your project will be visible to students across all partner institutions. 
              Make sure your description is clear and your requirements are specific to attract the right collaborators.
            </p>
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>• Projects with detailed descriptions get 3x more applications</p>
              <p>• Clear skill requirements help you find the right team members</p>
              <p>• Setting up collaboration tools early improves team productivity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;

