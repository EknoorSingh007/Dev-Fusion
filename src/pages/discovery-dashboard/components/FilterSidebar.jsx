import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '1-2weeks', label: '1-2 weeks' },
    { value: '1month', label: '1 month' },
    { value: '2-3months', label: '2-3 months' },
    { value: '6months+', label: '6+ months' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'recruiting', label: 'Recruiting' },
    { value: 'starting-soon', label: 'Starting Soon' },
    { value: 'active', label: 'Active' }
  ];

  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js']
    },
    {
      name: 'Design & UI/UX',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch']
    },
    {
      name: 'Data & Analytics',
      skills: ['Machine Learning', 'Data Science', 'SQL', 'Tableau', 'R']
    },
    {
      name: 'Mobile Development',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Kotlin']
    }
  ];

  const handleSkillToggle = (skill) => {
    const updatedSkills = filters?.skills?.includes(skill)
      ? filters?.skills?.filter(s => s !== skill)
      : [...filters?.skills, skill];
    
    onFiltersChange({ ...filters, skills: updatedSkills });
  };

  const handleInputChange = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500"
        />
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto h-full">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search projects..."
              value={filters?.search}
              onChange={(e) => handleInputChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <Checkbox
                label="Available to join"
                checked={filters?.availableToJoin}
                onChange={(e) => handleInputChange('availableToJoin', e?.target?.checked)}
              />
              <Checkbox
                label="Remote friendly"
                checked={filters?.remoteFriendly}
                onChange={(e) => handleInputChange('remoteFriendly', e?.target?.checked)}
              />
              <Checkbox
                label="Inter-college projects"
                checked={filters?.interCollege}
                onChange={(e) => handleInputChange('interCollege', e?.target?.checked)}
              />
              <Checkbox
                label="Beginner friendly"
                checked={filters?.beginnerFriendly}
                onChange={(e) => handleInputChange('beginnerFriendly', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={filters?.difficulty}
              onChange={(value) => handleInputChange('difficulty', value)}
            />
          </div>

          {/* Duration */}
          <div>
            <Select
              label="Project Duration"
              options={durationOptions}
              value={filters?.duration}
              onChange={(value) => handleInputChange('duration', value)}
            />
          </div>

          {/* Status */}
          <div>
            <Select
              label="Project Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleInputChange('status', value)}
            />
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="space-y-4">
              {skillCategories?.map((category) => (
                <div key={category?.name}>
                  <h4 className="text-xs font-medium text-gray-700 mb-2">{category?.name}</h4>
                  <div className="space-y-2">
                    {category?.skills?.map((skill) => (
                      <Checkbox
                        key={skill}
                        label={skill}
                        checked={filters?.skills?.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Size */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Team Size</h3>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters?.minTeamSize}
                onChange={(e) => handleInputChange('minTeamSize', e?.target?.value)}
                className="flex-1"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters?.maxTeamSize}
                onChange={(e) => handleInputChange('maxTeamSize', e?.target?.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onClearFilters}
              fullWidth
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;