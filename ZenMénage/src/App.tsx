import { useState, useEffect } from 'react';
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
import api from './services/api';

type AppState = 'landing' | 'auth' | 'app';
type Page = 'dashboard' | 'family' | 'settings';

export default function App() {
  const [appState, setAppState] = useState('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAddTask, setShowAddTask] = useState(false);
  const [userName, setUserName] = useState('Sophie');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.getCurrentUser();
      if (response.success) {
        setAppState('app');
        setUserName(response.data.user.name);
      }
    } catch (error) {
      // Not authenticated, stay on landing page
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    setAppState('auth');
  };

  const handleLogin = () => {
    setAppState('app');
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    await api.logout();
    setAppState('landing');
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-[#3A3A3A]">Chargement...</div>
      </div>
    );
  }

  if (appState === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <HeroCarousel onGetStarted={handleGetStarted} />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing onGetStarted={handleGetStarted} />
        <FAQ />
        <Blog />
        <CTA onGetStarted={handleGetStarted} />
        <Footer />
      </div>
    );
  }

  if (appState === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <div className="flex-1 pb-20 md:pb-0">
        {currentPage === 'dashboard' && <Dashboard userName={userName} />}
        {currentPage === 'family' && <FamilyPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </div>
      <MobileNav
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAddTask={() => setShowAddTask(true)}
      />
      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} />}
    </div>
  );
}
