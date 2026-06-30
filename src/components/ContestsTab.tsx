import React, { useState, useEffect } from 'react';
import { Trophy, Users, Clock, AlertCircle, Zap, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import { Contest } from '../types';

export default function ContestsTab() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [currentRating, setCurrentRating] = useState('1450');
  const [expectedRank, setExpectedRank] = useState('240');
  const [solvedCount, setSolvedCount] = useState('3');

  // Prediction states
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedDelta, setPredictedDelta] = useState('');
  const [confidence, setConfidence] = useState('');
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    fetch('/api/contests')
      .then((res) => res.json())
      .then((data) => setContests(data))
      .catch((err) => console.error('Error fetching contests:', err));
  }, []);

  const calculateForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setPredictedDelta('');
    setAnalysis('');

    try {
      const res = await fetch('/api/contests/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentRating: Number(currentRating),
          expectedRank: Number(expectedRank),
          solvedCount: Number(solvedCount)
        })
      });
      const data = await res.json();
      setPredictedDelta(data.predictedDelta);
      setConfidence(data.predictionConfidence);
      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Error matching prediction forecast:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">Competitive Contest Forecasts</h1>
        <p className="text-xs text-gray-500 mt-0.5">Participate in virtual matching rooms and calculate real-time competitive rating changes.</p>
      </div>

      {/* Grid of Contest List & Prediction Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Contest Schedules list */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Active & Scheduled Matches</h3>

          <div className="space-y-4">
            {contests.map((c) => (
              <div key={c.id} className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                    c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {c.status}
                  </span>
                </div>

                {/* Specs metadata */}
                <div className="grid grid-cols-3 gap-4 text-[11px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                    <span>{c.participants} Registered</span>
                  </div>
                  <div className="text-right text-indigo-400 font-semibold">
                    {c.status === 'Active' ? 'CONTEST IN PROGRESS' : 'Starting soon'}
                  </div>
                </div>

                {/* Enclosed problems */}
                <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500">
                  <span>Standard problems assigned: <strong>{c.problems?.length || 2} tasks</strong></span>
                  <button className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer">
                    Enter Arena &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Rating delta prediction calculator */}
        <div className="lg:col-span-5 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-6">
          
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Predictive Rating Forecaster</h3>
          </div>

          <form onSubmit={calculateForecast} className="space-y-4 text-xs font-semibold text-gray-300">
            <div className="space-y-1.5">
              <label className="block text-gray-400">Current Rating</label>
              <input
                type="number"
                value={currentRating}
                onChange={(e) => setCurrentRating(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400">Expected Rank Out of 5,000</label>
              <input
                type="number"
                value={expectedRank}
                onChange={(e) => setExpectedRank(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400">Target Problems Solved (Out of 5)</label>
              <input
                type="number"
                max={5}
                min={0}
                value={solvedCount}
                onChange={(e) => setSolvedCount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white font-mono focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isPredicting}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              {isPredicting ? 'Forecasting Delta...' : 'Calculate Predicted Delta'}
            </button>
          </form>

          {/* Predict result box */}
          {(predictedDelta || analysis) && (
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-900">
                <span className="text-[10px] text-gray-500 font-mono">FORECAST COMPLETED</span>
                <span className="text-[10px] text-indigo-400 font-mono font-bold">Accuracy: {confidence || '94%'}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-400 font-semibold">Predicted Rating Delta</span>
                <span className={`text-2xl font-mono font-extrabold ${predictedDelta.startsWith('-') ? 'text-pink-400' : 'text-emerald-400'}`}>
                  {predictedDelta || '+84'}
                </span>
              </div>
              <p className="text-[10px] font-mono text-gray-400 leading-relaxed whitespace-pre-line">{analysis}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
