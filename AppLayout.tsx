import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import PathwaySelector from './PathwaySelector';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import MusicUpload from './MusicUpload';
import VideoUpload from './VideoUpload';
import UserRegistration from './UserRegistration';
import TermsConditions from './TermsConditions';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  
  const [appState, setAppState] = useState<{
    user: any;
    currentView: string;
    pathway: 'music' | 'video' | null;
    showTerms: boolean;
    termsContext: 'signup' | 'submission';
  }>({
    user: null,
    currentView: 'pathway-selector',
    pathway: null,
    showTerms: false,
    termsContext: 'signup'
  });

  const handlePathwaySelect = (pathway: 'music' | 'video') => {
    setAppState(prev => ({ ...prev, pathway, currentView: 'registration' }));
  };

  const handleRegistrationComplete = (userData: any) => {
    setAppState(prev => ({ 
      ...prev, 
      showTerms: true, 
      termsContext: 'signup',
      user: { ...userData, role: 'artist' }
    }));
  };

  const handleTermsAccept = () => {
    if (appState.termsContext === 'signup') {
      setAppState(prev => ({ 
        ...prev, 
        showTerms: false, 
        currentView: 'dashboard' 
      }));
    } else {
      setAppState(prev => ({ ...prev, showTerms: false }));
    }
  };

  const handleTermsDecline = () => {
    if (appState.termsContext === 'signup') {
      setAppState(prev => ({ 
        ...prev, 
        showTerms: false, 
        currentView: 'pathway-selector',
        user: null 
      }));
    } else {
      setAppState(prev => ({ ...prev, showTerms: false }));
    }
  };

  const handleViewChange = (view: string) => {
    if (view.includes('upload')) {
      setAppState(prev => ({ 
        ...prev, 
        showTerms: true, 
        termsContext: 'submission',
        currentView: view 
      }));
    } else {
      setAppState(prev => ({ ...prev, currentView: view }));
    }
  };

  const handleLogout = () => {
    setAppState({
      user: null,
      currentView: 'pathway-selector',
      pathway: null,
      showTerms: false,
      termsContext: 'signup'
    });
  };

  // Show terms overlay
  if (appState.showTerms) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TermsConditions
          context={appState.termsContext}
          onAccept={handleTermsAccept}
          onDecline={handleTermsDecline}
        />
      </div>
    );
  }

  // Show pathway selector for new users
  if (appState.currentView === 'pathway-selector') {
    return <PathwaySelector onSelectPathway={handlePathwaySelect} />;
  }

  // Show registration form
  if (appState.currentView === 'registration') {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserRegistration onComplete={handleRegistrationComplete} />
      </div>
    );
  }

  // Main app layout for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentView={appState.currentView}
        onViewChange={handleViewChange}
        userRole={appState.user?.role || 'artist'}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header
          onMenuClick={toggleSidebar}
          user={appState.user}
          onLogout={handleLogout}
        />

        <main className="min-h-screen">
          {appState.currentView === 'dashboard' && <Dashboard />}
          {appState.currentView === 'admin-dashboard' && <AdminDashboard />}
          {appState.currentView === 'music-upload' && <MusicUpload />}
          {appState.currentView === 'video-upload' && <VideoUpload />}
          
          {/* Placeholder for other views */}
          {!['dashboard', 'admin-dashboard', 'music-upload', 'video-upload'].includes(appState.currentView) && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {appState.currentView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h1>
                <p className="text-gray-600">This feature is coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AppLayout;