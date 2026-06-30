import { useState, useEffect } from 'react';
import { Trophy, Search, Users, Activity, ArrowRight, UserCheck } from 'lucide-react';
import { User } from '../types';

interface LeaderboardTabProps {
  user: User;
}

export default function LeaderboardTab({ user }: LeaderboardTabProps) {
  const [board, setBoard] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [compareTarget, setCompareTarget] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => setBoard(data))
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, [user]);

  const filteredBoard = board.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">Global Community Leaderboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Benchmark your level index, streaks, and accumulated XP thresholds with elite global competitors.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Scoreboard Table */}
        <div className="lg:col-span-8 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" /> Global Standings
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-gray-300">
              <thead>
                <tr className="border-b border-gray-900 text-gray-500 text-[10px] uppercase font-mono tracking-wider">
                  <th className="pb-3">Rank</th>
                  <th className="pb-3">User Profile</th>
                  <th className="pb-3 text-center">Streak</th>
                  <th className="pb-3 text-right">XP Metrics</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoard.map((row) => (
                  <tr
                    key={row.rank}
                    className={`border-b border-gray-900/40 last:border-0 hover:bg-gray-900/10 transition-colors ${
                      row.current ? 'bg-indigo-500/5 text-indigo-400 font-bold' : ''
                    }`}
                  >
                    <td className="py-4 font-mono">#{row.rank}</td>
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-8 h-8 rounded-lg border border-gray-800"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-white font-bold text-xs">{row.name}</div>
                        <span className="text-[10px] font-mono text-gray-500">Level {row.level}</span>
                      </div>
                    </td>
                    <td className="py-4 text-center font-mono text-pink-400">🔥 {row.streak}d</td>
                    <td className="py-4 text-right font-mono text-indigo-400">{row.xp} XP</td>
                    <td className="py-4 text-right">
                      {!row.current && (
                        <button
                          onClick={() => setCompareTarget(row)}
                          className="px-2.5 py-1 bg-gray-900 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-md border border-gray-800 text-[10px] cursor-pointer transition-colors"
                        >
                          Compare
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Side-by-Side User Comparisons */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Compare Profiles</h3>

          {compareTarget ? (
            <div className="p-6 bg-gray-950/40 border border-indigo-500/20 rounded-xl space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-gray-900">
                <span className="text-[10px] text-gray-500 font-mono">COMPARATIVE INDEX</span>
                <button
                  onClick={() => setCompareTarget(null)}
                  className="text-[10px] text-gray-500 hover:text-white"
                >
                  Clear
                </button>
              </div>

              {/* Side by side stats comparison cards */}
              <div className="grid grid-cols-2 gap-4 text-center text-xs">
                
                {/* Active user stats */}
                <div className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
                  <div className="font-bold text-white mb-2">You</div>
                  <div className="space-y-1 text-[11px] text-gray-400 font-mono">
                    <div>Rank: <strong className="text-indigo-400">#{user.rank}</strong></div>
                    <div>Level: <strong className="text-indigo-400">{user.level}</strong></div>
                    <div>Streak: <strong className="text-pink-400">{user.streak}d</strong></div>
                    <div>XP: <strong className="text-indigo-400">{user.xp}</strong></div>
                  </div>
                </div>

                {/* Compare target stats */}
                <div className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
                  <div className="font-bold text-white mb-2 truncate">{compareTarget.name.split(' ')[0]}</div>
                  <div className="space-y-1 text-[11px] text-gray-400 font-mono">
                    <div>Rank: <strong className="text-indigo-400">#{compareTarget.rank}</strong></div>
                    <div>Level: <strong className="text-indigo-400">{compareTarget.level}</strong></div>
                    <div>Streak: <strong className="text-pink-400">{compareTarget.streak}d</strong></div>
                    <div>XP: <strong className="text-indigo-400">{compareTarget.xp}</strong></div>
                  </div>
                </div>

              </div>

              {/* Dynamic comparative analysis */}
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-[10px] leading-relaxed text-gray-400 font-mono">
                {user.rank < compareTarget.rank ? (
                  <span>🏆 You maintain a lead of <strong>{compareTarget.rank - user.rank} positions</strong> over {compareTarget.name}. Expand streaks to secure your margins.</span>
                ) : (
                  <span>🎯 {compareTarget.name} holds a lead of <strong>{user.rank - compareTarget.rank} positions</strong>. Execute 2 high-tier Dynamic Programming problems to close the gap.</span>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 bg-gray-950/20 border border-gray-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
              <Activity className="w-10 h-10 text-gray-750 animate-pulse" />
              <div className="text-xs font-bold text-gray-400">Profile Comparison Desk</div>
              <p className="text-[10px] text-gray-500 max-w-sm">Click "Compare" on any standings row to launch comparative metrics charts.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
