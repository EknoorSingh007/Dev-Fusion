import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Create New Project",
      description: "Start your next big idea and find collaborators",
      icon: "Plus",
      color: "bg-gradient-to-br from-primary to-primary/80",
      link: "/project-creation-studio",
      stats: "Join 2,500+ creators"
    },
    {
      id: 2,
      title: "Update Profile",
      description: "Showcase your skills and recent achievements",
      icon: "User",
      color: "bg-gradient-to-br from-secondary to-secondary/80",
      link: "/student-profile-hub",
      stats: "Get 3x more invites"
    },
    {
      id: 3,
      title: "Browse Skills",
      description: "Discover new technologies and learning paths",
      icon: "BookOpen",
      color: "bg-gradient-to-br from-accent to-accent/80",
      link: "/skills-center",
      stats: "500+ skills available"
    },
    {
      id: 4,
      title: "Join Workspace",
      description: "Collaborate with your active project teams",
      icon: "Users",
      color: "bg-gradient-to-br from-success to-success/80",
      link: "/collaboration-workspace",
      stats: "3 active projects"
    }
  ];

  const recentBookmarks = [
    {
      id: 1,
      title: "AI-Powered Learning Assistant",
      creator: "Sarah Chen",
      skills: ["Python", "TensorFlow", "React"],
      status: "Recruiting"
    },
    {
      id: 2,
      title: "Sustainable Fashion App",
      creator: "Michael Rodriguez",
      skills: ["React Native", "Node.js"],
      status: "Starting Soon"
    },
    {
      id: 3,
      title: "Smart City Dashboard",
      creator: "Priya Patel",
      skills: ["Vue.js", "D3.js", "Python"],
      status: "Active"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      project: "Campus Navigation System",
      task: "UI/UX Design Review",
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      priority: "high"
    },
    {
      id: 2,
      project: "Mental Health Chatbot",
      task: "Beta Testing Phase",
      dueDate: new Date(Date.now() + 259200000), // 3 days
      priority: "medium"
    },
    {
      id: 3,
      project: "Energy Monitoring Platform",
      task: "Documentation Update",
      dueDate: new Date(Date.now() + 604800000), // 1 week
      priority: "low"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recruiting': return 'text-warning bg-warning/10';
      case 'Starting Soon': return 'text-primary bg-primary/10';
      case 'Active': return 'text-success bg-success/10';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diff = date - now;
    const days = Math.ceil(diff / 86400000);
    
    if (days === 1) return 'Tomorrow';
    if (days <= 7) return `${days} days`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600">Get started with common tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action) => (
            <Link
              key={action?.id}
              to={action?.link}
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-brand-lg"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 ${action?.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={action?.icon} size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {action?.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {action?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">{action?.stats}</span>
                <Icon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Bookmarks & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookmarks */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Bookmark" size={18} className="text-primary" />
                <h3 className="font-semibold text-gray-900">Recent Bookmarks</h3>
              </div>
              <Button variant="ghost" size="sm" iconName="ArrowRight">
                View All
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentBookmarks?.map((bookmark) => (
              <div key={bookmark?.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                    {bookmark?.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bookmark?.status)}`}>
                    {bookmark?.status}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">by {bookmark?.creator}</p>
                
                <div className="flex flex-wrap gap-1">
                  {bookmark?.skills?.slice(0, 2)?.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                  {bookmark?.skills?.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{bookmark?.skills?.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={18} className="text-warning" />
                <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
              </div>
              <Button variant="ghost" size="sm" iconName="Calendar">
                Calendar
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {upcomingDeadlines?.map((deadline) => (
              <div key={deadline?.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {deadline?.task}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">{deadline?.project}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(deadline?.priority)}`}>
                    {deadline?.priority}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Due {formatDueDate(deadline?.dueDate)}
                  </span>
                  <Button variant="ghost" size="sm" iconName="ExternalLink" className="text-gray-400 hover:text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;