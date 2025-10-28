import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationEngine = () => {
  const [activeTab, setActiveTab] = useState('for-you');

  const recommendedProjects = [
  {
    id: 1,
    title: "E-Learning Platform with AI Tutoring",
    description: "Personalized learning platform using machine learning to adapt content based on student performance and learning style.",
    image: "https://images.unsplash.com/photo-1505210513853-1567ba60f202",
    imageAlt: "Students collaborating around laptop in modern classroom with AI interface displayed on screen",
    creator: "Jennifer Park",
    institution: "Stanford University",
    skills: ["React", "Python", "TensorFlow", "Node.js"],
    matchScore: 95,
    reason: "Matches your AI and web development interests",
    teamSize: 5,
    duration: "3 months",
    difficulty: "Intermediate",
    status: "Recruiting"
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description: "Mobile app connecting eco-conscious consumers with sustainable fashion brands, featuring carbon footprint tracking.",
    image: "https://images.unsplash.com/photo-1654525481124-da9fbd74cb42",
    imageAlt: "Eco-friendly clothing displayed on wooden hangers with green plants in sustainable fashion store",
    creator: "Michael Chen",
    institution: "UC Berkeley",
    skills: ["React Native", "Node.js", "MongoDB", "UI/UX"],
    matchScore: 88,
    reason: "Based on your mobile development skills",
    teamSize: 6,
    duration: "4 months",
    difficulty: "Beginner",
    status: "Starting Soon"
  },
  {
    id: 3,
    title: "Smart City Traffic Optimization",
    description: "IoT-based system for real-time traffic management using sensor data and predictive analytics to reduce congestion.",
    image: "https://images.unsplash.com/photo-1555985289-943f542f3a78",
    imageAlt: "Aerial view of smart city intersection with digital traffic flow visualization and connected vehicle sensors",
    creator: "Raj Patel",
    institution: "MIT",
    skills: ["IoT", "Python", "Machine Learning", "React"],
    matchScore: 82,
    reason: "Aligns with your IoT project history",
    teamSize: 8,
    duration: "6 months",
    difficulty: "Advanced",
    status: "Active"
  }];


  const skillBasedProjects = [
  {
    id: 4,
    title: "Blockchain Supply Chain Tracker",
    creator: "Anna Rodriguez",
    institution: "Harvard University",
    skills: ["Blockchain", "Solidity", "React"],
    matchScore: 91,
    teamSize: 4
  },
  {
    id: 5,
    title: "AR Interior Design Tool",
    creator: "Tom Wilson",
    institution: "Carnegie Mellon",
    skills: ["Unity", "C#", "ARKit"],
    matchScore: 87,
    teamSize: 5
  },
  {
    id: 6,
    title: "Mental Health Chatbot",
    creator: "Sarah Kim",
    institution: "NYU",
    skills: ["NLP", "Python", "React"],
    matchScore: 84,
    teamSize: 6
  }];


  const collaborationHistory = [
  {
    id: 7,
    title: "Similar to \'Campus Food Delivery App'",
    creator: "Alex Johnson",
    institution: "University of Washington",
    reason: "You worked on a similar logistics project",
    matchScore: 89
  },
  {
    id: 8,
    title: "Team with Previous Collaborators",
    creator: "Maria Garcia",
    institution: "UCLA",
    reason: "Your former teammate Maria is leading this",
    matchScore: 86
  }];


  const tabs = [
  { id: 'for-you', label: 'For You', icon: 'User', count: recommendedProjects?.length },
  { id: 'skills', label: 'Skill Match', icon: 'Zap', count: skillBasedProjects?.length },
  { id: 'history', label: 'Based on History', icon: 'Clock', count: collaborationHistory?.length }];


  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    return 'text-primary bg-primary/10';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Target" size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
            <p className="text-sm text-gray-600">Personalized project suggestions based on your profile</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab?.id ?
            'bg-white text-primary shadow-sm' :
            'text-gray-600 hover:text-gray-900'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
            activeTab === tab?.id ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'}`
            }>
                {tab?.count}
              </span>
            </button>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'for-you' &&
        <div className="space-y-6">
            {recommendedProjects?.map((project) =>
          <div key={project?.id} className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 p-4 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
                {/* Image */}
                <div className="lg:w-48 h-32 lg:h-24 overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                src={project?.image}
                alt={project?.imageAlt}
                className="w-full h-full object-cover" />

                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project?.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by <span className="font-medium text-primary">{project?.creator}</span> • {project?.institution}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getMatchScoreColor(project?.matchScore)}`}>
                      {project?.matchScore}% match
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project?.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project?.skills?.map((skill, index) =>
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                        {skill}
                      </span>
                )}
                  </div>

                  {/* Stats & Reason */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{project?.teamSize} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{project?.duration}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md">{project?.difficulty}</span>
                    </div>
                    <div className="text-xs text-primary font-medium">{project?.reason}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 flex-shrink-0">
                  <Button variant="default" size="sm" iconName="UserPlus" className="flex-1 lg:flex-none">
                    Join
                  </Button>
                  <Button variant="outline" size="sm" iconName="Eye" className="flex-1 lg:flex-none">
                    View
                  </Button>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'skills' &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillBasedProjects?.map((project) =>
          <div key={project?.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{project?.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getMatchScoreColor(project?.matchScore)}`}>
                    {project?.matchScore}%
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-3">
                  by <span className="font-medium">{project?.creator}</span>
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project?.skills?.map((skill, index) =>
              <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {skill}
                    </span>
              )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Icon name="Users" size={12} />
                    <span>{project?.teamSize} members</span>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'history' &&
        <div className="space-y-4">
            {collaborationHistory?.map((project) =>
          <div key={project?.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{project?.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by <span className="font-medium text-primary">{project?.creator}</span> • {project?.institution}
                  </p>
                  <p className="text-xs text-primary">{project?.reason}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getMatchScoreColor(project?.matchScore)}`}>
                    {project?.matchScore}% match
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

};

export default RecommendationEngine;