import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillMatrix = ({ skills, onEndorseSkill, onAddSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3X3' },
    { id: 'technical', name: 'Technical', icon: 'Code' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'management', name: 'Management', icon: 'Users' },
    { id: 'soft', name: 'Soft Skills', icon: 'Heart' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills?.filter(skill => skill?.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-success text-white';
      case 'Advanced': return 'bg-primary text-white';
      case 'Intermediate': return 'bg-warning text-white';
      case 'Beginner': return 'bg-gray-400 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getSkillLevelWidth = (level) => {
    switch (level) {
      case 'Expert': return 'w-full';
      case 'Advanced': return 'w-3/4';
      case 'Intermediate': return 'w-1/2';
      case 'Beginner': return 'w-1/4';
      default: return 'w-0';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
            <p className="text-gray-600">
              Showcase your technical and soft skills with peer endorsements
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddSkill}
          >
            Add Skill
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {filteredSkills?.map((skill) => (
            <div key={skill?.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{skill?.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill?.level)}`}>
                      {skill?.level}
                    </span>
                  </div>
                  {skill?.verified && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Icon name="ThumbsUp" size={14} />
                    <span>{skill?.endorsements}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Plus"
                    onClick={() => onEndorseSkill(skill?.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Endorse
                  </Button>
                </div>
              </div>

              {/* Skill Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-500 ${
                    skill?.level === 'Expert' ? 'bg-success' :
                    skill?.level === 'Advanced' ? 'bg-primary' :
                    skill?.level === 'Intermediate'? 'bg-warning' : 'bg-gray-400'
                  } ${getSkillLevelWidth(skill?.level)}`}></div>
                </div>
              </div>

              {/* Skill Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{skill?.experience} experience</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Briefcase" size={14} />
                  <span>{skill?.projectsUsed} projects</span>
                </div>
                {skill?.lastUsed && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Last used {skill?.lastUsed}</span>
                  </div>
                )}
              </div>

              {/* Recent Endorsers */}
              {skill?.recentEndorsers && skill?.recentEndorsers?.length > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Recent endorsers:</span>
                  <div className="flex -space-x-2">
                    {skill?.recentEndorsers?.slice(0, 3)?.map((endorser, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                        title={endorser?.name}
                      >
                        <img
                          src={endorser?.avatar}
                          alt={endorser?.avatarAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {skill?.recentEndorsers?.length > 3 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{skill?.recentEndorsers?.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSkills?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'all' 
                ? "Start building your skill profile by adding your first skill"
                : `No ${categories?.find(c => c?.id === selectedCategory)?.name?.toLowerCase()} skills found`
              }
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddSkill}
            >
              Add Your First Skill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillMatrix;