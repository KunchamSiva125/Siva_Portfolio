import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../admin/Login';
import DashboardLayout from '../admin/DashboardLayout';
import ProtectedRoute from '../admin/ProtectedRoute';

// Admin Modules
import ProfileManager from '../admin/modules/ProfileManager';
import SkillsManager from '../admin/modules/SkillsManager';
import CertificationsManager from '../admin/modules/CertificationsManager';
import EducationManager from '../admin/modules/EducationManager';
import ExperienceManager from '../admin/modules/ExperienceManager';
import ProjectManager from '../admin/modules/ProjectManager';
import ContactMessages from '../admin/modules/ContactMessages';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard/profile" replace />} />
        <Route path="profile" element={<ProfileManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="projects" element={<ProjectManager />} />
        <Route path="certifications" element={<CertificationsManager />} />
        <Route path="education" element={<EducationManager />} />
        <Route path="messages" element={<ContactMessages />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
