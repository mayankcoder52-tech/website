import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Target, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export default function AnalyticsTab() {
  // Mock performance data sets
  const ratingData = [
    { name: 'Match 1', rating: 1420 },
    { name: 'Match 2', rating: 1450 },
    { name: 'Match 3', rating: 1445 },
    { name: 'Match 4', rating: 1490 },
    { name: 'Match 5', rating: 1560 },
    { name: 'Match 6', rating: 1545 },
    { name: 'Match 7', rating: 1610 },
  ];

  const categoryPerformance = [
    { category: 'Arrays', completed: 85, color: '#6366f1' },
    { category: 'DP Recursion', completed: 42, color: '#a78bfa' },
    { category: 'Graphs', completed: 30, color: '#ec4899' },
    { category: 'Math Theory', completed: 60, color: '#f59e0b' },
    { category: 'Trees', completed: 75, color: '#10b981' },
  ];

  const languageDistribution = [
    { name: 'TypeScript', value: 65, color: '#3178c6' },
    { name: 'JavaScript', value: 20, color: '#f7df1e' },
    { name: 'Python', value: 10, color: '#3776ab' },
    { name: 'C++', value: 5, color: '#f34b7d' },
  ];

  const weakTopics = [
    { topic: 'Network Flow Cap (Dinic)', accuracy: '28%', impact: 'High', recommendation: 'Practice Ford-Fulkerson concepts in Graph Playground' },
    { topic: 'Segment Tree Range Queries', accuracy: '35%', impact: 'Medium', recommendation: 'Complete standard Lazy Propagation tutorials' },
    { topic: 'Bitmask Dynamic Programming', accuracy: '45%', impact: 'High', recommendation: 'Review state transitions of travelling salesman' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Overview Headings */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-900">
        <div>
          <h1 className="text-xl font-extrabold text-white">Algorithmic Performance Analytics</h1>
          <p className="text-xs text-gray-500 mt-0.5">Real-time charts tracking contest trends, language ratios, and structural recommendations.</p>
        </div>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rating Trend Area Chart */}
        <div className="lg:col-span-8 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Contest Rating Progress</h3>
              <p className="text-lg font-bold text-white mt-1">1,610 <span className="text-xs text-emerald-400 font-semibold font-mono">+190 delta</span></p>
            </div>
            <div className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-[10px] text-indigo-400 font-mono">
              Confidence Index: 92%
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ratingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ratingGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} domain={[1350, 1650]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '10px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="rating" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#ratingGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Distribution Pie Chart */}
        <div className="lg:col-span-4 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Language Distribution</h3>
            <p className="text-xs text-gray-500 mt-1">Preferred compiler structures analyzed across solutions.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {languageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-mono font-bold text-white">TS</span>
              <span className="text-[10px] text-gray-500">65% Preferred</span>
            </div>
          </div>

          {/* Mini Legend List */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 font-semibold">
            {languageDistribution.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                <span>{lang.name} ({lang.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Category Performance and Weak Topics Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category solving completion rate bar chart */}
        <div className="lg:col-span-6 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          <div>
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Solving Efficiency by Category</h3>
            <p className="text-xs text-gray-500 mt-1">Topic accuracy metrics compared against baseline global requirements.</p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} layout="vertical" margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis type="number" stroke="#6b7280" fontSize={10} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="category" type="category" stroke="#6b7280" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '10px' }}
                />
                <Bar dataKey="completed" radius={[0, 4, 4, 0]} barSize={12}>
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weak topic advisory list */}
        <div className="lg:col-span-6 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">AI Weak Topic Detection</h3>
              <p className="text-xs text-gray-500 mt-1">Autonomous recommendations to boost matching coefficients.</p>
            </div>
            <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-lg">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
            </div>
          </div>

          <div className="space-y-4">
            {weakTopics.map((topic, i) => (
              <div key={i} className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-400" />
                    {topic.topic}
                  </h4>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                      Accuracy: {topic.accuracy}
                    </span>
                    <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                      Impact: {topic.impact}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-indigo-200 bg-indigo-500/5 px-2.5 py-1.5 border border-indigo-500/10 rounded-lg">
                  💡 Recommendation: {topic.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
