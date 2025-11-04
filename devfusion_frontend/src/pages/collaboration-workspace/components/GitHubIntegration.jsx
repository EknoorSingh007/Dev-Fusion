import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GitHubIntegration = ({ repository, commits, pullRequests, onConnectRepo }) => {
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [activeTab, setActiveTab] = useState('commits');

  const handleConnectRepo = () => {
    if (repoUrl?.trim()) {
      onConnectRepo(repoUrl);
      setRepoUrl('');
      setShowConnectForm(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const tabs = [
    { id: 'commits', label: 'Recent Commits', icon: 'GitCommit' },
    { id: 'pulls', label: 'Pull Requests', icon: 'GitPullRequest' },
    { id: 'issues', label: 'Issues', icon: 'AlertCircle' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Icon name="Github" size={20} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">GitHub Integration</h3>
        </div>
        
        {!repository && (
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            onClick={() => setShowConnectForm(true)}
          >
            Connect Repository
          </Button>
        )}
      </div>
      {/* Connect Repository Form */}
      {showConnectForm && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Connect GitHub Repository</h4>
          <div className="flex items-center space-x-3">
            <Input
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleConnectRepo}
            >
              Connect
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConnectForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {repository ? (
        <>
          {/* Repository Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="GitBranch" size={20} className="text-gray-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{repository?.name}</div>
                  <div className="text-xs text-gray-500">{repository?.url}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{repository?.branch}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>{repository?.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="GitFork" size={14} />
                  <span>{repository?.forks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 mb-6 border-b border-gray-200">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Commits Tab */}
          {activeTab === 'commits' && (
            <div className="space-y-3">
              {commits?.map((commit) => (
                <div key={commit?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="GitCommit" size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">{commit?.message}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{commit?.author}</span>
                      <span>{commit?.sha?.substring(0, 7)}</span>
                      <span>{formatTimeAgo(commit?.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-600">+{commit?.additions}</span>
                    <span className="text-xs text-red-600">-{commit?.deletions}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pull Requests Tab */}
          {activeTab === 'pulls' && (
            <div className="space-y-3">
              {pullRequests?.map((pr) => (
                <div key={pr?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    pr?.status === 'open' ? 'bg-green-100 text-green-600' :
                    pr?.status === 'merged'? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Icon name="GitPullRequest" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">{pr?.title}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>#{pr?.number}</span>
                      <span>{pr?.author}</span>
                      <span>{formatTimeAgo(pr?.createdAt)}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        pr?.status === 'open' ? 'bg-green-100 text-green-600' :
                        pr?.status === 'merged'? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {pr?.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Icon name="MessageSquare" size={12} />
                      <span>{pr?.comments}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  title: "Fix responsive design on mobile devices",
                  number: 23,
                  author: "sarah-chen",
                  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                  status: 'open',
                  labels: ['bug', 'ui'],
                  comments: 3
                },
                {
                  id: 2,
                  title: "Add user authentication system",
                  number: 22,
                  author: "mike-rodriguez",
                  createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                  status: 'open',
                  labels: ['feature', 'backend'],
                  comments: 7
                }
              ]?.map((issue) => (
                <div key={issue?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="AlertCircle" size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">{issue?.title}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                      <span>#{issue?.number}</span>
                      <span>{issue?.author}</span>
                      <span>{formatTimeAgo(issue?.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {issue?.labels?.map((label) => (
                        <span key={label} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Icon name="MessageSquare" size={12} />
                      <span>{issue?.comments}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Last sync: {formatTimeAgo(repository?.lastSync)}
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                >
                  Sync Now
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                >
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* No Repository Connected */
        (<div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Github" size={32} className="text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Connect Your Repository</h4>
          <p className="text-gray-500 mb-6">
            Link your GitHub repository to track commits, pull requests, and collaborate with your team.
          </p>
          <Button
            variant="default"
            iconName="Plus"
            onClick={() => setShowConnectForm(true)}
          >
            Connect GitHub Repository
          </Button>
        </div>)
      )}
    </div>
  );
};

export default GitHubIntegration;