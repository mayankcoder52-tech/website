import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ResumeAnalysis } from '../types';

export default function ResumeTab() {
  const [resumeText, setResumeText] = useState(`MAYANK ALCHEMIST - STAFF ENGINEER
- Designed high-throughput Express servers serving 1M+ active users.
- Spearheaded database optimizations boosting response speeds by 40%.
- Integrated basic microservices using NodeJS and Javascript.`);
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const triggerATSScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/gemini/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Error scanning resume ATS:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">ATS Resume Diagnostics & Optimization</h1>
        <p className="text-xs text-gray-500 mt-0.5">Paste or write your resume text to evaluate ATS optimization metrics, extract key skills, and receive structure reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input textarea block */}
        <div className="lg:col-span-5 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
          
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Input Resume Details</h3>
          </div>

          <form onSubmit={triggerATSScan} className="space-y-4 text-xs font-semibold text-gray-300">
            <div className="space-y-1.5">
              <label className="block text-gray-400">Resume Plaintext</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full px-3 py-2 h-72 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-indigo-500/50"
                placeholder="Paste structural resume paragraphs..."
              />
            </div>

            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              {isScanning ? 'Executing ATS Diagnostics...' : 'Trigger ATS Diagnostic Scan'}
            </button>
          </form>

        </div>

        {/* Right Output reports block */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Diagnostic Feedback Matrix</h3>

          {analysis ? (
            <div className="space-y-6">
              
              {/* ATS circular rating meter */}
              <div className="p-6 bg-gray-950/40 border border-gray-800 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-4 flex items-center justify-center relative">
                  {/* Glowing Meter Ring */}
                  <div className="w-24 h-24 rounded-full border-4 border-gray-800 flex items-center justify-center relative shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                    <span className="text-2xl font-mono font-extrabold text-white">{analysis.score}%</span>
                    {/* Ring progress simulation */}
                    <div className="absolute inset-[-4px] rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin pointer-events-none" style={{ animationDuration: '4s' }} />
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-2">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">ATS Score Evaluation</h4>
                  <p className="text-xs text-gray-300 leading-normal font-mono">{analysis.summary}</p>
                </div>
              </div>

              {/* Skills and Vulnerabilities grid splits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Key Skills Extract */}
                <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Extracted Key Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis.keySkills && analysis.keySkills.map((sk, sIdx) => (
                      <span key={sIdx} className="text-[9px] font-mono text-emerald-300 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gap warnings */}
                <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                  <div className="text-[10px] font-mono text-pink-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4" /> Structural Gap Warnings
                  </div>
                  <div className="space-y-1.5 pt-1 text-[10px] text-gray-400 leading-relaxed font-mono">
                    {analysis.vulnerabilities && analysis.vulnerabilities.map((vuln, vIdx) => (
                      <div key={vIdx} className="flex items-start gap-1.5">
                        <span className="text-pink-500 mt-0.5">•</span>
                        <span>{vuln}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ATS Advice Checklist Card */}
              <div className="p-5 bg-gray-950/20 border border-gray-800 rounded-xl space-y-3">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Actionable ATS Advisory Checklist</h4>
                <div className="space-y-2 pt-1">
                  {analysis.atsAdvice && analysis.atsAdvice.map((adv, aIdx) => (
                    <div key={aIdx} className="p-3 bg-gray-900/40 border border-gray-850 rounded-lg flex items-start gap-3">
                      <div className="p-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400 text-[9px] font-mono font-bold shrink-0">
                        ADV-{aIdx+1}
                      </div>
                      <p className="text-[11px] text-gray-300 leading-normal font-mono">{adv}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 bg-gray-950/20 border border-gray-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
              <FileText className="w-10 h-10 text-gray-700 animate-pulse" />
              <div className="text-xs font-bold text-gray-400">Diagnostic Monitor Awaiting Submission</div>
              <p className="text-[10px] text-gray-500 max-w-sm">Enter resume data into the plain-text parser on the left pane and launch ATS Diagnostic scans.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
