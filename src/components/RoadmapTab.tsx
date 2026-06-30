import React, { useState } from 'react';
import { Compass, CheckCircle, RefreshCw, Sparkles, BookOpen, ChevronRight, Check } from 'lucide-react';
import { RoadmapNode } from '../types';

export default function RoadmapTab() {
  const [targetRole, setTargetRole] = useState('Senior Systems Architect');
  const [currentSkills, setCurrentSkills] = useState('NodeJS, Javascript, simple Express APIs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapNode[]>([
    {
      id: '1',
      title: 'Systems Threads & Process Cycles',
      description: 'Master operating system scheduling, background worker locks, and process forks.',
      status: 'completed',
      resources: ['Advanced Linux Programming', 'OS Systems Fundamentals']
    },
    {
      id: '2',
      title: 'Distributed Message Queues',
      description: 'Establish pub/sub message loops with Redis cache lines and RabbitMQ brokers.',
      status: 'in_progress',
      resources: ['Redis In-Memory structures', 'Designing Data-Intensive Applications']
    },
    {
      id: '3',
      title: 'Advanced DP Optimization & Memoization',
      description: 'Practice multi-dimensional dynamic programming and matrix solving optimizations.',
      status: 'not_started',
      resources: ['CodeForge Arena Suite', 'Introduction to Algorithms (CLRS)']
    }
  ]);

  const generateAIPresentation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerTarget: targetRole, currentSkills })
      });
      const data = await res.json();
      if (data.roadmap) {
        setRoadmap(data.roadmap);
      }
    } catch (err) {
      console.error('Error generating AI Roadmap:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleNodeState = (id: string) => {
    setRoadmap((prev) =>
      prev.map((node) => {
        if (node.id !== id) return node;
        const nextStatus: 'not_started' | 'in_progress' | 'completed' =
          node.status === 'not_started'
            ? 'in_progress'
            : node.status === 'in_progress'
            ? 'completed'
            : 'not_started';
        return { ...node, status: nextStatus };
      })
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">Interactive AI Roadmaps</h1>
        <p className="text-xs text-gray-500 mt-0.5">Specify your targeted job role or specialized stack and watch Gemini assemble a modular study sequence.</p>
      </div>

      {/* Grid: Config Form & Generated map view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: target configurations */}
        <div className="lg:col-span-4 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-6">
          
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Configure Target Curriculum</h3>
          </div>

          <form onSubmit={generateAIPresentation} className="space-y-4 text-xs font-semibold text-gray-300">
            <div className="space-y-1.5">
              <label className="block text-gray-400">Target Role or Specialized Skillset</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Principal Frontend Engineer at Stripe"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-sans focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400">Current Technical Skills</label>
              <textarea
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="e.g. React, Redux, basic Express, CSS basics"
                className="w-full px-3 py-2 h-20 bg-gray-900 border border-gray-800 rounded-lg text-white font-sans focus:outline-none focus:border-indigo-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              {isGenerating ? 'Generating Curriculum...' : 'Assemble AI Study Path'}
            </button>
          </form>

        </div>

        {/* Right column: Interactive Node Map */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Curriculum Path Nodes</h3>

          <div className="relative border-l border-indigo-500/25 pl-6 ml-4 space-y-8">
            {roadmap.map((node, index) => (
              <div key={node.id} className="relative group">
                
                {/* Visual node indicator bubble */}
                <button
                  onClick={() => toggleNodeState(node.id)}
                  className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border font-mono text-[10px] font-bold transition-all shadow-md cursor-pointer ${
                    node.status === 'completed'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      : node.status === 'in_progress'
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.3)] animate-pulse'
                      : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-600'
                  }`}
                  title="Click to toggle completion state"
                >
                  {node.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </button>

                {/* Node Details body */}
                <div className="p-5 bg-gray-950/40 border border-gray-800 hover:border-indigo-500/20 rounded-xl space-y-3 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {node.title}
                    </h4>
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      node.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      node.status === 'in_progress' ? 'bg-indigo-500/10 text-indigo-400' :
                      'bg-gray-800 text-gray-500'
                    }`}>
                      {node.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-mono">
                    {node.description}
                  </p>

                  {/* Curated study resources */}
                  {node.resources && node.resources.length > 0 && (
                    <div className="pt-3 border-t border-gray-900 space-y-1.5">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Recommended Study References
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {node.resources.map((resStr, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] text-indigo-300 bg-indigo-500/5 border border-indigo-500/10 px-2 py-1 rounded-md flex items-center gap-1 font-mono"
                          >
                            <ChevronRight className="w-3 h-3 text-indigo-500" />
                            {resStr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
