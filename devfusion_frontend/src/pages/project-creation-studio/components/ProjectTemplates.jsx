import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectTemplates = ({ onSelectTemplate, onSkip }) => {
  const templates = [
    {
      id: 'web-app',
      title: 'Web Application',
      description: 'Full-stack web application with modern frontend and backend',
      icon: 'Globe',
      color: 'from-blue-500 to-cyan-500',
      technologies: ['React', 'Node.js', 'MongoDB'],
      complexity: 'Intermediate',
      duration: '2-3 months',
      teamSize: '3-4 members',
      features: [
        'User authentication system',
        'Responsive design',
        'RESTful API',
        'Database integration',
        'Deployment setup'
      ]
    },
    {
      id: 'mobile-app',
      title: 'Mobile Application',
      description: 'Cross-platform mobile app with native performance',
      icon: 'Smartphone',
      color: 'from-purple-500 to-pink-500',
      technologies: ['React Native', 'Firebase', 'Redux'],
      complexity: 'Advanced',
      duration: '3-4 months',
      teamSize: '4-5 members',
      features: [
        'Cross-platform compatibility',
        'Push notifications',
        'Offline functionality',
        'App store deployment',
        'Analytics integration'
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Project',
      description: 'Machine learning model with data analysis and visualization',
      icon: 'Brain',
      color: 'from-green-500 to-teal-500',
      technologies: ['Python', 'TensorFlow', 'Jupyter'],
      complexity: 'Advanced',
      duration: '2-4 months',
      teamSize: '3-4 members',
      features: [
        'Data preprocessing pipeline',
        'Model training and evaluation',
        'Interactive visualizations',
        'API for model serving',
        'Documentation and reports'
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain DApp',
      description: 'Decentralized application with smart contracts',
      icon: 'Link',
      color: 'from-orange-500 to-red-500',
      technologies: ['Solidity', 'Web3.js', 'React'],
      complexity: 'Expert',
      duration: '3-6 months',
      teamSize: '4-6 members',
      features: [
        'Smart contract development',
        'Web3 integration',
        'Cryptocurrency payments',
        'Decentralized storage',
        'Security auditing'
      ]
    },
    {
      id: 'game-dev',
      title: 'Game Development',
      description: '2D/3D game with engaging gameplay mechanics',
      icon: 'Gamepad2',
      color: 'from-indigo-500 to-purple-500',
      technologies: ['Unity', 'C#', 'Blender'],
      complexity: 'Intermediate',
      duration: '3-5 months',
      teamSize: '4-6 members',
      features: [
        'Game mechanics design',
        '2D/3D graphics',
        'Sound and music',
        'Level design',
        'Multi-platform release'
      ]
    },
    {
      id: 'iot',
      title: 'IoT Solution',
      description: 'Internet of Things project with hardware and software integration',
      icon: 'Wifi',
      color: 'from-cyan-500 to-blue-500',
      technologies: ['Arduino', 'Raspberry Pi', 'Node.js'],
      complexity: 'Advanced',
      duration: '2-4 months',
      teamSize: '3-5 members',
      features: [
        'Sensor integration',
        'Real-time data collection',
        'Cloud connectivity',
        'Mobile app control',
        'Data analytics dashboard'
      ]
    }
  ];

  const getComplexityColor = (complexity) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-orange-100 text-orange-800',
      'Expert': 'bg-red-100 text-red-800'
    };
    return colors?.[complexity] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="Zap" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Project Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get started quickly with our pre-configured project templates. Each template includes 
          recommended technologies, team structure, and collaboration setup.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className="bg-white border border-gray-200 rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => onSelectTemplate(template)}
          >
            {/* Header */}
            <div className={`h-24 bg-gradient-to-r ${template?.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-4 flex items-center justify-between h-full">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name={template?.icon} size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template?.complexity)}`}>
                    {template?.complexity}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {template?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {template?.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1">
                  {template?.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 mb-4 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} />
                  <span>{template?.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} />
                  <span>{template?.teamSize}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-500 mb-2">Key Features</p>
                <ul className="space-y-1">
                  {template?.features?.slice(0, 3)?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-xs text-gray-600">
                      <Icon name="Check" size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {template?.features?.length > 3 && (
                    <li className="text-xs text-gray-500 pl-4">
                      +{template?.features?.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                fullWidth
                className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
              >
                Use This Template
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Custom Project Option */}
      <div className="text-center pt-8 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
          <Icon name="Plus" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start from Scratch</h3>
          <p className="text-sm text-gray-600 mb-6">
            Have a unique project idea? Create your project from scratch with complete customization.
          </p>
          <Button
            variant="outline"
            iconName="Plus"
            onClick={onSkip}
            className="mx-auto"
          >
            Create Custom Project
          </Button>
        </div>
      </div>
      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Need Help Choosing?</h4>
            <p className="text-sm text-blue-700 mt-1">
              Templates provide a structured starting point with recommended technologies and team roles. 
              You can always customize everything after selection. If you're unsure, start with a template 
              that matches your project type and modify as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplates;