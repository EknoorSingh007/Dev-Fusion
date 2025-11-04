import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
  {
    id: 1,
    type: 'project_joined',
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in white blazer"
    },
    project: "AI-Powered Campus Navigation",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    details: "Joined as UI/UX Designer"
  },
  {
    id: 2,
    type: 'project_created',
    user: {
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1617711084511-5671fc295c50",
      avatarAlt: "Professional headshot of Hispanic man with short beard in navy blue shirt"
    },
    project: "Sustainable Energy Monitoring Platform",
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    details: "Looking for 3 more team members"
  },
  {
    id: 3,
    type: 'milestone_completed',
    user: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1599793070176-a23a4f626f37",
      avatarAlt: "Professional headshot of Indian woman with long dark hair in light blue top"
    },
    project: "Mental Health Support Chatbot",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    details: "Completed MVP development phase"
  },
  {
    id: 4,
    type: 'skill_endorsed',
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1706823906110-40052599e7d3",
      avatarAlt: "Professional headshot of young Caucasian man with brown hair in gray sweater"
    },
    endorser: "Emma Wilson",
    skill: "React Development",
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
    details: "Endorsed for excellent work on previous project"
  },
  {
    id: 5,
    type: 'project_featured',
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1711602324914-9f78d3743be7",
      avatarAlt: "Professional headshot of Korean man with glasses in dark blue suit"
    },
    project: "Smart Agriculture IoT System",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    details: "Featured in weekly project spotlight"
  },
  {
    id: 6,
    type: 'collaboration_started',
    user: {
      name: "Lisa Rodriguez",
      avatar: "https://images.unsplash.com/photo-1687742179907-5a6b758f67f2",
      avatarAlt: "Professional headshot of Latina woman with curly hair in red blazer"
    },
    project: "Blockchain Voting System",
    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
    details: "Started collaboration with MIT team"
  },
  {
    id: 7,
    type: 'achievement_unlocked',
    user: {
      name: "Tom Wilson",
      avatar: "https://images.unsplash.com/photo-1544351897-7fa83e8a0796",
      avatarAlt: "Professional headshot of Caucasian man with blonde hair in green shirt"
    },
    achievement: "Team Player",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    details: "Completed 5 successful collaborations"
  },
  {
    id: 8,
    type: 'project_updated',
    user: {
      name: "Anna Rodriguez",
      avatar: "https://images.unsplash.com/photo-1713357831326-25405f331936",
      avatarAlt: "Professional headshot of young Latina woman with straight hair in purple top"
    },
    project: "AR Museum Experience",
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    details: "Added new AR features and documentation"
  }];


  const filterOptions = [
  { value: 'all', label: 'All Activity', icon: 'Activity' },
  { value: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { value: 'collaborations', label: 'Collaborations', icon: 'Users' },
  { value: 'achievements', label: 'Achievements', icon: 'Award' }];


  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_joined':return { icon: 'UserPlus', color: 'text-success bg-success/10' };
      case 'project_created':return { icon: 'Plus', color: 'text-primary bg-primary/10' };
      case 'milestone_completed':return { icon: 'CheckCircle', color: 'text-success bg-success/10' };
      case 'skill_endorsed':return { icon: 'Award', color: 'text-warning bg-warning/10' };
      case 'project_featured':return { icon: 'Star', color: 'text-accent bg-accent/10' };
      case 'collaboration_started':return { icon: 'Users', color: 'text-secondary bg-secondary/10' };
      case 'achievement_unlocked':return { icon: 'Trophy', color: 'text-warning bg-warning/10' };
      case 'project_updated':return { icon: 'Edit', color: 'text-primary bg-primary/10' };
      default:return { icon: 'Activity', color: 'text-gray-500 bg-gray-100' };
    }
  };

  const getActivityText = (activity) => {
    switch (activity?.type) {
      case 'project_joined':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> joined </span>
            <span className="font-medium text-primary">{activity?.project}</span>
          </>);

      case 'project_created':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> created </span>
            <span className="font-medium text-primary">{activity?.project}</span>
          </>);

      case 'milestone_completed':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> completed a milestone in </span>
            <span className="font-medium text-primary">{activity?.project}</span>
          </>);

      case 'skill_endorsed':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.endorser}</span>
            <span className="text-gray-600"> endorsed </span>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> for </span>
            <span className="font-medium text-primary">{activity?.skill}</span>
          </>);

      case 'project_featured':
        return (
          <>
            <span className="font-medium text-primary">{activity?.project}</span>
            <span className="text-gray-600"> by </span>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> was featured</span>
          </>);

      case 'collaboration_started':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> started collaborating on </span>
            <span className="font-medium text-primary">{activity?.project}</span>
          </>);

      case 'achievement_unlocked':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> unlocked </span>
            <span className="font-medium text-warning">{activity?.achievement}</span>
            <span className="text-gray-600"> achievement</span>
          </>);

      case 'project_updated':
        return (
          <>
            <span className="font-medium text-gray-900">{activity?.user?.name}</span>
            <span className="text-gray-600"> updated </span>
            <span className="font-medium text-primary">{activity?.project}</span>
          </>);

      default:
        return <span className="text-gray-600">Unknown activity</span>;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredActivities = activities?.filter((activity) => {
    if (filter === 'all') return true;
    if (filter === 'projects') return ['project_joined', 'project_created', 'project_featured', 'project_updated']?.includes(activity?.type);
    if (filter === 'collaborations') return ['collaboration_started', 'project_joined']?.includes(activity?.type);
    if (filter === 'achievements') return ['achievement_unlocked', 'skill_endorsed', 'milestone_completed']?.includes(activity?.type);
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600">Stay updated with your network</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {filterOptions?.map((option) =>
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            filter === option?.value ?
            'bg-white text-primary shadow-sm' :
            'text-gray-600 hover:text-gray-900'}`
            }>

              <Icon name={option?.icon} size={14} />
              <span>{option?.label}</span>
            </button>
          )}
        </div>
      </div>
      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {filteredActivities?.map((activity) => {
            const activityIcon = getActivityIcon(activity?.type);

            return (
              <div key={activity?.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  {/* Activity Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activityIcon?.color}`}>
                    <Icon name={activityIcon?.icon} size={14} />
                  </div>

                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={activity?.user?.avatar}
                      alt={activity?.user?.avatarAlt}
                      className="w-full h-full object-cover" />

                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm mb-1">
                      {getActivityText(activity)}
                    </div>
                    {activity?.details &&
                    <p className="text-xs text-gray-500 mb-2">{activity?.details}</p>
                    }
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{getTimeAgo(activity?.timestamp)}</span>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" iconName="Heart" className="text-gray-400 hover:text-error" />
                        <Button variant="ghost" size="sm" iconName="MessageCircle" className="text-gray-400 hover:text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="text-primary hover:bg-primary/5">

          View All Activity
        </Button>
      </div>
    </div>);

};

export default ActivityFeed;