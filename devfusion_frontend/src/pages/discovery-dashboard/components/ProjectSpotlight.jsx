import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 🟢 Import Link
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectSpotlight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🟢 UPDATED: Indian SaaS-style projects
  const spotlightProjects = [
  {
    id: 1,
    title: "Kirana Sathi: AI for Retail",
    description: `A SaaS platform using AI to help local kirana stores manage inventory, optimize pricing, and compete with large e-commerce giants.`,
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    imageAlt: "Local Indian kirana store with goods on shelves",
    creator: "Priya Sharma",
    institution: "IIT Bombay & BITS Pilani",
    skills: ["Python", "TensorFlow", "React", "Node.js"],
    teamSize: 6,
    progress: 75,
    rating: 4.9,
    status: "Active",
    featured: true,
    achievements: ["Smart India Hackathon Winner", "100+ Beta Users", "Featured by NASSCOM"]
  },
  {
    id: 2,
    title: "Praapti: Hyperlocal Logistics AI",
    description: `AI-driven platform optimizing last-mile delivery for small businesses in Tier-2 and Tier-3 cities, reducing costs by 30%.`,
    image: "https://images.unsplash.com/photo-1586790170194-26VOEa5038fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    imageAlt: "Delivery driver on a scooter in a busy Indian city street",
    creator: "Rohan Gupta",
    institution: "IIT Delhi & NIT Surathkal",
    skills: ["IoT", "Python", "React Native", "Machine Learning"],
    teamSize: 8,
    progress: 60,
    rating: 4.8,
    status: "Recruiting",
    featured: true,
    achievements: ["LogiTech Award", "Patent Pending", "T-Hub Incubated"]
  },
  {
    id: 3,
    title: "ShikshaConnect: EdTech Platform",
    description: `An adaptive learning platform for state board exams, providing personalized AI tutoring and resources in regional languages.`,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    imageAlt: "Students in a classroom in rural India learning on tablets",
    creator: "Arjun Patel",
    institution: "NIT Trichy & IIIT Hyderabad",
    skills: ["NLP", "Python", "React", "EdTech"],
    teamSize: 5,
    progress: 85,
    rating: 4.9,
    status: "Starting Soon",
    featured: true,
    achievements: ["EduSpark Winner", "Clinical Trial Approved", "500+ Beta Users"]
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
      {/* (Background Pattern is unchanged) */}
      <div className="relative flex flex-col lg:flex-row min-h-[400px]">
        {/* Content Section */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          {/* (Header, Title, Creator, Description, Skills, Stats, Achievements are unchanged) */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured Project Spotlight
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {currentProject?.title}
          </h2>
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
          <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
            {currentProject?.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {currentProject?.skills?.map((skill, index) =>
            <span
              key={index}
              className="px-3 py-1 bg-white/80 backdrop-blur-sm text-primary text-sm font-medium rounded-full border border-primary/20">
                {skill}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-6 mb-6 text-sm">
            {/* ... (stats) ... */}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {/* ... (achievements) ... */}
          </div>


          {/* 🟢 Actions (Linked to /register) 🟢 */}
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <Button
                variant="default"
                iconName="UserPlus"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Join This Project
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                iconName="Eye"
                iconPosition="left">
                View Details
              </Button>
            </Link>
            <Button
              variant="ghost"
              iconName="Share2" />

          </div>
        </div>

        {/* Image Section (Unchanged) */}
        <div className="lg:w-1/2 relative">
          <div className="h-64 lg:h-full overflow-hidden">
            <Image
              src={currentProject?.image}
              alt={currentProject?.imageAlt}
              className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold rounded-full border border-primary/20">
              {currentProject?.status}
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls (Unchanged) */}
      <div className="absolute bottom-4 left-8 flex items-center space-x-4">
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