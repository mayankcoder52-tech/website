import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Cpu,
  Compass,
  FileText,
  Github,
  BookOpen,
  Trophy,
  Award,
  Settings,
  Bell,
  MessageSquare,
  LogOut,
  ChevronDown,
  User as UserIcon,
  Search,
  Sparkles,
  Menu,
  X,
  Database
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function Layout({ user, activeTab, setActiveTab, onLogout, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'problems', label: 'Problems IDE', icon: Cpu },
    { id: 'contests', label: 'Contests Pred', icon: Trophy },
    { id: 'roadmap', label: 'AI Roadmap', icon: Compass },
    { id: 'resume', label: 'Resume ATS', icon: FileText },
    { id: 'github', label: 'GitHub Audit', icon: Github },
    { id: 'mentor', label: 'AI Mentor Chat', icon: Sparkles },
    { id: 'notes', label: 'MD Notes', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  if (user.role === 'Admin') {
    menuItems.push({ id: 'admin', label: 'Admin Control', icon: Database });
  }

  const notifications = [
    { id: '1', text: '🔥 You advanced your streak to 7 days! Keep pushing!', time: '10m ago' },
    { id: '2', text: '🏆 Achievement unlocked: DP Architect (+250 XP)', time: '2h ago' },
    { id: '3', text: '⚡ Virtual Contests updated with prediction logs', time: '1d ago' },
  ];

  const handleMenuClick = (id: string) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F9FAFB] flex flex-col md:flex-row relative">
      
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-black text-white text-xs">C</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-white">CODEFORGE<span className="text-blue-500 font-semibold">AI</span></span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar - Desktop and Mobile Drawer */}
      <aside
        id="side-bar"
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-black/40 backdrop-blur-md border-r border-white/10 z-50 flex flex-col justify-between p-6 transition-transform duration-300 transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto no-scrollbar flex-1 pr-2">
          
          {/* Sidebar Brand & Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-black text-white text-base">C</span>
              </div>
              <span className="text-base font-bold tracking-tight text-white">CODEFORGE<span className="text-blue-500">AI</span></span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Mini Profile */}
          <div className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] font-mono text-indigo-400 font-medium">Level {user.level} (XP {user.xp})</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left relative cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-indigo-500 text-indigo-400'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                  {item.label}
                  {item.id === 'mentor' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="pt-6 border-t border-gray-800/80 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-gray-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout Workspace
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/10">
          
          {/* Left search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search problems, topics, achievements..."
              className="w-full pl-9 pr-4 py-1.5 bg-gray-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          {/* Right Header Navigation Panel */}
          <div className="flex items-center gap-6 relative">
            
            {/* Level Metric indicator */}
            <div className="flex items-center gap-2.5 text-xs text-gray-400 bg-gray-900/30 px-3 py-1 border border-gray-800 rounded-lg">
              <span className="font-mono text-[10px] text-indigo-400">XP Streak: {user.streak} days</span>
              <div className="w-20 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(user.xp % 1000) / 10}%` }} />
              </div>
            </div>

            {/* Notification triggers */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-gray-400 hover:text-white border border-gray-800 rounded-lg hover:bg-gray-800/40 relative cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
              </button>

              {/* Notification Dialog */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="text-xs font-bold text-white flex justify-between items-center pb-2 border-b border-gray-800">
                    <span>Notifications</span>
                    <button onClick={() => setNotificationsOpen(false)} className="text-[10px] text-gray-500 hover:text-white">Close</button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-2 hover:bg-gray-800/40 rounded-lg space-y-1">
                        <p className="text-xs text-gray-300 leading-normal">{notif.text}</p>
                        <span className="text-[10px] font-mono text-gray-500">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7.5 h-7.5 rounded-lg border border-indigo-500/20 object-cover"
                />
                <span className="font-semibold">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-800 rounded-xl p-2 shadow-2xl z-50 space-y-1">
                  <button
                    onClick={() => { setActiveTab('profile'); setProfileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white cursor-pointer"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => { setActiveTab('settings'); setProfileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white cursor-pointer"
                  >
                    Account Settings
                  </button>
                  <div className="border-t border-gray-800 my-1" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/5 rounded-lg cursor-pointer font-medium"
                  >
                    Logout Workspace
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Embedded Children Panels */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative min-h-0">
          {children}
        </main>
      </div>

    </div>
  );
}
