import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Import all components
import ProjectCard from './components/ProjectCard';
import FilterSidebar from './components/FilterSidebar';
import ProjectSpotlight from './components/ProjectSpotlight';
import TrendingSection from './components/TrendingSection';
import RecommendationEngine from './components/RecommendationEngine';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';

const DiscoveryDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSidebarVisible, setFilterSidebarVisible] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState(new Set([1, 3, 5]));
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'all',
    duration: 'all',
    status: 'all',
    skills: [],
    availableToJoin: false,
    remoteFriendly: false,
    interCollege: false,
    beginnerFriendly: false,
    minTeamSize: '',
    maxTeamSize: ''
  });

  // Check localStorage for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Campus Navigation System",
    description: `Revolutionary mobile application that uses machine learning to provide real-time indoor navigation across university campuses.\n\nFeaturing augmented reality overlays, crowd-sourced accessibility data, and integration with campus services for a seamless student experience.`,
    image: "https://images.unsplash.com/photo-1588959293268-484c415422d8",
    imageAlt: "Modern university campus with students walking between glass buildings and green spaces",
    creator: "Sarah Chen",
    institution: "MIT & Stanford",
    skills: ["React Native", "TensorFlow", "AR Kit", "Node.js", "MongoDB"],
    teamSize: 6,
    duration: "4 months",
    difficulty: "Advanced",
    status: "Active",
    rating: 4.9,
    progress: 75,
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description: `Mobile app connecting eco-conscious consumers with sustainable fashion brands.\n\nFeatures carbon footprint tracking, virtual try-on using AR, and blockchain-based authenticity verification for sustainable materials.`,
    image: "https://images.unsplash.com/photo-1654525481124-da9fbd74cb42",
    imageAlt: "Eco-friendly clothing displayed on wooden hangers with green plants in sustainable fashion store",
    creator: "Michael Rodriguez",
    institution: "UC Berkeley",
    skills: ["React Native", "Node.js", "MongoDB", "UI/UX", "Blockchain"],
    teamSize: 5,
    duration: "3 months",
    difficulty: "Intermediate",
    status: "Recruiting",
    rating: 4.7,
    progress: 25,
    category: "E-commerce"
  },
  {
    id: 3,
    title: "Mental Health Support Chatbot",
    description: `AI-driven conversational assistant providing 24/7 mental health support for college students.\n\nIntegrates with campus counseling services and uses natural language processing to provide personalized coping strategies and resources.`,
    image: "https://images.unsplash.com/photo-1582457449697-01a4e1c645f2",
    imageAlt: "Diverse group of students sitting in circle having supportive conversation in modern campus lounge",
    creator: "Priya Patel",
    institution: "Harvard & NYU",
    skills: ["NLP", "Python", "React", "Psychology", "TensorFlow"],
    teamSize: 4,
    duration: "5 months",
    difficulty: "Advanced",
    status: "Starting Soon",
    rating: 4.8,
    progress: 60,
    category: "Healthcare"
  },
  {
    id: 4,
    title: "Smart Agriculture IoT Platform",
    description: `Comprehensive IoT solution for monitoring and optimizing crop growth using sensor networks.\n\nCombines real-time environmental data with machine learning predictions to maximize yield while minimizing resource usage.`,
    image: "https://images.unsplash.com/photo-1596818776983-a7a7e478d492",
    imageAlt: "Automated farming system with sensors monitoring crop growth in greenhouse environment",
    creator: "David Kim",
    institution: "UC Davis & Caltech",
    skills: ["IoT", "Python", "Machine Learning", "React", "Arduino"],
    teamSize: 7,
    duration: "6 months",
    difficulty: "Intermediate",
    status: "Active",
    rating: 4.6,
    progress: 40,
    category: "IoT"
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: `Secure and transparent digital voting platform using blockchain technology.\n\nEnsures vote integrity, provides real-time results, and maintains voter anonymity while enabling full audit capabilities.`,
    image: "https://images.unsplash.com/photo-1631864032976-cef7f00fea43",
    imageAlt: "Digital voting interface on tablet with blockchain network visualization in background",
    creator: "Alex Thompson",
    institution: "Stanford University",
    skills: ["Blockchain", "Solidity", "React", "Web3", "Cryptography"],
    teamSize: 5,
    duration: "4 months",
    difficulty: "Advanced",
    status: "Recruiting",
    rating: 4.9,
    progress: 15,
    category: "Blockchain"
  },
  {
    id: 6,
    title: "AR Museum Experience Platform",
    description: `Augmented reality application that brings museum exhibits to life with interactive 3D models and historical recreations.\n\nFeatures multi-language support, accessibility options, and gamified learning experiences for visitors of all ages.`,
    image: "https://images.unsplash.com/photo-1568678712969-21afe1912701",
    imageAlt: "Person wearing AR headset viewing virtual museum artifacts in modern gallery space",
    creator: "Emma Wilson",
    institution: "MIT",
    skills: ["Unity", "C#", "ARKit", "3D Modeling", "UI/UX"],
    teamSize: 6,
    duration: "5 months",
    difficulty: "Intermediate",
    status: "Active",
    rating: 4.7,
    progress: 55,
    category: "AR/VR"
  }];


  const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'team-size', label: 'Team Size' },
  { value: 'progress', label: 'Progress' }];


  const handleBookmark = (projectId) => {
    const newBookmarks = new Set(bookmarkedProjects);
    if (newBookmarks?.has(projectId)) {
      newBookmarks?.delete(projectId);
    } else {
      newBookmarks?.add(projectId);
    }
    setBookmarkedProjects(newBookmarks);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      difficulty: 'all',
      duration: 'all',
      status: 'all',
      skills: [],
      availableToJoin: false,
      remoteFriendly: false,
      interCollege: false,
      beginnerFriendly: false,
      minTeamSize: '',
      maxTeamSize: ''
    });
  };

  const filteredProjects = mockProjects?.filter((project) => {
    // Search filter
    if (filters?.search && !project?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !project?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !project?.creator?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Difficulty filter
    if (filters?.difficulty !== 'all' && project?.difficulty?.toLowerCase() !== filters?.difficulty) {
      return false;
    }

    // Status filter
    if (filters?.status !== 'all' && project?.status?.toLowerCase()?.replace(' ', '-') !== filters?.status) {
      return false;
    }

    // Skills filter
    if (filters?.skills?.length > 0) {
      const hasMatchingSkill = filters?.skills?.some((skill) =>
      project?.skills?.some((projectSkill) =>
      projectSkill?.toLowerCase()?.includes(skill?.toLowerCase())
      )
      );
      if (!hasMatchingSkill) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="flex">
            {/* Filter Sidebar */}
            {filterSidebarVisible &&
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters} />

            }

            {/* Main Content */}
            <main className={`flex-1 p-6 transition-all duration-300 ${filterSidebarVisible ? 'ml-80' : 'ml-0'}`}>
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Discovery Dashboard</h1>
                    <p className="text-gray-600">Find your next collaboration opportunity</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Filter"
                      onClick={() => setFilterSidebarVisible(!filterSidebarVisible)}>

                      {filterSidebarVisible ? 'Hide' : 'Show'} Filters
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Bell"
                      className="relative">

                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                    </Button>
                  </div>
                </div>

                {/* Project Spotlight */}
                <ProjectSpotlight />

                {/* Search & Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex-1 lg:max-w-md">
                    <Input
                      type="search"
                      placeholder="Search projects, skills, or creators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full" />

                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      placeholder="Sort by"
                      className="w-40" />

                    
                    <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        iconName="Grid3x3"
                        onClick={() => setViewMode('grid')} />

                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        iconName="List"
                        onClick={() => setViewMode('list')} />

                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <QuickActions />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Projects Section */}
                  <div className="xl:col-span-2 space-y-8">
                    {/* Trending Section */}
                    <TrendingSection />

                    {/* Projects Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">All Projects</h2>
                          <p className="text-sm text-gray-600">{filteredProjects?.length} projects found</p>
                        </div>
                        <Button variant="outline" size="sm" iconName="ArrowUpDown">
                          Sort
                        </Button>
                      </div>

                      <div className={`grid gap-6 ${
                      viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`
                      }>
                        {filteredProjects?.map((project) =>
                        <ProjectCard
                          key={project?.id}
                          project={project}
                          onBookmark={handleBookmark}
                          isBookmarked={bookmarkedProjects?.has(project?.id)} />

                        )}
                      </div>

                      {filteredProjects?.length === 0 &&
                      <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="Search" size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                          <Button variant="outline" onClick={clearFilters}>
                            Clear Filters
                          </Button>
                        </div>
                      }
                    </div>
                  </div>

                  {/* Sidebar Content */}
                  <div className="space-y-8">
                    {/* Recommendation Engine */}
                    <RecommendationEngine />

                    {/* Activity Feed */}
                    <ActivityFeed />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>);

};

export default DiscoveryDashboard;