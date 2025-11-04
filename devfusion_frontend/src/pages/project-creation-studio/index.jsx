import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
// 🟢 1. REMOVED Header import
import Sidebar from '../../components/ui/Sidebar'; // 🟢 KEPT Sidebar import
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import ProjectTemplates from './components/ProjectTemplates';
import ProjectBasicsForm from './components/ProjectBasicsForm';
import TeamRequirementsForm from './components/TeamRequirementsForm';
import TechnologyStackForm from './components/TechnologyStackForm';
import CollaborationSetupForm from './components/CollaborationSetupForm';
import ProjectPreview from './components/ProjectPreview';

const ProjectCreationStudio = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);// 🟢 KEPT local sidebar state
  const [showTemplates, setShowTemplates] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const userProfile = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    complexity: '',
    duration: '',
    description: '',
    isOpenForCollaboration: true,
    seekingMentorship: false,
    teamSize: '',
    timeCommitment: '',
    crossInstitutional: false,
    remoteCollaboration: true,
    skillRequirements: [],
    frontendTech: [],
    backendTech: [],
    database: [],
    cloudPlatform: [],
    mobileTech: [],
    aiMlTech: [],
    otherTechnologies: [],
    customTechnology: '',
    githubSetup: true,
    cicdSetup: false,
    codeQuality: true,
    documentation: true,
    communicationTool: '',
    projectManagementTool: '',
    fileSharingTool: [],
    meetingFrequency: '',
    timezone: '',
    preferredMeetingTime: '',
    realTimeCollaboration: true,
    asynchronousWork: true,
    codeReviews: true,
    dailyStandups: false,
    sprintPlanning: true,
    documentationRequired: true,
    communicationGuidelines: '',
    repositoryName: '',
    publicRepository: true,
    includeReadme: true
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 'basics',
      title: 'Project Basics',
      description: 'Define your project idea and core details',
      icon: 'FileText',
      tips: [
        'Write a clear, compelling title that describes your project',
        'Choose the right complexity level to attract suitable collaborators',
        'Include specific goals and expected outcomes in your description'
      ]
    },
    {
      id: 'team',
      title: 'Team Requirements',
      description: 'Specify your ideal team composition and skills',
      icon: 'Users',
      tips: [
        'Be specific about required vs nice-to-have skills',
        'Consider including both technical and non-technical roles',
        'Set realistic time commitments to ensure team alignment'
      ]
    },
    {
      id: 'technology',
      title: 'Technology Stack',
      description: 'Choose the technologies and tools for your project',
      icon: 'Code',
      tips: [
        'Select technologies that match your team\'s skill level',
        'Consider learning opportunities when choosing new technologies',
        'Include development tools and deployment platforms'
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration Setup',
      description: 'Configure how your team will work together',
      icon: 'MessageSquare',
      tips: [
        'Choose tools that all team members can access and use',
        'Set clear communication expectations and response times',
        'Consider time zones when scheduling regular meetings'
      ]
    },
    {
      id: 'preview',
      title: 'Review & Publish',
      description: 'Preview your project and publish to find collaborators',
      icon: 'Eye',
      tips: [
        'Review all details for accuracy and completeness',
        'Ensure your project description is engaging and clear',
        'Double-check that all requirements are realistic and achievable'
      ]
    }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    switch (stepIndex) {
      case 0: // Project Basics
        if (!formData?.title?.trim()) newErrors.title = 'Project title is required';
        if (!formData?.type) newErrors.type = 'Project type is required';
        if (!formData?.complexity) newErrors.complexity = 'Complexity level is required';
        if (!formData?.duration) newErrors.duration = 'Duration is required';
        if (!formData?.description?.trim()) newErrors.description = 'Project description is required';
        if (formData?.description?.length < 100) newErrors.description = 'Description must be at least 100 characters';
        break;
        
      case 1: // Team Requirements
        if (!formData?.teamSize || formData?.teamSize < 2) newErrors.teamSize = 'Team size must be at least 2';
        if (!formData?.timeCommitment) newErrors.timeCommitment = 'Time commitment is required';
        break;
        
      case 2: // Technology Stack
        // Optional
        break;
        
      case 3: // Collaboration Setup
        if (!formData?.communicationTool) newErrors.communicationTool = 'Communication tool is required';
        if (!formData?.projectManagementTool) newErrors.projectManagementTool = 'Project management tool is required';
        if (!formData?.meetingFrequency) newErrors.meetingFrequency = 'Meeting frequency is required';
        if (!formData?.timezone) newErrors.timezone = 'Timezone is required';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSelectTemplate = (template) => {
    const templateData = {
      title: template.title, // 🟢 Also apply title from template
      description: template.features.join('\n'), // 🟢 Apply features as description
      type: template?.id,
      complexity: template?.complexity?.toLowerCase(),
      frontendTech: template?.technologies?.filter(tech => 
        ['React', 'Vue.js', 'Angular', 'Svelte']?.includes(tech)
      ),
      backendTech: template?.technologies?.filter(tech => 
        ['Node.js', 'Python', 'Java', 'C#']?.includes(tech)
      ),
      database: template?.technologies?.filter(tech => 
        ['MongoDB', 'PostgreSQL', 'MySQL']?.includes(tech)
      ),
      githubSetup: true,
      codeReviews: true,
      documentation: true,
      communicationTool: 'discord',
      projectManagementTool: 'github-projects',
      meetingFrequency: 'weekly'
    };
    
    setFormData(prev => ({ ...prev, ...templateData }));
    setShowTemplates(false);
    setCurrentStep(0);
  };

  const handleSkipTemplates = () => {
    setShowTemplates(false);
    setCurrentStep(0);
  };

  const handlePublish = async () => {
    const step0Valid = validateStep(0);
    const step1Valid = validateStep(1);
    const step2Valid = validateStep(2);
    const step3Valid = validateStep(3);

    if (!step0Valid || !step1Valid || !step2Valid || !step3Valid) {
        if (!step0Valid) { setCurrentStep(0); return; }
        if (!step1Valid) { setCurrentStep(1); return; }
        if (!step2Valid) { setCurrentStep(2); return; }
        if (!step3Valid) { setCurrentStep(3); return; }
        return;
    }
    
    setIsPublishing(true);
    const token = localStorage.getItem('authToken');

    const allTechNames = [
      ...formData.frontendTech,
      ...formData.backendTech,
      ...formData.database,
      ...formData.cloudPlatform,
      ...formData.mobileTech,
      ...formData.aiMlTech,
      ...formData.otherTechnologies.map(t => t.label) 
    ];

    const payload = {
      title: formData.title,
      description: formData.description,
      project_type: formData.type,
      complexity: formData.complexity,
      duration: formData.duration,
      isOpenForCollaboration: formData.isOpenForCollaboration,
      seekingMentorship: formData.seekingMentorship,
      teamSize: parseInt(formData.teamSize, 10) || 2,
      timeCommitment: formData.timeCommitment,
      crossInstitutional: formData.crossInstitutional,
      remoteCollaboration: formData.remoteCollaboration,
      communicationTool: formData.communicationTool,
      projectManagementTool: formData.projectManagementTool,
      fileSharingTool: formData.fileSharingTool.join(','), 
      meetingFrequency: formData.meetingFrequency,
      timezone: formData.timezone,
      repositoryName: formData.repositoryName,
      team_requirements: formData.skillRequirements.map(req => ({
        skill_name: req.skill, 
        experience: req.experience,
        is_required: req.required,
        description: req.description
      })),
      technology_names: allTechNames 
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/projects/', 
        payload, 
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      navigate('/student-profile-hub');

    } catch (error) {
      console.error('Error publishing project:', error.response?.data || error.message);
      setErrors({ publish: 'Failed to publish project. Please check all fields.' });
    } finally {
      setIsPublishing(false);
    }
  };

  const renderStepContent = () => {
    if (showTemplates) {
      return (
        <ProjectTemplates
          onSelectTemplate={handleSelectTemplate}
          onSkip={handleSkipTemplates}
        />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <ProjectBasicsForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <TeamRequirementsForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <TechnologyStackForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <CollaborationSetupForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <ProjectPreview
            formData={formData}
            creator={userProfile} 
            onEdit={setCurrentStep}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    document.title = 'Project Creation Studio - DevFusion';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 🟢 REMOVED duplicate <Header /> */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* 🟢 Corrected main tag to respect global header and local sidebar */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => navigate('/discovery-dashboard')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Creation Studio</h1>
                <p className="text-gray-600 mt-1">
                  Create and publish your project to find the perfect collaborators
                </p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          {!showTemplates && (
            <div className="mb-8">
              <StepIndicator
                currentStep={currentStep}
                totalSteps={steps?.length}
                steps={steps}
                onStepClick={handleStepClick}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-brand border border-gray-200">
            <div className="p-6 lg:p-8">
              {renderStepContent()}
            </div>

            {/* Navigation Footer */}
            {!showTemplates && (
              <div className="border-t border-gray-200 px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        iconName="ArrowLeft"
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      iconName="RotateCcw"
                      onClick={() => setShowTemplates(true)}
                      className="text-gray-600"
                    >
                      Back to Templates
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      iconName="Save"
                      className="text-gray-600"
                    >
                      Save Draft
                    </Button>
                    
                    {currentStep < steps?.length - 1 ? (
                      <Button
                        variant="default"
                        iconName="ArrowRight"
                        iconPosition="right"
                        onClick={handleNext}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        iconName="Send"
                        onClick={handlePublish}
                        loading={isPublishing}
                      >
                        Publish Project
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-700 mb-4">
                  Creating your first project? Our step-by-step guide will help you attract the right collaborators 
                  and set up your team for success.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" iconName="BookOpen">
                    View Guide
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare">
                    Get Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectCreationStudio;
