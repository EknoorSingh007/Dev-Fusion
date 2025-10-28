import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      category: 'Main',
      items: [
        { name: 'Discovery Dashboard', path: '/discovery-dashboard', icon: 'Search', description: 'Find projects & collaborators' },
        { name: 'Project Studio', path: '/project-creation-studio', icon: 'Plus', description: 'Create new projects' },
        { name: 'Profile Hub', path: '/student-profile-hub', icon: 'User', description: 'Manage your profile' },
        { name: 'Workspace', path: '/collaboration-workspace', icon: 'Users', description: 'Active collaborations' },
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'Analytics', path: '/analytics', icon: 'BarChart3', description: 'Project insights' },
        { name: 'Resources', path: '/resources', icon: 'BookOpen', description: 'Learning materials' },
        { name: 'Calendar', path: '/calendar', icon: 'Calendar', description: 'Schedule & deadlines' },
      ]
    },
    {
      category: 'Community',
      items: [
        { name: 'Forums', path: '/forums', icon: 'MessageSquare', description: 'Discussion boards' },
        { name: 'Events', path: '/events', icon: 'Calendar', description: 'Workshops & meetups' },
        { name: 'Mentorship', path: '/mentorship', icon: 'GraduationCap', description: 'Connect with mentors' },
      ]
    }
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings', description: 'Account preferences' },
    { name: 'Help & Support', path: '/help', icon: 'HelpCircle', description: 'Get assistance' },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldShowExpanded = !isCollapsed || isHovered;

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ${
        shouldShowExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {shouldShowExpanded && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">
                Active Projects: 3
              </span>
            </div>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              onClick={onToggleCollapse}
              className={`text-gray-500 hover:text-gray-700 ${!shouldShowExpanded ? 'mx-auto' : ''}`}
            />
          )}
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.category}>
                {shouldShowExpanded && (
                  <div className="px-4 mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section?.category}
                    </h3>
                  </div>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-primary/5 border-r-2 border-primary' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${shouldShowExpanded ? 'mr-3' : 'mx-auto'}`}
                      />
                      {shouldShowExpanded && (
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item?.name}</div>
                          {item?.description && (
                            <div className="text-xs text-gray-400 truncate mt-0.5">
                              {item?.description}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {!shouldShowExpanded && (
                        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                          <div className="font-medium">{item?.name}</div>
                          {item?.description && (
                            <div className="text-xs text-gray-300 mt-1">
                              {item?.description}
                            </div>
                          )}
                          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Quick Actions */}
        {shouldShowExpanded && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Quick Start
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Join a trending project
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full mt-3 text-primary border-primary/20 hover:bg-primary/5"
              >
                Explore Now
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200">
          <div className="space-y-1 p-2">
            {bottomItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/5' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${shouldShowExpanded ? 'mr-3' : 'mx-auto'}`}
                />
                {shouldShowExpanded && (
                  <span className="truncate">{item?.name}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!shouldShowExpanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    <div className="font-medium">{item?.name}</div>
                    {item?.description && (
                      <div className="text-xs text-gray-300 mt-1">
                        {item?.description}
                      </div>
                    )}
                    <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className={`flex items-center ${shouldShowExpanded ? 'space-x-3' : 'justify-center'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} className="text-white" />
              </div>
              {shouldShowExpanded && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    Alex Johnson
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Computer Science
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;