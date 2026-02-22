import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HeroCarousel } from './components/landing/HeroCarousel';
import { Stats } from './components/landing/Stats';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { Testimonials } from './components/landing/Testimonials';
import { Pricing } from './components/landing/Pricing';
import { FAQ } from './components/landing/FAQ';
import { Blog } from './components/landing/Blog';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { Sidebar } from './components/dashboard/Sidebar';
import { FamilyPage } from './components/family/FamilyPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { MobileNav } from './components/mobile/MobileNav';
import { AddTaskModal } from './components/dashboard/AddTaskModal';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import api from './services/api';

const AppContent = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [userName, setUserName] = useState('Sophie');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.getCurrentUser();
      if (response.success) {
        setIsAuthenticated(true);
        setUserName(response.data.user.name);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-[#3A3A3A]">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage onGetStarted={() => navigate('/auth')} />} />
        <Route path="/auth" element={<AuthPage onLogin={() => {
          setIsAuthenticated(true);
          navigate('/app/dashboard');
        }} />} />

        {/* Protected App Routes */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <AppLayout
                onLogout={handleLogout}
                onAddTask={() => setShowAddTask(true)}
              >
                <Routes>
                  <Route path="dashboard" element={<Dashboard userName={userName} />} />
                  <Route path="family" element={<FamilyPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Root Redirect */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/app/dashboard" : "/"} replace />}
        />
      </Routes>
      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} />}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
