import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FileRepository = ({ files, onFileUpload, onFileDelete, onCreateFolder }) => {
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'folder': return 'Folder';
      case 'image': return 'Image';
      case 'document': return 'FileText';
      case 'code': return 'Code';
      case 'video': return 'Video';
      case 'audio': return 'Music';
      default: return 'File';
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const filteredFiles = files?.filter(file =>
    file?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
    file?.path === currentPath
  );

  const handleCreateFolder = () => {
    if (newFolderName?.trim()) {
      onCreateFolder({
        id: Date.now(),
        name: newFolderName,
        type: 'folder',
        path: currentPath,
        createdAt: new Date()?.toISOString(),
        size: 0
      });
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  const breadcrumbPaths = currentPath?.split('/')?.filter(Boolean);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">File Repository</h3>
        <div className="flex items-center space-x-3">
          <Select
            options={viewModeOptions}
            value={viewMode}
            onChange={setViewMode}
            className="w-32"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="FolderPlus"
            onClick={() => setShowCreateFolder(true)}
          >
            New Folder
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Upload"
            onClick={onFileUpload}
          >
            Upload Files
          </Button>
        </div>
      </div>
      {/* Search and Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Home"
            onClick={() => setCurrentPath('/')}
            className="text-gray-500 hover:text-gray-700"
          />
          {breadcrumbPaths?.map((path, index) => (
            <React.Fragment key={index}>
              <Icon name="ChevronRight" size={16} className="text-gray-400" />
              <button
                onClick={() => setCurrentPath('/' + breadcrumbPaths?.slice(0, index + 1)?.join('/'))}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {path}
              </button>
            </React.Fragment>
          ))}
        </div>
        
        <div className="w-64">
          <Input
            type="search"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
      </div>
      {/* Create Folder Form */}
      {showCreateFolder && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Create New Folder</h4>
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleCreateFolder}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateFolder(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* File List/Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredFiles?.map((file) => (
            <div key={file?.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <Icon 
                    name={getFileIcon(file?.type)} 
                    size={20} 
                    className={file?.type === 'folder' ? 'text-blue-500' : 'text-gray-500'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{file?.name}</div>
                  <div className="text-xs text-gray-500">
                    {file?.type !== 'folder' && `${getFileSize(file?.size)} • `}
                    Modified {new Date(file.modifiedAt)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  className="text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share"
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles?.map((file) => (
            <div key={file?.id} className="group">
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <Icon 
                    name={getFileIcon(file?.type)} 
                    size={32} 
                    className={`mb-2 ${file?.type === 'folder' ? 'text-blue-500' : 'text-gray-500'}`} 
                  />
                  <div className="text-xs font-medium text-gray-900 truncate w-full">{file?.name}</div>
                  {file?.type !== 'folder' && (
                    <div className="text-xs text-gray-500 mt-1">{getFileSize(file?.size)}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share"
                  className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Empty State */}
      {filteredFiles?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No files found</h4>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'No files match your search criteria.' : 'This folder is empty. Upload some files to get started.'}
          </p>
          {!searchQuery && (
            <Button
              variant="default"
              iconName="Upload"
              onClick={onFileUpload}
            >
              Upload Your First File
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileRepository;