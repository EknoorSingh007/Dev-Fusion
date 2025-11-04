import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectOverview from './components/ProjectOverview';
import TaskManagement from './components/TaskManagement';
import CommunicationPanel from './components/CommunicationPanel';
import FileRepository from './components/FileRepository';
import MilestoneTracker from './components/MilestoneTracker';
import GitHubIntegration from './components/GitHubIntegration';

const CollaborationWorkspace = () => {
  const [activeView, setActiveView] = useState('overview');

  // Mock data for the project
  const projectData = {
    id: 1,
    title: "AI-Powered Study Assistant",
    description: "A comprehensive web application that helps students organize their study materials, create personalized learning schedules, and collaborate with peers using artificial intelligence.",
    dueDate: "December 15, 2024",
    teamSize: 5,
    repository: "ai-study-assistant",
    completedTasks: 23,
    totalTasks: 35,
    stats: {
      commits: 127,
      pullRequests: 18,
      issues: 7,
      discussions: 24
    },
    teamMembers: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Project Lead",
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: "Professional headshot of Asian woman with long black hair in white blazer",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit",
      isOnline: true
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1623184663110-89ba5b565eb6",
      avatarAlt: "Professional headshot of Caucasian man with brown hair in gray shirt",
      isOnline: false
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of Caucasian woman with blonde hair in blue top",
      isOnline: true
    }]

  };

  const [tasks] = useState([
  {
    id: 1,
    title: "Design user authentication flow",
    description: "Create wireframes and mockups for login, signup, and password reset pages",
    status: 'done',
    priority: 'high',
    assignee: {
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of Caucasian woman with blonde hair in blue top"
    },
    dueDate: '2024-11-15',
    comments: 3,
    createdAt: '2024-10-20T10:00:00Z'
  },
  {
    id: 2,
    title: "Implement AI recommendation engine",
    description: "Build the core algorithm for personalized study recommendations",
    status: 'in-progress',
    priority: 'urgent',
    assignee: {
      avatar: "https://images.unsplash.com/photo-1623184663110-89ba5b565eb6",
      avatarAlt: "Professional headshot of Caucasian man with brown hair in gray shirt"
    },
    dueDate: '2024-11-20',
    comments: 7,
    createdAt: '2024-10-22T14:30:00Z'
  },
  {
    id: 3,
    title: "Set up database schema",
    description: "Design and implement the database structure for user data and study materials",
    status: 'review',
    priority: 'medium',
    assignee: {
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit"
    },
    dueDate: '2024-11-10',
    comments: 2,
    createdAt: '2024-10-18T09:15:00Z'
  },
  {
    id: 4,
    title: "Create responsive navigation component",
    description: "Build a mobile-friendly navigation system with accessibility features",
    status: 'todo',
    priority: 'low',
    dueDate: '2024-11-25',
    comments: 0,
    createdAt: '2024-10-25T16:45:00Z'
  }]
  );

  const [messages] = useState([
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: "Professional headshot of Asian woman with long black hair in white blazer",
    content: "Hey team! I've just pushed the latest updates to the main branch. Please review the authentication flow changes.",
    timestamp: new Date(Date.now() - 300000),
    type: 'text'
  },
  {
    id: 2,
    sender: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
    avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit",
    content: "Great work on the UI components! The new design looks much cleaner. I'll start integrating the frontend with the API endpoints today.",
    timestamp: new Date(Date.now() - 600000),
    type: 'text'
  },
  {
    id: 3,
    sender: "You",
    content: "I've completed the database migration scripts. The new schema should handle our user analytics requirements much better.",
    timestamp: new Date(Date.now() - 900000),
    type: 'text'
  },
  {
    id: 4,
    sender: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1623184663110-89ba5b565eb6",
    avatarAlt: "Professional headshot of Caucasian man with brown hair in gray shirt",
    content: "api-endpoints.json",
    fileName: "api-endpoints.json",
    timestamp: new Date(Date.now() - 1200000),
    type: 'file'
  },
  {
    id: 5,
    sender: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of Caucasian woman with blonde hair in blue top",
    content: `const authenticateUser = async (credentials) => {\n  try {\n    const response = await fetch('/api/auth/login', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(credentials)\n    });\n    return response.json();\n  } catch (error) {\n    console.error('Authentication failed:', error);\n  }\n};`,
    timestamp: new Date(Date.now() - 1800000),
    type: 'code'
  }]
  );

  const [files] = useState([
  {
    id: 1,
    name: 'project-requirements.pdf',
    type: 'document',
    size: 2457600,
    path: '/',
    modifiedAt: '2024-10-25T14:30:00Z',
    createdBy: 'Sarah Chen'
  },
  {
    id: 2,
    name: 'wireframes',
    type: 'folder',
    size: 0,
    path: '/',
    modifiedAt: '2024-10-24T16:45:00Z',
    createdBy: 'Emily Davis'
  },
  {
    id: 3,
    name: 'api-documentation.md',
    type: 'document',
    size: 159744,
    path: '/',
    modifiedAt: '2024-10-23T11:20:00Z',
    createdBy: 'Alex Johnson'
  },
  {
    id: 4,
    name: 'user-flow-diagram.png',
    type: 'image',
    size: 1048576,
    path: '/',
    modifiedAt: '2024-10-22T09:15:00Z',
    createdBy: 'Emily Davis'
  },
  {
    id: 5,
    name: 'database-schema.sql',
    type: 'code',
    size: 524288,
    path: '/',
    modifiedAt: '2024-10-21T13:45:00Z',
    createdBy: 'Mike Rodriguez'
  }]
  );

  const [milestones] = useState([
  {
    id: 1,
    title: "Project Setup & Planning",
    description: "Complete initial project setup, team onboarding, and detailed planning phase",
    dueDate: '2024-11-01',
    priority: 'high',
    completed: true,
    progress: 100,
    assignedTo: 'Sarah Chen',
    createdAt: '2024-10-15T10:00:00Z'
  },
  {
    id: 2,
    title: "Core Authentication System",
    description: "Implement user registration, login, and security features",
    dueDate: '2024-11-15',
    priority: 'critical',
    completed: false,
    progress: 75,
    assignedTo: 'Alex Johnson',
    createdAt: '2024-10-18T14:30:00Z'
  },
  {
    id: 3,
    title: "AI Recommendation Engine",
    description: "Develop and integrate the AI-powered study recommendation system",
    dueDate: '2024-11-30',
    priority: 'high',
    completed: false,
    progress: 45,
    assignedTo: 'Mike Rodriguez',
    createdAt: '2024-10-20T09:15:00Z'
  },
  {
    id: 4,
    title: "User Interface & Experience",
    description: "Complete responsive design and user experience optimization",
    dueDate: '2024-12-10',
    priority: 'medium',
    completed: false,
    progress: 30,
    assignedTo: 'Emily Davis',
    createdAt: '2024-10-22T16:45:00Z'
  }]
  );

  const repositoryData = {
    name: 'ai-study-assistant',
    url: 'https://github.com/devfusion/ai-study-assistant',
    branch: 'main',
    stars: 24,
    forks: 8,
    lastSync: new Date(Date.now() - 900000)
  };

  const [commits] = useState([
  {
    id: 1,
    message: "Add user authentication middleware and JWT token validation",
    author: "sarah-chen",
    sha: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    additions: 45,
    deletions: 12
  },
  {
    id: 2,
    message: "Implement responsive navigation component with accessibility features",
    author: "mike-rodriguez",
    sha: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    additions: 78,
    deletions: 23
  },
  {
    id: 3,
    message: "Update database schema for user analytics and study tracking",
    author: "alex-johnson",
    sha: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    additions: 34,
    deletions: 8
  }]
  );

  const [pullRequests] = useState([
  {
    id: 1,
    title: "Feature: Add AI recommendation engine core functionality",
    number: 15,
    author: "mike-rodriguez",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    status: 'open',
    comments: 5
  },
  {
    id: 2,
    title: "Fix: Resolve mobile navigation accessibility issues",
    number: 14,
    author: "emily-davis",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'merged',
    comments: 3
  },
  {
    id: 3,
    title: "Enhancement: Improve database query performance",
    number: 13,
    author: "alex-johnson",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'closed',
    comments: 7
  }]
  );

  const handleTaskUpdate = (taskId, updates) => {
    console.log('Updating task:', taskId, updates);
  };

  const handleTaskCreate = (newTask) => {
    console.log('Creating task:', newTask);
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
  };

  const handleFileUpload = () => {
    console.log('File upload triggered');
  };

  const handleFileDelete = (fileId) => {
    console.log('Deleting file:', fileId);
  };

  const handleCreateFolder = (folder) => {
    console.log('Creating folder:', folder);
  };

  const handleMilestoneUpdate = (milestoneId, updates) => {
    console.log('Updating milestone:', milestoneId, updates);
  };

  const handleMilestoneCreate = (milestone) => {
    console.log('Creating milestone:', milestone);
  };

  const handleConnectRepo = (repoUrl) => {
    console.log('Connecting repository:', repoUrl);
  };

  const handleEditProject = () => {
    console.log('Edit project triggered');
  };

  const viewOptions = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
  { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
  { id: 'files', label: 'Files', icon: 'FolderOpen' },
  { id: 'milestones', label: 'Milestones', icon: 'Target' },
  { id: 'github', label: 'GitHub', icon: 'Github' }];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Collaboration Workspace</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="Users" size={16} />
              <span>{projectData?.teamSize} team members</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <Icon name="Clock" size={16} />
              <span>Due {projectData?.dueDate}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Share">

              Share Workspace
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Video">

              Start Meeting
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-2">
            {viewOptions?.map((option) =>
            <button
              key={option?.id}
              onClick={() => setActiveView(option?.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeView === option?.id ?
              'bg-primary text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }>

                <Icon name={option?.icon} size={20} />
                <span>{option?.label}</span>
              </button>
            )}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-medium text-gray-900">{projectData?.completedTasks}/{projectData?.totalTasks}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Team Members</span>
                <span className="font-medium text-gray-900">{projectData?.teamSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">GitHub Commits</span>
                <span className="font-medium text-gray-900">{projectData?.stats?.commits}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeView === 'overview' &&
            <div className="space-y-6">
                <ProjectOverview
                project={projectData}
                onEditProject={handleEditProject} />

                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-1">
                    <TaskManagement
                    tasks={tasks?.slice(0, 4)}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskCreate={handleTaskCreate} />

                  </div>
                  <div className="lg:col-span-1">
                    <MilestoneTracker
                    milestones={milestones?.slice(0, 3)}
                    onMilestoneUpdate={handleMilestoneUpdate}
                    onMilestoneCreate={handleMilestoneCreate} />

                  </div>
                </div>
              </div>
            }

            {activeView === 'tasks' &&
            <TaskManagement
              tasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              onTaskCreate={handleTaskCreate} />

            }

            {activeView === 'communication' &&
            <div className="h-[calc(100vh-200px)]">
                <CommunicationPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                teamMembers={projectData?.teamMembers} />

              </div>
            }

            {activeView === 'files' &&
            <FileRepository
              files={files}
              onFileUpload={handleFileUpload}
              onFileDelete={handleFileDelete}
              onCreateFolder={handleCreateFolder} />

            }

            {activeView === 'milestones' &&
            <MilestoneTracker
              milestones={milestones}
              onMilestoneUpdate={handleMilestoneUpdate}
              onMilestoneCreate={handleMilestoneCreate} />

            }

            {activeView === 'github' &&
            <GitHubIntegration
              repository={repositoryData}
              commits={commits}
              pullRequests={pullRequests}
              onConnectRepo={handleConnectRepo} />

            }
          </div>
        </div>
      </div>
    </div>);

};

export default CollaborationWorkspace;