import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Components for Structure
import Header from "./components/ui/Header"; 
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// --- Application Pages ---
import DiscoveryDashboard from './pages/discovery-dashboard';
import StudentProfileHub from './pages/student-profile-hub';
import ProjectCreationStudio from './pages/project-creation-studio';
import CollaborationWorkspace from './pages/collaboration-workspace';

// --- Auth Pages ---
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; // The new page

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        
        {/* Global Header appears on all pages */}
        <Header /> 
        
        <RouterRoutes>
          {/* Core App Routes */}
          <Route path="/" element={<DiscoveryDashboard />} />
          <Route path="/discovery-dashboard" element={<DiscoveryDashboard />} />
          <Route path="/student-profile-hub" element={<StudentProfileHub />} /> 
          <Route path="/project-creation-studio" element={<ProjectCreationStudio />} />
          <Route path="/collaboration-workspace" element={<CollaborationWorkspace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;