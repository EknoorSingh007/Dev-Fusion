import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingSection = () => {
  const trendingProjects = [
  {
    id: 1,
    title: "Blockchain Voting System",
    creator: "Alex Thompson",
    institution: "Stanford University",
    image: "https://images.unsplash.com/photo-1631864032976-cef7f00fea43",
    imageAlt: "Digital voting interface on tablet with blockchain network visualization in background",
    skills: ["Blockchain", "Solidity", "React"],
    teamSize: 4,
    trending: "+45%",
    category: "Blockchain"
  },
  {
    id: 2,
    title: "AR Museum Experience",
    creator: "Emma Wilson",
    institution: "MIT",
    image: "https://images.unsplash.com/photo-1568678712969-21afe1912701",
    imageAlt: "Person wearing AR headset viewing virtual museum artifacts in modern gallery space",
    skills: ["Unity", "C#", "ARKit"],
    teamSize: 6,
    trending: "+38%",
    category: "AR/VR"
  },
  {
    id: 3,
    title: "Smart Agriculture IoT",
    creator: "David Kim",
    institution: "UC Berkeley",
    image: "https://images.unsplash.com/photo-1596818776983-a7a7e478d492",
    imageAlt: "Automated farming system with sensors monitoring crop growth in greenhouse environment",
    skills: ["IoT", "Python", "Machine Learning"],
    teamSize: 5,
    trending: "+32%",
    category: "IoT"
  },
  {
    id: 4,
    title: "Mental Health Analytics",
    creator: "Lisa Rodriguez",
    institution: "Harvard University",
    image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76",
    imageAlt: "Healthcare professional analyzing mental health data charts on multiple computer screens",
    skills: ["Data Science", "R", "Psychology"],
    teamSize: 7,
    trending: "+28%",
    category: "Healthcare"
  }];


  const trendingSkills = [
  { name: "Machine Learning", growth: "+52%", projects: 127, color: "bg-primary" },
  { name: "React Native", growth: "+41%", projects: 89, color: "bg-secondary" },
  { name: "Blockchain", growth: "+38%", projects: 64, color: "bg-accent" },
  { name: "Data Science", growth: "+35%", projects: 156, color: "bg-success" },
  { name: "UI/UX Design", growth: "+29%", projects: 203, color: "bg-warning" },
  { name: "DevOps", growth: "+24%", projects: 78, color: "bg-error" }];


  const trendingCategories = [
  { name: "AI & Machine Learning", count: 45, icon: "Brain", color: "text-primary" },
  { name: "Web Development", count: 38, icon: "Globe", color: "text-secondary" },
  { name: "Mobile Apps", count: 32, icon: "Smartphone", color: "text-accent" },
  { name: "Data Science", count: 28, icon: "BarChart3", color: "text-success" },
  { name: "Blockchain", count: 24, icon: "Link", color: "text-warning" },
  { name: "IoT & Hardware", count: 19, icon: "Cpu", color: "text-error" }];


  return (
    <div className="space-y-8">
      {/* Trending Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-warning to-accent rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Trending Projects</h2>
              <p className="text-sm text-gray-600">Most popular projects this week</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProjects?.map((project) =>
          <div key={project?.id} className="bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-brand-lg group">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-xl h-32">
                <Image
                src={project?.image}
                alt={project?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-success text-white text-xs font-semibold rounded-full">
                  <Icon name="TrendingUp" size={10} />
                  <span>{project?.trending}</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-md">
                    {project?.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {project?.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  by <span className="font-medium">{project?.creator}</span>
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project?.skills?.slice(0, 2)?.map((skill, index) =>
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {skill}
                    </span>
                )}
                  {project?.skills?.length > 2 &&
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{project?.skills?.length - 2}
                    </span>
                }
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{project?.teamSize} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="GraduationCap" size={12} />
                    <span className="truncate">{project?.institution?.split(' ')?.[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Trending Skills & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Skills */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Trending Skills</h3>
              <p className="text-sm text-gray-600">Most in-demand skills</p>
            </div>
          </div>

          <div className="space-y-3">
            {trendingSkills?.map((skill, index) =>
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${skill?.color} rounded-full`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{skill?.name}</div>
                    <div className="text-xs text-gray-500">{skill?.projects} projects</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-success font-semibold text-sm">{skill?.growth}</span>
                  <Icon name="TrendingUp" size={14} className="text-success" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trending Categories */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Grid3x3" size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Popular Categories</h3>
              <p className="text-sm text-gray-600">Top project categories</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {trendingCategories?.map((category, index) =>
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-brand group cursor-pointer">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={category?.icon} size={20} className={`${category?.color} group-hover:scale-110 transition-transform`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{category?.name}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {category?.count} active projects
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default TrendingSection;