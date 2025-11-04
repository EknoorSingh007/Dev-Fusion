import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommunicationPanel = ({ messages, onSendMessage, teamMembers }) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage({
        id: Date.now(),
        content: newMessage,
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      });
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'chat', label: 'Team Chat', icon: 'MessageSquare' },
    { id: 'calls', label: 'Video Calls', icon: 'Video' },
    { id: 'files', label: 'Shared Files', icon: 'FileText' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-white' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Chat Content */}
      {activeTab === 'chat' && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div key={message?.id} className={`flex items-start space-x-3 ${
                message?.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className="flex-shrink-0">
                  {message?.sender === 'You' ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                  ) : (
                    <Image
                      src={message?.avatar}
                      alt={message?.avatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
                
                <div className={`flex-1 max-w-xs lg:max-w-md ${
                  message?.sender === 'You' ? 'text-right' : ''
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{message?.sender}</span>
                    <span className="text-xs text-gray-500">{formatTime(message?.timestamp)}</span>
                  </div>
                  
                  {message?.type === 'text' && (
                    <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                      message?.sender === 'You' ?'bg-primary text-white' :'bg-gray-100 text-gray-900'
                    }`}>
                      {message?.content}
                    </div>
                  )}
                  
                  {message?.type === 'file' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="FileText" size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-900">{message?.fileName}</span>
                        <Button variant="ghost" size="sm" iconName="Download" className="ml-auto" />
                      </div>
                    </div>
                  )}
                  
                  {message?.type === 'code' && (
                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
                      <pre className="text-green-400 whitespace-pre-wrap">{message?.content}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  className="resize-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Paperclip"
                  className="text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Code"
                  className="text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  onClick={handleSendMessage}
                  disabled={!newMessage?.trim()}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {/* Video Calls Tab */}
      {activeTab === 'calls' && (
        <div className="flex-1 p-6 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Video" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start a Video Call</h3>
            <p className="text-sm text-gray-600 mb-6">Connect with your team members for real-time collaboration</p>
            
            <div className="space-y-3">
              <Button
                variant="default"
                iconName="Video"
                fullWidth
              >
                Start Video Call
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                fullWidth
              >
                Start Audio Call
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Online Team Members</h4>
              <div className="space-y-2">
                {teamMembers?.filter(member => member?.isOnline)?.map((member) => (
                  <div key={member?.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={member?.avatar}
                        alt={member?.avatarAlt}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-900">{member?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Phone"
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Files Tab */}
      {activeTab === 'files' && (
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900">Shared Files</h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
            >
              Upload File
            </Button>
          </div>
          
          <div className="space-y-2">
            {[
              { name: 'project-requirements.pdf', size: '2.4 MB', type: 'pdf', uploadedBy: 'Sarah Chen', uploadedAt: '2 hours ago' },
              { name: 'wireframes.fig', size: '15.8 MB', type: 'figma', uploadedBy: 'Mike Rodriguez', uploadedAt: '1 day ago' },
              { name: 'api-documentation.md', size: '156 KB', type: 'markdown', uploadedBy: 'Alex Johnson', uploadedAt: '3 days ago' }
            ]?.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
                    <Icon name="FileText" size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{file?.name}</div>
                    <div className="text-xs text-gray-500">{file?.size} • {file?.uploadedBy} • {file?.uploadedAt}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    className="text-gray-500 hover:text-gray-700"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                    className="text-gray-500 hover:text-gray-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPanel;