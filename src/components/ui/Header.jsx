import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // ////////////////////////////////////////////////////////////////////////
  // // CIPHER MODIFICATION 1: Placeholder for Auth State (replace with Redux)
  // ////////////////////////////////////////////////////////////////////////
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  // Dynamic action button based on login status
  const profileAction = isLoggedIn 
    ? { name: 'Profile', path: '/student-profile-hub', icon: 'User', variant: 'outline', className: 'text-gray-700' }
    : { name: 'Sign In', path: '/login', icon: 'LogIn', variant: 'primary', className: 'bg-primary text-white hover:bg-primary/90' };


  const navigationItems = [
    { name: 'Discover', path: '/discovery-dashboard', icon: 'Search' },
    { name: 'Create', path: '/project-creation-studio', icon: 'Plus' },
    // Removed Profile from here, as we handle it dynamically below
    { name: 'Workspace', path: '/collaboration-workspace', icon: 'Users' },
  ];

  const secondaryItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Notifications', path: '/notifications', icon: 'Bell' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section (No Change) */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              DevFusion
            </span>
            <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
              Academic Innovation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.name}</span>
            </Link>
          ))}
          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* // CIPHER MODIFICATION 2: Add Profile link to main nav if logged in */}
          {/* //////////////////////////////////////////////////////////////////////// */}
          {isLoggedIn && (
              <Link
                key="/student-profile-hub"
                to="/student-profile-hub"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath('/student-profile-hub')
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name="User" size={18} />
                <span>Profile</span>
              </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Secondary Actions Dropdown (No Change) */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              className="text-gray-600 hover:text-gray-900"
            >
              More
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-brand-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* // CIPHER MODIFICATION 3: Login / Profile Buttons */}
          {/* //////////////////////////////////////////////////////////////////////// */}
          <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
            {/* Notifications only shown if logged in */}
            {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  className="text-gray-600 hover:text-gray-900 relative"
                >
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                </Button>
            )}
            
            {/* Login / Profile Button */}
            <Link to={profileAction.path}>
                <Button
                  // Use solid variant for Sign In, outline for Profile
                  variant={isLoggedIn ? 'outline' : 'solid'} 
                  size="sm"
                  iconName={profileAction.icon}
                  className={profileAction.className}
                >
                  {profileAction.name}
                </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button (No Change) */}
        <Button
          variant="ghost"
          size="sm"
          iconName={isMobileMenuOpen ? 'X' : 'Menu'}
          onClick={toggleMobileMenu}
          className="lg:hidden text-gray-600"
        />
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-brand-lg">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-white' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="space-y-2">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* //////////////////////////////////////////////////////////////////////// */}
              {/* // CIPHER MODIFICATION 4: Mobile Login / Profile Actions */}
              {/* //////////////////////////////////////////////////////////////////////// */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Link to={profileAction.path} onClick={() => setIsMobileMenuOpen(false)} className="flex-1 mr-2">
                    <Button
                      variant={isLoggedIn ? 'outline' : 'solid'}
                      size="sm"
                      iconName={profileAction.icon}
                      fullWidth
                    >
                      {profileAction.name}
                    </Button>
                  </Link>
                  {isLoggedIn && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Bell"
                        className="relative"
                      >
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                      </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;