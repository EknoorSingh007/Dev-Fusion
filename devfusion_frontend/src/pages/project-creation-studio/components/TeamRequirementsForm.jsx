import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeamRequirementsForm = ({ formData, updateFormData, errors }) => {
  const skillCategories = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'ai-ml', label: 'AI/Machine Learning' },
    { value: 'devops', label: 'DevOps' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'game-dev', label: 'Game Development' },
    { value: 'project-management', label: 'Project Management' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business-analysis', label: 'Business Analysis' }
  ];

  const experienceLevels = [
    { value: 'any', label: 'Any Level' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const commitmentLevels = [
    { value: 'casual', label: 'Casual (5-10 hrs/week)' },
    { value: 'moderate', label: 'Moderate (10-20 hrs/week)' },
    { value: 'intensive', label: 'Intensive (20+ hrs/week)' }
  ];

  const addSkillRequirement = () => {
    const newRequirement = {
      id: Date.now(),
      skill: '',
      experience: 'any',
      required: true,
      description: ''
    };
    updateFormData('skillRequirements', [...formData?.skillRequirements, newRequirement]);
  };

  const updateSkillRequirement = (id, field, value) => {
    const updated = formData?.skillRequirements?.map(req =>
      req?.id === id ? { ...req, [field]: value } : req
    );
    updateFormData('skillRequirements', updated);
  };

  const removeSkillRequirement = (id) => {
    const filtered = formData?.skillRequirements?.filter(req => req?.id !== id);
    updateFormData('skillRequirements', filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Team Requirements</h3>
          <p className="text-sm text-gray-600">Define your ideal team composition</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Input
          label="Team Size"
          type="number"
          placeholder="3"
          value={formData?.teamSize}
          onChange={(e) => updateFormData('teamSize', e?.target?.value)}
          error={errors?.teamSize}
          required
          min="2"
          max="10"
          description="Including yourself"
        />

        <Select
          label="Time Commitment"
          placeholder="Select commitment level"
          options={commitmentLevels}
          value={formData?.timeCommitment}
          onChange={(value) => updateFormData('timeCommitment', value)}
          error={errors?.timeCommitment}
          required
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Team Preferences</label>
          <div className="space-y-2">
            <Checkbox
              label="Cross-institutional team"
              checked={formData?.crossInstitutional}
              onChange={(e) => updateFormData('crossInstitutional', e?.target?.checked)}
              description="Include students from other colleges"
            />
            <Checkbox
              label="Remote collaboration"
              checked={formData?.remoteCollaboration}
              onChange={(e) => updateFormData('remoteCollaboration', e?.target?.checked)}
              description="Team can work remotely"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-gray-900">Skill Requirements</h4>
            <p className="text-sm text-gray-600">Specify the skills you need for your team</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={addSkillRequirement}
          >
            Add Skill
          </Button>
        </div>

        <div className="space-y-4">
          {formData?.skillRequirements?.map((requirement, index) => (
            <div key={requirement?.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <Select
                  label="Skill Category"
                  placeholder="Select skill"
                  options={skillCategories}
                  value={requirement?.skill}
                  onChange={(value) => updateSkillRequirement(requirement?.id, 'skill', value)}
                  searchable
                />

                <Select
                  label="Experience Level"
                  placeholder="Select level"
                  options={experienceLevels}
                  value={requirement?.experience}
                  onChange={(value) => updateSkillRequirement(requirement?.id, 'experience', value)}
                />

                <div className="flex flex-col justify-end">
                  <Checkbox
                    label="Required skill"
                    checked={requirement?.required}
                    onChange={(e) => updateSkillRequirement(requirement?.id, 'required', e?.target?.checked)}
                    description="Must-have vs nice-to-have"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeSkillRequirement(requirement?.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Input
                  label="Role Description"
                  type="text"
                  placeholder="Describe what this team member will do..."
                  value={requirement?.description}
                  onChange={(e) => updateSkillRequirement(requirement?.id, 'description', e?.target?.value)}
                  description="Optional: Explain the specific responsibilities"
                />
              </div>
            </div>
          ))}

          {formData?.skillRequirements?.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Icon name="UserPlus" size={48} className="text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No skill requirements added</h4>
              <p className="text-gray-600 mb-4">Add the skills you need for your project team</p>
              <Button
                variant="outline"
                iconName="Plus"
                onClick={addSkillRequirement}
              >
                Add First Skill Requirement
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Users" size={20} className="text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Team Building Tip</h4>
            <p className="text-sm text-green-700 mt-1">
              Diverse teams with complementary skills often produce the most innovative solutions. 
              Consider including both technical and non-technical roles like design, project management, or marketing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRequirementsForm;