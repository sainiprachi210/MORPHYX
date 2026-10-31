import React, { useEffect, useState } from 'react';
import { Activity, Server, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { HealthResponse } from '@morphyx/shared';
import { webEnv } from '../../env';

export const SystemStatus: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string>('');

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      // In dev with Vite proxy, '/api/health' redirects to server.
      // In standalone, uses webEnv.VITE_API_URL.
      const url = `${webEnv.VITE_API_URL}/api/health`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setHealth(json.data);
      } else {
        throw new Error('Malformed health payload');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Server offline or unreachable');
      setHealth(null);
    } finally {
      setLoading(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="telemetry"
      className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800"
    >
      <div className="p-8 rounded-2xl cyber-glass border border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                LIVE TELEMETRY & HEALTH ORCHESTRATION
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white">
              Express API & Service Health Status
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-time contract verification between web client and @morphyx/server
            </p>
          </div>

          <button
            onClick={fetchHealth}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-2 hover:bg-slate-800 hover:border-cyan-400 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Ping Endpoint</span>
            {lastChecked && <span className="text-slate-500">({lastChecked})</span>}
          </button>
        </div>

        {/* Telemetry Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 mb-1 flex items-center justify-between">
              <span>SERVICE STATUS</span>
              {health ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div className="text-lg font-bold font-mono">
              {loading && !health ? (
                <span className="text-slate-500">PROBING...</span>
              ) : health ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  ONLINE (200 OK)
                </span>
              ) : (
                <span className="text-amber-400">STANDBY / OFFLINE</span>
              )}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Target: {webEnv.VITE_API_URL}/api/health
            </div>
          </div>

          {/* Card 2: Uptime */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 mb-1">UPTIME</div>
            <div className="text-lg font-bold font-mono text-cyan-300">
              {health ? `${health.uptime.toFixed(1)}s` : '—'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Service: {health ? health.service : 'MORPHYX Backend'}
            </div>
          </div>

          {/* Card 3: Memory */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 mb-1">MEMORY LOAD</div>
            <div className="text-lg font-bold font-mono text-purple-300">
              {health ? `${health.system.memoryUsageMB} MB` : '—'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Runtime: {health ? health.system.nodeVersion : 'Node.js'}
            </div>
          </div>

          {/* Card 4: Environment */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 mb-1">ENVIRONMENT</div>
            <div className="text-lg font-bold font-mono text-white uppercase">
              {health ? health.environment : 'local dev'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Version: {health ? `v${health.version}` : 'v0.1.0'}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                Backend server is currently not receiving connections ({error}). Run{' '}
                <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded">npm run dev</code>{' '}
                or{' '}
                <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded">
                  npm run dev:server
                </code>{' '}
                to activate the API.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemStatus;
