import React, { useState } from 'react';
import { Github, Code, ShieldAlert, Sparkles, RefreshCw, BarChart2, CheckCircle2 } from 'lucide-react';
import { GithubAnalysis } from '../types';

export default function GithubTab() {
  const [repoUrl, setRepoUrl] = useState('https://github.com/mayank52/codeforge-express-core');
  const [isAuditing, setIsAuditing] = useState(false);
  const [analysis, setAnalysis] = useState<GithubAnalysis | null>(null);

  const triggerRepoAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/gemini/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Error auditing repository:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">Repository Style & Complexity Audits</h1>
        <p className="text-xs text-gray-500 mt-0.5">Submit repository paths to evaluate unit-test indices, styling compliance scores, and extract unit-refactoring checklists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Config column */}
        <div className="lg:col-span-5 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Repository Specs</h3>
          </div>

          <form onSubmit={triggerRepoAudit} className="space-y-4 text-xs font-semibold text-gray-300">
            <div className="space-y-1.5">
              <label className="block text-gray-400">Mock or Real Repository URL</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-500/50"
                placeholder="e.g. https://github.com/user/project"
              />
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              {isAuditing ? 'Auditing Repo Structures...' : 'Initiate Automated Audit'}
            </button>
          </form>

        </div>

        {/* Right Audit Outputs details column */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Auditor Assessment Panels</h3>

          {analysis ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* Quality score indicator header */}
              <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">Target Repo: {analysis.repoName}</h4>
                  <p className="text-sm font-bold text-white mt-1">Repository Code Quality Score</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-extrabold text-indigo-400">{analysis.qualityScore}/100</span>
                  <div className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">SOC-2 Class Index</div>
                </div>
              </div>

              {/* Languages and Issues splits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Languages Ratio */}
                <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                  <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                    <BarChart2 className="w-4 h-4" /> Language Distribution
                  </div>
                  <div className="space-y-3 pt-1">
                    {analysis.languageRatio && Object.entries(analysis.languageRatio).map(([lang, pct], idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-300">
                          <span>{lang}</span>
                          <span className="font-mono text-gray-500">{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structure warnings list */}
                <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                  <div className="text-[10px] font-mono text-pink-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-pink-450" /> Architectural Alerts
                  </div>
                  <div className="space-y-2 pt-1">
                    {analysis.issuesDetected && analysis.issuesDetected.map((issue, iIdx) => (
                      <div key={iIdx} className="p-2 bg-pink-500/5 border border-pink-500/10 rounded-lg text-[10px] font-mono text-gray-300 flex items-start gap-2">
                        <span className="text-pink-500 font-bold shrink-0">!</span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Refactoring suggestions cards */}
              <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Refactoring Advisory Guidelines</h4>
                <div className="space-y-2.5 pt-1 font-mono text-xs text-gray-300">
                  {analysis.refactoringSuggestions && analysis.refactoringSuggestions.map((sug, sIdx) => (
                    <div key={sIdx} className="p-3 bg-gray-900/40 border border-gray-850 rounded-lg flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">{sug}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 bg-gray-950/20 border border-gray-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
              <Github className="w-10 h-10 text-gray-700 animate-pulse" />
              <div className="text-xs font-bold text-gray-400">Auditor Diagnostics Awaiting Repository</div>
              <p className="text-[10px] text-gray-500 max-w-sm">Provide git repository paths on the left pane and trigger Automated Audits.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
