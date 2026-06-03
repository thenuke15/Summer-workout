import React, { useState, useEffect } from 'react';
import { UserAdjustments, DayAdjustment, WorkoutDuration } from './types';
import { schedules, programMetadata } from './data/workoutData';
import { Dashboard } from './components/Dashboard';
import { DayDetails } from './components/DayDetails';
import { PresetsView } from './components/PresetsView';
import { ActiveWorkout } from './components/ActiveWorkout';

export const App: React.FC = () => {
  // 1. Navigation Tab State: 'schedule' | 'presets'
  const [activeTab, setActiveTab] = useState<'schedule' | 'presets'>('schedule');

  // 2. Active Week State: 'A' | 'B' (loaded from localStorage or calculated dynamically based on current week number)
  const [activeWeekId, setActiveWeekId] = useState<'A' | 'B'>(() => {
    const saved = localStorage.getItem('summer_workout_week_type');
    if (saved === 'A' || saved === 'B') return saved;
    
    // Auto-select week based on odd/even week of the year
    const today = new Date();
    const getWeekNumber = (d: Date): number => {
      const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      target.setUTCDate(target.getUTCDate() + 4 - (target.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
      return Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };
    const currentWeekNum = getWeekNumber(today);
    return currentWeekNum % 2 === 0 ? 'B' : 'A';
  });

  // 3. User Customization Adjustments State (loaded from localStorage)
  const [adjustments, setAdjustments] = useState<UserAdjustments>(() => {
    const saved = localStorage.getItem('summer_workout_adjustments');
    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 4. Selected Day detailed view State
  const [selectedDayName, setSelectedDayName] = useState<string | null>(null);

  // 5. Active Workout Mode State (holds selected duration if playing, else null)
  const [activeWorkoutDuration, setActiveWorkoutDuration] = useState<WorkoutDuration | null>(null);
  const [activeWorkoutSession, setActiveWorkoutSession] = useState<'morning' | 'afternoon' | null>(null);

  // Sync week state to localStorage
  useEffect(() => {
    localStorage.setItem('summer_workout_week_type', activeWeekId);
  }, [activeWeekId]);

  // Sync adjustments to localStorage
  useEffect(() => {
    localStorage.setItem('summer_workout_adjustments', JSON.stringify(adjustments));
  }, [adjustments]);

  // Find active schedule
  const activeSchedule = schedules.find(s => s.id === activeWeekId) || schedules[0];

  // Selected Day Split
  const selectedDaySplit = activeSchedule.days.find(d => d.day === selectedDayName) || null;

  // Handle updating user adjustments (duration, customName)
  const handleUpdateAdjustment = (dayName: string, field: 'duration' | 'customName', value: string) => {
    const key = `${activeWeekId}-${dayName}`;
    setAdjustments((prev) => {
      const current = prev[key] || { duration: 'full', customName: '' };
      const updatedDay: DayAdjustment = {
        ...current,
        [field]: value as WorkoutDuration
      };
      
      return {
        ...prev,
        [key]: updatedDay
      };
    });
  };

  const handleStartWorkout = (duration: WorkoutDuration, session: 'morning' | 'afternoon') => {
    setActiveWorkoutDuration(duration);
    setActiveWorkoutSession(session);
  };

  const handleQuitWorkout = () => {
    setActiveWorkoutDuration(null);
    setActiveWorkoutSession(null);
  };

  // Determine active view mode
  const isWorkoutActive = activeWorkoutDuration !== null && selectedDaySplit !== null && activeWorkoutSession !== null;

  return (
    <div className="app-container">
      {/* Header (Only show if not playing active workout) */}
      {!isWorkoutActive && (
        <header className="app-header">
          <h1 className="app-title">Summer Workout Split</h1>
          <p className="app-subtitle">Conditioning & Explosiveness Guide</p>
        </header>
      )}

      {/* Week Selection Toggle (Only show on schedule tab and when no day is selected) */}
      {activeTab === 'schedule' && !selectedDayName && !isWorkoutActive && (
        <div className="toggle-wrapper">
          <div className="week-toggle">
            <button
              className={`toggle-btn ${activeWeekId === 'A' ? 'active week-a' : ''}`}
              onClick={() => setActiveWeekId('A')}
            >
              Week A Split
            </button>
            <button
              className={`toggle-btn ${activeWeekId === 'B' ? 'active week-b' : ''}`}
              onClick={() => setActiveWeekId('B')}
            >
              Week B Split
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Tabs (Only show if not in deep-dive day view or active workout mode) */}
      {!selectedDayName && !isWorkoutActive && (
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Weekly Schedule
          </button>
          <button
            className={`nav-tab ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            Preset Challenges
          </button>
        </nav>
      )}

      {/* Primary Display Area */}
      <main>
        {isWorkoutActive && activeWorkoutSession ? (
          <ActiveWorkout
            daySplit={selectedDaySplit}
            duration={activeWorkoutDuration}
            sessionType={activeWorkoutSession}
            onQuit={handleQuitWorkout}
          />
        ) : selectedDayName && selectedDaySplit ? (
          <DayDetails
            daySplit={selectedDaySplit}
            scheduleId={activeWeekId}
            adjustments={adjustments}
            onUpdateAdjustment={handleUpdateAdjustment}
            onStartWorkout={handleStartWorkout}
            onClose={() => setSelectedDayName(null)}
          />
        ) : activeTab === 'schedule' ? (
          <Dashboard
            schedule={activeSchedule}
            selectedDay={selectedDayName}
            onSelectDay={(dayName) => setSelectedDayName(dayName)}
            adjustments={adjustments}
          />
        ) : (
          <PresetsView />
        )}
      </main>

      {/* System Rules & Philosophy (Show at the bottom if no day is selected and not in active workout) */}
      {!selectedDayName && !isWorkoutActive && (
        <footer className="card meta-overview">
          <h2 className="meta-title">💡 System Rules & Philosophy</h2>
          <div className="meta-philosophies">
            {programMetadata.core_philosophy.map((philosophy, idx) => (
              <div key={idx} className="meta-philosophy-item">
                <span className="meta-bullet">▪</span>
                <span>{philosophy}</span>
              </div>
            ))}
            
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.05)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                🔄 Rotation Logic
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong>Ideal Split:</strong> {programMetadata.scheduling_logic.ideal_split}<br />
                <strong>Alternative Split:</strong> {programMetadata.scheduling_logic.alternative_split}<br />
                <strong>Frequency:</strong> {programMetadata.scheduling_logic.frequency}
              </div>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <strong>Target Outcomes:</strong> {programMetadata.target_outcomes.join(', ')}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
