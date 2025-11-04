import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react'; 
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import SkillMatrix from './components/SkillMatrix';
import ProjectPortfolio from './components/ProjectPortfolio';
import AcademicBackground from './components/AcademicBackground';
import PeerEndorsements from './components/PeerEndorsements';
import ActivityFeed from './components/ActivityFeed';
import EditProfileForm from './components/EditProfileForm';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

const StudentProfileHub = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isEditMode, setIsEditMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [profileData, setProfileData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  const tabs = [
    { id: 'projects', name: 'Projects', icon: 'FolderOpen' },
    { id: 'skills', name: 'Skills', icon: 'Award' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'endorsements', name: 'Endorsements', icon: 'ThumbsUp' },
    { id: 'activity', name: 'Activity', icon: 'Activity' },
  ];

  // Fetch Profile Data on Load
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setProfileData(response.data);
        dispatch(setUser(response.data)); 
        
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]); 

  // Handle Save Profile
  const handleSaveProfile = async (formData) => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('authToken');

    try {
      // We must also update the User model for fields like name/email
      const userUpdateData = {
        first_name: formData.name.split(' ')[0],
        last_name: formData.name.split(' ').slice(1).join(' '),
      };
      
      // Update the main User model (this is just for name consistency)
      // Note: We're sending this to the profile endpoint, which will update the user
      await axios.patch('http://127.0.0.1:8000/api/profile/', userUpdateData, {
         headers: { 'Authorization': `Bearer ${token}` }
      });

      // Update the Profile model
      const response = await axios.patch('http://127.0.0.1:8000/api/profile/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setProfileData(response.data);
      dispatch(setUser(response.data)); // Update Redux store with new data
      setIsEditMode(false);
    } catch (err) {
      console.error("Save profile error:", err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };
  
  // --- Render States ---

  // 1. Loading State
  if (loading && !profileData) { 
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // 2. Error State
  if (error) {
     return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }
  
  // 3. Success State (profileData exists)
  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="mb-8">
            {isEditMode ? (
              <EditProfileForm
                profile={profileData}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditMode(false)}
                loading={loading}
              />
            ) : (
              <ProfileHeader
                profile={profileData}
                onEditProfile={handleEditProfile}
                onConnectGitHub={() => console.log('Connect GitHub')}
              />
            )}
          </div>

          {!isEditMode && (
            <>
              {/* Tab Navigation */}
              <div className="mb-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        <span>{tab?.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {activeTab === 'projects' && (
                  <ProjectPortfolio
                    // 🟢 USE THE REAL PROJECT DATA FROM THE PROFILE
                    projects={profileData?.projects || []} 
                    onViewProject={() => {}}
                    onAddProject={() => {}}
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillMatrix
                    skills={profileData?.skills || []} 
                    onEndorseSkill={() => {}}
                    onAddSkill={() => {}}
                  />
                )}
                {activeTab === 'education' && (
                  <AcademicBackground
                    education={profileData?.education || []} 
                    certifications={profileData?.certifications || []} 
                    achievements={profileData?.achievements || []} 
                  />
                )}
                {activeTab === 'endorsements' && (
                  <PeerEndorsements
                    endorsements={[]} // TODO: Replace with real data when API is ready
                    testimonials={[]} // TODO: Replace with real data when API isB ready
                    onWriteTestimonial={() => {}}
                  />
                )}
                {activeTab === 'activity' && (
                  <ActivityFeed
                    activities={[]} // TODO: Replace with real data when API is ready
                    onLoadMore={() => {}}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentProfileHub;