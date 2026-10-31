import React, { useEffect, useState } from 'react';
import { InteractiveBuildingData } from '../types';
import { useMissionSystem } from '../missions/MissionContext';
import { EmailCategory, ExpenseCategory, FileFolder } from '../missions/types';
import {
  X,
  CheckCircle2,
  Mail,
  Zap,
  TrendingUp,
  Cpu,
  Heart,
  CreditCard,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Droplets,
  Award,
  Terminal,
  Clock,
  Eye,
  ShieldCheck,
  Folder,
  FileCode,
  FileText,
  FileImage,
  Tag,
  ArrowRight,
  PieChart,
  Building2,
  MapPin,
  Check,
} from 'lucide-react';

interface BuildingModalProps {
  building: InteractiveBuildingData;
  onClose: () => void;
}

export const BuildingModal: React.FC<BuildingModalProps> = ({ building, onClose }) => {
  const {
    getMissionForBuilding,
    acceptMission,
    declineMission,
    completeMission,
    replayMission,
    resetDemoMissions,
    emails,
    categorizeEmail,
    expenses,
    categorizeExpense,
    spendingSummary,
    files,
    sortFile,
  } = useMissionSystem();

  const mission = getMissionForBuilding(building.id);

  // Bank states (preserved feature)
  const [savingsAmount, setSavingsAmount] = useState<number>(12450);

  // Post Office states (preserved feature)
  const [reminders, setReminders] = useState<string[]>([
    'Send architecture review summary to team (2:00 PM)',
    'Review PR #14: 3D Camera Follow interpolation',
  ]);
  const [newReminderText, setNewReminderText] = useState<string>('');

  // Tech HQ states (preserved feature)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ git status',
    'On branch main - All 16 test suites passing.',
  ]);

  // Hotel states (preserved feature)
  const [waterCups, setWaterCups] = useState<number>(5);
  const [eyeRestTimer, setEyeRestTimer] = useState<number>(20);
  const [eyeRestActive, setEyeRestActive] = useState<boolean>(false);

  // Park states (preserved feature)
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<string>('breeze');

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Hotel Eye-Rest Timer Countdown
  useEffect(() => {
    if (!eyeRestActive || eyeRestTimer <= 0) return;
    const interval = setInterval(() => {
      setEyeRestTimer(prev => {
        if (prev <= 1) {
          setEyeRestActive(false);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [eyeRestActive, eyeRestTimer]);

  // Park Pomodoro Timer Countdown
  useEffect(() => {
    if (!pomodoroRunning || pomodoroSeconds <= 0) return;
    const interval = setInterval(() => {
      setPomodoroSeconds(prev => {
        if (prev <= 1) {
          setPomodoroRunning(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pomodoroRunning, pomodoroSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none"
    >
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-urban-panel rounded-2xl border border-urban-sand/30 shadow-urban-panel flex flex-col overflow-hidden">
        {/* 1. Modal Top Bar */}
        <div className="px-6 py-4 bg-urban-olive border-b border-urban-sand/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-urban-panel border border-urban-sand/25 flex items-center justify-center">
              {building.id === 'apex-bank' && <CreditCard className="w-5 h-5 text-urban-terracotta" />}
              {building.id === 'metro-post' && <Mail className="w-5 h-5 text-urban-sand" />}
              {building.id === 'cybercore-tech' && <Cpu className="w-5 h-5 text-urban-sand" />}
              {building.id === 'horizon-hotel' && <Sparkles className="w-5 h-5 text-urban-sand" />}
              {building.id === 'zenith-park' && <Heart className="w-5 h-5 text-urban-sage" />}
              {building.id === 'nexus-plaza' && <TrendingUp className="w-5 h-5 text-urban-sand" />}
              {!['apex-bank', 'metro-post', 'cybercore-tech', 'horizon-hotel', 'zenith-park', 'nexus-plaza'].includes(building.id) && (
                <Building2 className="w-5 h-5 text-urban-sand" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-urban-stone tracking-wider font-semibold">
                  {building.role}
                </span>
                {mission && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                      mission.status === 'COMPLETED'
                        ? 'bg-urban-olive text-urban-sage border border-urban-sage/30'
                        : mission.status === 'ACTIVE'
                        ? 'bg-urban-terracotta text-urban-ivory animate-pulse'
                        : 'bg-urban-olive text-urban-sand border border-urban-sand/30'
                    }`}
                  >
                    {mission.status === 'COMPLETED'
                      ? '✓ Mission Completed'
                      : mission.status === 'ACTIVE'
                      ? '● Active Mission'
                      : '★ Mission Available'}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-display font-bold text-urban-ivory tracking-wide">
                {building.name}
              </h2>
            </div>
          </div>

          {/* Visible Close Button */}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory transition-all cursor-pointer flex items-center gap-1.5"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">Close</span>
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* ======================================================== */}
          {/* MISSION 1: INBOX ZERO (Post Office / Metro Post)         */}
          {/* ======================================================== */}
          {building.id === 'metro-post' && mission && (
            <div className="space-y-5">
              {/* Mission Briefing & Action Card */}
              <div className="p-5 rounded-2xl bg-urban-olive border border-urban-sand/30 shadow-urban-panel space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-urban-sand/15">
                  <div>
                    <div className="text-[10px] font-mono text-urban-sand uppercase tracking-widest font-bold">
                      POST OFFICE DIRECTIVE • {mission.difficulty}
                    </div>
                    <h3 className="text-xl font-display font-bold text-urban-ivory mt-0.5">
                      {mission.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/20">
                      +{mission.xpReward} XP
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-terracotta font-mono text-xs font-bold border border-urban-terracotta/30">
                      +{mission.creditsReward} CR
                    </span>
                  </div>
                </div>

                <p className="text-xs text-urban-stone font-sans leading-relaxed">
                  {mission.description}
                </p>

                {/* Accept Mission, Decline, and Mission Progress Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-urban-sand/15">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {mission.status !== 'ACTIVE' && mission.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => acceptMission('inbox-zero')}
                        className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-xs font-mono font-bold text-urban-ivory shadow-urban-button transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Accept Mission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/30">
                        <Check className="w-3.5 h-3.5 text-urban-sage" />
                        <span>{mission.status === 'COMPLETED' ? 'Mission Completed' : 'Mission In Progress'}</span>
                      </span>
                    )}

                    <button
                      onClick={() => {
                        declineMission('inbox-zero');
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-xs font-mono text-urban-stone hover:text-urban-ivory transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>

                  {/* Mission Progress Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-urban-sand">
                        {mission.currentProgress} / {mission.totalProgress} Organized
                      </div>
                      <div className="text-[10px] font-mono text-urban-stone">
                        {Math.round((mission.currentProgress / mission.totalProgress) * 100)}% Complete
                      </div>
                    </div>
                    <div className="w-24 h-2.5 rounded-full bg-urban-panel overflow-hidden border border-urban-sand/20">
                      <div
                        className="h-full bg-gradient-to-r from-urban-terracotta to-urban-sand transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (mission.currentProgress / mission.totalProgress) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Celebration Message and Rewards */}
              {mission.currentProgress >= mission.totalProgress && mission.status !== 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-urban-sm">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-ivory">INBOX ZERO ACHIEVED! (5/5)</div>
                      <div className="text-urban-stone text-[11px]">
                        All 5 communications categorized into Work, Personal, or Important. Claim rewards:
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => completeMission('inbox-zero')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs shadow-urban-button cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4 text-urban-sand" />
                    <span>Complete Mission (+150 XP, +75 CR)</span>
                  </button>
                </div>
              )}

              {mission.status === 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-sage uppercase tracking-wider">MISSION COMPLETED ✓</div>
                      <div className="text-urban-stone text-[11px]">
                        Completed at {mission.completedAt}. Earned +{mission.xpReward} XP and &quot;{mission.badgeReward}&quot; title.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetDemoMissions}
                    className="px-3.5 py-1.5 rounded-lg bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory text-xs font-mono cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Demo</span>
                  </button>
                </div>
              )}

              {/* Task List with Working Category Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-urban-stone">
                  <span className="font-bold uppercase tracking-wider text-urban-sand">
                    SAMPLE COMMUNICATIONS LIST (5 ITEMS)
                  </span>
                  <span>Categories: Work • Personal • Important</span>
                </div>

                <div className="space-y-2.5">
                  {emails.map((email, idx) => {
                    const emailCategories: EmailCategory[] = ['Work', 'Personal', 'Important'];

                    return (
                      <div
                        key={email.id}
                        className={`p-4 rounded-xl border transition-all text-xs font-mono ${
                          email.isOrganized
                            ? 'bg-urban-olive/70 border-urban-sand/20'
                            : 'bg-urban-olive border-urban-sand/35 shadow-urban-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-urban-panel text-urban-sand text-[10px] flex items-center justify-center font-bold">
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-urban-ivory">{email.sender}</span>
                            <span className="text-[10px] text-urban-stone">• {email.time}</span>
                          </div>

                          {email.isOrganized && (
                            <span className="px-2.5 py-0.5 rounded-md bg-urban-panel text-urban-sage text-[10px] font-bold border border-urban-sage/30">
                              {email.assignedCategory} ✓
                            </span>
                          )}
                        </div>

                        <div className="text-urban-ivory font-semibold text-xs mb-1">
                          {email.subject}
                        </div>
                        <p className="text-urban-stone text-xs font-sans leading-relaxed mb-3">
                          {email.snippet}
                        </p>

                        {/* Working Category Buttons: Work, Personal, Important */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-urban-sand/15">
                          <span className="text-[11px] text-urban-stone mr-1 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-urban-sand" />
                            <span>Select Category:</span>
                          </span>

                          {emailCategories.map(cat => {
                            const isSelected = email.assignedCategory === cat;
                            return (
                              <button
                                key={cat}
                                onClick={() => categorizeEmail(email.id, cat)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-urban-terracotta text-urban-ivory font-bold shadow-urban-sm border border-urban-sand/30'
                                    : 'bg-urban-panel hover:bg-urban-olive text-urban-stone hover:text-urban-ivory border border-urban-sand/20'
                                }`}
                              >
                                {cat} {isSelected && '✓'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Follow-up Reminders (Preserved Feature) */}
              <div className="space-y-2 pt-2 border-t border-urban-sand/15">
                <div className="text-xs font-mono text-urban-stone uppercase tracking-wider">
                  SCHEDULED FOLLOW-UP REMINDERS
                </div>
                <div className="space-y-1.5">
                  {reminders.map((r, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-urban-olive border border-urban-sand/15 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 text-urban-ivory">
                        <Clock className="w-3.5 h-3.5 text-urban-sand" />
                        <span>{r}</span>
                      </div>
                      <button
                        onClick={() => setReminders(reminders.filter((_, idx) => idx !== i))}
                        className="text-urban-stone hover:text-urban-terracotta cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newReminderText}
                    onChange={e => setNewReminderText(e.target.value)}
                    placeholder="Add custom reminder task..."
                    className="flex-grow px-3 py-2 rounded-lg bg-urban-olive border border-urban-sand/20 text-xs font-mono text-urban-ivory placeholder-urban-stone focus:outline-none focus:border-urban-sand"
                  />
                  <button
                    onClick={() => {
                      if (newReminderText.trim()) {
                        setReminders(prev => [...prev, newReminderText.trim()]);
                        setNewReminderText('');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MISSION 2: BUDGET MASTER (Bank / Apex Vault)             */}
          {/* ======================================================== */}
          {building.id === 'apex-bank' && mission && (
            <div className="space-y-5">
              {/* Mission Briefing & Action Card */}
              <div className="p-5 rounded-2xl bg-urban-olive border border-urban-sand/30 shadow-urban-panel space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-urban-sand/15">
                  <div>
                    <div className="text-[10px] font-mono text-urban-sand uppercase tracking-widest font-bold">
                      BANK DIRECTIVE • {mission.difficulty}
                    </div>
                    <h3 className="text-xl font-display font-bold text-urban-ivory mt-0.5">
                      {mission.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/20">
                      +{mission.xpReward} XP
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-terracotta font-mono text-xs font-bold border border-urban-terracotta/30">
                      +{mission.creditsReward} CR
                    </span>
                  </div>
                </div>

                <p className="text-xs text-urban-stone font-sans leading-relaxed">
                  {mission.description}
                </p>

                {/* Accept Mission, Decline, and Mission Progress Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-urban-sand/15">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {mission.status !== 'ACTIVE' && mission.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => acceptMission('budget-master')}
                        className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-xs font-mono font-bold text-urban-ivory shadow-urban-button transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Accept Mission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/30">
                        <Check className="w-3.5 h-3.5 text-urban-sage" />
                        <span>{mission.status === 'COMPLETED' ? 'Mission Completed' : 'Mission In Progress'}</span>
                      </span>
                    )}

                    <button
                      onClick={() => {
                        declineMission('budget-master');
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-xs font-mono text-urban-stone hover:text-urban-ivory transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>

                  {/* Mission Progress Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-urban-sand">
                        {mission.currentProgress} / {mission.totalProgress} Categorized
                      </div>
                      <div className="text-[10px] font-mono text-urban-stone">
                        {Math.round((mission.currentProgress / mission.totalProgress) * 100)}% Complete
                      </div>
                    </div>
                    <div className="w-24 h-2.5 rounded-full bg-urban-panel overflow-hidden border border-urban-sand/20">
                      <div
                        className="h-full bg-gradient-to-r from-urban-terracotta to-urban-sand transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (mission.currentProgress / mission.totalProgress) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Celebration Message and Rewards */}
              {mission.currentProgress >= mission.totalProgress && mission.status !== 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-urban-sm">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-ivory">BUDGET MASTER AUDIT COMPLETE! (5/5)</div>
                      <div className="text-urban-stone text-[11px]">
                        All 5 expenditures audited and categorized into operating buckets. Claim rewards:
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => completeMission('budget-master')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs shadow-urban-button cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4 text-urban-sand" />
                    <span>Complete Mission (+200 XP, +100 CR)</span>
                  </button>
                </div>
              )}

              {mission.status === 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-sage uppercase tracking-wider">MISSION COMPLETED ✓</div>
                      <div className="text-urban-stone text-[11px]">
                        Completed at {mission.completedAt}. Earned +{mission.xpReward} XP and &quot;{mission.badgeReward}&quot; title.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetDemoMissions}
                    className="px-3.5 py-1.5 rounded-lg bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory text-xs font-mono cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Demo</span>
                  </button>
                </div>
              )}

              {/* Simple Spending Summary Breakdown */}
              <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/25 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-urban-sand font-bold">
                    <PieChart className="w-4 h-4 text-urban-sand" />
                    <span>SPENDING SUMMARY AUDIT</span>
                  </div>
                  <span className="text-urban-ivory">
                    Total Ledger: <strong>${spendingSummary.totalSpent.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                  {(
                    [
                      'Operations',
                      'Software',
                      'Equipment',
                      'Travel',
                      'Facilities',
                    ] as ExpenseCategory[]
                  ).map(cat => {
                    const item = spendingSummary.breakdown[cat];
                    return (
                      <div
                        key={cat}
                        className="p-2.5 rounded-lg bg-urban-panel border border-urban-sand/15"
                      >
                        <div className="text-[10px] text-urban-stone uppercase truncate font-bold">
                          {cat}
                        </div>
                        <div className="text-xs font-bold text-urban-ivory mt-0.5">
                          ${item.amount.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-urban-sand mt-0.5">
                          {item.count} items
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Task List with Working Category Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-urban-stone">
                  <span className="font-bold uppercase tracking-wider text-urban-sand">
                    SAMPLE EXPENSES LEDGER (5 ITEMS)
                  </span>
                  <span>Categories: Operations • Software • Equipment • Travel • Facilities</span>
                </div>

                <div className="space-y-2.5">
                  {expenses.map((expense, idx) => {
                    const categories: ExpenseCategory[] = [
                      'Operations',
                      'Software',
                      'Equipment',
                      'Travel',
                      'Facilities',
                    ];

                    return (
                      <div
                        key={expense.id}
                        className={`p-4 rounded-xl border transition-all text-xs font-mono ${
                          expense.isCategorized
                            ? 'bg-urban-olive/70 border-urban-sand/20'
                            : 'bg-urban-olive border-urban-sand/35 shadow-urban-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-urban-panel text-urban-sand text-[10px] flex items-center justify-center font-bold">
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-urban-ivory">{expense.merchant}</span>
                            <span className="text-[10px] text-urban-stone">• {expense.date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-urban-sand font-bold text-sm">
                              ${expense.amount.toFixed(2)}
                            </span>
                            {expense.isCategorized && (
                              <span className="px-2 py-0.5 rounded-md bg-urban-panel text-urban-sage text-[10px] font-bold border border-urban-sage/30">
                                {expense.assignedCategory} ✓
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-urban-stone text-xs font-sans leading-relaxed mb-3">
                          {expense.description}
                        </p>

                        {/* Working Category Buttons: Operations, Software, Equipment, Travel, Facilities */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-urban-sand/15">
                          <span className="text-[11px] text-urban-stone mr-1 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-urban-sand" />
                            <span>Assign Category:</span>
                          </span>

                          {categories.map(cat => {
                            const isSelected = expense.assignedCategory === cat;
                            return (
                              <button
                                key={cat}
                                onClick={() => categorizeExpense(expense.id, cat)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-urban-terracotta text-urban-ivory font-bold shadow-urban-sm border border-urban-sand/30'
                                    : 'bg-urban-panel hover:bg-urban-olive text-urban-stone hover:text-urban-ivory border border-urban-sand/20'
                                }`}
                              >
                                {cat} {isSelected && '✓'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bank Savings Allocation (Preserved Feature) */}
              <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-urban-sand font-bold flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-urban-terracotta" />
                    <span>OPERATIONAL RESERVE BALANCE</span>
                  </div>
                  <span className="text-base font-mono font-bold text-urban-ivory">
                    ${savingsAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xs font-mono text-urban-ivory">
                      Monthly Savings Target: $15,000
                    </div>
                    <div className="text-xs text-urban-stone">Lock in savings streak for bonus XP</div>
                  </div>
                  <button
                    onClick={() => setSavingsAmount(prev => prev + 100)}
                    className="px-4 py-2 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs cursor-pointer transition-colors"
                  >
                    Deposit $100.00
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MISSION 3: FILE ORGANIZER (Tech Office / CyberCore Tech)  */}
          {/* ======================================================== */}
          {building.id === 'cybercore-tech' && mission && (
            <div className="space-y-5">
              {/* Mission Briefing & Action Card */}
              <div className="p-5 rounded-2xl bg-urban-olive border border-urban-sand/30 shadow-urban-panel space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-urban-sand/15">
                  <div>
                    <div className="text-[10px] font-mono text-urban-sand uppercase tracking-widest font-bold">
                      TECH OFFICE DIRECTIVE • {mission.difficulty}
                    </div>
                    <h3 className="text-xl font-display font-bold text-urban-ivory mt-0.5">
                      {mission.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/20">
                      +{mission.xpReward} XP
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-urban-panel text-urban-terracotta font-mono text-xs font-bold border border-urban-terracotta/30">
                      +{mission.creditsReward} CR
                    </span>
                  </div>
                </div>

                <p className="text-xs text-urban-stone font-sans leading-relaxed">
                  {mission.description}
                </p>

                {/* Accept Mission, Decline, and Mission Progress Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-urban-sand/15">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {mission.status !== 'ACTIVE' && mission.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => acceptMission('file-organizer')}
                        className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-xs font-mono font-bold text-urban-ivory shadow-urban-button transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Accept Mission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-urban-panel text-urban-sand font-mono text-xs font-bold border border-urban-sand/30">
                        <Check className="w-3.5 h-3.5 text-urban-sage" />
                        <span>{mission.status === 'COMPLETED' ? 'Mission Completed' : 'Mission In Progress'}</span>
                      </span>
                    )}

                    <button
                      onClick={() => {
                        declineMission('file-organizer');
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-xs font-mono text-urban-stone hover:text-urban-ivory transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>

                  {/* Mission Progress Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-urban-sand">
                        {mission.currentProgress} / {mission.totalProgress} Files Sorted
                      </div>
                      <div className="text-[10px] font-mono text-urban-stone">
                        {Math.round((mission.currentProgress / mission.totalProgress) * 100)}% Complete
                      </div>
                    </div>
                    <div className="w-24 h-2.5 rounded-full bg-urban-panel overflow-hidden border border-urban-sand/20">
                      <div
                        className="h-full bg-gradient-to-r from-urban-terracotta to-urban-sand transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (mission.currentProgress / mission.totalProgress) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Celebration Message and Rewards */}
              {mission.currentProgress >= mission.totalProgress && mission.status !== 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-urban-sm">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-ivory">REPOSITORY WORKSPACE ORGANIZED! (5/5)</div>
                      <div className="text-urban-stone text-[11px]">
                        All 5 project files sorted into proper directory paths. Claim rewards:
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => completeMission('file-organizer')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs shadow-urban-button cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4 text-urban-sand" />
                    <span>Complete Mission (+175 XP, +90 CR)</span>
                  </button>
                </div>
              )}

              {mission.status === 'COMPLETED' && (
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sage/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className="w-5 h-5 text-urban-sage flex-shrink-0" />
                    <div>
                      <div className="font-bold text-urban-sage uppercase tracking-wider">MISSION COMPLETED ✓</div>
                      <div className="text-urban-stone text-[11px]">
                        Completed at {mission.completedAt}. Earned +{mission.xpReward} XP and &quot;{mission.badgeReward}&quot; title.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetDemoMissions}
                    className="px-3.5 py-1.5 rounded-lg bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory text-xs font-mono cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Demo</span>
                  </button>
                </div>
              )}

              {/* Task List with Working Category Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-urban-stone">
                  <span className="font-bold uppercase tracking-wider text-urban-sand">
                    REPOSITORY FILES LIST (5 ITEMS)
                  </span>
                  <span>Destination Folders: /src • /docs • /assets • /tests • /config</span>
                </div>

                <div className="space-y-2.5">
                  {files.map((file, idx) => {
                    const folders: FileFolder[] = [
                      '/src',
                      '/docs',
                      '/assets',
                      '/tests',
                      '/config',
                    ];

                    return (
                      <div
                        key={file.id}
                        className={`p-4 rounded-xl border transition-all text-xs font-mono ${
                          file.isSorted
                            ? 'bg-urban-olive/70 border-urban-sand/20'
                            : 'bg-urban-olive border-urban-sand/35 shadow-urban-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-urban-panel text-urban-sand text-[10px] flex items-center justify-center font-bold">
                              #{idx + 1}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-urban-panel border border-urban-sand/20 flex items-center justify-center text-urban-sand flex-shrink-0">
                              {file.fileType === 'code' && <FileCode className="w-4 h-4" />}
                              {file.fileType === 'doc' && <FileText className="w-4 h-4" />}
                              {file.fileType === 'image' && <FileImage className="w-4 h-4" />}
                              {file.fileType === 'test' && <Terminal className="w-4 h-4" />}
                              {file.fileType === 'config' && <Folder className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-bold text-urban-ivory">{file.name}</div>
                              <div className="text-[10px] text-urban-stone">
                                {file.extension} • {file.sizeKb} KB • Type: {file.fileType.toUpperCase()}
                              </div>
                            </div>
                          </div>

                          {file.isSorted && (
                            <span className="px-2.5 py-0.5 rounded-md bg-urban-panel text-urban-sage font-bold border border-urban-sage/30 text-[11px]">
                              In: {file.assignedFolder} ✓
                            </span>
                          )}
                        </div>

                        {/* Working Destination Folder Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-urban-sand/15">
                          <span className="text-[11px] text-urban-stone mr-1 flex items-center gap-1">
                            <Folder className="w-3.5 h-3.5 text-urban-sand" />
                            <span>Sort into Directory:</span>
                          </span>

                          {folders.map(folder => {
                            const isSelected = file.assignedFolder === folder;
                            return (
                              <button
                                key={folder}
                                onClick={() => sortFile(file.id, folder)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                  isSelected
                                    ? 'bg-urban-terracotta text-urban-ivory font-bold shadow-urban-sm border border-urban-sand/30'
                                    : 'bg-urban-panel hover:bg-urban-olive text-urban-stone hover:text-urban-ivory border border-urban-sand/20'
                                }`}
                              >
                                <span>{folder}</span>
                                {isSelected && <span>✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Developer CLI Terminal Simulation (Preserved Feature) */}
              <div className="space-y-2 pt-2 border-t border-urban-sand/15">
                <div className="flex items-center justify-between text-xs font-mono text-urban-stone uppercase tracking-wider">
                  <span>DEVELOPER CLI INTEGRATION</span>
                  <button
                    onClick={() => {
                      setTerminalOutput([
                        '$ npm test && git push origin main',
                        'Running test suites in Vitest...',
                        'All 16 tests passed (100%)',
                        'Branch up to date with origin/main. Deploy triggered.',
                      ]);
                    }}
                    className="text-xs text-urban-sand hover:text-urban-ivory flex items-center gap-1 cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run Verification & Push</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/20 font-mono text-xs text-urban-sand space-y-1">
                  {terminalOutput.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. HOTEL: Rest, Breaks & Wellness Activities             */}
          {/* ======================================================== */}
          {building.id === 'horizon-hotel' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/30 space-y-2">
                <div className="text-xs font-mono text-urban-sand uppercase tracking-wider font-bold">
                  HOTEL REST & RECOVERY LOUNGE
                </div>
                <p className="text-xs text-urban-stone">
                  Take structured breaks to prevent fatigue, reduce optical strain, and restore mental focus stamina.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Wellness 1: 20-20-20 Eye Strain Break Timer */}
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-urban-terracotta font-bold text-xs font-mono">
                      <Eye className="w-4 h-4" />
                      <span>20-20-20 EYE STRAIN RELIEF</span>
                    </div>
                    <span className="text-[11px] font-mono text-urban-stone">Optometry Protocol</span>
                  </div>
                  <p className="text-xs text-urban-stone font-sans leading-relaxed">
                    Every 20 minutes, look at an object at least 20 feet away for 20 seconds to
                    prevent optical fatigue.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-2xl font-mono font-bold text-urban-ivory">{eyeRestTimer}s</div>
                    <button
                      onClick={() => setEyeRestActive(!eyeRestActive)}
                      className="px-4 py-1.5 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs cursor-pointer transition-colors"
                    >
                      {eyeRestActive ? 'Pause' : 'Start 20s Break'}
                    </button>
                  </div>
                </div>

                {/* Wellness 2: Daily Hydration Tracker */}
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-urban-sand font-bold text-xs font-mono">
                      <Droplets className="w-4 h-4" />
                      <span>HYDRATION TRACKER</span>
                    </div>
                    <span className="text-[11px] font-mono text-urban-ivory">
                      {waterCups} / 8 Glasses
                    </span>
                  </div>
                  <p className="text-xs text-urban-stone font-sans leading-relaxed">
                    Log water intake during continuous building sessions to maintain neural alertness.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setWaterCups(prev => Math.min(prev + 1, 8))}
                      className="px-3.5 py-1.5 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono text-xs font-bold cursor-pointer"
                    >
                      +1 Glass
                    </button>
                    <button
                      onClick={() => setWaterCups(0)}
                      className="px-3 py-1.5 rounded-lg bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone text-xs font-mono cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. PARK: Focus Sessions, Pomodoro & Relaxation           */}
          {/* ======================================================== */}
          {building.id === 'zenith-park' && (
            <div className="space-y-5">
              {/* Pomodoro Focus Suite */}
              <div className="p-5 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-urban-sage font-bold text-xs font-mono">
                    <Clock className="w-4 h-4" />
                    <span>DEEP FOCUS POMODORO TIMER</span>
                  </div>
                  <span className="text-[11px] font-mono text-urban-sand">25 Min Sprint / 5 Min Rest</span>
                </div>

                <div className="text-center py-4">
                  <div className="text-5xl font-mono font-extrabold text-urban-ivory tracking-widest">
                    {formatTimer(pomodoroSeconds)}
                  </div>
                  <div className="text-xs font-mono text-urban-stone mt-2">
                    {pomodoroRunning ? 'Deep Focus Session In Progress' : 'Ready to Begin Sprint'}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => setPomodoroRunning(!pomodoroRunning)}
                    className="px-6 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-urban-button"
                  >
                    {pomodoroRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{pomodoroRunning ? 'Pause Session' : 'Start Focus Sprint'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setPomodoroRunning(false);
                      setPomodoroSeconds(25 * 60);
                    }}
                    className="px-4 py-2 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Ambient Soundscapes */}
              <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-3">
                <div className="flex items-center gap-2 text-urban-sand font-bold text-xs font-mono">
                  <Volume2 className="w-4 h-4" />
                  <span>NATURAL SOUNDSCAPE GENERATOR</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'breeze', label: 'Park Breeze' },
                    { id: 'rain', label: 'Gentle Rain' },
                    { id: 'lake', label: 'Lake Ripple' },
                  ].map(sound => (
                    <button
                      key={sound.id}
                      onClick={() => setAmbientSound(sound.id)}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        ambientSound === sound.id
                          ? 'bg-urban-terracotta text-urban-ivory border-urban-sand/30 font-bold'
                          : 'bg-urban-panel hover:bg-urban-olive text-urban-stone border-urban-sand/15'
                      }`}
                    >
                      {sound.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. PLAZA: Nexus Central Obelisk Achievements & Standup    */}
          {/* ONLY SHOWN WHEN building.id === 'nexus-plaza'             */}
          {/* ======================================================== */}
          {building.id === 'nexus-plaza' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/30 space-y-2">
                <div className="text-xs font-mono text-urban-sand uppercase tracking-wider font-bold">
                  NEXUS CENTRAL OBELISK • CIVIC ACHIEVEMENTS HUB
                </div>
                <p className="text-xs text-urban-stone">
                  Central monument celebrating operative milestones, sprint records, community badges, and hackathon leaderboards.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-urban-stone uppercase tracking-wider">
                  COMMUNITY ACHIEVEMENTS & MILESTONES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'City Pioneer',
                      desc: 'Explored all 6 interactive open-world landmarks.',
                      unlocked: true,
                      icon: Award,
                    },
                    {
                      title: 'Zero Trust Guard',
                      desc: 'Database RLS policies enabled and verified.',
                      unlocked: true,
                      icon: ShieldCheck,
                    },
                    {
                      title: 'Sprint Champion',
                      desc: 'Completed all 3 core productivity missions.',
                      unlocked: true,
                      icon: Sparkles,
                    },
                    {
                      title: 'Century Builder',
                      desc: 'Accumulated over 1,500 total operative XP.',
                      unlocked: true,
                      icon: Zap,
                    },
                  ].map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/20 flex items-center gap-3"
                      >
                        <div className="p-2 rounded-lg bg-urban-panel text-urban-sand border border-urban-sand/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-urban-ivory">{badge.title}</div>
                          <div className="text-[11px] text-urban-stone leading-tight">
                            {badge.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Global Leaderboard Standup */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-urban-stone uppercase tracking-wider">
                  GLOBAL SPRINT OPERATIVE STANDINGS
                </div>
                <div className="p-3 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between pb-1.5 border-b border-urban-sand/15 text-urban-stone font-bold">
                    <span>OPERATIVE</span>
                    <span>FOCUS STREAK</span>
                    <span>EXP CREDITS</span>
                  </div>
                  <div className="flex items-center justify-between text-urban-sand font-bold">
                    <span>1. You (Senior Operative)</span>
                    <span>5 Days Active</span>
                    <span>2,850 XP</span>
                  </div>
                  <div className="flex items-center justify-between text-urban-ivory">
                    <span>2. VectorPilot_99</span>
                    <span>4 Days Active</span>
                    <span>2,410 XP</span>
                  </div>
                  <div className="flex items-center justify-between text-urban-ivory">
                    <span>3. NeonArchitect</span>
                    <span>3 Days Active</span>
                    <span>1,980 XP</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 7. OTHER BUILDINGS: District Directory & Local Info      */}
          {/* NEVER SHOWS ACHIEVEMENTS OR OBELISK PANEL!               */}
          {/* ======================================================== */}
          {!['metro-post', 'apex-bank', 'cybercore-tech', 'horizon-hotel', 'zenith-park', 'nexus-plaza'].includes(building.id) && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-urban-olive border border-urban-sand/30 shadow-urban-panel space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-urban-panel text-urban-sand font-mono text-[10px] font-bold uppercase tracking-wider border border-urban-sand/20">
                    DISTRICT CLASSIFICATION: {building.category}
                  </span>
                  <span className="text-[11px] font-mono text-urban-stone">
                    District Landmark
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-urban-ivory">
                  {building.name}
                </h3>

                <p className="text-xs font-sans text-urban-stone leading-relaxed">
                  {building.description}
                </p>

                <div className="p-3.5 rounded-xl bg-urban-panel border border-urban-sand/15 text-xs font-mono space-y-1.5">
                  <div className="text-urban-sand font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-urban-sand" />
                    <span>District Operations:</span>
                  </div>
                  <div className="text-urban-ivory">{building.taskTitle}</div>
                  <div className="text-[11px] text-urban-stone pt-0.5">
                    {building.taskDescription}
                  </div>
                </div>
              </div>

              {/* District Productivity Tips & Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-2">
                  <div className="text-xs font-mono font-bold text-urban-sand flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-urban-terracotta" />
                    <span>DISTRICT SERVICES</span>
                  </div>
                  <p className="text-xs text-urban-stone leading-relaxed">
                    This location is part of the MORPHYX open-world metropolitan network. Visit the mission hubs (Post Office, Bank, Tech Office) to organize real-world digital productivity tasks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-urban-olive border border-urban-sand/20 space-y-2">
                  <div className="text-xs font-mono font-bold text-urban-sage flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-urban-sage" />
                    <span>OPERATIVE GUIDELINES</span>
                  </div>
                  <p className="text-xs text-urban-stone leading-relaxed">
                    Maintain your daily deep-work streaks, take regular eye-rest pauses at the Hotel, and recharge at the Zenith Eco-Sanctuary.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Modal Footer: Clear Return to City Button */}
        <div className="px-6 py-3.5 bg-urban-olive border-t border-urban-sand/15 flex items-center justify-between text-xs font-mono text-urban-stone">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-urban-sand" />
            <span>
              Press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-urban-panel text-urban-sand border border-urban-sand/20">
                ESC
              </kbd>{' '}
              to close and continue walking
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs shadow-urban-button transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Return to City</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingModal;
