import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileHeader from './components/ProfileHeader';
import SkillMatrix from './components/SkillMatrix';
import ProjectPortfolio from './components/ProjectPortfolio';
import AcademicBackground from './components/AcademicBackground';
import PeerEndorsements from './components/PeerEndorsements';
import ActivityFeed from './components/ActivityFeed';

const StudentProfileHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock profile data
  const profileData = {
    name: "Alexandra Chen",
    title: "Computer Science Student & Full-Stack Developer",
    location: "San Francisco, CA",
    university: "Stanford University",
    joinedDate: "September 2022",
    bio: `Passionate computer science student with a focus on web development and machine learning. I love collaborating on innovative projects that solve real-world problems. Currently exploring the intersection of AI and sustainable technology while building my expertise in full-stack development.`,
    avatar: "https://images.unsplash.com/photo-1706565029882-6f25f1d9af65",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing white blazer, smiling at camera",
    githubConnected: true,
    stats: {
      projects: 12,
      collaborations: 28,
      followers: 156,
      endorsements: 89
    }
  };

  // Mock skills data
  const skillsData = [
  {
    id: 1,
    name: "JavaScript",
    level: "Advanced",
    category: "technical",
    endorsements: 24,
    verified: true,
    experience: "3 years",
    projectsUsed: 8,
    lastUsed: "2 days ago",
    recentEndorsers: [
    { name: "Michael Rodriguez", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit" },
    { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10", avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in blue blouse" }]

  },
  {
    id: 2,
    name: "React",
    level: "Advanced",
    category: "technical",
    endorsements: 19,
    verified: true,
    experience: "2 years",
    projectsUsed: 6,
    lastUsed: "1 week ago",
    recentEndorsers: [
    { name: "David Park", avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311", avatarAlt: "Professional headshot of Asian man with glasses and black hair in gray shirt" }]

  },
  {
    id: 3,
    name: "Python",
    level: "Expert",
    category: "technical",
    endorsements: 31,
    verified: true,
    experience: "4 years",
    projectsUsed: 10,
    lastUsed: "yesterday",
    recentEndorsers: [
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39", avatarAlt: "Professional headshot of Caucasian woman with blonde hair in white shirt" },
    { name: "James Thompson", avatar: "https://images.unsplash.com/photo-1723607528434-21cde67167c4", avatarAlt: "Professional headshot of Caucasian man with brown hair in blue button-up shirt" }]

  },
  {
    id: 4,
    name: "UI/UX Design",
    level: "Intermediate",
    category: "design",
    endorsements: 15,
    verified: false,
    experience: "1.5 years",
    projectsUsed: 4,
    lastUsed: "3 days ago",
    recentEndorsers: [
    { name: "Lisa Chang", avatar: "https://images.unsplash.com/photo-1721294928128-f6c2d1d2281d", avatarAlt: "Professional headshot of Asian woman with long black hair in red blazer" }]

  },
  {
    id: 5,
    name: "Team Leadership",
    level: "Advanced",
    category: "management",
    endorsements: 22,
    verified: true,
    experience: "2 years",
    projectsUsed: 5,
    lastUsed: "1 week ago",
    recentEndorsers: [
    { name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" }]

  },
  {
    id: 6,
    name: "Communication",
    level: "Expert",
    category: "soft",
    endorsements: 28,
    verified: true,
    experience: "3 years",
    projectsUsed: 12,
    lastUsed: "today",
    recentEndorsers: [
    { name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6", avatarAlt: "Professional headshot of Hispanic woman with curly brown hair in white blouse" }]

  }];


  // Mock projects data
  const projectsData = [
  {
    id: 1,
    title: "EcoTrack - Sustainability Dashboard",
    description: "A comprehensive web application that helps users track their carbon footprint and discover eco-friendly alternatives for daily activities.",
    image: "https://images.unsplash.com/photo-1672489362485-0734d551a906",
    imageAlt: "Green forest landscape with sunlight filtering through trees representing environmental sustainability",
    status: "completed",
    role: "Lead",
    featured: true,
    technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind CSS"],
    teamSize: 4,
    duration: "3 months",
    rating: 4.8,
    githubUrl: "https://github.com/alexchen/ecotrack",
    liveUrl: "https://ecotrack-demo.netlify.app",
    teamMembers: [
    { name: "Michael Rodriguez", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit" },
    { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10", avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in blue blouse" },
    { name: "David Park", avatar: "https://images.unsplash.com/photo-1630257202782-ae7fbd64bd02", avatarAlt: "Professional headshot of Asian man with glasses and black hair in gray shirt" }]

  },
  {
    id: 2,
    title: "StudyBuddy - Collaborative Learning Platform",
    description: "A peer-to-peer learning platform that connects students for study sessions, resource sharing, and academic collaboration.",
    image: "https://images.unsplash.com/photo-1719978184147-c5bf6b82c6e1",
    imageAlt: "Group of diverse students collaborating around laptop computers in modern library setting",
    status: "ongoing",
    role: "Co-Lead",
    featured: true,
    technologies: ["Vue.js", "Firebase", "WebRTC", "Socket.io"],
    teamSize: 6,
    duration: "4 months",
    rating: 4.6,
    githubUrl: "https://github.com/studybuddy/platform",
    teamMembers: [
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39", avatarAlt: "Professional headshot of Caucasian woman with blonde hair in white shirt" },
    { name: "James Thompson", avatar: "https://images.unsplash.com/photo-1723607528434-21cde67167c4", avatarAlt: "Professional headshot of Caucasian man with brown hair in blue button-up shirt" },
    { name: "Lisa Chang", avatar: "https://images.unsplash.com/photo-1721294928128-f6c2d1d2281d", avatarAlt: "Professional headshot of Asian woman with long black hair in red blazer" }]

  },
  {
    id: 3,
    title: "AI Recipe Generator",
    description: "Machine learning application that generates personalized recipes based on dietary preferences, available ingredients, and nutritional goals.",
    image: "https://images.unsplash.com/photo-1581017942722-e7ba048c72a7",
    imageAlt: "Colorful array of fresh vegetables and ingredients arranged on wooden cutting board",
    status: "completed",
    role: "Contributor",
    featured: false,
    technologies: ["Python", "TensorFlow", "Flask", "React", "PostgreSQL"],
    teamSize: 3,
    duration: "2 months",
    rating: 4.4,
    githubUrl: "https://github.com/ai-recipes/generator",
    teamMembers: [
    { name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" },
    { name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6", avatarAlt: "Professional headshot of Hispanic woman with curly brown hair in white blouse" }]

  }];


  // Mock education data
  const educationData = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2022 - 2026",
    gpa: "3.85",
    logo: "https://images.unsplash.com/photo-1730612352018-10546c707d72",
    logoAlt: "Stanford University logo with cardinal red tree symbol",
    coursework: ["Data Structures", "Algorithms", "Machine Learning", "Web Development", "Database Systems", "Software Engineering"],
    honors: ["Dean\'s List", "CS Department Scholarship"]
  }];


  // Mock certifications data
  const certificationsData = [
  {
    id: 1,
    name: "AWS Certified Developer Associate",
    issuer: "Amazon Web Services",
    date: "March 2024",
    logo: "https://images.unsplash.com/photo-1669865015890-4dbd855de0f7",
    logoAlt: "AWS Amazon Web Services cloud computing logo in orange and white",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Computing", "AWS Lambda", "DynamoDB", "API Gateway"]
  },
  {
    id: 2,
    name: "Google UX Design Certificate",
    issuer: "Google Career Certificates",
    date: "January 2024",
    logo: "https://images.unsplash.com/photo-1662947190722-5d272f82a526",
    logoAlt: "Google logo with colorful letters on white background",
    credentialUrl: "https://coursera.org/verify/certificate",
    skills: ["User Research", "Prototyping", "Figma", "Usability Testing"]
  }];


  // Mock achievements data
  const achievementsData = [
  {
    id: 1,
    title: "1st Place - Stanford Hackathon 2024",
    organization: "Stanford Computer Science Department",
    date: "February 2024",
    type: "competition",
    description: "Led a team of 4 to develop an AI-powered accessibility tool for visually impaired users, winning first place among 120+ teams.",
    impact: {
      participants: 120,
      ranking: "1st Place"
    }
  },
  {
    id: 2,
    title: "Outstanding Academic Achievement",
    organization: "Stanford University",
    date: "December 2023",
    type: "academic",
    description: "Recognized for maintaining a 3.85+ GPA while actively participating in research and extracurricular activities.",
    impact: {
      ranking: "Top 5% of Class"
    }
  }];


  // Mock endorsements data
  const endorsementsData = [
  {
    type: "technical",
    count: 45,
    recentEndorsers: [
    { name: "Michael Rodriguez", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit", endorsementCount: 8 },
    { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10", avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in blue blouse", endorsementCount: 6 },
    { name: "David Park", avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311", avatarAlt: "Professional headshot of Asian man with glasses and black hair in gray shirt", endorsementCount: 5 }]

  },
  {
    type: "leadership",
    count: 28,
    recentEndorsers: [
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39", avatarAlt: "Professional headshot of Caucasian woman with blonde hair in white shirt", endorsementCount: 7 },
    { name: "James Thompson", avatar: "https://images.unsplash.com/photo-1723607528434-21cde67167c4", avatarAlt: "Professional headshot of Caucasian man with brown hair in blue button-up shirt", endorsementCount: 4 }]

  },
  {
    type: "communication",
    count: 35,
    recentEndorsers: [
    { name: "Lisa Chang", avatar: "https://images.unsplash.com/photo-1721294928128-f6c2d1d2281d", avatarAlt: "Professional headshot of Asian woman with long black hair in red blazer", endorsementCount: 9 },
    { name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit", endorsementCount: 6 }]

  },
  {
    type: "creativity",
    count: 22,
    recentEndorsers: [
    { name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6", avatarAlt: "Professional headshot of Hispanic woman with curly brown hair in white blouse", endorsementCount: 5 }]

  },
  {
    type: "reliability",
    count: 31,
    recentEndorsers: [
    { name: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311", avatarAlt: "Professional headshot of Caucasian man with brown hair and beard in gray sweater", endorsementCount: 8 }]

  }];


  // Mock testimonials data
  const testimonialsData = [
  {
    id: 1,
    author: {
      name: "Michael Rodriguez",
      title: "Full-Stack Developer at TechCorp",
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit"
    },
    content: "Alexandra is an exceptional collaborator who brings both technical expertise and creative problem-solving to every project. Her leadership on the EcoTrack project was instrumental in our success, and her ability to communicate complex ideas clearly made her invaluable to our team.",
    rating: 5,
    project: "EcoTrack Dashboard",
    date: "March 2024",
    helpful: 12,
    skills: ["Leadership", "React", "Problem Solving"]
  },
  {
    id: 2,
    author: {
      name: "Sarah Kim",
      title: "UX Designer & CS Student",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in blue blouse"
    },
    content: "Working with Alexandra on StudyBuddy has been amazing. She has a unique ability to bridge the gap between technical implementation and user experience. Her code is clean, well-documented, and she's always willing to help team members learn new concepts.",
    rating: 5,
    project: "StudyBuddy Platform",
    date: "February 2024",
    helpful: 8,
    skills: ["Mentoring", "Code Quality", "Collaboration"]
  },
  {
    id: 3,
    author: {
      name: "Professor David Chen",
      title: "Computer Science Professor at Stanford",
      avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
      avatarAlt: "Professional headshot of Asian man with glasses and black hair in gray shirt"
    },
    content: "Alexandra consistently demonstrates exceptional academic performance and practical application of computer science concepts. Her contributions to class projects show both technical depth and innovative thinking. She\'s a natural leader who elevates the entire team\'s performance.",
    rating: 5,
    project: "Machine Learning Course Project",
    date: "December 2023",
    helpful: 15,
    skills: ["Academic Excellence", "Innovation", "Technical Skills"]
  }];


  // Mock activity data
  const activityData = [
  {
    id: 1,
    type: "projects",
    title: "Started new project",
    description: "Launched \'Campus Connect\' - a social networking platform for university students",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    details: {
      project: {
        name: "Campus Connect",
        description: "Social networking platform for students",
        image: "https://images.unsplash.com/photo-1719978184147-c5bf6b82c6e1",
        imageAlt: "Group of diverse students collaborating around laptop computers in modern library setting"
      }
    },
    actions: {
      likes: 15,
      comments: 3,
      shares: 2
    }
  },
  {
    id: 2,
    type: "skills",
    title: "Added new skill",
    description: "Added TypeScript to technical skills with Advanced proficiency level",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    details: {
      skill: {
        name: "TypeScript",
        level: "Advanced"
      }
    },
    actions: {
      likes: 8,
      comments: 1
    }
  },
  {
    id: 3,
    type: "endorsements",
    title: "Received endorsement",
    description: "Got endorsed for React development skills",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    details: {
      endorser: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39",
        avatarAlt: "Professional headshot of Caucasian woman with blonde hair in white shirt"
      },
      skill: "React"
    },
    actions: {
      likes: 12
    }
  },
  {
    id: 4,
    type: "achievements",
    title: "Won hackathon",
    description: "Placed 1st in Stanford Hackathon 2024 with AI accessibility tool",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    details: {
      achievement: {
        title: "1st Place - Stanford Hackathon 2024",
        organization: "Stanford University"
      }
    },
    actions: {
      likes: 45,
      comments: 12,
      shares: 8
    }
  },
  {
    id: 5,
    type: "collaboration",
    title: "Joined collaboration",
    description: "Started collaborating on open-source machine learning project",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    details: {
      collaborators: [
      { name: "James Thompson", avatar: "https://images.unsplash.com/photo-1723607528434-21cde67167c4", avatarAlt: "Professional headshot of Caucasian man with brown hair in blue button-up shirt" },
      { name: "Lisa Chang", avatar: "https://images.unsplash.com/photo-1721294928128-f6c2d1d2281d", avatarAlt: "Professional headshot of Asian woman with long black hair in red blazer" },
      { name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" }]

    },
    actions: {
      likes: 18,
      comments: 4
    }
  }];


  const tabs = [
  { id: 'overview', name: 'Overview', icon: 'User' },
  { id: 'projects', name: 'Projects', icon: 'FolderOpen' },
  { id: 'skills', name: 'Skills', icon: 'Award' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'endorsements', name: 'Endorsements', icon: 'ThumbsUp' },
  { id: 'activity', name: 'Activity', icon: 'Activity' }];


  // Event handlers
  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };

  const handleConnectGitHub = () => {
    console.log('Connecting to GitHub...');
  };

  const handleEndorseSkill = (skillId) => {
    console.log('Endorsing skill:', skillId);
  };

  const handleAddSkill = () => {
    console.log('Adding new skill...');
  };

  const handleViewProject = (projectId) => {
    console.log('Viewing project:', projectId);
  };

  const handleAddProject = () => {
    console.log('Adding new project...');
  };

  const handleWriteTestimonial = () => {
    console.log('Writing testimonial...');
  };

  const handleLoadMoreActivity = () => {
    console.log('Loading more activity...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <Link to="/discovery-dashboard" className="text-primary hover:text-primary/80 transition-colors">
              Discovery
            </Link>
            <Icon name="ChevronRight" size={16} className="text-gray-400" />
            <span className="text-gray-600">Student Profile Hub</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <ProfileHeader
            profile={profileData}
            onEditProfile={handleEditProfile}
            onConnectGitHub={handleConnectGitHub} />

        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.name}</span>
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <SkillMatrix
                skills={skillsData}
                onEndorseSkill={handleEndorseSkill}
                onAddSkill={handleAddSkill} />

                <ProjectPortfolio
                projects={projectsData?.slice(0, 3)}
                onViewProject={handleViewProject}
                onAddProject={handleAddProject} />

              </div>
              <div className="space-y-8">
                <PeerEndorsements
                endorsements={endorsementsData}
                testimonials={testimonialsData?.slice(0, 2)}
                onWriteTestimonial={handleWriteTestimonial} />

                <ActivityFeed
                activities={activityData?.slice(0, 5)}
                onLoadMore={handleLoadMoreActivity} />

              </div>
            </div>
          }

          {activeTab === 'projects' &&
          <ProjectPortfolio
            projects={projectsData}
            onViewProject={handleViewProject}
            onAddProject={handleAddProject} />

          }

          {activeTab === 'skills' &&
          <SkillMatrix
            skills={skillsData}
            onEndorseSkill={handleEndorseSkill}
            onAddSkill={handleAddSkill} />

          }

          {activeTab === 'education' &&
          <AcademicBackground
            education={educationData}
            certifications={certificationsData}
            achievements={achievementsData} />

          }

          {activeTab === 'endorsements' &&
          <PeerEndorsements
            endorsements={endorsementsData}
            testimonials={testimonialsData}
            onWriteTestimonial={handleWriteTestimonial} />

          }

          {activeTab === 'activity' &&
          <ActivityFeed
            activities={activityData}
            onLoadMore={handleLoadMoreActivity} />

          }
        </div>

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-3">
            <Button
              variant="default"
              size="icon"
              iconName="Plus"
              className="w-12 h-12 rounded-full shadow-brand-lg"
              title="Quick Actions" />

            <Button
              variant="outline"
              size="icon"
              iconName="MessageSquare"
              className="w-10 h-10 rounded-full shadow-brand bg-white"
              title="Messages" />

            <Button
              variant="outline"
              size="icon"
              iconName="Bell"
              className="w-10 h-10 rounded-full shadow-brand bg-white"
              title="Notifications" />

          </div>
        </div>
      </div>
    </div>);

};

export default StudentProfileHub;