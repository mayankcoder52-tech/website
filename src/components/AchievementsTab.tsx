import { useState, useEffect } from 'react';
import { Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Achievement } from '../types';

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error('Error fetching achievements:', err));
  }, []);

  const totalPoints = achievements.reduce((acc, curr) => acc + (curr.unlockedAt ? curr.xpValue : 0), 0);
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">Gamified Achievements & Badges</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track your modular developer credentials, unlocked honors, and accumulated merit indicators.</p>
        </div>

        {/* Progress summaries */}
        <div className="flex gap-4 text-xs font-semibold text-gray-400 bg-gray-900/30 px-4 py-2 border border-gray-800 rounded-lg font-mono">
          <div>Unlocked: <strong className="text-white">{unlockedCount} / {achievements.length}</strong></div>
          <span>|</span>
          <div>Total Earned: <strong className="text-indigo-400">{totalPoints} XP</strong></div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;
          return (
            <div
              key={ach.id}
              className={`p-6 border rounded-xl flex flex-col justify-between h-52 relative group transition-all duration-300 ${
                isUnlocked
                  ? 'bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent border-indigo-500/30 hover:border-indigo-500/50 shadow-[0_4px_20px_rgba(99,102,241,0.05)]'
                  : 'bg-gray-950/20 border-gray-800 opacity-60'
              }`}
            >
              {/* Unlock Indicator Icon */}
              <div className="absolute top-4 right-4">
                {isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-600" />
                )}
              </div>

              <div>
                <div className={`p-2.5 rounded-lg w-fit mb-4 border ${
                  isUnlocked
                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    : 'bg-gray-900 border-gray-850 text-gray-650'
                }`}>
                  <Award className="w-5 h-5" />
                </div>

                <h3 className="text-xs font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-gray-400 text-[10px] leading-relaxed font-mono">
                  {ach.description}
                </p>
              </div>

              {/* XP Badge reward indicator footer */}
              <div className="pt-4 border-t border-gray-900/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-500">
                  {isUnlocked ? `Unlocked: ${new Date(ach.unlockedAt!).toLocaleDateString()}` : 'Locked badge'}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  isUnlocked ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-gray-850 text-gray-600'
                }`}>
                  +{ach.xpValue} XP
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
