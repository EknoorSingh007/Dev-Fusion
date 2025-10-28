import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onEditProfile, onConnectGitHub }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Camera"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            Edit Cover
          </Button>
        </div>
      </div>
      {/* Profile Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 relative z-10">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-brand-lg overflow-hidden bg-gray-100">
                <Image
                  src={profile?.avatar}
                  alt={profile?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-brand hover:bg-primary/90 transition-colors">
                <Icon name="Camera" size={16} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {profile?.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {profile?.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{profile?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="GraduationCap" size={16} />
                  <span>{profile?.university}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {profile?.joinedDate}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {profile?.bio}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Message
            </Button>
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              iconName={isFollowing ? "UserCheck" : "UserPlus"}
              iconPosition="left"
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={onEditProfile}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile?.stats?.projects}</div>
            <div className="text-sm text-gray-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile?.stats?.collaborations}</div>
            <div className="text-sm text-gray-500">Collaborations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile?.stats?.followers}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile?.stats?.endorsements}</div>
            <div className="text-sm text-gray-500">Endorsements</div>
          </div>
        </div>

        {/* GitHub Integration */}
        {!profile?.githubConnected && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Github" size={20} className="text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Connect GitHub</h3>
                  <p className="text-sm text-gray-600">
                    Showcase your code contributions and repositories
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={onConnectGitHub}
              >
                Connect
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;