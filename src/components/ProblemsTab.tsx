import { useState, useEffect } from 'react';
import { Cpu, CheckCircle, Lock, Play, RefreshCw, Terminal, Search, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react';
import { Problem, User } from '../types';

interface ProblemsTabProps {
  user: User;
  updateUser: (user: User) => void;
}

export default function ProblemsTab({ user, updateUser }: ProblemsTabProps) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Compiler Console execution state
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [activeExplainTab, setActiveExplainTab] = useState(false);

  useEffect(() => {
    fetch('/api/problems')
      .then((res) => res.json())
      .then((data) => setProblems(data))
      .catch((err) => console.error('Error fetching problems:', err));
  }, []);

  const selectProblem = (p: Problem) => {
    setSelectedProblem(p);
    setCode(p.starterCode);
    setConsoleLogs('// Compiler Console ready. Paste solutions and click "Execute Suite"');
    setTestResults([]);
    setActiveExplainTab(false);
  };

  const executeCodeSuite = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setConsoleLogs('🚀 Packing bundle and executing sandbox suite inside container runtime...');
    setTestResults([]);

    try {
      const res = await fetch(`/api/problems/${selectedProblem.id}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.error) {
        setConsoleLogs(`❌ Error compiling submission:\n${data.error}`);
      } else {
        setConsoleLogs(data.consoleLogs);
        if (data.testOutputs) {
          setTestResults(data.testOutputs);
        }
        if (data.success) {
          // Sync solved status locally
          setProblems((prev) =>
            prev.map((p) => (p.id === selectedProblem.id ? { ...p, solved: true } : p))
          );
          if (data.user) {
            updateUser(data.user);
          }
        }
      }
    } catch (err: any) {
      setConsoleLogs(`❌ Network Connection Timeout: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Filter computations
  const categories = ['All', ...Array.from(new Set(problems.map((p) => p.category)))];

  const filteredProblems = problems.filter((p) => {
    const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDiff && matchCat && matchSearch;
  });

  if (selectedProblem) {
    return (
      <div className="space-y-6 animate-fade-in h-full flex flex-col">
        
        {/* IDE Header Menu */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-900">
          <button
            onClick={() => setSelectedProblem(null)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Problem Arena
          </button>
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md ${
              selectedProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
              selectedProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
              'bg-pink-500/10 text-pink-400'
            }`}>
              {selectedProblem.difficulty}
            </span>
            <span className="text-xs text-gray-500 font-mono">Category: {selectedProblem.category}</span>
          </div>
        </div>

        {/* Dynamic Split IDE Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          
          {/* Left panel: Description and specs */}
          <div className="lg:col-span-5 bg-gray-950/20 border border-gray-800 rounded-xl p-6 overflow-y-auto max-h-[70vh] space-y-6">
            
            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-white">{selectedProblem.title}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                <span>Acceptance Rate: {selectedProblem.acceptanceRate}%</span>
                {selectedProblem.solved && (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> Solved
                  </span>
                )}
              </div>
            </div>

            {/* Markdown Description */}
            <div className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-line border-t border-b border-gray-900 py-6">
              {selectedProblem.description}
            </div>

            {/* Sample Inputs Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Example Cases</h3>
              <div className="space-y-2">
                {selectedProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="p-3 bg-gray-900/40 border border-gray-800 rounded-lg space-y-1 text-[10px] font-mono">
                    <div className="text-gray-500">Case {idx + 1}:</div>
                    <div><span className="text-indigo-400">Input:</span> {tc.input}</div>
                    <div><span className="text-emerald-400">Expected:</span> {tc.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint / Explanation toggle */}
            {selectedProblem.solved && (
              <div className="space-y-3 border-t border-gray-900 pt-6">
                <button
                  onClick={() => setActiveExplainTab(!activeExplainTab)}
                  className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 animate-pulse" />
                  {activeExplainTab ? 'Hide Optimal Explanation' : 'Reveal Optimal Solution Details'}
                </button>
                {activeExplainTab && (
                  <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-xs text-gray-300 leading-normal whitespace-pre-line">
                    {selectedProblem.solutionExplanation}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right panel: Live textarea code compiler */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Editor Codebox */}
            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col flex-1 min-h-[300px]">
              
              <div className="px-4 py-2 bg-gray-900 border-b border-gray-850 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>main.js (JavaScript Compiler Node v22)</span>
                </div>
                <span>Tab size: 2 spaces</span>
              </div>

              {/* Textarea Code Space */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-5 bg-gray-950 font-mono text-xs text-gray-200 focus:outline-none flex-1 resize-none"
                style={{ tabSize: 2 }}
                placeholder="// Enter JavaScript solution algorithms here..."
              />

              {/* Control Action footer */}
              <div className="px-4 py-3 bg-gray-900/40 border-t border-gray-850 flex items-center justify-between">
                <button
                  onClick={() => setCode(selectedProblem.starterCode)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold text-gray-400 hover:text-white bg-gray-800 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset Code
                </button>

                <button
                  onClick={executeCodeSuite}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors shadow-lg cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isRunning ? 'Compiling...' : 'Execute Suite'}
                </button>
              </div>

            </div>

            {/* Test cases results and console output logger */}
            <div className="bg-gray-950/40 border border-gray-800 rounded-xl p-5 space-y-4 flex flex-col max-h-[250px]">
              <div className="flex items-center gap-2 text-xs font-bold text-white pb-2 border-b border-gray-900">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Sandbox Output Logs</span>
              </div>

              <div className="font-mono text-[11px] text-gray-400 overflow-y-auto flex-1 whitespace-pre-wrap">
                {consoleLogs}
              </div>

              {/* Individual test outputs */}
              {testResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {testResults.map((tr, i) => (
                    <div
                      key={i}
                      className={`p-3 border rounded-lg flex items-center justify-between text-[10px] font-mono ${
                        tr.passed
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                          : 'bg-pink-500/5 border-pink-500/20 text-pink-400'
                      }`}
                    >
                      <div>
                        <div className="font-bold">Test Case {i + 1}</div>
                        <div className="text-[9px] text-gray-500 mt-1">Input: {tr.input}</div>
                      </div>
                      <div className="font-bold">{tr.passed ? 'PASSED' : 'FAILED'}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-gray-900">
        <div>
          <h1 className="text-xl font-extrabold text-white">Algorithmic Problem Arena</h1>
          <p className="text-xs text-gray-500 mt-0.5">Hone computational execution speed and algorithmic complexity under constraints.</p>
        </div>

        {/* Dynamic Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search problem sets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Filter Menu Panels */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2 bg-gray-900/30 p-1 border border-gray-800 rounded-lg">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff as any)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                difficultyFilter === diff
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-900/30 p-1 border border-gray-800 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((p) => (
          <div
            key={p.id}
            className="group p-6 bg-gray-950/40 border border-gray-800 hover:border-indigo-500/30 rounded-xl flex flex-col justify-between h-56 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                  p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-pink-500/10 text-pink-400'
                }`}>
                  {p.difficulty}
                </span>
                <span className="text-[10px] font-mono text-gray-500">{p.category}</span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">{p.title}</h3>
              <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mb-4">{p.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-900/80">
              <span className="text-[10px] text-gray-500 font-mono">Acceptance: {p.acceptanceRate}%</span>
              <button
                onClick={() => selectProblem(p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold rounded-lg tracking-wide cursor-pointer transition-all ${
                  p.solved
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg'
                }`}
              >
                {p.solved ? <CheckCircle className="w-3 h-3" /> : <Play className="w-2.5 h-2.5 fill-current" />}
                {p.solved ? 'Review Task' : 'Open Workspace'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
