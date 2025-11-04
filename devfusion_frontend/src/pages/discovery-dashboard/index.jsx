import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// 🟢 Re-importing ProjectSpotlight and TrendingSection
import ProjectSpotlight from './components/ProjectSpotlight';
import TrendingSection from './components/TrendingSection';
// 🟢 QuickActions has been removed

const DiscoveryDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        
        {/* 1. Hero Section (Unchanged) */}
        <div className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Unlock Your Potential.</span>
                    <span className="block text-primary xl:inline"> Build What's Next.</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    DevFusion connects students from various colleges to collaborate on innovative tech projects. It’s the perfect place to build a team, showcase your skills, and bring new ideas to life.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/register">
                        <Button size="lg" iconName="ArrowRight" iconPosition="right">
                          Start Collaborating – Sign Up
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link to="#trending">
                        <Button variant="outline" size="lg">
                          Explore Projects
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="Students collaborating" />
          </div>
        </div>
        
        {/* 🟢 2. REPLACEMENT: "How It Works" Section 🟢 */}
        <div className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">How DevFusion Works</h2>
              <p className="mt-4 text-lg text-gray-600">Get started in just three simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Step 1: Discover */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-brand-lg flex items-center justify-center mx-auto mb-5">
                  <Icon name="Search" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">1. Discover Projects</h3>
                <p className="mt-2 text-gray-600">
                  Browse a curated list of innovative projects from top university students across India.
                </p>
              </div>

              {/* Step 2: Create */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-brand-lg flex items-center justify-center mx-auto mb-5">
                  <Icon name="Plus" size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">2. Create Your Own</h3>
                <p className="mt-2 text-gray-600">
                  Have a brilliant idea? Post your own project and use our templates to recruit the perfect team.
                </p>
              </div>

              {/* Step 3: Collaborate */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-brand-lg flex items-center justify-center mx-auto mb-5">
                  <Icon name="Users" size={32} className="text-success" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">3. Collaborate & Build</h3>
                <p className="mt-2 text-gray-600">
                  Use our built-in workspace, track milestones, and turn your academic idea into a real-world success.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 3. Project Spotlight Section (Unchanged) */}
        <div className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Project Spotlight</h2>
              <p className="mt-4 text-lg text-gray-600">See the top projects being built right now on DevFusion.</p>
            </div>
            <ProjectSpotlight />
          </div>
        </div>

        {/* 4. Trending Projects Section (Unchanged) */}
        <div id="trending" className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrendingSection />
          </div>
        </div>

        {/* 5. Final Call to Action (Unchanged) */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Ready to find your team?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Create an account to start collaborating, building your portfolio, and bringing your ideas to life.
              </p>
              <div className="mt-10">
                <Link to="/register">
                  <Button size="xl" iconName="UserPlus" iconPosition="left">
                    Sign Up Now and Find Your Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default DiscoveryDashboard;