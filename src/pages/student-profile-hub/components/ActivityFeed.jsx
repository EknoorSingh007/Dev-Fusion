import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onLoadMore }) => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Activity', icon: 'Activity' },
    { id: 'projects', name: 'Projects', icon: 'FolderOpen' },
    { id: 'skills', name: 'Skills', icon: 'Award' },
    { id: 'endorsements', name: 'Endorsements', icon: 'ThumbsUp' },
    { id: 'achievements', name: 'Achievements', icon: 'Trophy' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'projects': return 'FolderPlus';
      case 'skills': return 'Award';
      case 'endorsements': return 'ThumbsUp';
      case 'achievements': return 'Trophy';
      case 'collaboration': return 'Users';
      case 'certification': return 'Certificate';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'projects': return 'bg-primary/10 text-primary';
      case 'skills': return 'bg-success/10 text-success';
      case 'endorsements': return 'bg-accent/10 text-accent';
      case 'achievements': return 'bg-secondary/10 text-secondary';
      case 'collaboration': return 'bg-warning/10 text-warning';
      case 'certification': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        
        {/* Activity Filters */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.id}
              onClick={() => setFilter(filterOption?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterOption?.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon name={filterOption?.icon} size={16} />
              <span>{filterOption?.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredActivities?.length > 0 ? (
          <div className="space-y-4">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={20} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium mb-1">
                        {activity?.title}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {activity?.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                  </div>

                  {/* Activity Details */}
                  {activity?.details && (
                    <div className="mt-3">
                      {activity?.type === 'projects' && activity?.details?.project && (
                        <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="w-10 h-10 rounded-lg overflow-hidden">
                            <Image
                              src={activity?.details?.project?.image}
                              alt={activity?.details?.project?.imageAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900">{activity?.details?.project?.name}</h4>
                            <p className="text-sm text-gray-600">{activity?.details?.project?.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ArrowRight"
                          >
                            View
                          </Button>
                        </div>
                      )}

                      {activity?.type === 'skills' && activity?.details?.skill && (
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                            {activity?.details?.skill?.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            Level: {activity?.details?.skill?.level}
                          </span>
                        </div>
                      )}

                      {activity?.type === 'endorsements' && activity?.details?.endorser && (
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={activity?.details?.endorser?.avatar}
                              alt={activity?.details?.endorser?.avatarAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{activity?.details?.endorser?.name}</span>
                            <span className="text-gray-600 text-sm ml-2">
                              endorsed you for {activity?.details?.skill}
                            </span>
                          </div>
                        </div>
                      )}

                      {activity?.type === 'achievements' && activity?.details?.achievement && (
                        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg">
                          <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center">
                            <Icon name="Trophy" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{activity?.details?.achievement?.title}</h4>
                            <p className="text-sm text-gray-600">{activity?.details?.achievement?.organization}</p>
                          </div>
                        </div>
                      )}

                      {activity?.type === 'collaboration' && activity?.details?.collaborators && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Collaborating with:</span>
                          <div className="flex -space-x-2">
                            {activity?.details?.collaborators?.slice(0, 3)?.map((collaborator, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                                title={collaborator?.name}
                              >
                                <Image
                                  src={collaborator?.avatar}
                                  alt={collaborator?.avatarAlt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {activity?.details?.collaborators?.length > 3 && (
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-600">+{activity?.details?.collaborators?.length - 3}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Activity Actions */}
                  {activity?.actions && (
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      {activity?.actions?.likes && (
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                          <Icon name="Heart" size={16} />
                          <span>{activity?.actions?.likes}</span>
                        </button>
                      )}
                      {activity?.actions?.comments && (
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                          <Icon name="MessageCircle" size={16} />
                          <span>{activity?.actions?.comments}</span>
                        </button>
                      )}
                      {activity?.actions?.shares && (
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                          <Icon name="Share2" size={16} />
                          <span>{activity?.actions?.shares}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "Start collaborating on projects to see your activity here"
                : `No ${filter} activity found`
              }
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
            >
              Start Your First Project
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredActivities?.length > 0 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={onLoadMore}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Load More Activity
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;