import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DiscoveryDashboard from './pages/discovery-dashboard';
import StudentProfileHub from './pages/student-profile-hub';
import ProjectCreationStudio from './pages/project-creation-studio';
import CollaborationWorkspace from './pages/collaboration-workspace';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DiscoveryDashboard />} />
        <Route path="/discovery-dashboard" element={<DiscoveryDashboard />} />
        <Route path="/student-profile-hub" element={<StudentProfileHub />} />
        <Route path="/project-creation-studio" element={<ProjectCreationStudio />} />
        <Route path="/collaboration-workspace" element={<CollaborationWorkspace />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
