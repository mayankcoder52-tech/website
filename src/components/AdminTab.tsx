import { useState, useEffect } from 'react';
import { Shield, RefreshCw, Terminal, Cpu, Database, Trash2, CheckCircle2 } from 'lucide-react';
import { AuditLog, User } from '../types';

interface AdminTabProps {
  user: User;
  onResetUser: (user: User) => void;
}

export default function AdminTab({ user, onResetUser }: AdminTabProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit-logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    }
  };

  const triggerResetDb = async () => {
    setStatusMsg('');
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onResetUser(data.user);
        setStatusMsg('✅ Database completely reset & reseeded successfully!');
        fetchLogs();
      }
    } catch (err) {
      console.error('Error resetting database:', err);
    }
  };

  const triggerProblemSeed = async () => {
    setStatusMsg('');
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setStatusMsg('🚀 Algorithmic problems lists parsed and reseeded successfully!');
        fetchLogs();
      }
    } catch (err) {
      console.error('Error seeding problem:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="pb-2 border-b border-gray-900">
        <h1 className="text-xl font-extrabold text-white">System Administration Dashboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Reset central simulated databases, inspect telemetry hooks, and monitor API request audits.</p>
      </div>

      {statusMsg && (
        <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/25 text-indigo-400 text-xs font-semibold rounded-xl">
          {statusMsg}
        </div>
      )}

      {/* Grid: Stats and controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: System controls & Telemetry specs */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">System Parameters</h3>

          {/* Database management operations */}
          <div className="p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" /> Simulated Database Controllers
            </h4>
            <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
              Manually refresh problems state matrices, purge custom notebook caches, and reset overall levels to seed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <button
                onClick={triggerResetDb}
                className="py-2 bg-rose-950/30 hover:bg-rose-950/50 text-rose-400 border border-rose-900/40 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset System DB
              </button>

              <button
                onClick={triggerProblemSeed}
                disabled={isSeeding}
                className="py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                Seed Problems
              </button>
            </div>
          </div>

          {/* Telemetry metadata specs */}
          <div className="p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" /> Live Telemetry Index
            </h4>
            
            <div className="space-y-3 font-mono text-[10px] text-gray-400 leading-normal">
              <div className="flex justify-between pb-1.5 border-b border-gray-900">
                <span>Core Framework:</span>
                <span className="text-white">Node v22 (Express Engine)</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-900">
                <span>Active Channels:</span>
                <span className="text-indigo-400 font-bold">● Operational Ingress</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-900">
                <span>Server Location:</span>
                <span className="text-white">Cloud Run Ingress Socket</span>
              </div>
              <div className="flex justify-between">
                <span>Target Port Range:</span>
                <span className="text-white">PORT 3000 Ingress</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Audit Logs */}
        <div className="lg:col-span-7 p-6 bg-gray-950/30 border border-gray-800 rounded-xl space-y-4 flex flex-col max-h-[500px]">
          <div className="flex items-center justify-between pb-2 border-b border-gray-900">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" /> HTTP Audit Logger
            </h3>
            <button
              onClick={fetchLogs}
              className="p-1 text-gray-500 hover:text-white rounded transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-3 flex-1 pr-2 no-scrollbar font-mono text-[11px]">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-gray-900/40 border border-gray-850 rounded-lg flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      log.status === 200 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400'
                    }`}>
                      {log.method} {log.url}
                    </span>
                    <span className="text-gray-500 text-[9px]">{log.timestamp}</span>
                  </div>
                  <p className="text-gray-400 text-[10px] leading-relaxed">{log.action}</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-400">HTTP {log.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
