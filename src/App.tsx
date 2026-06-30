import { useState, useEffect } from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import CustomCursor from './components/CustomCursor';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';

// Tab Panels
import DashboardTab from './components/DashboardTab';
import AnalyticsTab from './components/AnalyticsTab';
import ProblemsTab from './components/ProblemsTab';
import ContestsTab from './components/ContestsTab';
import RoadmapTab from './components/RoadmapTab';
import ResumeTab from './components/ResumeTab';
import GithubTab from './components/GithubTab';
import MentorTab from './components/MentorTab';
import NotesTab from './components/NotesTab';
import LeaderboardTab from './components/LeaderboardTab';
import AchievementsTab from './components/AchievementsTab';
import ProfileTab from './components/ProfileTab';
import AdminTab from './components/AdminTab';

import { User } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Sync / Fetch initial profile credentials
  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Error loading core profile:', err));
  }, []);

  const triggerLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1200);
  };

  const triggerLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setActiveTab('dashboard');
      setIsLoading(false);
    }, 800);
  };

  const handleUpdateUser = (updated: User) => {
    setUser(updated);
  };

  // Switch content dynamically based on selected tab name
  const renderTabContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            user={user}
            setActiveTab={setActiveTab}
            onSolveQuickTask={() => setActiveTab('problems')}
          />
        );
      case 'analytics':
        return <AnalyticsTab />;
      case 'problems':
        return <ProblemsTab user={user} updateUser={handleUpdateUser} />;
      case 'contests':
        return <ContestsTab />;
      case 'roadmap':
        return <RoadmapTab />;
      case 'resume':
        return <ResumeTab />;
      case 'github':
        return <GithubTab />;
      case 'mentor':
        return <MentorTab />;
      case 'notes':
        return <NotesTab />;
      case 'leaderboard':
        return <LeaderboardTab user={user} />;
      case 'achievements':
        return <AchievementsTab />;
      case 'profile':
        return <ProfileTab user={user} updateUser={handleUpdateUser} />;
      case 'admin':
        return <AdminTab user={user} onResetUser={handleUpdateUser} />;
      default:
        return (
          <div className="p-8 text-center text-xs font-mono text-gray-500">
            Feature node segment "{activeTab}" is currently being mapped by design specialists.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F9FAFB] relative font-sans overflow-x-hidden select-none selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Top Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b_0%,transparent_50%)] opacity-40 pointer-events-none z-0"></div>
      
      {/* Interactive trailing custom cursor */}
      <CustomCursor />

      {/* Dynamic Starfield Space */}
      <StarfieldBackground />

      {/* Global Loading Overlay Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="relative w-12 h-12 rounded-full border-2 border-indigo-500/10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin" />
            <span className="text-[10px] font-mono font-bold text-indigo-400">CF</span>
          </div>
          <div className="text-[10px] font-mono uppercase text-gray-500 tracking-widest animate-pulse">
            Configuring Algorithmic Workspace Threads...
          </div>
        </div>
      )}

      {/* Primary Ingress Routings */}
      {!isLoggedIn ? (
        <LandingPage onGetStarted={triggerLogin} />
      ) : (
        user && (
          <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            onLogout={triggerLogout}
          >
            <main className="flex-1 overflow-y-auto no-scrollbar max-h-[85vh] py-2">
              {renderTabContent()}
            </main>
          </Layout>
        )
      )}

    </div>
  );
}

