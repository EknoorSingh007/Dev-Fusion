import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GitHubIntegration = ({ repository, commits, pullRequests, onConnectRepo }) => {

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPRStatusClasses = (status) => {
    switch (status) {
      case 'open': return 'bg-success/10 text-success';
      case 'merged': return 'bg-secondary/10 text-secondary';
      case 'closed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPRIcon = (status) => {
    switch (status) {
      case 'open': return 'GitPullRequest';
      case 'merged': return 'GitMerge';
      case 'closed': return 'GitPullRequestClosed';
      default: return 'GitPullRequest';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Github" size={24} className="text-gray-900" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">GitHub Integration</h2>
              <p className="text-sm text-gray-600">Sync with your team's repository</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Sync Now
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Repository Details */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <a href={repository.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center">
              {repository.name}
              <Icon name="ExternalLink" size={14} className="ml-1.5" />
            </a>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center">
              <Icon name="GitBranch" size={14} className="mr-1" />
              {repository.branch}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{repository.stars} Stars</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="GitFork" size={14} />
              <span>{repository.forks} Forks</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Last sync: {formatTimeAgo(repository.lastSync)}</span>
            </div>
          </div>
        </div>

        {/* Commits and PRs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Commits</h3>
            <div className="space-y-3">
              {commits.map((commit) => (
                <div key={commit.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">{commit.message}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono">{commit.sha.substring(0, 7)}</span>
                    <span>by {commit.author} • {formatTimeAgo(commit.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Requests */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pull Requests</h3>
            <div className="space-y-3">
              {pullRequests.map((pr) => (
                <div key={pr.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getPRStatusClasses(pr.status)}`}>
                      {pr.status}
                    </span>
                    <span className="text-xs text-gray-500">#{pr.number}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-2">{pr.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>by {pr.author}</span>
                    <span>{formatTimeAgo(pr.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubIntegration;