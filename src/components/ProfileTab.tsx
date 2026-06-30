import React, { useState } from 'react';
import { User } from '../types';
import { UserCheck, Edit3, Shield, Mail, Calendar, Settings, Sparkles, RefreshCw } from 'lucide-react';

interface ProfileTabProps {
  user: User;
  updateUser: (user: User) => void;
}

export default function ProfileTab({ user, updateUser }: ProfileTabProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [language, setLanguage] = useState('JavaScript (Node22)');
  const [theme, setTheme] = useState('AMOLED Dark');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    // Simulate database post update
    setTimeout(() => {
      updateUser({
        ...user,
        name,
        email,
        bio,
      });
      setSaving(false);
      setSuccessMsg('✅ Profile coordinates updated successfully inside secure sync db!');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">Developer Profile & Configurations</h1>
        <p className="text-xs text-gray-500 mt-0.5">Edit credentials, configure compiler language variables, and setup local interface theme configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Avatar & core stats block */}
        <div className="lg:col-span-4 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-6 flex flex-col items-center justify-center text-center">
          
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-mono text-white transition-opacity font-bold">
              ADMIN PROFILE
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold text-white">{user.name}</h3>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase tracking-wider">
              {user.role} Status
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 w-full text-center text-xs font-semibold pt-4 border-t border-gray-900">
            <div className="p-2.5 bg-gray-900/40 border border-gray-850 rounded-xl">
              <div className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">Level Index</div>
              <div className="text-white text-base font-extrabold font-mono mt-1">{user.level}</div>
            </div>
            <div className="p-2.5 bg-gray-900/40 border border-gray-850 rounded-xl">
              <div className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">Global Stand</div>
              <div className="text-white text-base font-extrabold font-mono mt-1">#{user.rank}</div>
            </div>
          </div>

          {/* Joined At */}
          <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Workspace Seeded: {new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>

        </div>

        {/* Right Side: Configuration Forms */}
        <div className="lg:col-span-8 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Update Profile Information</h3>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs font-semibold text-gray-300">
            
            {successMsg && (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/25 text-emerald-400 rounded-lg">
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-gray-400">Profile Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-sans focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400">Account Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-sans focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400">Personal Biography</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 h-20 bg-gray-900 border border-gray-800 rounded-lg text-white font-sans focus:outline-none focus:border-indigo-500/50 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-900 pt-4">
              
              <div className="space-y-1.5">
                <label className="block text-gray-400">Compiler Language Preference</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                >
                  <option>JavaScript (Node22)</option>
                  <option>TypeScript (ESNext)</option>
                  <option>Python (PyPy3)</option>
                  <option>C++ (G++17)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400">Active Screen Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                >
                  <option>AMOLED Dark</option>
                  <option>Cyberpunk Blue Neon</option>
                  <option>SaaS Minimal Light</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 text-white ${saving ? 'animate-spin' : ''}`} />
              {saving ? 'Saving changes...' : 'Save Profile Changes'}
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}
