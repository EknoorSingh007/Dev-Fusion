import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CollaborationSetupForm = ({ formData, updateFormData, errors }) => {
  const communicationTools = [
    { value: 'discord', label: 'Discord' },
    { value: 'slack', label: 'Slack' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'zoom', label: 'Zoom' },
    { value: 'google-meet', label: 'Google Meet' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const projectManagementTools = [
    { value: 'trello', label: 'Trello' },
    { value: 'asana', label: 'Asana' },
    { value: 'jira', label: 'Jira' },
    { value: 'notion', label: 'Notion' },
    { value: 'clickup', label: 'ClickUp' },
    { value: 'monday', label: 'Monday.com' },
    { value: 'github-projects', label: 'GitHub Projects' }
  ];

  const fileSharingTools = [
    { value: 'google-drive', label: 'Google Drive' },
    { value: 'dropbox', label: 'Dropbox' },
    { value: 'onedrive', label: 'OneDrive' },
    { value: 'github', label: 'GitHub' },
    { value: 'gitlab', label: 'GitLab' },
    { value: 'figma', label: 'Figma (for design)' }
  ];

  const meetingFrequencies = [
    { value: 'daily', label: 'Daily standups' },
    { value: 'twice-weekly', label: 'Twice a week' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'as-needed', label: 'As needed' }
  ];

  const timezones = [
    { value: 'utc-12', label: 'UTC-12 (Baker Island)' },
    { value: 'utc-11', label: 'UTC-11 (American Samoa)' },
    { value: 'utc-10', label: 'UTC-10 (Hawaii)' },
    { value: 'utc-9', label: 'UTC-9 (Alaska)' },
    { value: 'utc-8', label: 'UTC-8 (Pacific Time)' },
    { value: 'utc-7', label: 'UTC-7 (Mountain Time)' },
    { value: 'utc-6', label: 'UTC-6 (Central Time)' },
    { value: 'utc-5', label: 'UTC-5 (Eastern Time)' },
    { value: 'utc-4', label: 'UTC-4 (Atlantic Time)' },
    { value: 'utc-3', label: 'UTC-3 (Brazil)' },
    { value: 'utc-2', label: 'UTC-2 (Mid-Atlantic)' },
    { value: 'utc-1', label: 'UTC-1 (Azores)' },
    { value: 'utc+0', label: 'UTC+0 (London, Dublin)' },
    { value: 'utc+1', label: 'UTC+1 (Central Europe)' },
    { value: 'utc+2', label: 'UTC+2 (Eastern Europe)' },
    { value: 'utc+3', label: 'UTC+3 (Moscow)' },
    { value: 'utc+4', label: 'UTC+4 (Dubai)' },
    { value: 'utc+5', label: 'UTC+5 (Pakistan)' },
    { value: 'utc+5:30', label: 'UTC+5:30 (India)' },
    { value: 'utc+6', label: 'UTC+6 (Bangladesh)' },
    { value: 'utc+7', label: 'UTC+7 (Thailand)' },
    { value: 'utc+8', label: 'UTC+8 (China, Singapore)' },
    { value: 'utc+9', label: 'UTC+9 (Japan, Korea)' },
    { value: 'utc+10', label: 'UTC+10 (Australia East)' },
    { value: 'utc+11', label: 'UTC+11 (Solomon Islands)' },
    { value: 'utc+12', label: 'UTC+12 (New Zealand)' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Collaboration Setup</h3>
          <p className="text-sm text-gray-600">Configure how your team will work together</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Communication Platform"
          placeholder="Select communication tool"
          options={communicationTools}
          value={formData?.communicationTool}
          onChange={(value) => updateFormData('communicationTool', value)}
          error={errors?.communicationTool}
          required
          description="Primary tool for team communication"
        />

        <Select
          label="Project Management Tool"
          placeholder="Select project management tool"
          options={projectManagementTools}
          value={formData?.projectManagementTool}
          onChange={(value) => updateFormData('projectManagementTool', value)}
          error={errors?.projectManagementTool}
          required
          description="Tool for tracking tasks and progress"
        />

        <Select
          label="File Sharing Platform"
          placeholder="Select file sharing tool"
          options={fileSharingTools}
          value={formData?.fileSharingTool}
          onChange={(value) => updateFormData('fileSharingTool', value)}
          multiple
          searchable
          description="Platforms for sharing files and documents"
        />

        <Select
          label="Meeting Frequency"
          placeholder="Select meeting frequency"
          options={meetingFrequencies}
          value={formData?.meetingFrequency}
          onChange={(value) => updateFormData('meetingFrequency', value)}
          error={errors?.meetingFrequency}
          required
          description="How often will the team meet"
        />

        <Select
          label="Primary Timezone"
          placeholder="Select your timezone"
          options={timezones}
          value={formData?.timezone}
          onChange={(value) => updateFormData('timezone', value)}
          error={errors?.timezone}
          required
          searchable
          description="Your primary timezone for scheduling"
        />

        <div className="space-y-4">
          <Input
            label="Preferred Meeting Time"
            type="time"
            value={formData?.preferredMeetingTime}
            onChange={(e) => updateFormData('preferredMeetingTime', e?.target?.value)}
            description="Your preferred time for team meetings"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Collaboration Preferences
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Real-time collaboration"
            checked={formData?.realTimeCollaboration}
            onChange={(e) => updateFormData('realTimeCollaboration', e?.target?.checked)}
            description="Live coding sessions and pair programming"
          />
          <Checkbox
            label="Asynchronous work"
            checked={formData?.asynchronousWork}
            onChange={(e) => updateFormData('asynchronousWork', e?.target?.checked)}
            description="Team members can work at different times"
          />
          <Checkbox
            label="Code reviews required"
            checked={formData?.codeReviews}
            onChange={(e) => updateFormData('codeReviews', e?.target?.checked)}
            description="All code changes must be reviewed"
          />
          <Checkbox
            label="Daily standups"
            checked={formData?.dailyStandups}
            onChange={(e) => updateFormData('dailyStandups', e?.target?.checked)}
            description="Brief daily progress meetings"
          />
          <Checkbox
            label="Sprint planning"
            checked={formData?.sprintPlanning}
            onChange={(e) => updateFormData('sprintPlanning', e?.target?.checked)}
            description="Organize work in sprints/iterations"
          />
          <Checkbox
            label="Documentation required"
            checked={formData?.documentationRequired}
            onChange={(e) => updateFormData('documentationRequired', e?.target?.checked)}
            description="Maintain project documentation"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Communication Guidelines
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Describe your expectations for team communication, response times, meeting etiquette, etc."
          value={formData?.communicationGuidelines}
          onChange={(e) => updateFormData('communicationGuidelines', e?.target?.value)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Optional: Set clear expectations for how the team should communicate
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GitHub Repository Details
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Repository Name"
            type="text"
            placeholder="my-awesome-project"
            value={formData?.repositoryName}
            onChange={(e) => updateFormData('repositoryName', e?.target?.value)}
            description="GitHub repository name (optional)"
          />
          <div className="space-y-3">
            <Checkbox
              label="Public repository"
              checked={formData?.publicRepository}
              onChange={(e) => updateFormData('publicRepository', e?.target?.checked)}
              description="Make repository visible to everyone"
            />
            <Checkbox
              label="Include README template"
              checked={formData?.includeReadme}
              onChange={(e) => updateFormData('includeReadme', e?.target?.checked)}
              description="Generate project README file"
            />
          </div>
        </div>
      </div>
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Users" size={20} className="text-orange-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-orange-900">Collaboration Success</h4>
            <p className="text-sm text-orange-700 mt-1">
              Clear communication and well-defined processes are key to successful collaboration. 
              Set expectations early and choose tools that all team members are comfortable with or willing to learn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSetupForm;