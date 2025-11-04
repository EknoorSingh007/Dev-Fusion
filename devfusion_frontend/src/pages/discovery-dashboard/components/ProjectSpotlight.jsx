import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectSpotlight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const spotlightProjects = [
  {
    id: 1,
    title: "AI-Powered Campus Navigation System",
    description: `Revolutionary mobile application that uses machine learning to provide real-time indoor navigation across university campuses.\n\nFeaturing augmented reality overlays, crowd-sourced accessibility data, and integration with campus services for a seamless student experience.`,
    image: "https://images.unsplash.com/photo-1588959293268-484c415422d8",
    imageAlt: "Modern university campus with students walking between glass buildings and green spaces",
    creator: "Sarah Chen",
    institution: "MIT & Stanford",
    skills: ["React Native", "TensorFlow", "AR Kit", "Node.js"],
    teamSize: 6,
    progress: 75,
    rating: 4.9,
    status: "Active",
    featured: true,
    achievements: ["Best Innovation Award", "10K+ Downloads", "Featured in TechCrunch"]
  },
  {
    id: 2,
    title: "Sustainable Energy Monitoring Platform",
    description: `Comprehensive IoT solution for tracking and optimizing energy consumption in smart buildings.\n\nCombines real-time sensor data with predictive analytics to reduce carbon footprint and operational costs by up to 30%.`,
    image: "https://images.unsplash.com/photo-1679747596362-384d7b342fc1",
    imageAlt: "Solar panels and wind turbines on modern building rooftop with city skyline in background",
    creator: "Marcus Rodriguez",
    institution: "UC Berkeley & Caltech",
    skills: ["IoT", "Python", "React", "Machine Learning"],
    teamSize: 8,
    progress: 60,
    rating: 4.8,
    status: "Recruiting",
    featured: true,
    achievements: ["Green Tech Award", "Patent Pending", "Industry Partnership"]
  },
  {
    id: 3,
    title: "Mental Health Support Chatbot",
    description: `AI-driven conversational assistant providing 24/7 mental health support for college students.\n\nIntegrates with campus counseling services and uses natural language processing to provide personalized coping strategies and resources.`,
    image: "https://images.unsplash.com/photo-1582457449697-01a4e1c645f2",
    imageAlt: "Diverse group of students sitting in circle having supportive conversation in modern campus lounge",
    creator: "Priya Patel",
    institution: "Harvard & NYU",
    skills: ["NLP", "Python", "React", "Psychology"],
    teamSize: 5,
    progress: 85,
    rating: 4.9,
    status: "Starting Soon",
    featured: true,
    achievements: ["Healthcare Innovation Prize", "Clinical Trial Approved", "500+ Beta Users"]
  }];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % spotlightProjects?.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [spotlightProjects?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % spotlightProjects?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + spotlightProjects?.length) % spotlightProjects?.length);
  };

  const currentProject = spotlightProjects?.[currentSlide];

  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="spotlight-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#spotlight-pattern)" />
        </svg>
      </div>
      <div className="relative flex flex-col lg:flex-row min-h-[400px]">
        {/* Content Section */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured Project Spotlight
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {currentProject?.title}
          </h2>

          {/* Creator & Institution */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <span className="font-medium text-gray-900">{currentProject?.creator}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="GraduationCap" size={16} />
              <span className="text-sm">{currentProject?.institution}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
            {currentProject?.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentProject?.skills?.map((skill, index) =>
            <span
              key={index}
              className="px-3 py-1 bg-white/80 backdrop-blur-sm text-primary text-sm font-medium rounded-full border border-primary/20">

                {skill}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-gray-500" />
              <span className="text-gray-600">{currentProject?.teamSize} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="font-medium text-gray-900">{currentProject?.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                  style={{ width: `${currentProject?.progress}%` }} />

              </div>
              <span className="text-gray-600">{currentProject?.progress}%</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentProject?.achievements?.map((achievement, index) =>
            <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-md">
                <Icon name="Award" size={12} />
                <span>{achievement}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              iconName="UserPlus"
              iconPosition="left"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">

              Join This Project
            </Button>
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left">

              View Details
            </Button>
            <Button
              variant="ghost"
              iconName="Share2" />

          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <div className="h-64 lg:h-full overflow-hidden">
            <Image
              src={currentProject?.image}
              alt={currentProject?.imageAlt}
              className="w-full h-full object-cover" />

          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold rounded-full border border-primary/20">
              {currentProject?.status}
            </span>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-8 flex items-center space-x-4">
        {/* Slide Indicators */}
        <div className="flex items-center space-x-2">
          {spotlightProjects?.map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentSlide ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'}`
            } />

          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">

            <Icon name="ChevronLeft" size={16} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">

            <Icon name="ChevronRight" size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>);

};

export default ProjectSpotlight;