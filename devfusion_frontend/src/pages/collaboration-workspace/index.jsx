import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectOverview from './components/ProjectOverview';
import TaskManagement from './components/TaskManagement';
import FileRepository from './components/FileRepository';
import GitHubIntegration from './components/GitHubIntegration';
import { Loader2 } from 'lucide-react'; // 🟢 Import Loader

const CollaborationWorkspace = () => {
  const [activeView, setActiveView] = useState('overview');
  
  // 🟢 1. Get user data from Redux
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // 🟢 2. State for the currently viewed project
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 🟢 3. Load the user's first project
  useEffect(() => {
    if (user && user.projects && user.projects.length > 0) {
      // Set the first project as the active one
      // In a real app, you'd have a list to select which project to view
      setActiveProject(user.projects[0]);
    }
    setLoading(false);
  }, [user]);

  // 🟢 4. We still need MOCK data for components we haven't built the backend for
  const [tasks] = useState([
  {
    id: 1,
    title: "Design user authentication flow",
    description: "Create wireframes and mockups for login, signup, and password reset pages",
    status: 'done',
    priority: 'high',
    assignee: { avatar: "https://placehold.co/100x100/F59E0B/FFFFFF?text=M" },
    dueDate: '2024-11-15',
    comments: 3,
  },
  {
    id: 2,
    title: "Build Core AI Recommendation Engine",
    description: "Develop V1 of the algorithm for study recommendations.",
    status: 'in-progress',
    priority: 'urgent',
    assignee: { avatar: "https://placehold.co/100x100/EF4444/FFFFFF?text=G" },
    dueDate: '2024-11-20',
    comments: 7,
  },
  {
    id: 3,
    title: "Finalize User Database Schema",
    description: "Set up the database tables for users, courses, and materials.",
    status: 'review',
    priority: 'medium',
    assignee: { avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=V" },
    dueDate: '2024-11-10',
    comments: 2,
  },
  {
    id: 4,
    title: "Develop Dashboard Navigation",
    description: "Build the main sidebar and header components in React.",
    status: 'todo',
    priority: 'low',
    assignee: { avatar: "https://placehold.co/100x100/7C3AED/FFFFFF?text=V" },
    dueDate: '2024-11-25',
    comments: 0,
  }]
  );
  
  const [files] = useState([
  {
    id: 1,
    name: 'Project-Brief.pdf',
    type: 'document',
    size: 2457600,
    path: '/',
    modifiedAt: '2024-10-25T14:30:00Z',
    createdBy: 'Eknoor'
  },
  ]);
  
  const [repositoryData] = useState({
    name: 'ai-study-assistant',
    url: 'https://github.com/devfusion/ai-study-assistant',
    branch: 'main',
    stars: 24,
    forks: 8,
    lastSync: new Date(Date.now() - 900000)
  });

  const [commits] = useState([ { id: 1, message: "feat: Add user auth middleware", author: "vinesh", sha: "a1b2c3d4", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), }, ]);
  const [pullRequests] = useState([ { id: 1, title: "Feature: AI Engine V1", number: 15, author: "gagan", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), status: 'open', comments: 5 } ]);
  
  // --- (Event Handlers for child components) ---
  const handleTaskUpdate = (taskId, updates) => { console.log('Updating task:', taskId, updates); };
  const handleTaskCreate = (newTask) => { console.log('Creating task:', newTask); };
  const handleFileUpload = () => { console.log('File upload triggered'); };
  const handleFileDelete = (fileId) => { console.log('Deleting file:', fileId); };
  const handleCreateFolder = (folder) => { console.log('Creating folder:', folder); };
  const handleConnectRepo = (repoUrl) => { console.log('Connecting repository:', repoUrl); };
  const handleEditProject = () => { console.log('Edit project triggered'); };

  // 🟢 SIMPLIFIED: Removed 'Communication' and 'Milestones'
  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'files', label: 'Files', icon: 'FolderOpen' },
    { id: 'github', label: 'GitHub', icon: 'Github' }
  ];

  // --- RENDER STATES ---

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // 🟢 RENDER: "No Project" state
  if (!isLoggedIn || !activeProject) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center text-center">
        <div className="bg-white p-12 rounded-xl shadow-brand-lg border border-gray-200">
          <Icon name="FolderSearch" size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Projects</h2>
          <p className="text-gray-600 mb-6">
            You are not part of any active projects yet.
          </p>
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            onClick={() => navigate('/project-creation-studio')}
          >
            Create Your First Project
          </Button>
        </div>
      </div>
    );
  }

  // 🟢 RENDER: Main Workspace (if project exists)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 🟢 Use REAL project data */}
            <h1 className="text-2xl font-bold text-gray-900">{activeProject.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="Users" size={16} />
              <span>{activeProject.teamMembers?.length || activeProject.teamSize} members</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <Icon name="Clock" size={16} />
              <span>{activeProject.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" iconName="Share" >
              Share Workspace
            </Button>
            <Button variant="default" size="sm" iconName="Video" >
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
                <span className="font-medium text-gray-900">{tasks.filter(t => t.status === 'done').length}/{tasks.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Team Members</span>
                <span className="font-medium text-gray-900">{activeProject.teamMembers?.length || activeProject.teamSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">GitHub Commits</span>
                <span className="font-medium text-gray-900">{commits.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeView === 'overview' &&
            <div className="space-y-6">
              {/* 🟢 Pass the REAL activeProject */}
              <ProjectOverview
                project={activeProject} 
                onEditProject={handleEditProject} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-1">
                  {/* 🟢 Pass MOCK tasks */}
                  <TaskManagement
                  tasks={tasks?.slice(0, 4)}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskCreate={handleTaskCreate} />
                </div>
                <div className="lg:col-span-1">
                  {/* 🟢 Pass MOCK GitHub data */}
                  <GitHubIntegration
                    repository={repositoryData}
                    commits={commits.slice(0, 3)}
                    pullRequests={pullRequests.slice(0, 2)}
                    onConnectRepo={handleConnectRepo} />
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

            {activeView === 'files' &&
            <FileRepository
              files={files}
              onFileUpload={handleFileUpload}
              onFileDelete={handleFileDelete}
              onCreateFolder={handleCreateFolder} />
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