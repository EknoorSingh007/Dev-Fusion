import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ProjectBasicsForm = ({ formData, updateFormData, errors }) => {
  const projectTypes = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ai-ml', label: 'AI/Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'Internet of Things' },
    { value: 'game-dev', label: 'Game Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'research', label: 'Research Project' },
    { value: 'other', label: 'Other' }
  ];

  const complexityLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Perfect for learning new skills' },
    { value: 'intermediate', label: 'Intermediate', description: 'Requires some experience' },
    { value: 'advanced', label: 'Advanced', description: 'For experienced developers' },
    { value: 'expert', label: 'Expert', description: 'Cutting-edge technology' }
  ];

  const durationOptions = [
    { value: '1-2-weeks', label: '1-2 weeks' },
    { value: '3-4-weeks', label: '3-4 weeks' },
    { value: '1-2-months', label: '1-2 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-months-plus', label: '6+ months' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Project Basics</h3>
          <p className="text-sm text-gray-600">Tell us about your project idea</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Input
            label="Project Title"
            type="text"
            placeholder="Enter a compelling project title"
            value={formData?.title}
            onChange={(e) => updateFormData('title', e?.target?.value)}
            error={errors?.title}
            required
            description="Make it descriptive and engaging"
          />
        </div>

        <Select
          label="Project Type"
          placeholder="Select project category"
          options={projectTypes}
          value={formData?.type}
          onChange={(value) => updateFormData('type', value)}
          error={errors?.type}
          required
          searchable
        />

        <Select
          label="Complexity Level"
          placeholder="Choose difficulty level"
          options={complexityLevels}
          value={formData?.complexity}
          onChange={(value) => updateFormData('complexity', value)}
          error={errors?.complexity}
          required
        />

        <Select
          label="Expected Duration"
          placeholder="How long will this take?"
          options={durationOptions}
          value={formData?.duration}
          onChange={(value) => updateFormData('duration', value)}
          error={errors?.duration}
          required
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Project Status</label>
          <div className="flex items-center space-x-6">
            <Checkbox
              label="Open for collaboration"
              checked={formData?.isOpenForCollaboration}
              onChange={(e) => updateFormData('isOpenForCollaboration', e?.target?.checked)}
            />
            <Checkbox
              label="Seeking mentorship"
              checked={formData?.seekingMentorship}
              onChange={(e) => updateFormData('seekingMentorship', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={6}
          placeholder="Describe your project in detail. What problem does it solve? What technologies will you use? What makes it unique?"
          value={formData?.description}
          onChange={(e) => updateFormData('description', e?.target?.value)}
        />
        {errors?.description && (
          <p className="mt-1 text-sm text-red-600">{errors?.description}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Minimum 100 characters. Be specific about goals, features, and expected outcomes.
        </p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Pro Tip</h4>
            <p className="text-sm text-blue-700 mt-1">
              Great project descriptions include the problem you're solving, your approach, and what collaborators will learn. 
              Be specific about technologies and mention any unique aspects that make your project stand out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBasicsForm;