import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileRepository = ({ files, onFileUpload, onFileDelete, onCreateFolder }) => {
  
  const getFileIcon = (type) => {
    switch (type) {
      case 'folder': return 'Folder';
      case 'document': return 'FileText';
      case 'image': return 'Image';
      case 'code': return 'FileCode';
      default: return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-brand border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">File Repository</h2>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" iconName="FolderPlus" onClick={onCreateFolder}>
              New Folder
            </Button>
            <Button size="sm" iconName="Upload" onClick={onFileUpload}>
              Upload File
            </Button>
          </div>
        </div>
      </div>

      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Icon name={getFileIcon(file.type)} size={20} className="text-primary mr-3" />
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.createdBy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(file.modifiedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {file.type !== 'folder' ? formatFileSize(file.size) : '--'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="sm" iconName="Trash2" className="text-destructive" onClick={() => onFileDelete(file.id)} />
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileRepository;