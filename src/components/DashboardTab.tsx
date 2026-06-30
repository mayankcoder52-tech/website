import {
  Award,
  Zap,
  Cpu,
  Trophy,
  ArrowRight,
  MessageSquare,
  FileText,
  Compass,
  CheckCircle,
  Plus
} from 'lucide-react';
import { User, ActivityLog } from '../types';

interface DashboardTabProps {
  user: User;
  setActiveTab: (tab: string) => void;
  onSolveQuickTask: () => void;
}

export default function DashboardTab({ user, setActiveTab, onSolveQuickTask }: DashboardTabProps) {
  // Generate mock heatmap data (52 weeks x 7 days)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = 53;
  const heatmapData = Array.from({ length: weeks * 7 }, (_, i) => {
    // Make recent days have more active colors
    const rand = Math.random();
    if (i > weeks * 7 - 14) return rand > 0.3 ? (rand > 0.7 ? 3 : 2) : 1;
    if (rand > 0.85) return rand > 0.94 ? 3 : (rand > 0.9 ? 2 : 1);
    return 0;
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]';
      case 2: return 'bg-indigo-700';
      case 1: return 'bg-indigo-900/60';
      default: return 'bg-gray-800/40 border border-gray-900';
    }
  };

  const recentLogs: ActivityLog[] = [
    { id: '1', type: 'problem_solved', title: 'Solved "Two Sum Matrix"', timestamp: '15 mins ago', xpEarned: 150 },
    { id: '2', type: 'achievement_unlocked', title: 'Unlocked "Consistent Alchemist" Badge', timestamp: '2 hours ago', xpEarned: 250 },
    { id: '3', type: 'note_created', title: 'Created Note: Dijkstra Priority Queue Optimization', timestamp: '1 day ago', xpEarned: 50 },
    { id: '4', type: 'contest_joined', title: 'Simulated Predictor forecast for Cup #14', timestamp: '2 days ago', xpEarned: 20 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Greeting Card */}
      <div className="relative p-8 bg-gradient-to-r from-gray-900 via-gray-950 to-indigo-950/20 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold uppercase tracking-wider font-mono">
            Active Workspace
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">{user.name}</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            You are currently on an active <strong className="text-white font-mono">{user.streak}-day solving streak</strong>. Your rating predictions remain high. Complete algorithmic practice tasks today to advance to Level {user.level + 1}.
          </p>
        </div>
      </div>

      {/* 2. Micro Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* XP Status Card */}
        <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">XP Level Progress</span>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{user.xp} <span className="text-xs text-gray-500 font-normal">XP</span></div>
          <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
            <span>Level {user.level}</span>
            <span>{1000 - (user.xp % 1000)} XP to Next</span>
          </div>
          <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden mt-3">
            <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${(user.xp % 1000) / 10}%` }} />
          </div>
        </div>

        {/* Practice Streak Card */}
        <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">Active Streak</span>
            <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-pink-400" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{user.streak} <span className="text-xs text-gray-500 font-normal">Days</span></div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-wider">Top 4.2% of general users</p>
        </div>

        {/* Completed Problems Card */}
        <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/5 rounded-full blur-xl group-hover:bg-violet-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">Problems Solved</span>
            <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <Cpu className="w-4 h-4 text-violet-400" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">18 / 340</div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-wider">12% completion efficiency</p>
        </div>

        {/* Global Ranking Card */}
        <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">Global Rank</span>
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">#{user.rank}</div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-wider">Target: Top 100 global tier</p>
        </div>

      </div>

      {/* 3. Heatmap contribution chart */}
      <div className="p-6 bg-gray-950/20 border border-gray-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Daily Learning Activity</h3>
            <p className="text-xs text-gray-500">Your visual solving frequency mapped across 53 grid weeks.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded bg-gray-800/40" />
            <div className="w-2.5 h-2.5 rounded bg-indigo-900/60" />
            <div className="w-2.5 h-2.5 rounded bg-indigo-700" />
            <div className="w-2.5 h-2.5 rounded bg-indigo-500" />
            <span>More</span>
          </div>
        </div>

        {/* Grid Box */}
        <div className="overflow-x-auto no-scrollbar pt-2">
          <div className="grid grid-flow-col gap-1 w-max grid-rows-7">
            {heatmapData.map((val, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-[2px] transition-colors hover:scale-125 cursor-help ${getHeatmapColor(val)}`}
                title={`Active Day Activity index: ${val}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Action bento and Recent activity split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Quick Actions */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            
            <button
              onClick={() => setActiveTab('problems')}
              className="p-4 bg-gray-950/40 hover:bg-indigo-500/5 border border-gray-800 hover:border-indigo-500/30 rounded-xl flex items-center justify-between group text-left cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Practice Complex Algorithmic Grids</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Solve daily curated Dynamic Programming tasks</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => setActiveTab('mentor')}
              className="p-4 bg-gray-950/40 hover:bg-violet-500/5 border border-gray-800 hover:border-violet-500/30 rounded-xl flex items-center justify-between group text-left cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Consult Continuous AI Mentor</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Debug blocks, analyze structures, verify Big O bounds</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className="p-4 bg-gray-950/40 hover:bg-pink-500/5 border border-gray-800 hover:border-pink-500/30 rounded-xl flex items-center justify-between group text-left cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Generate Resume ATS Feedback</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Assess keyword distributions and bullet parameters</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
            </button>

          </div>
        </div>

        {/* Right column: Recent Activity Feed logs */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">Audit Log History</h3>
          <div className="border border-gray-800/80 bg-gray-950/20 rounded-xl p-5 space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start justify-between pb-3 border-b border-gray-900 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CheckCircle className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">{log.title}</p>
                    <span className="text-[10px] font-mono text-gray-500 mt-1 block">{log.timestamp}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  +{log.xpEarned} XP
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
