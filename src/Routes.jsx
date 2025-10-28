import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Components for Structure
import Header from "./components/ui/Header"; // 🟢 NEW: Import Header component
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Existing Application Pages
import DiscoveryDashboard from './pages/discovery-dashboard';
import StudentProfileHub from './pages/student-profile-hub';
import ProjectCreationStudio from './pages/project-creation-studio';
import CollaborationWorkspace from './pages/collaboration-workspace';

// 🟢 NEW: Import the LoginPage component
import LoginPage from './pages/LoginPage'; // Path: src/pages/LoginPage/index.jsx

// Using namespace std for a clean structure!
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        
        {/* 🟢 NEW: Place the Header component here, outside the RouterRoutes, 
            so it appears on every page defined below. */}
        <Header /> 
        
        <RouterRoutes>
          {/* Existing Routes (Unchanged) */}
          <Route path="/" element={<DiscoveryDashboard />} />
          <Route path="/discovery-dashboard" element={<DiscoveryDashboard />} />
          
          {/* 🟢 NEW: Add the Login Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Existing Routes */}
          {/* Note: The login component redirects to /student-profile-hub on success */}
          <Route path="/student-profile-hub" element={<StudentProfileHub />} /> 
          <Route path="/project-creation-studio" element={<ProjectCreationStudio />} />
          <Route path="/collaboration-workspace" element={<CollaborationWorkspace />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;